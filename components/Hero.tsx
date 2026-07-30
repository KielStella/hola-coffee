"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingDecor from "./FloatingDecor";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-hola-blue/15 via-hola-blue/5 to-hola-beige px-4 pb-24 pt-16 sm:pb-32 sm:pt-20">
      <FloatingDecor />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-2 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/hola-logo.png"
            alt="HOLA Coffee logo"
            width={160}
            height={160}
            priority
            className="h-28 w-28 drop-shadow-xl sm:h-36 sm:w-36 lg:h-40 lg:w-40"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-3xl text-4xl leading-tight text-hola-brown sm:text-5xl lg:text-6xl"
        >
          Brewing Happiness <span className="text-gradient-hola">One Cup</span> at a Time.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-base leading-relaxed text-hola-brown-soft sm:text-lg"
        >
          Freshly brewed coffee, handcrafted drinks, and cozy moments made for everyone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/menu"
            className="rounded-full bg-hola-blue px-8 py-3.5 font-display text-white shadow-lg shadow-hola-blue/30 transition hover:-translate-y-0.5 hover:bg-hola-blue-dark hover:shadow-xl active:translate-y-0"
          >
            View Menu
          </Link>
          <Link
            href="/contact"
            className="rounded-full border-2 border-hola-brown/15 bg-white px-8 py-3.5 font-display text-hola-brown shadow-md transition hover:-translate-y-0.5 hover:border-hola-yellow hover:shadow-xl active:translate-y-0"
          >
            Visit Us
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="relative mt-14 flex justify-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronDown className="h-7 w-7 text-hola-blue-dark/60" />
      </motion.div>
    </section>
  );
}
