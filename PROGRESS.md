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

## 2026-08-16 — Product cards: solid red background, white text
- Did: white-card-with-red-border still read as flat/plain — converted Accounts/Loans (ProductCard) and the Cards page detail panels to solid maroon gradient backgrounds with white text, gold accents for rates/checkmarks, white CTA buttons. Scoped to the public marketing pages only — left the authenticated dashboard (Dashboard/Transactions/Transfer/Profile) as white panels since financial data readability matters more there and it wasn't part of the complaint
- Tech: no new deps
- Issues: none — browser-verified, login regression passes, build clean

## 2026-08-16 — Unified red border theme, cards side by side
- Did: unified every card border to a single theme maroon-500 red (was a mix of slate-gray and near-invisible white/25); rebuilt the Cards page so debit/credit cards sit side by side in a 2-column grid (visual on top, details below) instead of stacked full-width rows
- Tech: no new deps
- Issues: none — browser-verified, login regression passes, build clean

## 2026-08-16 — Borders were too subtle, fixed
- Did: earlier border-white/10 pass was invisible on dark gradients (confirmed by screenshot) — bumped all card borders to border-2 with higher-contrast colors (slate-300 on white, white/25 on dark), and added a gold chip detail to all card-visual mockups (Cards page + balance-card graphics) for a more realistic, premium look closer to the IDFC FIRST reference
- Tech: no new deps
- Issues: none — browser-verified, login regression passes, build clean

## 2026-08-16 — Real images, borders on all cards, trimmed nav
- Did: removed inert "The Bank" nav link; added borders to every card-like surface that was missing one (Home product cards, hero/auth balance-card visuals, card mockups on Cards page); added real photography (Unsplash, free/no API key, verified each URL resolves before using) — layered hero photo behind the balance card on Home, themed background photos on the Accounts/Cards/Loans banners, and a photo behind the auth-page dark panel
- Tech: new `lib/images.ts` with verified Unsplash CDN URLs; no API key/build step needed. Note: images are hotlinked from Unsplash's CDN, so they require internet access to load — acceptable for a demo, would self-host for production
- Issues: none — browser-verified all pages, login regression still passes, no console errors

## 2026-08-16 — Accounts, Cards, Loans marketing pages
- Did: built out the three inert header nav links into real pages — Accounts (Savings/Current/RD/FD with rates, benefits, requirements), Cards (Classic/Platinum debit, Rewards/Travel credit, with visual card mockups), Loans (Home/Car/Education with rates, benefits, requirements). Rates/terms are standard illustrative figures in normal banking style, not scraped from any real site
- Tech: two new shared components (ProductCard, PageBanner), no new deps
- Issues: none — browser-verified all three pages + nav links, no console errors

## 2026-08-16 — Fixed: home page unreachable once logged in
- Did: sidebar logo linked to /dashboard (redundant with the Dashboard nav item) so there was no in-app link back to the public home page; also the header/hero still showed Login/Open Account while already signed in. Sidebar logo now links to `/`, and the header + hero CTA are auth-aware (show "Go to Dashboard" when logged in)
- Tech: no new deps
- Issues: none — verified in browser (logo click reaches home, shows logged-in state)

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
