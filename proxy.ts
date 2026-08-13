import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

const PUBLIC_ROUTES = new Set([
  "/login",
  "/signup",
  "/forgot-password",
  "/privacy-policy",
  "/terms-and-conditions",
  "/unauthorized",
]);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const role = req.auth?.user?.role;
  const isPublicRoute =
    PUBLIC_ROUTES.has(nextUrl.pathname) || nextUrl.pathname.startsWith("/reset-password/");

  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", `${nextUrl.pathname}${nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isStaffRoute = nextUrl.pathname.startsWith("/staff-portal");

  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  if (isStaffRoute && role !== "STAFF" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // Run for website routes, but leave APIs and static assets untouched.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
