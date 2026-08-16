import random
import sqlite3
import string
import time

from langchain_core.tools import tool

DB_PATH = "tickets.sqlite"


def _get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS tickets (
            id TEXT PRIMARY KEY,
            subject TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'open',
            created_at TEXT NOT NULL
        )
        """
    )
    return conn


def _new_ticket_id() -> str:
    suffix = "".join(random.choices(string.digits, k=5))
    return f"YB-{suffix}"


@tool
def raise_support_ticket(subject: str, description: str) -> str:
    """Raise a customer support ticket for the user. Use this when the user reports a
    problem, complaint, or issue they want followed up on (e.g. a card not working, a
    disputed transaction, trouble accessing their account). If they haven't given a
    clear subject and description yet, ask for them before calling this tool."""
    ticket_id = _new_ticket_id()
    conn = _get_conn()
    conn.execute(
        "INSERT INTO tickets (id, subject, description, status, created_at) VALUES (?, ?, ?, 'open', ?)",
        (ticket_id, subject, description, time.strftime("%Y-%m-%d %H:%M:%S")),
    )
    conn.commit()
    conn.close()
    return f"Ticket {ticket_id} raised with status 'open'. Share this ID with the user so they can check on it later."


@tool
def check_ticket_status(ticket_id: str) -> str:
    """Look up the status of a previously raised support ticket by its ticket ID
    (e.g. YB-12345)."""
    conn = _get_conn()
    row = conn.execute(
        "SELECT subject, status, created_at FROM tickets WHERE id = ?", (ticket_id,)
    ).fetchone()
    conn.close()
    if not row:
        return f"No ticket found with ID {ticket_id}."
    subject, status, created_at = row
    return f"Ticket {ticket_id} ('{subject}') is currently '{status}', raised on {created_at}."


TOOLS = [raise_support_ticket, check_ticket_status]
