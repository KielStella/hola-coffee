<<<<<<< HEAD
# HOLA Coffee — Website (Prompt 1A + 1B + 1C)

Brewing Happiness One Cup at a Time.

This is the customer-facing frontend for HOLA Coffee, built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.
=======
# HOLA Coffee — Website (Prompt 1A + 1B + 1C + Prompt 2)

Brewing Happiness One Cup at a Time.

A full café ordering & loyalty platform built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Prisma, PostgreSQL, and Auth.js.
>>>>>>> c71a751 (Initial commit)

## What's included (Prompt 1A scope)

- Brand system: colors, typography (Baloo 2 display / Inter body), rounded design language
- Sticky navbar with shrink-on-scroll, left/right nav with captions, global search
- Homepage: hero, Why Choose HOLA, Customer Favorites, Rewards preview
- Our Story page: mission, vision, philosophy, animated timeline
- Staff page: team cards
<<<<<<< HEAD
- Contact Us page: validated form (frontend only), business info, map embed
=======
- Contact Us page: validated form, business info, map embed
>>>>>>> c71a751 (Initial commit)
- Footer, custom 404, robots.txt, sitemap.xml, JSON-LD structured data
- Framer Motion animations: fades, slides, floating beans/bubbles, card lift, navbar shrink, scroll-triggered reveals
- Accessible: skip link, focus-visible states, semantic headings, ARIA labels, reduced-motion support

## What's included (Prompt 1B scope)

- Full **Menu** page (`/menu`) — 6 sticky category tabs (Coffee, Iced Coffee, Non Coffee, Frappes, Pastries, Desserts), ~19 products with NEW / BEST SELLER / SOLD OUT tags (NEW always sorts first; SOLD OUT dims the image and disables ordering)
- **Product details modal** — image, description, ingredients, required HOLA Size (Small/Medium/Large, price-adjusted), required Sweetness Preference, optional Special Instructions, quantity stepper, live total, Add to Order / Continue Shopping
- **Global cart** (`lib/cart-context.tsx`) — floating cart button (top-right on desktop, bottom-right FAB on mobile) with live item count, slide-in cart drawer showing every item's size/sweetness/instructions/quantity/subtotal, quantity +/-, remove, empty-cart state, and the required Self Pickup Only notice
<<<<<<< HEAD
- **QR order flow** (`/order/qr`) — "Generate QR Order" snapshots the cart into an order ticket with a real scannable QR code, order number, date/time, itemized products, estimated total, self-pickup reminder, and Download QR (SVG) / Save QR (PNG) actions. This QR is a frontend-only order ticket, not a payment system.
- **Order status tracking** (`/order/status`) — read-only progress bar across Pending → Confirmed → Preparing → Ready for Pickup → Completed, plus estimated wait time and order summary
- Global search now indexes the full menu catalog, not just homepage highlights
- Micro-animations throughout: cart drawer slide-in, modal fade/slide, card lift, button hover, ripple-style scale on cart badge

## What's included (Prompt 1C scope)

- **Full HOLA Rewards dashboard** (`/rewards`) — animated circular points indicator, Current Tier / Points / Rewards Redeemed / Orders Completed stat cards, "Next Reward" progress bar with points-needed counter, category filter tabs (Coffee, Non Coffee, Pastries, Desserts, Merchandise, Limited Edition), 14 reward items with Popular/Limited badges
- **Redeem flow** — confirmation modal (reward details, current/required/remaining points), confetti celebration on successful redemption, then a **Reward QR preview** (`/rewards/qr`) with a real scannable QR, a live 30-minute expiration countdown, and an expired state
- **Reward History** (`/rewards/history`) and **Points History** (`/rewards/points`) pages, both frontend-only with seeded demo data and proper empty states
- **Homepage additions**: Promotions section, Testimonials (with star ratings), Instagram-style Gallery with lightbox preview, FAQ accordion, and a Newsletter signup — all with scroll-triggered animation and empty states; Gallery/Testimonials also demonstrate loading skeletons (`components/Skeleton.tsx`)
- Loyalty state lives in `lib/loyalty-context.tsx` (frontend-only, seeded with a demo customer at 245 points) — ready to swap for real backend calls in Prompt 2
- Search index now includes the full 14-item rewards catalog
=======
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
- Credentials provider (bcrypt-hashed passwords) + Google, Facebook, and Apple OAuth, with automatic account linking by email
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
>>>>>>> c71a751 (Initial commit)

## Getting started

```bash
<<<<<<< HEAD
npm install
npm run dev
```

