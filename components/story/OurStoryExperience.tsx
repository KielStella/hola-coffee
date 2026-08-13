"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Coffee,
  DoorOpen,
  Eye,
  Heart,
  MapPin,
  Quote,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import FloatingDecor from "@/components/FloatingDecor";
import { storyTimeline } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const values = [
  {
    title: "Our Mission",
    eyebrow: "Why we show up",
    description: "To serve handcrafted beverages made with passion while creating a memorable, welcoming experience for every guest.",
    Icon: Target,
    gradient: "from-hola-blue to-hola-blue-dark",
    number: "01",
  },
  {
    title: "Our Vision",
    eyebrow: "Where we are going",
    description: "To become a beloved neighborhood coffee shop known for exceptional drinks, thoughtful service, and genuine connection.",
    Icon: Eye,
    gradient: "from-hola-yellow to-[#efb93f]",
    number: "02",
  },
  {
    title: "Our Philosophy",
    eyebrow: "What guides every cup",
    description: "Great coffee begins with care—from quality ingredients and careful craft to the smile that comes with every handoff.",
    Icon: Sparkles,
    gradient: "from-hola-brown-soft to-hola-brown",
    number: "03",
  },
] as const;

const timelineIcons = [Sparkles, DoorOpen, Users, Rocket];

function CoffeeCupIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease }}
      className="relative mx-auto aspect-square w-full max-w-[520px]"
      aria-label="A warm cup representing the HOLA Coffee experience"
      role="img"
    >
      <div className="absolute inset-[4%] rounded-[32%] bg-gradient-to-br from-hola-yellow-soft via-white to-hola-blue/25 shadow-[0_30px_80px_-30px_rgba(74,51,37,0.45)]" />
      <motion.div className="absolute left-[19%] top-[11%] h-20 w-5 rounded-full bg-white/75 blur-sm" animate={{ y: [0, -16, 0], x: [0, 7, 0], opacity: [0.25, 0.75, 0.25] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute left-[46%] top-[5%] h-24 w-5 rounded-full bg-white/75 blur-sm" animate={{ y: [0, -20, 0], x: [0, -5, 0], opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 4.7, delay: 0.5, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute left-1/2 top-[48%] h-[35%] w-[51%] -translate-x-1/2 -translate-y-1/2 rounded-b-[38%] rounded-t-[16%] bg-gradient-to-b from-white to-[#f4e9d5] shadow-xl">
        <div className="absolute left-[8%] right-[8%] top-[5%] h-[18%] rounded-[50%] bg-hola-brown">
          <div className="absolute left-[20%] top-[20%] h-[45%] w-[55%] rotate-6 rounded-[50%] border-4 border-hola-yellow-soft/80" />
        </div>
        <Image src="/images/hola-logo-nav.png" alt="HOLA Coffee" width={180} height={70} className="absolute left-1/2 top-[48%] h-auto w-[65%] -translate-x-1/2" />
        <div className="absolute -right-[28%] top-[22%] h-[45%] w-[36%] rounded-r-full border-[18px] border-l-0 border-white shadow-md" />
      </div>
      <div className="absolute bottom-[15%] left-1/2 h-[7%] w-[70%] -translate-x-1/2 rounded-[50%] bg-hola-brown/15 blur-sm" />
      <motion.div className="absolute right-[8%] top-[18%] rounded-full bg-white p-3 shadow-lg" animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }} transition={{ duration: 3.5, repeat: Infinity }}><Heart className="h-7 w-7 fill-hola-yellow text-hola-yellow" /></motion.div>
      <motion.div className="absolute bottom-[18%] left-[7%] rounded-full bg-hola-blue p-3 text-white shadow-lg" animate={{ y: [0, 8, 0], rotate: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity }}><Coffee className="h-7 w-7" /></motion.div>
    </motion.div>
  );
}

