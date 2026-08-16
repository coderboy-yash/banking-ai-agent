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

## 2026-08-16 — Auth pages redesigned
- Did: login/signup were a bare floating card on empty gray with a tiny logo — felt like a generic template, not part of the site. Rebuilt as a branded split-screen page: site header/footer, dark benefits panel + balance-card visual on the left, form on the right
- Tech: same stack, no new deps; browser + curl regression check confirmed login still works end to end
- Issues: none

## 2026-08-16 — Backend built + wired to frontend
- Did: full Go backend (signup/login/profile, accounts, transactions, transfer) verified via curl (happy path + error cases: duplicate email, wrong password, insufficient funds, missing auth) and via browser through the real UI; reset DB and reseeded the demo login (demo@yashbank.com) so it works in both mock and real-backend mode; frontend flipped to `VITE_USE_MOCK=false`
- Tech: Go, Gin, GORM, Postgres 16 (Docker), golang-jwt, bcrypt
- Issues: hit a disk-full crash mid-build yesterday (see prior entry) — resolved once free space came back; host already had native Postgres 18 on 5432, backend Postgres container uses 5433 instead

## 2026-08-16 — Rebrand to Yash Bank + public homepage
- Did: renamed Meridian Bank → Yash Bank everywhere; added a public marketing homepage at `/` (hero, product cards, features, footer) styled after real Indian bank sites (HDFC/IDFC FIRST reference screenshots); moved the banking app to `/dashboard`; recolored navy → maroon/black brand palette
- Tech: same stack, no new deps; Playwright used to screenshot real bank sites for design reference (HDFC blocked by bot protection, IDFC FIRST worked)
- Issues: none — verified full flow (home → login → dashboard) in browser, no console errors
