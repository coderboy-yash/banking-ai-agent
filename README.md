# Yash Bank — banking-ai-agent

An agentic AI banking demo: React frontend, Go backend, and a LangGraph + Groq
chatbot agent. See [CLAUDE.md](CLAUDE.md) for architecture and
[PROJECT_PLAN.md](PROJECT_PLAN.md) for build phases.

## Try it — demo login

```
demo@yashbank.com
password123
```

Use this to log in once the frontend is running (see below) — no signup needed. It's
seeded with 4 accounts (~₹1 crore total), 50+ transactions, a car loan and a home
loan, and a debit + credit card.

## Running locally

Three services, each with its own `README.md` and `.env.example`:

```
backend/          # docker compose up -d && cp .env.example .env && go run ./cmd/server
frontend/         # cp .env.example .env && npm install && npm run dev
agent-service/    # python3 -m venv .venv && pip install -r requirements.txt && uvicorn app.main:app --port 8001
```

The frontend runs on mock data by default (`VITE_USE_MOCK=true` in `frontend/.env`) —
you can try the demo login without the backend or agent-service running at all. Flip
it to `false` once the backend is up to use the real API.
