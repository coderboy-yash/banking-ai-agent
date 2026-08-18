# Yash Bank — banking-ai-agent

An agentic AI banking demo: React frontend, Go backend, and a LangGraph + Groq
chatbot agent. See [CLAUDE.md](CLAUDE.md) for architecture and
[PROJECT_PLAN.md](PROJECT_PLAN.md) for build phases.

## Try it — demo login

```
demo@yashbank.com
password123
```

Use this to log in once all three services are running (see below) — no signup
needed. It's seeded with 4 accounts (~₹1 crore total), 50+ transactions, a car loan
and a home loan, and a debit + credit card.

## Running locally

Three services (each also has its own `README.md` with endpoint details).

### First-time setup

```
# backend/
docker compose up -d   # from repo root — Postgres on :5433
cp backend/.env.example backend/.env
(cd backend && go run ./cmd/server)

# frontend/
cp frontend/.env.example frontend/.env
(cd frontend && npm install && npm run dev)

# agent-service/
python3 -m venv agent-service/.venv
source agent-service/.venv/bin/activate
pip install -r agent-service/requirements.txt
cp agent-service/.env.example agent-service/.env   # paste your Groq API key (console.groq.com) into GROQ_API_KEY
(cd agent-service && uvicorn app.main:app --reload --port 8001)
```

### Starting again later

```
# backend/ (Postgres container keeps running once started; re-run if stopped)
docker compose up -d
(cd backend && go run ./cmd/server)

# frontend/
(cd frontend && npm run dev)

# agent-service/
source agent-service/.venv/bin/activate
(cd agent-service && uvicorn app.main:app --reload --port 8001)
```

The frontend always talks to the real backend — there's no mock-data mode. All three
services (Postgres via `docker compose`, `backend/`, and `frontend/`) need to be
running to log in. `agent-service/` is only needed for the chat widget.
