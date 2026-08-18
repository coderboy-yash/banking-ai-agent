import calendar
import re
from datetime import date

from langchain_core.runnables import RunnableConfig
from langchain_core.tools import tool

from app.agent.backend_client import BackendAuthError, fetch_accounts, fetch_transactions

LOGIN_REQUIRED = (
    "I can't access your account details because you're not logged in. Please log in "
    "at /login and ask again."
)

MONTH_NAMES = {name.lower(): i for i, name in enumerate(calendar.month_name) if name}
MONTH_NAMES.update({name.lower(): i for i, name in enumerate(calendar.month_abbr) if name})

CATEGORY_SYNONYMS = {
    "food": {"groceries", "dining"},
    "eating out": {"dining"},
    "restaurants": {"dining"},
    "bills": {"utilities"},
    "shopping": {"other"},
    "savings": {"transfer"},
}


def _get_token(config: RunnableConfig) -> str | None:
    return (config.get("configurable") or {}).get("auth_token")


def _parse_month(text: str | None) -> tuple[int, int] | None:
    """Parse a free-form month reference into (year, month). Returns None for
    'all time' — i.e. no text given at all."""
    if not text:
        return None
    text = text.strip().lower()
    today = date.today()
    if text in ("this month", "current month"):
        return today.year, today.month
    if text == "last month":
        y, m = today.year, today.month - 1
        if m == 0:
            y, m = y - 1, 12
        return y, m

    iso = re.match(r"^(\d{4})-(\d{1,2})$", text)
    if iso:
        return int(iso.group(1)), int(iso.group(2))

    match = re.match(r"^([a-zA-Z]+)\s*,?\s*(\d{4})?$", text)
    if match and match.group(1).lower() in MONTH_NAMES:
        month = MONTH_NAMES[match.group(1).lower()]
        year = int(match.group(2)) if match.group(2) else today.year
        return year, month

    return None


def _matching_categories(category: str) -> set[str]:
    category = category.strip().lower()
    return CATEGORY_SYNONYMS.get(category, {category})


def _in_month(txn_date: str, year_month: tuple[int, int]) -> bool:
    return txn_date[:7] == f"{year_month[0]:04d}-{year_month[1]:02d}"


def _fmt_inr(amount: float) -> str:
    return f"₹{amount:,.2f}"


@tool
async def get_account_summary(config: RunnableConfig) -> str:
    """Get the logged-in user's account balances and total balance across all
    their accounts (checking, savings, RD, FD)."""
    token = _get_token(config)
    if not token:
        return LOGIN_REQUIRED
    try:
        accounts = await fetch_accounts(token)
    except BackendAuthError:
        return LOGIN_REQUIRED
    except Exception:
        return "I couldn't reach your account data right now — please try again in a moment."

    if not accounts:
        return "You don't have any accounts yet."

    lines = [
        f"- {a['type'].upper()} (•••• {a['accountNumber']}): {_fmt_inr(a['balance'])}"
        for a in accounts
    ]
    total = sum(a["balance"] for a in accounts)
    return "Your accounts:\n" + "\n".join(lines) + f"\n\nTotal balance: {_fmt_inr(total)}"


@tool
async def get_spending_insights(
    config: RunnableConfig, month: str | None = None, category: str | None = None
) -> str:
    """Get spending insights for the logged-in user. If `month` is given (e.g.
    "June", "2026-06", "last month", "this month"), returns total spend and a
    category breakdown for that month. If `month` is omitted, returns spend
    grouped by month across all history, highlighting the highest-spend month,
    plus an overall category breakdown — use this for questions like "which
    month did I spend the most". `category` optionally narrows to one spend
    category (e.g. "food", "dining", "groceries", "utilities", "rent",
    "subscription", "other")."""
    token = _get_token(config)
    if not token:
        return LOGIN_REQUIRED
    try:
        txns = await fetch_transactions(token)
    except BackendAuthError:
        return LOGIN_REQUIRED
    except Exception:
        return "I couldn't reach your transaction data right now — please try again in a moment."

    debits = [t for t in txns if t["direction"] == "debit"]
    if category:
        wanted = _matching_categories(category)
        debits = [t for t in debits if t["category"] in wanted]

    if month:
        ym = _parse_month(month)
        if ym is None:
            return f"I couldn't understand the month \"{month}\" — try a name like \"June\" or \"2026-06\"."
        scoped = [t for t in debits if _in_month(t["date"], ym)]
        if not scoped:
            return f"No spending found for {calendar.month_name[ym[1]]} {ym[0]}."
        total = sum(t["amount"] for t in scoped)
        by_cat: dict[str, float] = {}
        for t in scoped:
            by_cat[t["category"]] = by_cat.get(t["category"], 0) + t["amount"]
        breakdown = "\n".join(f"- {c}: {_fmt_inr(a)}" for c, a in sorted(by_cat.items(), key=lambda x: -x[1]))
        return (
            f"Spending in {calendar.month_name[ym[1]]} {ym[0]}: {_fmt_inr(total)}\n\nBy category:\n{breakdown}"
        )

    if not debits:
        return "No spending found."
    by_month: dict[str, float] = {}
    for t in debits:
        key = t["date"][:7]
        by_month[key] = by_month.get(key, 0) + t["amount"]
    top_month, top_amount = max(by_month.items(), key=lambda x: x[1])
    y, m = int(top_month[:4]), int(top_month[5:7])

    by_cat: dict[str, float] = {}
    for t in debits:
        by_cat[t["category"]] = by_cat.get(t["category"], 0) + t["amount"]
    breakdown = "\n".join(f"- {c}: {_fmt_inr(a)}" for c, a in sorted(by_cat.items(), key=lambda x: -x[1]))

    return (
        f"Your highest-spend month was {calendar.month_name[m]} {y} at {_fmt_inr(top_amount)}.\n\n"
        f"Overall spend by category:\n{breakdown}"
    )


