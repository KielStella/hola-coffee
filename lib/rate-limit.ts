import { headers } from "next/headers";

/**
 * A minimal in-memory sliding-window rate limiter for server actions.
 *
 * This is intentionally dependency-free and good enough for a single
 * low-to-medium traffic deployment. It is NOT shared across serverless
 * function instances — on Vercel, under real concurrent load, each cold
 * instance gets its own counter. For a distributed limiter that works
 * correctly across all instances, swap this for Upstash Redis's
 * `@upstash/ratelimit` (a few lines to wire in — same call signature works
 * well as a drop-in replacement for `checkRateLimit`).
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

// Periodically forget old buckets so this Map doesn't grow forever on a
// long-lived instance.
setInterval(
  () => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  },
  5 * 60 * 1000
).unref?.();

export class RateLimitError extends Error {
  constructor(message = "Too many requests. Please try again in a moment.") {
    super(message);
    this.name = "RateLimitError";
  }
}

/** Best-effort caller identifier: the client IP from Vercel's forwarded header, falling back to a shared bucket. */
export async function getClientIdentifier(): Promise<string> {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown"
  );
}

/**
 * Throws RateLimitError if `key` has been hit more than `limit` times within
 * `windowMs`. Call this at the top of a server action, e.g.:
 *
 *   await checkRateLimit(`contact:${await getClientIdentifier()}`, 5, 60_000);
 */
export async function checkRateLimit(key: string, limit: number, windowMs: number): Promise<void> {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (bucket.count >= limit) {
    throw new RateLimitError();
  }

  bucket.count += 1;
}
