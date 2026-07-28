"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartButton() {
  const { itemCount, openDrawer } = useCart();

  return (
    <button
      onClick={openDrawer}
      aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      className="hola-shadow fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-hola-blue text-white transition hover:scale-105 hover:bg-hola-blue-dark active:scale-95 sm:bottom-auto sm:right-6 sm:top-24 sm:h-16 sm:w-16"
    >
      <ShoppingBag className="h-6 w-6" />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-hola-yellow text-xs font-bold text-hola-brown shadow"
          >
            {itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