@tool
async def search_transactions(
    config: RunnableConfig,
    keyword: str | None = None,
    min_amount: float | None = None,
    max_amount: float | None = None,
    month: str | None = None,
    direction: str | None = None,
) -> str:
    """Search the logged-in user's transactions by any combination of a
    description keyword (e.g. "Amazon"), an amount range, a month (e.g.
    "June", "2026-06", "last month"), and direction ("credit" or "debit")."""
    token = _get_token(config)
    if not token:
        return LOGIN_REQUIRED
    try:
        txns = await fetch_transactions(token)
    except BackendAuthError:
        return LOGIN_REQUIRED
    except Exception:
        return "I couldn't reach your transaction data right now — please try again in a moment."

    results = txns
    if keyword:
        kw = keyword.strip().lower()
        results = [t for t in results if kw in t["description"].lower()]
    if min_amount is not None:
        results = [t for t in results if t["amount"] >= min_amount]
    if max_amount is not None:
        results = [t for t in results if t["amount"] <= max_amount]
    if direction:
        results = [t for t in results if t["direction"] == direction.strip().lower()]
    if month:
        ym = _parse_month(month)
        if ym is None:
            return f"I couldn't understand the month \"{month}\" — try a name like \"June\" or \"2026-06\"."
        results = [t for t in results if _in_month(t["date"], ym)]

    if not results:
        return "No matching transactions found."

    shown = results[:15]
    lines = [
        f"- {t['date']} {t['description']} ({t['category']}): "
        f"{'+' if t['direction'] == 'credit' else '-'}{_fmt_inr(t['amount'])}"
        for t in shown
    ]
    header = f"Found {len(results)} matching transaction(s)"
    if len(results) > 15:
        header += " (showing first 15 — refine your search for more specific results)"
    return header + ":\n" + "\n".join(lines)


@tool
async def get_interest_summary(config: RunnableConfig, month: str | None = None) -> str:
    """Get interest earned on the logged-in user's savings/RD/FD deposits
    (does not include loan interest or credit card charges). If `month` is
    given, scopes to that month; otherwise returns the all-time total."""
    token = _get_token(config)
    if not token:
        return LOGIN_REQUIRED
    try:
        txns = await fetch_transactions(token)
    except BackendAuthError:
        return LOGIN_REQUIRED
    except Exception:
        return "I couldn't reach your transaction data right now — please try again in a moment."

    interest = [
        t for t in txns if t["direction"] == "credit" and "interest credit" in t["description"].lower()
    ]
    if month:
        ym = _parse_month(month)
        if ym is None:
            return f"I couldn't understand the month \"{month}\" — try a name like \"June\" or \"2026-06\"."
        interest = [t for t in interest if _in_month(t["date"], ym)]
        label = f" in {calendar.month_name[ym[1]]} {ym[0]}"
    else:
        label = " overall"

    if not interest:
        return f"No interest credits found{label}."
    total = sum(t["amount"] for t in interest)
    return (
        f"Interest earned on your savings/RD/FD accounts{label}: {_fmt_inr(total)} "
        f"across {len(interest)} credit(s). (This covers deposit interest only — not loan "
        "interest or credit card charges.)"
    )


TOOLS_PERSONAL = [get_account_summary, get_spending_insights, search_transactions, get_interest_summary]
