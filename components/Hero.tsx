"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Clock3, MapPin, Sparkles, Star } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden bg-[#fffaf1]">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(248,220,107,.42),transparent_30%),radial-gradient(circle_at_88%_30%,rgba(90,169,230,.25),transparent_32%)]" />
      <div className="absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(rgba(74,51,37,.18)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:px-12 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, ease }} className="inline-flex items-center gap-2 rounded-full border border-hola-yellow/60 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-hola-brown shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-hola-blue-dark" /> Your neighborhood happy place
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .08, ease }} className="mt-7 text-[clamp(3.5rem,8vw,7.5rem)] leading-[.82] tracking-[-.055em] text-hola-brown">
            Find your<br /><span className="relative inline-block text-hola-blue-dark">happy sip.<motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .75, duration: .7, ease }} className="absolute -bottom-2 left-1 h-3 w-[94%] origin-left rounded-full bg-hola-yellow/75 -z-10" /></span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .22, ease }} className="mt-8 max-w-xl text-base leading-8 text-hola-brown-soft sm:text-lg">
            Handcrafted coffee, crave-worthy treats, and the kind of warm welcome that turns a quick stop into your favorite part of the day.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .34, ease }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/menu" className="group inline-flex items-center justify-center gap-3 rounded-full bg-hola-brown px-7 py-4 font-display text-white shadow-[0_16px_35px_-15px_rgba(74,51,37,.7)] transition duration-300 hover:-translate-y-1 hover:bg-hola-blue-dark">
              Explore the menu <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-3 rounded-full border border-hola-brown/15 bg-white/80 px-7 py-4 font-display text-hola-brown shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-hola-yellow hover:shadow-lg">
              <MapPin className="h-5 w-5 text-hola-blue-dark" /> Plan your visit
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .62 }} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-hola-brown-soft">
            <span className="flex items-center gap-2"><span className="flex text-hola-yellow">{[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}</span><strong className="text-hola-brown">Made with love</strong></span>
            <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-hola-blue-dark" /> Open daily</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 40, scale: .94 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .9, delay: .15, ease }} className="relative mx-auto w-full max-w-[620px]">
          <div className="relative aspect-[5/6] overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-hola-blue via-[#6bb4ec] to-hola-blue-dark shadow-[0_40px_90px_-35px_rgba(62,139,203,.75)]">
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,white_0_2px,transparent_2px)] [background-size:30px_30px]" />
            <motion.div animate={{ y: [0,-10,0], rotate: [-2,1,-2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-x-[14%] bottom-[8%] top-[15%]">
              <div className="absolute left-1/2 top-[8%] h-[68%] w-[65%] -translate-x-1/2 rounded-b-[32%] rounded-t-[13%] bg-gradient-to-b from-white to-[#f5ead7] shadow-2xl">
                <div className="absolute left-[7%] right-[7%] top-[4%] h-[15%] rounded-[50%] bg-hola-brown"><div className="absolute inset-[22%] rounded-[50%] border-4 border-hola-yellow-soft/80" /></div>
                <Image src="/images/hola-logo-nav.png" alt="HOLA Coffee" width={220} height={85} priority className="absolute left-1/2 top-[45%] h-auto w-[72%] -translate-x-1/2 drop-shadow" />
              </div>
            </motion.div>
            <div className="absolute left-7 top-7 rounded-full bg-white/95 px-4 py-2 text-sm font-display text-hola-brown shadow-lg">Freshly crafted</div>
            <motion.div animate={{ y: [0,9,0] }} transition={{ duration: 3.6, repeat: Infinity }} className="absolute bottom-8 right-6 max-w-[180px] rounded-3xl bg-hola-yellow p-4 text-hola-brown shadow-xl">
              <p className="text-xs font-bold uppercase tracking-wider">Fan favorite</p><p className="mt-1 font-display text-xl">Spanish Latte</p>
            </motion.div>
          </div>
          <div className="absolute -bottom-5 -left-3 rounded-3xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur sm:-left-10"><Image src="/images/hola-logo.png" alt="" width={60} height={60} className="h-14 w-14 rounded-2xl" /></div>
        </motion.div>
      </div>

      <a href="#discover" aria-label="Discover more" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-hola-brown-soft transition hover:text-hola-blue-dark lg:flex">Discover <motion.span animate={{ y: [0,5,0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowDown className="h-4 w-4" /></motion.span></a>
    </section>
  );
}
