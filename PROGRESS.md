# Progress Log

Short, dated entries. What we did, tech touched, issues. One-liners, no essays.
Append new entries at the bottom, in the order they actually happened — do not insert
out of sequence.

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

## 2026-08-16 — Backend built + wired to frontend
- Did: full Go backend (signup/login/profile, accounts, transactions, transfer) verified via curl (happy path + error cases: duplicate email, wrong password, insufficient funds, missing auth) and via browser through the real UI; reset DB and reseeded the demo login (demo@yashbank.com) so it works in both mock and real-backend mode; frontend flipped to `VITE_USE_MOCK=false`
- Tech: Go, Gin, GORM, Postgres 16 (Docker), golang-jwt, bcrypt
- Issues: hit a disk-full crash mid-build yesterday (see prior entry) — resolved once free space came back; host already had native Postgres 18 on 5432, backend Postgres container uses 5433 instead

## 2026-08-16 — Auth pages redesigned
- Did: login/signup were a bare floating card on empty gray with a tiny logo — felt like a generic template, not part of the site. Rebuilt as a branded split-screen page: site header/footer, dark benefits panel + balance-card visual on the left, form on the right
- Tech: same stack, no new deps; browser + curl regression check confirmed login still works end to end
- Issues: none

## 2026-08-16 — Fixed: home page unreachable once logged in
- Did: sidebar logo linked to /dashboard (redundant with the Dashboard nav item) so there was no in-app link back to the public home page; also the header/hero still showed Login/Open Account while already signed in. Sidebar logo now links to `/`, and the header + hero CTA are auth-aware (show "Go to Dashboard" when logged in)
- Tech: no new deps
- Issues: none — verified in browser (logo click reaches home, shows logged-in state)

## 2026-08-16 — Accounts, Cards, Loans marketing pages
- Did: built out the three inert header nav links into real pages — Accounts (Savings/Current/RD/FD with rates, benefits, requirements), Cards (Classic/Platinum debit, Rewards/Travel credit, with visual card mockups), Loans (Home/Car/Education with rates, benefits, requirements). Rates/terms are standard illustrative figures in normal banking style, not scraped from any real site
- Tech: two new shared components (ProductCard, PageBanner), no new deps
- Issues: none — browser-verified all three pages + nav links, no console errors

## 2026-08-16 — Real images, borders on all cards, trimmed nav
- Did: removed inert "The Bank" nav link; added borders to every card-like surface that was missing one (Home product cards, hero/auth balance-card visuals, card mockups on Cards page); added real photography (Unsplash, free/no API key, verified each URL resolves before using) — layered hero photo behind the balance card on Home, themed background photos on the Accounts/Cards/Loans banners, and a photo behind the auth-page dark panel
- Tech: new `lib/images.ts` with verified Unsplash CDN URLs; no API key/build step needed. Note: images are hotlinked from Unsplash's CDN, so they require internet access to load — acceptable for a demo, would self-host for production
- Issues: none — browser-verified all pages, login regression still passes, no console errors

## 2026-08-16 — Borders were too subtle, fixed
- Did: earlier border-white/10 pass was invisible on dark gradients (confirmed by screenshot) — bumped all card borders to border-2 with higher-contrast colors (slate-300 on white, white/25 on dark), and added a gold chip detail to all card-visual mockups (Cards page + balance-card graphics) for a more realistic, premium look closer to the IDFC FIRST reference
- Tech: no new deps
- Issues: none — browser-verified, login regression passes, build clean

## 2026-08-16 — Unified red border theme, cards side by side
- Did: unified every card border to a single theme maroon-500 red (was a mix of slate-gray and near-invisible white/25); rebuilt the Cards page so debit/credit cards sit side by side in a 2-column grid (visual on top, details below) instead of stacked full-width rows
- Tech: no new deps
- Issues: none — browser-verified, login regression passes, build clean

## 2026-08-16 — Product cards: solid red background, white text
- Did: white-card-with-red-border still read as flat/plain — converted Accounts/Loans (ProductCard) and the Cards page detail panels to solid maroon gradient backgrounds with white text, gold accents for rates/checkmarks, white CTA buttons. Scoped to the public marketing pages only — left the authenticated dashboard (Dashboard/Transactions/Transfer/Profile) as white panels since financial data readability matters more there and it wasn't part of the complaint
- Tech: no new deps
- Issues: none — browser-verified, login regression passes, build clean

## 2026-08-16 — Photo-textured card faces on Cards page
- Did: replaced the flat color gradients on the debit/credit card visuals with real photo textures (abstract wave, ink smoke, gold bars, earth at night) under a tinted brand-color overlay — same layering technique as the page banners. Picked images thematically: gold bars for Rewards, earth-at-night city lights for Travel
- Tech: 4 new verified Unsplash URLs added to lib/images.ts, no new deps
- Issues: none — browser-verified, login regression passes, build clean

## 2026-08-16 — Per-card detail/apply pages
- Did: added a dedicated page per card (`/cards/:slug`) — soft gradient hero, 2x2 perk-tile grid, full card visual, benefits, trust-signal strip, final CTA. Styled after IDFC FIRST's actual apply-flow page (linked by user), but deliberately did NOT replicate its real Aadhaar/PAN/OTP data-collection form — that's live PII collection, which conflicts with this project's own "KYC is simulated" scope decision and risks reading as a phishing template. Borrowed only the safe visual language (gradient bg, bold headline, perk tiles); "Apply now" routes to our existing real /signup flow instead
- Tech: extracted card data into `data/cards.ts` (shared by list + detail pages, added slug/headline/perks fields); Cards list tiles now link to detail pages instead of straight to signup
- Issues: none — browser-verified navigation, invalid slug redirects to /cards, login regression passes, build clean

