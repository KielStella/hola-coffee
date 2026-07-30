import { Role } from ".prisma/client/default.js";
import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe subset of the Auth.js config. Next.js middleware runs on the
 * Edge runtime, which can't load the Prisma Client or bcrypt (both need
 * Node APIs) — so this file must stay free of those imports. The full
 * config (with the Prisma adapter and Credentials provider) lives in
 * `auth.ts` and is only ever used from Node-runtime route handlers and
 * server components.
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role!;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as Role;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
};