export default function OurStoryExperience() {
  const [activeJourney, setActiveJourney] = useState(0);
  const activeEvent = storyTimeline[activeJourney];
  const ActiveIcon = timelineIcons[activeJourney] ?? Sparkles;

  return (
    <div className="overflow-hidden bg-hola-beige">
      <section className="relative isolate min-h-[760px] overflow-hidden bg-gradient-to-br from-hola-beige via-white to-hola-blue/15 px-4 py-20 sm:py-28 lg:flex lg:min-h-[calc(100vh-80px)] lg:items-center">
        <FloatingDecor variant="beans" />
        <div className="absolute -left-28 -top-32 h-96 w-96 rounded-full bg-hola-yellow/45 blur-2xl" />
        <div className="absolute -bottom-40 -right-28 h-[480px] w-[480px] rounded-full bg-hola-blue/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-hola-blue-dark shadow-sm">
              <Heart className="h-4 w-4 fill-hola-yellow text-hola-yellow" /> The heart behind every cup
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1, ease }} className="mt-7 max-w-3xl text-5xl leading-[0.98] text-hola-brown sm:text-6xl lg:text-7xl">
              More than coffee. <span className="text-gradient-hola">A place to belong.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22, ease }} className="mt-7 max-w-2xl text-base leading-8 text-hola-brown-soft sm:text-lg">
              HOLA Coffee began with a simple belief: the best cafés do more than serve drinks. They make room for conversation, creativity, comfort, and the small moments that turn an ordinary day into a good one.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.34, ease }} className="mt-9 flex flex-wrap gap-4">
              <Link href="/menu" className="group inline-flex items-center gap-2 rounded-full bg-hola-blue px-7 py-3.5 font-display text-white shadow-lg shadow-hola-blue/25 transition hover:-translate-y-1 hover:bg-hola-blue-dark">Taste Our Story <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
              <a href="#journey" className="inline-flex items-center gap-2 rounded-full border-2 border-hola-brown/10 bg-white px-7 py-3.5 font-display text-hola-brown shadow-sm transition hover:-translate-y-1 hover:border-hola-yellow">Explore Our Journey</a>
            </motion.div>
          </div>
          <CoffeeCupIllustration />
        </div>
      </section>

      <section className="relative z-10 -mt-10 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mx-auto grid max-w-5xl overflow-hidden rounded-hola-lg bg-hola-brown text-white shadow-2xl sm:grid-cols-3">
          {[{ value: "Handcrafted", label: "with care in every cup" }, { value: "Community", label: "at the center of HOLA" }, { value: "Warmth", label: "from hello to goodbye" }].map((stat, index) => (
            <div key={stat.value} className={`p-7 text-center ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}>
              <p className="font-display text-2xl text-hola-yellow">{stat.value}</p><p className="mt-1 text-xs uppercase tracking-wider text-white/65">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-[1280px]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-hola-blue-dark">What keeps us grounded</p>
            <h2 className="mt-4 text-4xl text-hola-brown sm:text-5xl">The values we pour into HOLA</h2>
            <p className="mt-4 leading-relaxed text-hola-brown-soft">Every decision—from the menu to the music—is shaped by three promises.</p>
          </motion.div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {values.map(({ title, eyebrow, description, Icon, gradient, number }, index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.1, duration: 0.65, ease }} whileHover={{ y: -10 }} className="group relative min-h-80 overflow-hidden rounded-hola-lg bg-white p-8 shadow-[0_18px_50px_-28px_rgba(74,51,37,0.5)]">
                <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${gradient}`} />
                <span className="absolute right-7 top-5 font-display text-6xl text-hola-brown/[0.05]">{number}</span>
                <div className={`flex h-14 w-14 items-center justify-center rounded-hola-sm bg-gradient-to-br text-white shadow-md ${gradient}`}><Icon className="h-7 w-7" /></div>
                <p className="mt-8 text-xs font-bold uppercase tracking-wider text-hola-blue-dark">{eyebrow}</p>
                <h3 className="mt-2 text-2xl text-hola-brown">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-hola-brown-soft">{description}</p>
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-hola-yellow/10 transition duration-500 group-hover:scale-150" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.75, ease }} className="relative">
            <div className="aspect-[5/4] overflow-hidden rounded-hola-xl bg-gradient-to-br from-hola-blue to-hola-blue-dark p-8 shadow-2xl sm:p-12">
              <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-hola-lg border border-white/20 bg-white/10 text-center backdrop-blur-sm">
                <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-hola-yellow/30" />
                <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10" />
                <Image src="/images/hola-logo.png" alt="HOLA Coffee logo" width={150} height={150} className="relative h-28 w-28 rounded-[22%] shadow-xl sm:h-36 sm:w-36" />
                <p className="relative mt-6 font-display text-2xl text-white">Brewing happiness<br />one cup at a time.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -bottom-7 -right-3 rounded-hola-md bg-hola-yellow p-5 text-hola-brown shadow-xl sm:right-8"><Heart className="h-7 w-7 fill-hola-brown" /><p className="mt-2 font-display text-sm">Made for everyone</p></motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.75, ease }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-hola-blue-dark">The idea behind HOLA</p>
            <h2 className="mt-4 text-4xl leading-tight text-hola-brown sm:text-5xl">A neighborhood café with an open-door heart.</h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-hola-brown-soft">
              <p>We imagined a space where the regular is remembered, the first-time visitor feels welcome, and nobody is rushed out of a good conversation.</p>
              <p>That is why HOLA is designed around more than a menu. It is the familiar smile at the counter, the comfortable corner for a long study session, and the drink made just the way you like it.</p>
            </div>
            <div className="mt-8 flex items-center gap-4 rounded-hola-md bg-hola-beige p-5"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hola-blue text-white"><Users className="h-6 w-6" /></div><p className="text-sm leading-relaxed text-hola-brown"><strong>Our measure of success:</strong> guests who arrive for coffee and return because HOLA feels like theirs.</p></div>
          </motion.div>
        </div>
      </section>

      <section id="journey" className="relative overflow-hidden bg-hola-brown px-4 py-24 text-white sm:py-32">
        <div className="absolute -left-36 -top-36 h-96 w-96 rounded-full bg-hola-blue/15" /><div className="absolute -bottom-48 -right-32 h-[500px] w-[500px] rounded-full bg-hola-yellow/10" />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-hola-yellow">Then, now, and next</p><h2 className="mt-4 text-4xl text-white sm:text-5xl">Our Journey</h2><p className="mt-4 text-white/65">Select a chapter to explore how the HOLA dream keeps growing.</p></div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-3" role="tablist" aria-label="HOLA Coffee journey">
              {storyTimeline.map((event, index) => { const Icon = timelineIcons[index] ?? Sparkles; const active = activeJourney === index; return (
                <button key={event.id} type="button" role="tab" aria-selected={active} onClick={() => setActiveJourney(index)} className={`flex w-full items-center gap-4 rounded-hola-md border p-4 text-left transition ${active ? "border-hola-yellow bg-white text-hola-brown shadow-xl" : "border-white/10 bg-white/5 text-white hover:bg-white/10"}`}>
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${active ? "bg-hola-yellow text-hola-brown" : "bg-white/10 text-white"}`}><Icon className="h-5 w-5" /></span>
                  <span><span className={`block text-xs font-bold uppercase tracking-wider ${active ? "text-hola-blue-dark" : "text-hola-yellow"}`}>{event.year}</span><span className="font-display text-lg">{event.title}</span></span>
                </button>
              ); })}
            </div>
            <div className="relative min-h-96 overflow-hidden rounded-hola-lg bg-gradient-to-br from-hola-blue to-hola-blue-dark p-8 shadow-2xl sm:p-12">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-hola-yellow/20" /><div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/10" />
              <AnimatePresence mode="wait">
                <motion.div key={activeEvent.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.4, ease }} className="relative flex h-full flex-col justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-hola-md bg-hola-yellow text-hola-brown shadow-lg"><ActiveIcon className="h-8 w-8" /></div>
                  <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-hola-yellow-soft">{activeEvent.year}</p><h3 className="mt-2 text-3xl text-white sm:text-4xl">{activeEvent.title}</h3><p className="mt-5 max-w-xl text-base leading-8 text-white/80">{activeEvent.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-hola-beige px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }} className="rounded-hola-xl bg-white px-6 py-14 shadow-[0_24px_70px_-36px_rgba(74,51,37,0.5)] sm:px-14">
            <Quote className="mx-auto h-12 w-12 fill-hola-yellow text-hola-yellow" />
            <blockquote className="mx-auto mt-7 max-w-3xl font-display text-2xl leading-relaxed text-hola-brown sm:text-4xl">“We didn&apos;t just want to open a coffee shop—we wanted to build a second home for our community, one warm cup at a time.”</blockquote>
            <div className="mx-auto mt-7 h-1 w-14 rounded-full bg-hola-blue" /><p className="mt-4 text-sm font-semibold uppercase tracking-wider text-hola-brown-soft">A note from HOLA</p>
          </motion.div>
          <div className="mt-14"><h2 className="text-3xl text-hola-brown sm:text-4xl">Come be part of the story.</h2><p className="mt-3 text-hola-brown-soft">Your favorite cup—and your favorite corner—are waiting.</p><div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row"><Link href="/menu" className="inline-flex items-center justify-center gap-2 rounded-full bg-hola-blue px-7 py-3.5 font-display text-white shadow-lg transition hover:-translate-y-1 hover:bg-hola-blue-dark"><Coffee className="h-5 w-5" /> Explore the Menu</Link><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-hola-brown/10 bg-white px-7 py-3.5 font-display text-hola-brown shadow-sm transition hover:-translate-y-1 hover:border-hola-yellow"><MapPin className="h-5 w-5" /> Plan Your Visit</Link></div></div>
        </div>
      </section>
    </div>
  );
}