Visit http://localhost:3000.

## Production build
=======
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
>>>>>>> c71a751 (Initial commit)

```bash
npm run build
npm run start
```

<<<<<<< HEAD
## Notes for future prompts

- No backend, auth, database, or admin/staff dashboards are implemented yet — those arrive in Prompt 2. The cart, QR order, order status, and loyalty/rewards pages all currently run on in-memory React state (`lib/cart-context.tsx`, `lib/loyalty-context.tsx`), so orders and redemptions reset on a full page reload — this is expected and will be wired to persistent storage in Prompt 2.
- Product, staff, and reward "photos" currently use brand-styled icon illustrations (no real photography was supplied yet). Swap them for real photos in `lib/data.ts` / `lib/menu-data.ts` and the relevant components once available.
- Social icons (`components/SocialIcons.tsx`) are generic glyphs, not brand assets.
- This build uses self-hosted `@fontsource` packages for Baloo 2 / Inter rather than `next/font/google`, since it was created in a sandboxed environment without access to Google Fonts. Both approaches work fine on Vercel; feel free to switch to `next/font/google` if preferred.
- QR codes are generated client-side with `react-qr-code` and encode the order number/total/item count as a JSON payload — Prompt 2's QR Scanner will need to parse this same shape (or a superset of it) against the database.
=======
On Vercel: set the environment variables from `.env.example`, then Vercel will run `npm install` (triggering `prisma generate`) and `npm run build` automatically. Run `npx prisma migrate deploy` once against your production database (Neon, Supabase, or Vercel Postgres all work) before or during your first deploy, then `npm run db:seed` if you want the demo data.

## ⚠️ Important: how this backend was verified (please read)

This project was built inside a sandboxed environment whose network policy blocks `binaries.prisma.sh` — the CDN Prisma's CLI needs to download its query/schema-engine binary from on `npm install`/`prisma generate`. I confirmed this is specifically an egress-policy block in that sandbox (not a Prisma or code issue) and tried several workarounds (different Prisma versions, WASM/driver-adapter modes, env var overrides) — none could reach that host from there.

Practically, this meant I could not run `prisma generate` or a full `npm run build` against the real Prisma Client in that environment. To still verify correctness without that piece, I:

1. **Hand-translated the schema into raw SQL and ran it against a real local PostgreSQL instance**, confirming all 19 tables, enums, indexes, and foreign keys are valid — including round-tripping real data through Order → OrderItem and Reward → RewardRedemption to confirm relations and cascade deletes work exactly as modeled.
2. **Ran ESLint across the entire codebase** (clean) and fixed a real bug it caught (a component being redefined on every render in the dashboard shell).
3. **Manually reviewed every server action** for the business rules above (points timing, server-side price recomputation, RBAC guards).

What I could **not** do in that environment is get a green `npm run build` against the real generated Prisma Client — every Prisma-touching file will show TypeScript errors there for that reason alone. **This resolves itself automatically the moment you run `npm install` somewhere with normal internet access** (your machine, CI, or Vercel) — the `postinstall` script runs `prisma generate`, and everything type-checks normally from there. If you hit any actual code issues after that (as opposed to this generation gap), they're genuine bugs — please flag them and I'll fix them directly.

## Notes & next steps

- Product, staff, and reward "photos" use brand-styled icon illustrations (no real photography was supplied). Swap them in `lib/menu-data.ts` / `lib/rewards-data.ts` and the relevant Prisma-seeded rows once you have real photos, and wire up actual image uploads (UploadThing or Vercel Blob — env vars are stubbed in `.env.example`) for the admin CRUD screens.
- OAuth (Google/Facebook/Apple) and Gmail SMTP are fully coded but need real credentials in `.env` to function — until then, sign-in falls back to email/password and outgoing email calls simply log a warning instead of throwing.
- This build uses self-hosted `@fontsource` packages for Baloo 2 / Inter rather than `next/font/google` (sandbox couldn't reach Google Fonts). Both work fine on Vercel.
- Deeper admin features from the original spec that are intentionally left for a follow-up pass: CSV exports under Reports, a dedicated visual editor for Our Story/Gallery/Promotions content (currently editable directly via the Reward/Menu-style CRUD pattern would need to be extended, or via Prisma Studio: `npm run db:studio`), and PWA install/offline support.
- `middleware.ts` intentionally matches `/admin/:path*`, `/staff-portal/:path*`, and `/account/:path*` only — the public marketing pages from Prompts 1A–1C are untouched and remain fully public.
>>>>>>> c71a751 (Initial commit)

