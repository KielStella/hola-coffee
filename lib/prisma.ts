import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * "Error { kind: Closed, cause: None }" happens when the underlying
 * database connection was closed out from under the client — most often
 * because a local/dev Postgres server restarted, a serverless provider
 * (Neon/Supabase) recycled an idle pooled connection, or the machine woke
 * from sleep while `next dev` kept a stale client alive across a Fast
 * Refresh. Prisma doesn't automatically retry these, so a single query
 * fails even though the very next one would succeed once the client
 * reconnects. We wrap every query to transparently retry once when this
 * specific class of error is hit.
 */
function isConnectionClosedError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.message.includes("kind: Closed") ||
    error.message.includes("Server has closed the connection") ||
    error.message.includes("Connection reset by peer")
  );
}

function createPrismaClient() {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  return client.$extends({
    query: {
      async $allOperations({ model, operation, args, query }) {
        try {
          return await query(args);
        } catch (error) {
          if (!isConnectionClosedError(error)) throw error;
          console.warn(
            `[prisma] connection was closed — retrying ${model ?? "raw"}.${operation} once…`
          );
          return await query(args);
        }
      },
    },
  });
}

export const prisma = globalForPrisma.prisma ?? (createPrismaClient() as unknown as PrismaClient);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
