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
    """Raise a customer support ticket for the user. Only call this once you have
    already asked the user what the problem is and they have replied with real
    details — do NOT call this the moment someone says they want to raise a ticket.
    If the user has only expressed intent ("I want to raise a ticket", "I have a
    complaint") without saying what's actually wrong, your next reply must be a
    question asking what happened — do not call this tool on that turn. Only call it
    once subject and description describe an actual, specific issue."""
    if len(subject.strip()) < 8 or len(description.strip()) < 15:
        return (
            "Not enough detail to raise a ticket yet. Ask the user what the issue is "
            "(what happened, when, any error message) before calling this tool again."
        )
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
