# Progress Log

A plain-English, dated diary of what's actually been done on this project — not a
status board (that's `PROJECT_PLAN.md`), but a record of *how we got here*. Add a new
entry every time real progress happens, even small steps. Each entry should be
understandable without reading the code: what we did, what tech was used, and anything
that went wrong or needed a workaround. This is what makes it possible to trace back and
find where a failure or gap was introduced.

**Entry format:**
```
## YYYY-MM-DD — short title
**What we did:** plain-English summary of the step
**Tech used:** specific tools/libraries touched in this step
**Issues / decisions:** anything that failed, needed a workaround, or was a judgment call
**Status:** where this leaves the project
```

---

## 2026-08-16 — Project kickoff & planning

**What we did:** Defined the project idea: a basic banking website with an AI
assistant layered on top that helps customers navigate the site, find policies and
required documents, verify documents, build a personal budget, find suitable schemes,
locate nearby branches, and get help with loan requirements. Broke this into 9 build
phases (see `PROJECT_PLAN.md`). Set up the GitHub repo and the project's guide files so
future sessions can pick up where we left off without re-explaining anything.

**Tech used:** Go + PostgreSQL (banking backend), React + Tailwind (frontend), Python +
FastAPI + LangChain + LangGraph (AI agent service), Groq/Gemini free-tier LLMs, Chroma +
sentence-transformers (RAG for policy Q&A), Tesseract OCR (document checks), OpenStreetMap
Nominatim (branch geocoding). Git for version control.

**Issues / decisions:** Decided to *simulate* three things instead of using real APIs,
because the real versions are paid/regulated and not accessible for a free-tools
project: document verification (structural OCR checks, not real KYC), loan
underwriting (rule-based mock, not real credit bureau data), and scheme
recommendations (small curated static dataset, not a live feed). These are documented
as deliberate scope choices in `CLAUDE.md`, not gaps to fix later.

**Status:** No application code written yet. This step was planning + repo scaffolding
only: `CLAUDE.md`, `PROJECT_PLAN.md`, `PROGRESS.md`, `.gitignore`, and the initial
commit pushed to `github.com/coderboy-yash/banking-ai-agent`.
