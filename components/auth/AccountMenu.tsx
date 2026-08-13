"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, LayoutDashboard } from "lucide-react";

export default function AccountMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (status === "loading") {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-hola-beige" aria-hidden="true" />;
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-hola-beige p-2.5 text-hola-brown transition hover:bg-hola-yellow-soft"
        aria-label="Sign in"
        title="Sign in"
      >
        <User className="h-5 w-5" />
      </Link>
    );
  }

  const dashboardHref =
    session.user.role === "ADMIN" ? "/admin" : session.user.role === "STAFF" ? "/staff-portal" : "/account";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-hola-blue text-sm font-display text-white transition hover:bg-hola-blue-dark"
      >
        {session.user.name?.[0]?.toUpperCase() ?? <User className="h-4 w-4" />}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-hola-md bg-white py-2 shadow-xl ring-1 ring-hola-brown/10">
          <div className="border-b border-hola-beige px-4 py-2">
            <p className="truncate font-display text-sm text-hola-brown">{session.user.name}</p>
            <p className="truncate text-xs text-hola-brown-soft">{session.user.email}</p>
          </div>
          <Link
            href={dashboardHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-hola-brown transition hover:bg-hola-beige"
          >
            <LayoutDashboard className="h-4 w-4" />
            {session.user.role === "CUSTOMER" ? "My Account" : "Dashboard"}
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-hola-brown transition hover:bg-hola-beige"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
