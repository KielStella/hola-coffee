"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, X, LogOut } from "lucide-react";
import { adminNavItems, staffNavItems, type DashboardNavItem } from "./navConfig";

export type { DashboardNavItem };

function NavLinksList({
  navItems,
  pathname,
  onNavigate,
}: {
  navItems: DashboardNavItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {navItems.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-hola-sm px-3 py-2.5 text-sm font-medium transition ${
              active ? "bg-hola-blue text-white" : "text-hola-beige/85 hover:bg-white/10"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardShell({
  title,
  variant,
  userName,
  children,
}: {
  title: string;
  variant: "admin" | "staff";
  userName?: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = variant === "admin" ? adminNavItems : staffNavItems;

  return (
    <div className="flex min-h-screen bg-hola-beige">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-hola-brown text-white lg:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <Image src="/images/hola-logo.png" alt="HOLA Coffee" width={36} height={36} className="h-9 w-9 rounded-hola-sm" />
          <span className="font-display text-lg">{title}</span>
        </div>
        <NavLinksList navItems={navItems} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        <div className="border-t border-white/10 p-4">
          {userName && <p className="truncate px-3 text-xs text-white/60">Signed in as {userName}</p>}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-2 flex w-full items-center gap-2 rounded-hola-sm px-3 py-2.5 text-sm text-hola-beige/85 transition hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-hola-brown/10 bg-white px-4 py-3 lg:hidden">
          <span className="font-display text-lg text-hola-brown">{title}</span>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-full bg-hola-beige p-2 text-hola-brown"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {mobileOpen && (
          <div className="fixed inset-0 z-200 flex lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="relative flex w-72 flex-col bg-hola-brown text-white">
              <div className="flex items-center justify-between px-5 py-5">
                <span className="font-display text-lg">{title}</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <NavLinksList navItems={navItems} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
              <div className="border-t border-white/10 p-4">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center gap-2 rounded-hola-sm px-3 py-2.5 text-sm text-hola-beige/85 transition hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
