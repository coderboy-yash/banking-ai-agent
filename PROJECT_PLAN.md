# Project Plan — banking-ai-agent

Living document. Update checkboxes as work lands. See [CLAUDE.md](CLAUDE.md) for
architecture and the list of deliberately simulated capabilities.

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

## Phase 0 — Planning & scaffolding
- [x] Define scope and mock-data strategy (documents, branches, schemes, credit rules)
- [x] Repo initialized, monorepo layout decided
- [ ] Create `backend/`, `frontend/`, `agent-service/` directory skeletons

**Tech:** git only.

## Phase 1 — Core banking website (no AI yet)
- [x] Go backend (Gin) + PostgreSQL: signup/login (JWT)
- [x] Accounts, balances, transaction history
- [x] Simulated fund transfer
- [x] React frontend (Vite + Tailwind): auth pages, dashboard, transactions, transfer
- [x] Frontend wired to real backend end-to-end (curl + browser verified)

**Tech:** Go, Gin/Echo, GORM, PostgreSQL (local or Supabase free tier), React, Vite,
Tailwind, JWT.
**Feasibility:** standard CRUD app, no AI dependency, fully achievable.

## Phase 2 — Chatbot foundation
- [x] `agent-service` FastAPI + LangGraph skeleton
- [x] Chat widget in React, wired to `agent-service` (sync REST; SSE streaming is Phase 8)
- [x] Basic conversational agent (greeting, simple FAQ) — real Groq LLM, per-session memory via SQLite checkpointer, verified multi-turn

**Tech:** LangChain, LangGraph, FastAPI, Groq free tier (or Gemini free tier / Ollama
locally).
**Feasibility:** yes.

## Phase 3 — Navigation, policies & branch finder
- [~] Policy docs written — done as a real frontend page (`/policies`, official-document
      styling) with structured content in `frontend/src/data/policies.ts` for
      Accounts/Cards/Loans (terms + required-documents). Not yet: converted to markdown
      and indexed in Chroma for RAG — that's still open
- [ ] Chroma RAG index (local sentence-transformers embeddings)
- [ ] Tools: `find_policy`, `list_required_documents`, `find_nearest_branch`
- [ ] Static branch dataset + OSM Nominatim geocoding + distance calc
- [ ] LangGraph router node for intent classification → tool dispatch

**Tech:** Chroma, sentence-transformers, OpenStreetMap Nominatim.
**Feasibility:** yes, fully free.

## Phase 4 — Document verification (simulated KYC)
- [ ] Doc upload → Tesseract OCR extraction
- [ ] Structural/format validation (regex/field checks)
- [ ] Verified / needs-review flag

**Tech:** Tesseract (pytesseract).
**Feasibility:** yes, as a structural simulation — not real identity verification (see
CLAUDE.md).

## Phase 5 — Personal budgeting agent
- [x] Pull user transaction history from Phase 1 DB via `backend` API — agent-service
      forwards the user's JWT to `GET /api/accounts`/`GET /api/transactions`
- [x] Categorize spend (by existing category field: spending insights, interest
      summary, NL transaction search — a "Personal Assistant" chat mode, login-gated,
      alongside the original "Bank Assistant" mode; not originally phased as a
      toggle, added per direct request)
- [ ] Generate budget plan (e.g. 50/30/20) with narrative explanation

**Tech:** pandas, LangGraph LLM reasoning node.
**Feasibility:** yes — the most substantive AI value-add in the project.

## Phase 6 — Scheme recommender
- [ ] Curate static scheme dataset (`agent-service/data/schemes.json`) with eligibility
      rules
- [ ] Match against user profile/budget, explain fit conversationally

**Feasibility:** yes, with static data (documented limitation, not a bug).

## Phase 7 — Loan assistant
- [ ] Rule-based mock eligibility check (income, simulated credit score)
- [ ] Document checklist (reuses Phase 4)
- [ ] Conversational walkthrough

**Feasibility:** yes, as simulation.

## Phase 8 — Memory, polish, guardrails
- [ ] LangGraph checkpointer for multi-turn memory tied to logged-in session
- [ ] Streaming responses (SSE/WebSocket) in chat widget
- [ ] Rate-limit handling for free LLM tiers
- [ ] Basic prompt-injection guardrails on tool-calling inputs

## Phase 9 — Deployment (optional)
- [ ] Frontend → Vercel/Netlify free tier
- [ ] Go backend → Render/Fly.io free tier
- [ ] `agent-service` → Render or HF Spaces
- [ ] DB → Supabase/Neon free Postgres

Note: free-tier cold starts will make first-request latency noticeable in demos.

---

## Suggested milestone
Ship Phases 1–3 first — a working banking site + chatbot that navigates the site and
answers policy questions is already a complete, demoable product. Treat Phases 4–7 as
independent expansions after that.
