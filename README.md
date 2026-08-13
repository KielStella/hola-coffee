# HOLA Coffee — Website (Prompt 1A + 1B + 1C + Prompt 2)

Brewing Happiness One Cup at a Time.

A full café ordering & loyalty platform built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Prisma, PostgreSQL, and Auth.js.

## What's included (this update — fixes & new features)

**⚠️ Action required if you already have this running: run `npx prisma migrate dev` to pick up `prisma/migrations/0003_order_source_walkin` (adds the walk-in order feature's `source` field — existing orders safely default to `QR`, nothing is lost).**

**Fixed**
- **Sign up now redirects to Home** (was landing on `/account`) — session is fully established via credentials sign-in before the redirect fires.
- **Apple sign-in completely removed** — auth options are now Google and Facebook only, with matching official brand-mark icons, identical size/position/spacing on both buttons (`components/auth/BrandIcons.tsx`, `SocialLoginButtons.tsx`). Removed from `auth.ts`, `.env.example`, and docs.
- **Revenue calculations previously counted cancelled orders** — admin dashboard "Revenue" now correctly excludes `CANCELLED` orders everywhere.
- Replaced `alert()` for admin-generated temporary passwords with a proper on-brand modal (`TempPasswordModal.tsx`) — same underlying secure logic (bcrypt-hashed, shown once), just a better interface.

**New**
- **Contact form autofill** — signed-in users get name/email/phone pre-filled from their account (still fully editable); logged-out visitors see empty fields as before. (`actions/profile.ts`)
- **Philippine phone number formatting** — a fixed, non-editable "+63" prefix with exactly-10-digit validation, used consistently on the account Profile form and the Contact form (`components/PhilippinePhoneInput.tsx`, `philippinePhoneSchema` in `lib/validations/auth.ts`).
- **Profile picture upload** — customers can now upload/replace their own avatar (PNG/JPG/JPEG, 5MB limit) on `/account`, reusing the existing Vercel Blob upload system rather than adding a second image service. Non-admins can only upload/delete their *own* avatar — content images (menu/rewards/staff/gallery) remain admin-only.
- **Walk-in orders** — Admin and Staff can now ring up an in-person order (`/admin/walk-in`, `/staff-portal/walk-in`) using the exact same product catalog and price-computation logic as QR orders. Every order now has a `source: QR | WALK_IN` field (new migration, existing orders safely default to `QR` — nothing is lost), shown as a badge everywhere orders are listed.
- **Dashboard period filters** — Admin dashboard "Sales" is now filterable by Weekly/Monthly/Yearly (bucketed chart), and "Revenue" by Today/This Week/This Month/This Year, both computed from real date-range queries against the database (`lib/dashboard-analytics.ts`), not just relabeled frontend text.
- **Walk-In vs QR analytics** — the dashboard's Revenue section now breaks down Total/QR/Walk-In orders and revenue for the selected period.

## What's included (Prompt 1A scope)

- Brand system: colors, typography (Baloo 2 display / Inter body), rounded design language
- Sticky navbar with shrink-on-scroll, left/right nav with captions, global search
- Homepage: hero, Why Choose HOLA, Customer Favorites, Rewards preview
- Our Story page: mission, vision, philosophy, animated timeline
- Staff page: team cards
- Contact Us page: validated form, business info, map embed
- Footer, custom 404, robots.txt, sitemap.xml, JSON-LD structured data
- Framer Motion animations: fades, slides, floating beans/bubbles, card lift, navbar shrink, scroll-triggered reveals
- Accessible: skip link, focus-visible states, semantic headings, ARIA labels, reduced-motion support

## What's included (Prompt 1B scope)

- Full **Menu** page (`/menu`) — 6 sticky category tabs (Coffee, Iced Coffee, Non Coffee, Frappes, Pastries, Desserts), ~19 products with NEW / BEST SELLER / SOLD OUT tags (NEW always sorts first; SOLD OUT dims the image and disables ordering)
- **Product details modal** — image, description, ingredients, required HOLA Size (Small/Medium/Large, price-adjusted), required Sweetness Preference, optional Special Instructions, quantity stepper, live total, Add to Order / Continue Shopping
- **Global cart** (`lib/cart-context.tsx`) — floating cart button (top-right on desktop, bottom-right FAB on mobile) with live item count, slide-in cart drawer showing every item's size/sweetness/instructions/quantity/subtotal, quantity +/-, remove, empty-cart state, and the required Self Pickup Only notice
- **QR order flow** (`/order/qr`) — "Generate QR Order" now creates a real `Order` row (see Prompt 2 below) and displays a scannable QR encoding its token, order number, date/time, itemized products, estimated total, self-pickup reminder, and Download QR (SVG) / Save QR (PNG) actions
- **Order status tracking** (`/order/status`) — progress bar across Pending → Confirmed → Preparing → Ready for Pickup → Completed
- Global search indexes the full menu catalog
- Micro-animations throughout: cart drawer slide-in, modal fade/slide, card lift, button hover

## What's included (Prompt 1C scope)

- **Full HOLA Rewards dashboard** (`/rewards`) — animated circular points indicator, Current Tier / Points / Rewards Redeemed / Orders Completed stat cards, "Next Reward" progress bar, category filter tabs, 14 reward items with Popular/Limited badges
- **Redeem flow** — confirmation modal → confetti → **Reward QR preview** (`/rewards/qr`) now backed by a real `RewardRedemption` row (see Prompt 2) with a live 30-minute expiration countdown
- **Reward History** (`/rewards/history`) and **Points History** (`/rewards/points`) pages with proper empty states
- **Homepage additions**: Promotions, Testimonials, Instagram-style Gallery with lightbox, FAQ accordion, Newsletter signup — with scroll animation, empty states, and loading skeletons
- Search index includes the full rewards catalog

## What's included (Prompt 2 scope)

**Database & ORM**
- Full Prisma schema (`prisma/schema.prisma`) — 19 tables: `User`/`Account`/`Session`/`VerificationToken`/`PasswordResetToken` (auth), `Category`/`Product` (menu), `Order`/`OrderItem` (ordering), `Reward`/`RewardRedemption`/`PointsHistory` (loyalty), `Promotion`/`Testimonial`/`Gallery`/`Newsletter`/`Settings` (content), `ContactMessage`/`ActivityLog` (ops)
- Hand-written baseline migration (`prisma/migrations/0001_init/migration.sql`) — see the note below on how this was verified
- Seed script (`prisma/seed.ts`) — admin/staff/customer demo accounts, full menu, rewards, testimonials, gallery, promotions, a sample completed order, and a sample contact message

**Authentication (Auth.js v5)**
- Credentials provider (bcrypt-hashed passwords) + Google and Facebook OAuth, with automatic account linking by email
- `auth.config.ts` (Edge-safe, used by middleware) + `auth.ts` (full config with the Prisma adapter, used by route handlers/server components) — this split is required because Next.js middleware runs on the Edge runtime, which can't load Prisma Client or bcrypt
- Sign up, sign in, forgot/reset password (emailed token, 1-hour expiry), update profile, sign out
- Role-based middleware protecting `/admin`, `/staff-portal`, and `/account`

**Roles**
- **Admin** (`/admin`): dashboard with live stats + weekly sales / popular drinks charts, Orders, QR Scanner, Menu CRUD, Rewards CRUD, Staff CRUD, Customers (search/deactivate/reset password), Contact Messages (read/reply/archive/delete), Activity Log, Website Settings
- **Staff** (`/staff-portal` — intentionally not `/staff`, since that URL is already your public "Meet the Team" page): dashboard, active orders queue, QR Scanner, Contact Messages (no permanent delete)
- **Customer** (`/account`): profile editing, points/tier, recent orders, recent reward redemptions

**QR Scanner**
- Real camera-based scanner (`html5-qrcode`) shared by Admin and Staff. A single scan is resolved server-side as either an Order or a Reward Redemption, then shows the matching action buttons (advance order status / approve or cancel a redemption)

**Business logic**
- Order prices are always recomputed server-side from the live product catalog — client-submitted prices are never trusted
- Loyalty points are awarded **only** when staff marks an order "Completed" (never earlier), per your spec
- Reward points are **reserved** at redemption time but only actually **deducted** when staff approves the scanned Reward QR — also per your spec
- Every admin/staff action writes an `ActivityLog` entry
- Contact form now saves to the database and emails both the customer (confirmation) and the business (notification) via Gmail SMTP

## What's included (Prompt 3 scope)

**Production hardening**
- Security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), `X-Powered-By` disabled
- Rate limiting on sign-up, password reset, contact form, newsletter, order creation, and reward redemption (`lib/rate-limit.ts` — dependency-free in-memory limiter, documented upgrade path to Upstash Redis for real multi-instance deployments)
- Hardened Prisma client with automatic retry on `Error { kind: Closed }` (dropped connections)
- Route-level (`app/error.tsx`) and root-level (`app/global-error.tsx`) error boundaries, on-brand rather than a raw stack trace
- Loading skeletons on every data-heavy dashboard route

