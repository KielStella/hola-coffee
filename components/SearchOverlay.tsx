"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { searchIndex } from "@/lib/data";

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [prevOpen, setPrevOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setQuery("");
  }

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-start justify-center bg-hola-brown/50 px-4 pt-24 backdrop-blur-sm sm:pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
        >
          <motion.div
            className="hola-shadow w-full max-w-xl overflow-hidden rounded-hola-lg bg-white"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-hola-beige px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-hola-blue-dark" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search drinks, food, rewards, or pages…"
                aria-label="Search HOLA Coffee"
                className="w-full bg-transparent text-base text-hola-brown outline-none placeholder:text-hola-brown-soft/70"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-1.5 text-hola-brown-soft transition hover:bg-hola-beige"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto px-2 py-2">
              {query.trim() && results.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <p className="font-display text-lg text-hola-brown">We couldn&apos;t find what you&apos;re looking for.</p>
                  <p className="mt-1 text-sm text-hola-brown-soft">Try a different keyword.</p>
                </div>
              )}
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between gap-3 rounded-hola-sm px-4 py-3 transition hover:bg-hola-beige"
                >
                  <span>
                    <span className="block font-display text-hola-brown">{item.title}</span>
                    <span className="block text-sm text-hola-brown-soft">{item.description}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-hola-blue/10 px-3 py-1 text-xs font-semibold text-hola-blue-dark">
                    {item.type}
                  </span>
                </Link>
              ))}
              {!query.trim() && (
                <p className="px-4 py-8 text-center text-sm text-hola-brown-soft">
                  Start typing to search pages, menu items, rewards, and staff.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
