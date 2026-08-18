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

## 2026-08-17 — Demo user renamed to Yash Nigam
- Did: swapped the placeholder "Jordan Lee" for "Yash Nigam" — mock seed data and the real Postgres demo user (direct UPDATE, same as the earlier account/transaction seeding)
- Tech: no new deps
- Issues: none — browser-verified name shows correctly everywhere (header, avatar initials, greeting), build clean

## 2026-08-17 — Demo credentials in README + Loans/Cards on dashboard
- Did: added demo login (demo@yashbank.com / password123) prominently to the root README so anyone cloning the repo can try it without setup friction. Added a "Your Loans" section (Car Loan — approved, 80% paid/20% due with a progress bar, approved date; Home Loan — pending, applied date, full principal awaiting disbursal) and a "Your Cards" section (debit + credit card, credit card shows outstanding/limit utilization, both show recent card-tagged activity) to the Dashboard
- Tech: new presentational data (data/customerProfile.ts) + two new components (LoanCard, IssuedCardTile) — not wired to a backend table yet, this is demo/display data giving future agent features (loan eligibility, spend analysis) something concrete to reason over
- Issues: none — browser-verified full dashboard render, no console errors, build clean

## 2026-08-17 — Dashboard was too blank: 4 account types, ₹1 crore, 56 transactions, INR everywhere
- Did: dashboard only had 2 near-empty accounts and ~20 transactions. Added RD and FD as real account types (new shared accountTypeMeta helper, dedupes label/icon logic that was copy-pasted across AccountCard/Transfer/Transactions/Profile), gave the demo user 4 accounts summing to exactly ₹1,00,00,000 (Checking ₹8.5L, Savings ₹22L, RD ₹15L, FD ₹54.5L), and wrote 56 realistic transactions (salary credits, rent, Swiggy/Zomato/BigBasket/Amazon.in-style spends, utility bills, interest credits, RD/FD transfers) across ~90 days. Also fixed a real inconsistency: the banking app displayed balances in USD/$ while the rest of the site is themed in Indian Rupees — switched formatCurrency to INR/en-IN (correct lakh/crore grouping) everywhere, including the Go backend's default signup currency
- Tech: applied to both the frontend mock data (mocks/seed.ts, used when VITE_USE_MOCK=true) AND the real Postgres demo user (VITE_USE_MOCK=false is what's actually running) — enriched the live database directly via a generated SQL script (3 new accounts + 56 transactions, wrapped in one transaction) since there's no API for backdating historical data
- Issues: none — verified account totals sum to exactly ₹1,00,00,000 and transaction count is 56 via direct DB query, browser-verified dashboard/transactions/transfer/profile all render correctly with proper Indian currency formatting, no console errors, build clean. Rationale: richer, more realistic account data gives future agent features (budgeting, loan eligibility) real signal to reason over instead of a near-empty demo account

## 2026-08-16 — Policies link added to navbar
- Did: Policies page was only reachable from the footer — added it to the top navbar next to Accounts/Cards/Loans
- Tech: no new deps
- Issues: none — browser-verified nav link, build clean

## 2026-08-16 — Policies & Documents page (official-looking bank docs)
- Did: built a real `/policies` page — 6 documents (Terms & Conditions/Cardholder Agreement/Loan Agreement Terms + Required Documents, for each of Accounts/Cards/Loans), rendered with an actual official-document look: letterhead, doc number/effective date/version metadata block, numbered clauses, page footer with disclaimer, working Print button (window.print()). Original content written in formal banking-document style, not copied from any real bank. Linked from the footer's Legal column
- Tech: new data/policies.ts (structured content, shared by index + detail pages), new PolicyDocumentView component, no new deps. Content isn't wired into the agent's RAG pipeline yet (Phase 3 still needs Chroma + find_policy tool) but is now in good shape to source from when that's built
- Issues: none — browser-verified index page, both document layouts (paragraph clauses + bulleted requirements), invalid-slug fallback, footer link, login regression, build clean

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

## 2026-08-17 — Personal Assistant chat mode (real account data, login-gated)
- Did: added a second chatbot mode. The chat widget now has a "Bank Assistant" / "My Account" toggle — Bank Assistant is the existing product/nav/ticket bot unchanged; My Account is a new Personal Assistant with four tools over the logged-in user's real data: account/balance summary, spending insights (by month and/or category, incl. "which month did I spend the most"), natural-language transaction search (keyword/amount/month/direction), and interest-earned summary (savings/RD/FD deposits only — loan interest and credit-card dues are out of scope for now, since that data only exists as frontend mock data, not in the backend). Personal mode requires login at three layers: the widget shows a locked state with a login link when logged out, each tool independently refuses without a valid token, and the real security boundary is the Go backend's existing JWT middleware, which agent-service never bypasses (it forwards the user's own bearer token, doesn't re-verify it). Also hit and fixed a pre-existing, unrelated breakage: Groq had deprecated `llama-3.3-70b-versatile` since this project was last run, 502-ing every chat request (bank and personal alike) — swapped the default model to `openai/gpt-oss-120b`
- Tech: new `agent-service/app/agent/backend_client.py` (httpx calls to the Go backend, forwarding the bearer token), `tools_personal.py` (4 tools + month-parsing/category-synonym helpers), `tools.py` renamed to `tools_bank.py`; `graph.py` now builds two separate compiled LangGraph graphs (own system prompt + tool list each) sharing one SQLite checkpointer but separate thread IDs (`session_id:mode`) so switching tabs never mixes conversation context; `/chat` gained a `mode` field and forwards the `Authorization` header through `config.configurable`. Frontend: `ChatWidget.tsx` keeps per-mode message history and quick actions, `chat.ts` attaches the stored JWT when present
- Issues: none — curl-verified personal-mode tool calls return exact figures matching direct DB queries (₹1,00,00,000 total balance, ₹1,22,650 interest, June 2026 as highest-spend month at ₹1,56,248, Amazon.in search), verified the no-token/401 paths return a clean login prompt instead of fabricating data or crashing; browser-verified (Playwright, since `chromium-cli` wasn't available in this environment) the full flow — login, both modes' quick actions and replies, mode-switch not bleeding context, and the logged-out locked state — zero console errors, `tsc --noEmit` clean

## 2026-08-17 — Removed mock-data mode entirely
- Did: the mock/real split (`VITE_USE_MOCK`) turned out to actively cause bugs rather than help — the Personal Assistant kept saying "not logged in" for an actually-logged-in user because mock mode issues a fake local token that the real Go backend correctly rejects, and the mismatch wasn't obvious from the UI. Since the seeded demo account (demo@yashbank.com) is already realistic enough to demo every feature, removed the mock system outright instead of patching around the confusion: deleted `frontend/src/mocks/` (the localStorage-backed fake backend + seed data) and all `USE_MOCK` branching in `api/client.ts`, `api/auth.ts`, `api/accounts.ts`, `api/transactions.ts`. The frontend now always talks to the real backend; all three services (Postgres, `backend/`, `frontend/`) must be running to log in. Also added a 401 response interceptor (clears the stored session and redirects to `/login`) so an invalid/expired token fails cleanly instead of silently breaking pages — the same failure mode that caused this bug and an earlier stale-localStorage bug both stemmed from sessions that looked "logged in" but weren't actually valid
- Tech: no new deps; net deletion (`mocks/store.ts`, `mocks/seed.ts` removed; `getAccounts`/`getTransactions`/`transfer` lost their now-unused `userId` params since the real API infers the user from the JWT). `AuthContext.tsx` reverted to a plain persisted-session (the seed-version reseed hack from the previous entry was mock-specific and no longer applies). Updated `VITE_USE_MOCK` references out of README.md, CLAUDE.md, frontend/README.md, `.env`/`.env.example`
- Issues: none — `tsc --noEmit` and lint clean, browser-verified (Playwright) login, dashboard, transactions, transfer, profile, and the Personal Assistant all working against the real backend with no mock fallback, zero console errors

## 2026-08-17 — Chat replies rendering raw markdown (`**bold**`, `- bullets`) as literal text
- Did: once the Personal Assistant started returning real, longer replies, the LLM's markdown formatting (bold figures, bullet lists) showed up as literal asterisks and dashes in the chat bubble instead of being rendered — the bubble was always plain `whitespace-pre-wrap` text, never a markdown renderer. Also caught a real truncation: a transaction-search reply cut off mid-line, traced to the LLM's `max_tokens=512` being too tight for personal-mode replies that can include up to 15 formatted transaction rows
- Tech: added `react-markdown` (no HTML injection risk — doesn't render raw HTML by default) with compact custom component overrides (tight paragraph/list spacing to fit a chat bubble) for assistant messages only; user-typed messages stay plain text. Bumped `agent-service`'s `ChatGroq` `max_tokens` 512 → 1024
- Issues: none — browser-verified (Playwright) bold/list replies now render as real `<strong>`/`<ul><li>` elements with no literal `**`/`-` leaking through, longer transaction-search replies no longer truncate, zero console errors, `tsc --noEmit` clean

## 2026-08-18 — Personal Assistant couldn't answer questions combining bank products + real data
- Did: user flagged that "which card is best for my account" and "can I take an education loan" while in My Account mode got refused ("I can't provide card recommendations") and pushed to the Bank Assistant tab — bad UX, since a user doesn't think in terms of which mode they're in. Fix wasn't to merge the two modes (would blur the login-gated boundary) — added the same accounts/cards/loans product facts to `PERSONAL_SYSTEM_PROMPT` as reference context (not new tools), so it can call its existing data tools (e.g. get_spending_insights) and reason over the real numbers against product facts (e.g. actual annual spend vs. a card's fee-waiver threshold) in one answer. No loan-eligibility tool exists, so loan questions get honest product facts + a pointer to /loans rather than a fabricated approval. Bank Assistant mode is unchanged (still product-only, no login required). Also caught mid-verification: the model's card-comparison reply used a markdown table, which the chat bubble can't render (no GFM plugin installed, narrow width wouldn't fit one anyway) — added a "never use tables" formatting rule to both prompts before it shipped
- Tech: prompt-only change (`agent-service/app/agent/prompts.py`) — no new tools, no new deps
- Issues: none — curl- and browser-verified both original failing questions now give real, reasoned answers (card recommendation correctly checked against actual ~₹4L annual spend from get_spending_insights; loan question gives honest rate/tenure facts, no fabricated eligibility), no markdown tables in output, zero console errors