**PWA basics**
- Installable web app manifest (`app/manifest.ts`) with real icons generated from your logo
- A deliberately minimal service worker (`public/sw.js`) that only provides an offline fallback page — no full-app caching, to avoid stale-content bugs

**Reports & image uploads**
- `/admin/reports` — CSV export for Orders, Customers, Reward Redemptions, Messages, and Sales
- Real image uploads via Vercel Blob (`actions/upload.ts`, `components/dashboard/ImageUploadField.tsx`) wired into the Menu and Rewards admin forms — validates file type/size, deletes the old image on replacement

**Deployment**
- See `DEPLOYMENT.md` for a full step-by-step Vercel deployment guide

## ⚠️ Critical bugs found and fixed while building Prompt 3

Working through "production-ready" surfaced that **the public Menu and Rewards pages were still reading from static demo files, completely disconnected from the database** — meaning the admin CRUD panels (add/edit/delete products and rewards) had no effect on what customers actually saw, and placing a real order or redeeming a real reward would have failed, because:

1. **Product/reward IDs didn't match.** The static demo catalog used ids like `"spanish-latte"`; real database rows use generated ids like `"cm3x...`". `createOrder`/`redeemReward` look products up by database id, so every real order or redemption would have failed with "unavailable."
2. **Size/sweetness values didn't match the database enum.** The cart stored `"Medium"` / `"Original"` (display strings); the database and `createOrder`'s validation expect `"MEDIUM"` / `"ORIGINAL"` (the Prisma enum values). Every real order submission would have failed Zod validation.

