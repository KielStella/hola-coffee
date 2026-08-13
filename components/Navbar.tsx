"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { primaryNavLinksLeft, primaryNavLinksRight, type NavLink } from "@/lib/data";
import SearchOverlay from "./SearchOverlay";
import AccountMenu from "./auth/AccountMenu";

function NavItem({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      className="group relative px-1 py-2 font-display text-sm tracking-wide text-hola-brown transition hover:text-hola-blue-dark sm:text-base"
    >
      {link.label}
      <span className="pointer-events-none absolute left-1/2 top-full z-10 w-52 -translate-x-1/2 translate-y-1 rounded-hola-sm bg-hola-brown px-3 py-2 text-center text-xs font-body font-normal text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100">
        {link.caption}
      </span>
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-hola-blue transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-hola-beige/80 bg-white/90 py-2 shadow-md backdrop-blur-md"
            : "border-transparent bg-white/70 py-4 backdrop-blur-sm"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto grid max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8"
        >
          <div className="hidden items-center gap-6 lg:col-start-1 lg:flex">
            {primaryNavLinksLeft.map((link) => (
              <NavItem key={link.href} link={link} />
            ))}
          </div>

          <Link
            href="/"
            aria-label="HOLA Coffee — go to homepage"
            className="col-start-2 flex shrink-0 items-center justify-self-center"
          >
            <motion.div animate={{ scale: scrolled ? 0.9 : 1 }} transition={{ duration: 0.25 }}>
              <Image
                src="/images/hola-logo-nav.png"
                alt="HOLA Coffee"
                width={773}
                height={678}
                priority
                className="h-9 w-auto sm:h-10 lg:h-11"
              />
            </motion.div>
          </Link>

          <div className="hidden items-center justify-self-end gap-6 lg:col-start-3 lg:flex">
            {primaryNavLinksRight.map((link) => (
              <NavItem key={link.href} link={link} />
            ))}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              title="Quickly search drinks, food, rewards, or pages"
              className="rounded-full bg-hola-beige p-2.5 text-hola-brown transition hover:bg-hola-yellow-soft"
            >
              <Search className="h-5 w-5" />
            </button>
            <AccountMenu />
          </div>

          <div className="col-start-3 flex items-center justify-self-end gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="rounded-full bg-hola-beige p-2.5 text-hola-brown"
            >
              <Search className="h-5 w-5" />
            </button>
            <AccountMenu />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="rounded-full bg-hola-beige p-2.5 text-hola-brown"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-hola-beige bg-white lg:hidden"
          >
            <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-4">
              {[...primaryNavLinksLeft, ...primaryNavLinksRight].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-hola-sm px-3 py-3 font-display text-hola-brown transition hover:bg-hola-beige"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
