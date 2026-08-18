import httpx

from app.config import BACKEND_BASE_URL


class BackendAuthError(Exception):
    """Raised when the Go backend rejects the forwarded bearer token."""


async def _get(path: str, token: str) -> list[dict]:
    async with httpx.AsyncClient(base_url=BACKEND_BASE_URL, timeout=10.0) as client:
        resp = await client.get(path, headers={"Authorization": f"Bearer {token}"})
    if resp.status_code == 401:
        raise BackendAuthError("token rejected by backend")
    resp.raise_for_status()
    return resp.json()


async def fetch_accounts(token: str) -> list[dict]:
    return await _get("/accounts", token)


async def fetch_transactions(token: str) -> list[dict]:
    return await _get("/transactions", token)
