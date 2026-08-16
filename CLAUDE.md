# banking-ai-agent

An agentic AI project for the fintech industry: a basic banking web app with an AI
customer-service/navigation agent layered on top, built with LangChain + LangGraph and
free tools/APIs only.

## Architecture

Three services in this monorepo:

- `backend/` — Go (Gin or Echo) + PostgreSQL. Core banking: auth (JWT), accounts,
  balances, transaction history, simulated fund transfer.
- `frontend/` — React (Vite + Tailwind). Banking UI + embedded chat widget.
- `agent-service/` — Python (FastAPI + LangChain + LangGraph). The agentic layer:
  customer-service chatbot, site navigation help, RAG over policy docs, document
  verification, budgeting agent, scheme recommender, loan assistant.

The frontend talks to both `backend` (banking data) and `agent-service` (chat/agent
requests) directly. `agent-service` calls back into `backend`'s API for data it needs
(e.g. a user's transaction history for the budgeting agent).

See [PROJECT_PLAN.md](PROJECT_PLAN.md) for the phased build order and current status —
always check it at the start of a session to see what's done vs. in progress.

See [PROGRESS.md](PROGRESS.md) for a plain-English, chronological log of what's actually
been built, which tech was used at each step, and any issues/decisions hit along the
way — read it to understand *how* the project got to its current state, not just what
state it's in.

## Deliberately simulated (not real) capabilities

These are scope decisions, not gaps to "fix":

- **Document verification** — structural checks (OCR + format/field validation via
  Tesseract), not real identity verification. Real KYC APIs (e.g. IDfy, Signzy,
  government identity APIs) are paid/licensed and out of scope for a free-tools project.
- **Loan underwriting / credit score** — rule-based mock logic. Real credit bureau data
  (CIBIL, Experian, etc.) requires paid, restricted access.
- **Scheme recommendations** — matched against a small curated static dataset
  (`agent-service/data/schemes.json`), not a live feed. No reliable free API exists for
  this.

## Tech choices and why

- **LLM**: Groq free tier (fast, generous limits, Llama 3.x) as primary; Gemini free
  tier as an alternative; Ollama locally for offline dev / avoiding rate limits.
- **Embeddings**: local `sentence-transformers`, not an API — keeps RAG dev/testing off
  free-tier rate limits.
- **Vector store**: Chroma, local, free.
- **Geocoding** (branch finder): OpenStreetMap Nominatim, free.
- **OCR**: Tesseract (pytesseract), free/local.

## Running locally

Populated as each service is scaffolded (see PROJECT_PLAN.md Phase 1+).

- `backend/`: `docker compose up -d` (Postgres on host port 5433, see docker-compose.yml — 5432 was taken by an existing native install), `cp .env.example .env`, `go run ./cmd/server`
- `frontend/`: `cp .env.example .env && npm install && npm run dev` (mock data by default, `VITE_USE_MOCK=false` once backend exists)
- `agent-service/`: `python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`, `cp .env.example .env` (add your own `GROQ_API_KEY`), `uvicorn app.main:app --reload --port 8001`

## Conventions

- Commit at the end of each meaningful chunk of progress (end of a phase or working
  sub-feature), push at the end of the day.
- Keep docs in sync every time progress happens, not just at phase boundaries:
  `PROJECT_PLAN.md` checkboxes, `CLAUDE.md` only if architecture/scope actually
  changed, `PROGRESS.md` short entry always.
- Keep all docs (including this one) short — one-liners over paragraphs. This is a
  long project; verbose docs become their own problem over time.
