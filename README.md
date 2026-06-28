# Finrise — Interactive Candlestick Course Platform

A course-selling platform that delivers a **premium, login-gated learning experience**. The
flagship product is an interactive candlestick-pattern course where candles form as living,
tick-by-tick price action — drawn entirely in HTML5 canvas, with no chart library and no
market-data feed. The platform also sells PDFs, videos, and bundles from one admin panel.

> Built from the Finrise Requirements Document. **Phase 1 (Platform core) is complete.**

---

## Tech stack

| Concern   | Choice |
|-----------|--------|
| Framework | Next.js 14 (App Router) + React 18 + TypeScript |
| UI        | Tailwind CSS + **shadcn/ui** (Radix primitives), Light · Gold & Blue theme |
| Routing   | Single app, **host-based subdomains** (admin./courses./apex) via middleware |
| Charts    | Pure HTML5 canvas + `requestAnimationFrame` (no library, no market data) |
| Database  | **MySQL** via `mysql2/promise` (pooled, async) |
| Auth      | `bcryptjs` password hashes + signed httpOnly JWT cookie (`jose`) |
| Gamify    | XP + levels, daily streaks, badges, leaderboard (all in MySQL) |
| Sound/FX  | Web Audio (synthesized, no asset files) + CSS/canvas animation |
| Payments  | Razorpay (order + webhook signature verification) — Phase 2, wired & stubbed |
| Email     | SMTP via `nodemailer` — Phase 2 |

### Note on the database
The whole data layer is async and isolated behind `src/lib/db.ts` — the only surface the
rest of the app touches is `query()`, `queryOne()`, and `execute()`. Configure the connection
in `.env.local` with either `MYSQL_URL` or the discrete `MYSQL_HOST` / `MYSQL_PORT` /
`MYSQL_USER` / `MYSQL_PASSWORD` / `MYSQL_DATABASE` vars. The schema (including the gamification
tables) is created automatically on first request — you only need to create an **empty
database**; the app builds the tables.

---

## Getting started

```bash
npm install
# 1. Create an empty MySQL database, e.g.:  CREATE DATABASE finnora;
# 2. Put the connection details in .env.local (see .env.example)
npm run dev          # http://localhost:3000
```

On first request the app auto-creates all tables, the **admin account**, the flagship
candlestick course (30 pattern lessons), and a sample PDF product.

### Default admin login
```
email:    admin@tryfinrise.com
password: admin1234
```
(Configure via `.env.local` — see `.env.example`. Change these before going live.)

### Build / production
```bash
npm run build
npm start
```

### Subdomains (admin / courses / marketing)
One Next app serves all three via host-based middleware rewrites:

| Host | Serves |
|------|--------|
| `tryfinrise.com` | marketing landing + `/pages` (advertising) |
| `admin.tryfinrise.com` | the admin panel (`/admin/*`) |
| `courses.tryfinrise.com` | the student app (dashboard, course, etc.) |

**Local dev** — Next supports subdomains on localhost, so just visit:
`http://admin.localhost:3000`, `http://courses.localhost:3000`, `http://localhost:3000`.

**Production** — point a wildcard DNS record (`*.tryfinrise.com`) at the deployment, and
set `COOKIE_DOMAIN=.tryfinrise.com` in the environment so the login session is shared across
subdomains. Without it, login would not carry from `admin.` to `courses.`.

---

## What's included (Phase 1)

- **Auth** — email/password login, hashed passwords, JWT cookie sessions, route protection
  via `src/middleware.ts` (`/library`, `/courses`, `/admin`, `/download`).
- **Flexible product model** — `course | pdf | video | bundle`, entitlements decide who owns
  what, bundles expand to their children.
- **Admin panel** (`/admin`) — create/edit/delete products, upload protected files, create
  users, grant/revoke access, view orders & revenue.
- **The flagship course** (`/courses/candlestick-mastery`):
  - **Animated Pattern Player** — living candles (synthetic intrabar path that touches the true
    high/low and ends on the close), a **bull-vs-bear pressure meter**, draw-in **annotations**,
    pattern-in-context with **reveal outcome**, playback (play/pause, 0.5×/1×/2×, scrub),
    confirm **glow + particle burst**, optional sound, hi-DPI responsive canvas.
  - **The Candle Sculptor** — drag O/H/L/C sliders; the app classifies the candle live.
  - **30 candlestick patterns** across four families (from *The Complete Candlestick Guide
    for Forex & Gold*): single-candle (Doji family, Hammer/Hanging Man, Inverted Hammer/
    Shooting Star, Marubozu, Spinning Top), two-candle (Engulfing, Tweezers, Piercing/Dark
    Cloud, Harami), three-candle (Morning/Evening Star, Three Soldiers/Crows, Three Inside
    Up/Down, Abandoned Baby), and continuation (Rising/Falling Three Methods, Mat Hold,
    Separating Lines).
- **Protected downloads** — streamed only to entitled users; path-traversal-safe; no public URLs.
- **Per-user lesson progress.**
- **Gamified learning layer** (`/dashboard`):
  - **XP + levels** — +50 XP per lesson (first completion), gentle quadratic level curve,
    animated XP bar and circular level ring.
  - **Daily streaks** — animated SVG flame, longest-streak tracking, daily-goal dots.
  - **Badges** — 9 unlockable achievements (first lesson, 3/5/8/20 lessons, streak 3/7,
    level 5, daily goal) with unlock animations.
  - **Leaderboard** — students ranked by XP, your row highlighted.
  - **Celebration on completion** — confetti, XP count-up, level-up banner, badge reveal,
    and synthesized **sound effects** (toggle in the nav, persisted; respects
    `prefers-reduced-motion`).

## Phase 2 (wired, awaiting keys)
`POST /api/checkout` creates a Razorpay order; `POST /api/webhook/razorpay` verifies the
signature, auto-provisions the buyer (account + entitlement), and emails credentials. Both
return gracefully until you add keys to `.env.local`. A public sales/landing funnel comes later.

---

## Project structure

```
src/
  middleware.ts                 protect /library, /courses, /admin, /download
  app/
    page.tsx                    landing (light, by design)
    login/                      auth UI
    dashboard/                  gamified hub (level, XP, streak, badges, leaderboard)
    library/                    buyer's owned items
    courses/[course]/           course overview (progress bar, XP hints)
      [lesson]/                 Animated Pattern Player + reward celebration
      sculptor/                 the Candle Sculptor
    download/[product]/         protected file stream (ownership check)
    admin/                      products, users & access, orders
    api/checkout, api/webhook/razorpay
    actions/                    server actions (auth, admin, progress+rewards)
  components/chart/             PatternPlayer, CandleSculptor
  components/game/              XPBar, LevelRing, StreakFlame, BadgeGrid,
                                Leaderboard, Confetti, RewardOverlay, SoundToggle
  lib/                          db (mysql2), auth, session, entitlements, products,
                                orders, progress, gamification, sound, email,
                                razorpay, candleMath, classify
  data/patterns.ts              hand-authored candle data + callouts
  data/badges.ts                badge catalog
storage/                        uploaded files (protected, never public)
```

## Adding content
- **New pattern lesson:** add an entry to `src/data/patterns.ts` and its key to `PATTERN_ORDER`;
  it seeds as a lesson on next run.
- **New sellable product:** Admin → Products → New product (set type; upload a file for pdf/video).