Both are now fixed at the root: `/menu` and `/rewards` fetch real `Product`/`Reward` rows from the database (Server Components, with the static files kept only as a graceful fallback if the database is unreachable or empty), and size/sweetness/tag values use the Prisma enum values as the single source of truth everywhere, with small `formatSize()`/`formatSweetness()`/`formatTag()` helpers used only for display text. Also added real-image support (`ProductArt`/`RewardArt` now show an uploaded photo when set, falling back to the icon illustration otherwise) so the new image upload feature actually has somewhere to show up.

**If you're testing this locally:** these pages now depend on your database actually being seeded (`npm run db:seed`) to show real content — before that, or if the connection fails, they'll show the same generic fallback content as before.

## Recent fixes (Prompt 2 follow-up)

- **⚠️ Action required: new migration.** Fixed a modeling gap where `PointsHistory.orderId` was a loose string instead of a real Prisma relation to `Order` (needed for the account page's real order-linked points history). Run `npx prisma migrate dev` to pick up `prisma/migrations/0002_points_history_order_relation`.
- **Fixed a site-wide crash**: `AuthSessionProvider` was nested *inside* `LoyaltyProvider` in the root layout, but `LoyaltyProvider` calls `useSession()` — which throws if there's no `<SessionProvider>` ancestor. Every single page was affected. Fixed by reordering the providers in `app/layout.tsx` (`AuthSessionProvider` now wraps everything). Caught this by actually running the dev server and requesting pages, not just linting — a good reminder that `next build` alone doesn't catch every issue.
- **New sign-ups now correctly start at 0 points**, not the demo "245 points" placeholder. `lib/loyalty-context.tsx` now fetches the real balance via `actions/loyalty.ts#getMyLoyaltySummary()` for any signed-in user; the 245-point demo data only ever shows to signed-out guests browsing the Rewards page.
- **Menu product images are now clickable** (both on `/menu` and the homepage's Customer Favorites section) — they open the same product details modal / link to the menu as the existing "View Details" button, not just the button itself.
- **Hardened the Prisma client against `Error { kind: Closed, cause: None }`** — this happens when a hosted Postgres provider (or a restarted local dev database) closes an idle connection out from under Prisma. `lib/prisma.ts` now wraps every query with a client extension that transparently retries once on this specific error class. See `.env.example` for connection-pooling guidance that avoids it happening in the first place.
- **Added Privacy Policy and Terms & Conditions pages** (`/privacy-policy`, `/terms-and-conditions`), linked from the footer on every page and from the sign-up form.
- **Cleaned up the HOLA logo's corner radius** — switched from a fixed rem-based radius to a proportional `rounded-[22%]` treatment everywhere the square logo mark appears (Hero, Footer, Auth pages, Dashboard sidebar), so it looks crisp and consistent at every size instead of a fixed radius that looked disproportionate on some.

## Getting started

```bash
npm install          # also runs `prisma generate` via postinstall
cp .env.example .env # fill in your DATABASE_URL at minimum
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Visit http://localhost:3000. Seeded logins (from `npm run db:seed`):

| Role     | Email                    | Password       |
|----------|--------------------------|-----------------|
| Admin    | admin@holacoffee.ph      | Admin123!       |
| Staff    | staff@holacoffee.ph      | Staff123!       |
| Customer | customer@example.com     | Customer123!    |

## Production build & deploy

```bash
npm run build
npm run start
```

**See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full step-by-step Vercel deployment guide** (database setup, environment variables, image uploads, OAuth, email, post-deploy checklist, troubleshooting).

## Folder structure

```
app/                  Next.js App Router pages & layouts
  admin/               Admin dashboard (role-gated)
  staff-portal/         Staff dashboard (role-gated; not /staff — that's the public team page)
  account/             Customer account dashboard (auth-gated)
  api/                 Route handlers (NextAuth, CSV export, cron)
  (public pages)       Home, Menu, Rewards, Our Story, Staff, Contact, legal pages, auth pages
actions/               Server actions ("use server") — one file per domain
components/
  dashboard/            Shared admin/staff dashboard UI (sidebar shell, managers, charts)
  menu/, rewards/, cart/, auth/, scanner/, legal/, home/
  (top-level)           Navbar, Footer, and other site-wide components
lib/                    Prisma client, validation schemas, contexts, rate limiting, email, RBAC
prisma/
  schema.prisma          Source of truth for the data model
  migrations/           Sequential SQL migrations
  seed.ts                Demo data
public/                 Static assets, PWA icons, service worker
types/                  Ambient type augmentation (next-auth.d.ts)
middleware.ts            Edge-safe RBAC route protection
auth.ts / auth.config.ts Auth.js config (split for Edge-runtime compatibility — see comments)
```

## Admin, Staff, and Ordering guides

- **Admin** (`/admin`): manage the menu (with image upload), rewards catalog, staff accounts, customer accounts, contact messages, view the activity log, export CSV reports, and edit site-wide settings (business info, loyalty point values, SEO).
- **Staff** (`/staff-portal`): view and advance active orders, scan Order/Reward QR codes at `/staff-portal/scanner`, and handle contact messages (without permanent-delete access — that's admin-only).
- **QR ordering**: a customer builds a cart on `/menu`, generates an order, and gets a QR code encoding a secure order token. Staff scan it at `/admin/scanner` or `/staff-portal/scanner`, which looks the order up and shows action buttons to advance its status. Loyalty points are awarded only when an order is marked **Completed** — never earlier.
- **Rewards**: a customer redeems a reward (points are reserved, not yet deducted) and gets a Reward QR valid for 30 minutes. Staff scan it and click **Approve** — that's the only point where points are actually deducted from the customer's balance.

## ⚠️ Important: how this backend was verified (please read)

This project was built inside a sandboxed environment whose network policy blocks `binaries.prisma.sh` — the CDN Prisma's CLI needs to download its query/schema-engine binary from on `npm install`/`prisma generate`. I confirmed this is specifically an egress-policy block in that sandbox (not a Prisma or code issue) and tried several workarounds (different Prisma versions, WASM/driver-adapter modes, env var overrides) — none could reach that host from there.

Practically, this meant I could not run `prisma generate` or a full `npm run build` against the real Prisma Client in that environment. To still verify correctness without that piece, I:

1. **Hand-translated the schema into raw SQL and ran it against a real local PostgreSQL instance**, confirming all 19 tables, enums, indexes, and foreign keys are valid — including round-tripping real data through Order → OrderItem and Reward → RewardRedemption to confirm relations and cascade deletes work exactly as modeled.
2. **Ran ESLint across the entire codebase** (clean) and fixed a real bug it caught (a component being redefined on every render in the dashboard shell).
3. **Manually reviewed every server action** for the business rules above (points timing, server-side price recomputation, RBAC guards).

What I could **not** do in that environment is get a green `npm run build` against the real generated Prisma Client — every Prisma-touching file will show TypeScript errors there for that reason alone. **This resolves itself automatically the moment you run `npm install` somewhere with normal internet access** (your machine, CI, or Vercel) — the `postinstall` script runs `prisma generate`, and everything type-checks normally from there. If you hit any actual code issues after that (as opposed to this generation gap), they're genuine bugs — please flag them and I'll fix them directly.

## Notes & next steps

- Product, staff, and reward "photos" use brand-styled icon illustrations (no real photography was supplied). Swap them in `lib/menu-data.ts` / `lib/rewards-data.ts` and the relevant Prisma-seeded rows once you have real photos, and wire up actual image uploads (UploadThing or Vercel Blob — env vars are stubbed in `.env.example`) for the admin CRUD screens.
- OAuth (Google/Facebook) and Gmail SMTP are fully coded but need real credentials in `.env` to function — until then, sign-in falls back to email/password and outgoing email calls simply log a warning instead of throwing.
- This build uses self-hosted `@fontsource` packages for Baloo 2 / Inter rather than `next/font/google` (sandbox couldn't reach Google Fonts). Both work fine on Vercel.
- Deeper admin features from the original spec that are intentionally left for a follow-up pass: CSV exports under Reports, a dedicated visual editor for Our Story/Gallery/Promotions content (currently editable directly via the Reward/Menu-style CRUD pattern would need to be extended, or via Prisma Studio: `npm run db:studio`), and PWA install/offline support.
- `middleware.ts` intentionally matches `/admin/:path*`, `/staff-portal/:path*`, and `/account/:path*` only — the public marketing pages from Prompts 1A–1C are untouched and remain fully public.

