import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const role = req.auth?.user?.role;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isStaffRoute = nextUrl.pathname.startsWith("/staff-portal");

  if (isAdminRoute && (!isAuthenticated || role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  if (isStaffRoute && (!isAuthenticated || (role !== "STAFF" && role !== "ADMIN"))) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  if (nextUrl.pathname.startsWith("/account") && !isAuthenticated) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/staff-portal/:path*", "/account/:path*"],
};
