# Yash Bank — agent-service

FastAPI + LangGraph chatbot, backed by Groq's free-tier LLM.

```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # paste your Groq API key (console.groq.com) into GROQ_API_KEY
uvicorn app.main:app --reload --port 8001
```

Runs on `:8001`. Endpoints: `GET /health`, `POST /chat` `{message, session_id?}` →
`{reply, session_id}`. Conversation memory is per `session_id`, persisted to a local
SQLite file (`checkpoints.sqlite`) so it survives restarts.

Scope: a conversational assistant that knows the site's account/card/loan facts from
its system prompt. It has no access to a logged-in user's real data and no tools yet —
RAG over policy docs and tool-calling into the Go backend are later phases (see
`PROJECT_PLAN.md`).
