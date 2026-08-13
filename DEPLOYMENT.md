# Deploying HOLA Coffee to Vercel

## 1. Database

Create a Postgres database with one of:

- **[Neon](https://neon.tech)** (recommended — generous free tier, native Vercel integration)
- **[Supabase](https://supabase.com)**
- **Vercel Postgres** (via the Vercel dashboard → Storage tab)

Copy the connection string. If your provider gives you both a **pooled** and a **direct** connection string (Neon and Supabase both do), use the pooled one for `DATABASE_URL` and the direct one for `DIRECT_URL` — Prisma uses `DIRECT_URL` specifically for running migrations.

## 2. Import the project into Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New → Project**, import the repo. Framework preset auto-detects as Next.js — no changes needed.
3. Don't deploy yet — add environment variables first (next step).

## 3. Environment variables

In the Vercel project's **Settings → Environment Variables**, add everything from `.env.example`:

| Variable | Required? | Notes |
|---|---|---|
| `DATABASE_URL` | ✅ | Pooled connection string |
| `DIRECT_URL` | ✅ | Direct (non-pooled) connection string |
| `AUTH_SECRET` | ✅ | `openssl rand -base64 32` |
| `AUTH_URL` | ✅ | Your production URL, e.g. `https://holacoffee.ph` |
| `NEXT_PUBLIC_APP_URL` | ✅ | Same as `AUTH_URL` |
| `GOOGLE_CLIENT_ID` / `_SECRET` | Optional | Skip to disable Google sign-in |
| `FACEBOOK_CLIENT_ID` / `_SECRET` | Optional | Skip to disable Facebook sign-in |
| `BLOB_READ_WRITE_TOKEN` | Recommended | Vercel Blob — see step 5 |

Set each variable for **Production**, **Preview**, and **Development** environments as appropriate (typically the same DB for Preview/Production is fine for a small deployment, but consider a separate branch database on Neon for Preview deployments if you want isolation).

## 4. First deploy

Click **Deploy**. Vercel runs `npm install` (which triggers `prisma generate` via the `postinstall` script) and `npm run build`.

Once it's live, run the database migration and seed from your local machine (pointed at the production `DATABASE_URL`/`DIRECT_URL`):

```bash
npx prisma migrate deploy
npm run db:seed   # optional — only if you want the demo accounts/menu/rewards
```

## 5. Image uploads (Vercel Blob)

1. In the Vercel dashboard: **Storage → Create Database → Blob**.
2. Connect it to this project — Vercel automatically adds `BLOB_READ_WRITE_TOKEN` to your environment variables.
3. Redeploy (or it picks up on the next deploy) — the admin Menu/Rewards image upload fields will start working.

Without this token, image uploads show a friendly "not configured yet" message rather than crashing — everything else works fine.

## 6. OAuth providers (optional)

Only needed if you want Google/Facebook sign-in in addition to email/password:

- **Google**: [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → OAuth Client ID → authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
- **Facebook**: [Meta for Developers](https://developers.facebook.com/) → redirect URI: `https://yourdomain.com/api/auth/callback/facebook`

## 7. Email

Email sending is disabled by default in this repository. The project includes email templates, but SMTP is not configured by default. If you need email sending in production, implement SMTP credentials and a secure provider; otherwise, contact-related actions are logged instead of being sent.

## 8. Post-deploy checklist

- [ ] Visit `/` — confirm the homepage loads with real menu/rewards data (not the fallback content — check the browser console for `[menu] failed to load products from database` or `[rewards] failed to load rewards from database` warnings, which would mean the DB connection isn't working)
- [ ] Sign up a test account at `/signup`, confirm it starts at 0 points
- [ ] Log in as the seeded admin (`admin@holacoffee.ph`) at `/admin`, confirm the dashboard loads
- [ ] Log in as the seeded staff (`staff@holacoffee.ph`) at `/staff-portal`
- [ ] Place a test order through `/menu` → cart → Generate QR Order, confirm it appears in `/admin/orders`
- [ ] Test the QR scanner at `/admin/scanner` (needs HTTPS + camera permission — works automatically on your `*.vercel.app` domain)
- [ ] Submit the contact form, confirm it appears in `/admin/messages` and (if SMTP is configured) arrives by email
- [ ] **Change the seeded demo account passwords or delete them** before using this in production

## Troubleshooting

**`Error { kind: Closed, cause: None }`** — the app automatically retries once (see `lib/prisma.ts`). If it persists, double-check you're using your provider's **pooled** connection string for `DATABASE_URL`, and add `&pgbouncer=true` (Neon) or use the `?pgbouncer=true` Supabase connection string.

**Menu/Rewards pages show generic content instead of your real data** — check the Vercel deployment logs for `[menu] failed to load products from database` or `[rewards] failed to load rewards from database`. This means `DATABASE_URL` is misconfigured or migrations haven't been run yet.

**Build fails on Prisma** — make sure `DATABASE_URL` is set as an environment variable in Vercel *before* the first deploy; `prisma generate` (run via `postinstall`) needs it to be present, even though it doesn't connect to the database at build time.
