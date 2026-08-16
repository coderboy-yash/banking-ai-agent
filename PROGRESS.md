# Progress Log

Short, dated entries. What we did, tech touched, issues. One-liners, no essays.

Format:
```
## YYYY-MM-DD — title
- Did: ...
- Tech: ...
- Issues: ...
```

---

## 2026-08-16 — Kickoff & planning
- Did: scoped project into 9 phases, simulated KYC/credit/schemes (no free real APIs), set up repo + docs
- Tech: Go/Postgres (backend), React/Tailwind (frontend), FastAPI/LangChain/LangGraph (agent-service)
- Issues: none — planning only, no code yet

## 2026-08-16 — Frontend built (mock data)
- Did: full banking UI — login/signup, dashboard, transactions, transfer, profile; sidebar layout; browser-verified with Playwright (screenshots + no console errors)
- Tech: Vite, React, TypeScript, Tailwind v4, React Router, Axios, lucide-react, Inter font
- Issues: found & fixed a race condition — transfer button was clickable before mock accounts finished loading (empty `fromAccountId`); now disabled until accounts load

## 2026-08-16 — Rebrand to Yash Bank + public homepage
- Did: renamed Meridian Bank → Yash Bank everywhere; added a public marketing homepage at `/` (hero, product cards, features, footer) styled after real Indian bank sites (HDFC/IDFC FIRST reference screenshots); moved the banking app to `/dashboard`; recolored navy → maroon/black brand palette
- Tech: same stack, no new deps; Playwright used to screenshot real bank sites for design reference (HDFC blocked by bot protection, IDFC FIRST worked)
- Issues: none — verified full flow (home → login → dashboard) in browser, no console errors
