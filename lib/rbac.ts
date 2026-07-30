import { auth } from "@/auth";
import type { Role } from "@prisma/client";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/** Throws if there's no active session. Returns the session otherwise. */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError("You must be signed in.");
  return session;
}

/** Throws unless the current user's role is one of `roles`. */
export async function requireRole(...roles: Role[]) {
  const session = await requireAuth();
  if (!roles.includes(session.user.role)) {
    throw new UnauthorizedError("You do not have permission to perform this action.");
  }
  return session;
}
