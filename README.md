# HOLA Coffee — Website (Prompt 1A + 1B + 1C)

Brewing Happiness One Cup at a Time.

This is the customer-facing frontend for HOLA Coffee, built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## What's included (Prompt 1A scope)

- Brand system: colors, typography (Baloo 2 display / Inter body), rounded design language
- Sticky navbar with shrink-on-scroll, left/right nav with captions, global search
- Homepage: hero, Why Choose HOLA, Customer Favorites, Rewards preview
- Our Story page: mission, vision, philosophy, animated timeline
- Staff page: team cards
- Contact Us page: validated form (frontend only), business info, map embed
- Footer, custom 404, robots.txt, sitemap.xml, JSON-LD structured data
- Framer Motion animations: fades, slides, floating beans/bubbles, card lift, navbar shrink, scroll-triggered reveals
- Accessible: skip link, focus-visible states, semantic headings, ARIA labels, reduced-motion support

## What's included (Prompt 1B scope)

- Full **Menu** page (`/menu`) — 6 sticky category tabs (Coffee, Iced Coffee, Non Coffee, Frappes, Pastries, Desserts), ~19 products with NEW / BEST SELLER / SOLD OUT tags (NEW always sorts first; SOLD OUT dims the image and disables ordering)
- **Product details modal** — image, description, ingredients, required HOLA Size (Small/Medium/Large, price-adjusted), required Sweetness Preference, optional Special Instructions, quantity stepper, live total, Add to Order / Continue Shopping
- **Global cart** (`lib/cart-context.tsx`) — floating cart button (top-right on desktop, bottom-right FAB on mobile) with live item count, slide-in cart drawer showing every item's size/sweetness/instructions/quantity/subtotal, quantity +/-, remove, empty-cart state, and the required Self Pickup Only notice
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

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Notes for future prompts

- No backend, auth, database, or admin/staff dashboards are implemented yet — those arrive in Prompt 2. The cart, QR order, order status, and loyalty/rewards pages all currently run on in-memory React state (`lib/cart-context.tsx`, `lib/loyalty-context.tsx`), so orders and redemptions reset on a full page reload — this is expected and will be wired to persistent storage in Prompt 2.
- Product, staff, and reward "photos" currently use brand-styled icon illustrations (no real photography was supplied yet). Swap them for real photos in `lib/data.ts` / `lib/menu-data.ts` and the relevant components once available.
- Social icons (`components/SocialIcons.tsx`) are generic glyphs, not brand assets.
- This build uses self-hosted `@fontsource` packages for Baloo 2 / Inter rather than `next/font/google`, since it was created in a sandboxed environment without access to Google Fonts. Both approaches work fine on Vercel; feel free to switch to `next/font/google` if preferred.
- QR codes are generated client-side with `react-qr-code` and encode the order number/total/item count as a JSON payload — Prompt 2's QR Scanner will need to parse this same shape (or a superset of it) against the database.

