"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronLeft, ChevronRight, ExternalLink, LogOut, Menu, Search, X } from "lucide-react";
import { adminNavItems, staffNavItems, type DashboardNavItem } from "./navConfig";

export type { DashboardNavItem };

function NavLinksList({ navItems, pathname, collapsed = false, onNavigate }: { navItems: DashboardNavItem[]; pathname: string; collapsed?: boolean; onNavigate: () => void }) {
  return <nav className="flex flex-1 flex-col gap-1.5 px-3" aria-label="Dashboard navigation">{navItems.map(item => {
    const active = pathname === item.href || (item.href !== "/admin" && item.href !== "/staff-portal" && pathname.startsWith(`${item.href}/`));
    const Icon = item.icon;
    return <Link key={item.href} href={item.href} onClick={onNavigate} title={collapsed ? item.label : undefined} className={`group relative flex items-center rounded-2xl py-2.5 transition duration-200 ${collapsed ? "justify-center px-2" : "gap-3 px-3"} ${active ? "bg-hola-yellow text-hola-brown shadow-lg shadow-black/10" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>
      {active && <motion.span layoutId={collapsed ? "desktop-active-collapsed" : "dashboard-active"} className="absolute -left-1 h-6 w-1 rounded-full bg-hola-blue" />}
      <Icon className="h-4.5 w-4.5 shrink-0" />{!collapsed && <span className="text-sm font-medium">{item.label}</span>}
    </Link>;
  })}</nav>;
}

export default function DashboardShell({ title, variant, userName, children }: { title: string; variant: "admin" | "staff"; userName?: string | null; children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navItems = variant === "admin" ? adminNavItems : staffNavItems;
  const current = navItems.find(item => pathname === item.href || (item.href !== "/admin" && item.href !== "/staff-portal" && pathname.startsWith(`${item.href}/`))) ?? navItems[0];
  const initials = (userName || "HOLA Admin").split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();

  return <div className="flex min-h-screen bg-[#f7f3ec]">
    <motion.aside animate={{ width: collapsed ? 88 : 272 }} transition={{ duration: .25 }} className="sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden bg-hola-brown text-white shadow-2xl lg:flex">
      <div className={`flex h-20 items-center ${collapsed ? "justify-center" : "gap-3 px-5"}`}><Image src="/images/hola-logo.png" alt="HOLA Coffee" width={44} height={44} className="h-11 w-11 rounded-2xl bg-white p-0.5" />{!collapsed && <div className="min-w-0"><p className="truncate font-display text-lg">{title}</p><p className="text-[10px] uppercase tracking-[.18em] text-hola-yellow">Operations center</p></div>}</div>
      <div className="mb-3 h-px bg-white/10" />
      <NavLinksList navItems={navItems} pathname={pathname} collapsed={collapsed} onNavigate={() => undefined} />
      <div className="border-t border-white/10 p-3">{!collapsed && <div className="mb-2 flex items-center gap-3 rounded-2xl bg-white/[.07] p-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hola-blue font-display text-xs">{initials}</span><div className="min-w-0"><p className="truncate text-sm font-semibold">{userName || "Administrator"}</p><p className="text-[10px] uppercase tracking-wider text-white/45">{variant}</p></div></div>}<button type="button" onClick={() => signOut({ callbackUrl: "/" })} title={collapsed ? "Sign out" : undefined} className={`flex w-full items-center rounded-2xl py-2.5 text-sm text-white/70 transition hover:bg-red-400/15 hover:text-red-200 ${collapsed ? "justify-center" : "gap-3 px-3"}`}><LogOut className="h-4 w-4" />{!collapsed && "Sign out"}</button></div>
      <button type="button" onClick={() => setCollapsed(value => !value)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="absolute right-2 top-24 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-lg transition hover:bg-white hover:text-hola-brown">{collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}</button>
    </motion.aside>

    <div className="min-w-0 flex flex-1 flex-col">
      <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-hola-brown/[.07] bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8"><div className="flex items-center gap-3"><button type="button" onClick={() => setMobileOpen(true)} aria-label="Open navigation" className="rounded-full bg-hola-beige p-2.5 text-hola-brown lg:hidden"><Menu className="h-5 w-5" /></button><div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-hola-blue-dark">{variant === "admin" ? "Admin workspace" : "Staff workspace"}</p><h1 className="font-display text-xl text-hola-brown">{current.label}</h1></div></div><div className="flex items-center gap-2"><Link href="/" target="_blank" className="hidden items-center gap-2 rounded-full bg-hola-beige px-4 py-2.5 text-xs font-semibold text-hola-brown transition hover:bg-hola-yellow-soft sm:flex">View website <ExternalLink className="h-3.5 w-3.5" /></Link><Link href={variant === "admin" ? "/admin/customers" : "/staff-portal/orders"} aria-label={variant === "admin" ? "Search customers" : "Search orders"} className="flex h-10 w-10 items-center justify-center rounded-full bg-hola-beige text-hola-brown transition hover:bg-hola-yellow-soft"><Search className="h-4 w-4" /></Link><Link href={variant === "admin" ? "/admin/messages" : "/staff-portal/messages"} aria-label="Open messages" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-hola-beige text-hola-brown transition hover:bg-hola-yellow-soft"><Bell className="h-4 w-4" /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" /></Link><span className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-hola-blue font-display text-xs text-white">{initials}</span></div></header>

      <AnimatePresence>{mobileOpen && <motion.div className="fixed inset-0 z-[200] flex lg:hidden" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button type="button" aria-label="Close navigation" className="absolute inset-0 bg-hola-brown/55 backdrop-blur-sm" onClick={() => setMobileOpen(false)} /><motion.aside initial={{x:-300}} animate={{x:0}} exit={{x:-300}} transition={{type:"spring",damping:28,stiffness:280}} className="relative flex w-[min(86vw,310px)] flex-col bg-hola-brown text-white shadow-2xl"><div className="flex h-20 items-center justify-between px-5"><div className="flex items-center gap-3"><Image src="/images/hola-logo.png" alt="HOLA Coffee" width={42} height={42} className="h-10 w-10 rounded-2xl bg-white p-0.5" /><span className="font-display text-lg">{title}</span></div><button type="button" onClick={() => setMobileOpen(false)} aria-label="Close navigation" className="rounded-full bg-white/10 p-2"><X className="h-5 w-5" /></button></div><NavLinksList navItems={navItems} pathname={pathname} onNavigate={() => setMobileOpen(false)} /><div className="border-t border-white/10 p-4"><p className="mb-3 truncate text-xs text-white/50">Signed in as {userName}</p><button type="button" onClick={() => signOut({callbackUrl:"/"})} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10"><LogOut className="h-4 w-4" /> Sign out</button></div></motion.aside></motion.div>}</AnimatePresence>

      <main className="flex-1 px-4 py-7 sm:px-6 lg:px-8 lg:py-9"><motion.div key={pathname} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.3}} className="mx-auto max-w-[1500px]">{children}</motion.div></main>
    </div>
  </div>;
}