## 2026-08-16 — Fixed auth-page redirect bug, expanded signup form
- Did: (bug) Login/Signup didn't redirect away when already authenticated — user could land back on the signup form while logged in; now both redirect to /dashboard if a session exists. (feature) expanded signup to collect phone, DOB, PAN, annual income, employment type — sectioned "Personal details" / "Financial details" like the IDFC reference, explicit "demo only, nothing verified" disclaimer. This is plain data entry (no OTP/live-verification step), giving future agent features (budgeting, loan eligibility, document verification) real structured data to work with
- Tech: extended User model + signup request/response on both frontend (types, mock store) and backend (Go struct + migration via AutoMigrate); backend restarted to pick up schema
- Issues: none — verified real-backend signup (curl-confirmed fields persisted correctly) and mock-mode signup both work, login/signup redirect confirmed, build clean

## 2026-08-16 — Phase 2: agent-service live (LangGraph + Groq chatbot)
- Did: built the actual AI layer — FastAPI + LangGraph StateGraph, one chatbot node, SQLite checkpointer for per-session memory (survives restarts), system prompt grounded in the site's real account/card/loan facts with an explicit guardrail against inventing real balance/transaction data. Added a floating chat widget to the React frontend, wired globally (every page), session id persisted in localStorage
- Tech: Python, FastAPI, LangGraph, langchain-groq (Llama 3.3 70B via Groq free tier), python-dotenv
- Issues: user's Groq key initially landed in the tracked `.env.example` instead of gitignored `.env` — moved it before anything got committed
- Status: verified live — real Groq replies, multi-turn memory confirmed (asked the assistant to recall a fact from 2 turns earlier, it did), guardrail confirmed (asked for "my balance", it correctly refused and pointed to /dashboard instead of inventing a number), no console/CORS errors, production build clean

## 2026-08-16 — Chatbot was answering off-topic questions, fixed
- Did: assistant was happily answering math, general knowledge, current events, personal questions — not scoped to banking at all. Added an explicit SCOPE instruction to the system prompt: decline off-topic questions in one line and redirect to banking, don't answer them first
- Tech: prompt-only change (agent-service/app/agent/prompts.py), no code/deps
- Issues: none — curl-tested 4 off-topic categories (math, science, personal, current events) all correctly declined, on-topic questions still answer normally, browser-verified too

## 2026-08-16 — Quick actions disappeared after one click; ticket tool fired too early
- Did: two real bugs from live use. (1) Quick-action chips vanished forever after the first click, so a user who clicked one by mistake (or just wanted a second topic) had no way back — moved them out of the scrolling message list into a persistent strip above the input, always visible for the whole conversation. (2) The support-ticket tool sometimes fired the instant someone said "I'd like to raise a support ticket," before the assistant had asked what the actual problem was — fixed with two layers: a stricter prompt instruction (ask first, don't call the tool with nothing to put in it) and a hard validation guard inside the tool itself that refuses to create a ticket if subject/description are too short/vague, regardless of what the model does
- Tech: no new deps
- Issues: none — curl-verified the two-turn ticket flow (vague intent → clarifying question → real details → ticket raised), off-topic/FAQ/status-lookup regressions all still pass, browser-verified chips persist and topic-switching works, build clean

## 2026-08-16 — Chat replies with numbered lists were rendering as one wall of text
- Did: user reported list-style replies (e.g. "list your accounts") coming back as one unbroken paragraph. Curl-verified the model's raw JSON reply already had proper `\n` line breaks — the bug was purely CSS: the message bubble had no `whitespace-pre-wrap`, so the browser's default whitespace collapsing ate every newline. One-class fix
- Tech: no new deps
- Issues: none — browser-verified a list-style reply now renders with real line breaks, build clean

## 2026-08-16 — Chat widget quick-action chips
- Did: opening the chat used to just show a text greeting with no hint of what the assistant could actually do. Added 5 clickable quick-action chips (icons + label) shown right after the greeting — explore accounts/cards/loans, raise a ticket, check ticket status. Clicking one sends that message immediately; chips disappear once the conversation starts so they don't clutter later turns
- Tech: refactored the send logic into a shared sendText() used by both the form submit and the chip clicks, no new deps
- Issues: none — browser-verified chips render, clicking sends + gets a real reply, chips vanish after first message, build clean

## 2026-08-16 — Chat widget maximize button + first real agent tool (support tickets)
- Did: chat window was too small to read comfortably — added a maximize/minimize toggle in the widget header (expands to most of the viewport, bigger text). Also gave the agent its first actual tool: raise_support_ticket and check_ticket_status, turning it from pure Q&A into a real tool-calling LangGraph agent (conditional edges + ToolNode, standard ReAct-style loop)
- Tech: langchain_core.tools + langgraph.prebuilt (ToolNode, tools_condition) — no new deps, both already came with langgraph/langchain-core; tickets stored in a local tickets.sqlite (stdlib sqlite3, gitignored)
- Issues: none — curl-verified a ticket gets raised with sensible subject/description extracted from a natural-language complaint, status lookup works, off-topic refusal and plain FAQ answers still work (no regression), browser-verified maximize + ticket flow, no console errors, build clean
