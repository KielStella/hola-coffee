"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Coffee, Heart, MessageCircleHeart, Quote, Smile, Sparkles, Star, Users, X } from "lucide-react";
import type { StaffMember } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;
const palettes = [
  { bg: "from-hola-yellow-soft to-hola-yellow", ink: "text-hola-brown", accent: "bg-hola-brown" },
  { bg: "from-hola-blue to-hola-blue-dark", ink: "text-white", accent: "bg-hola-yellow" },
  { bg: "from-[#efb88c] to-hola-brown-soft", ink: "text-white", accent: "bg-white" },
];
const roleDetails: Record<string, { label: string; description: string; favorite: string }> = {
  Manager: { label: "The welcoming lead", description: "Keeps the team inspired and every guest experience running with warmth and care.", favorite: "Spanish Latte" },
  Barista: { label: "The cup artist", description: "Turns quality ingredients into drinks worth slowing down for, one careful pour at a time.", favorite: "Caramel Macchiato" },
  Cashier: { label: "The first hello", description: "Makes every order easy, friendly, and personal from the moment you walk through the door.", favorite: "Iced Matcha" },
};

function Portrait({ member, index, large = false }: { member: StaffMember; index: number; large?: boolean }) {
  const palette = palettes[index % palettes.length];
  return <div className={`relative flex ${large ? "h-64 w-64" : "h-52 w-full"} items-center justify-center overflow-hidden bg-gradient-to-br ${palette.bg}`}>
    <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_center,white_0_2px,transparent_2px)] [background-size:24px_24px]" />
    <motion.div whileHover={{ scale: 1.05, rotate: -2 }} className={`relative flex ${large ? "h-36 w-36 text-5xl" : "h-28 w-28 text-4xl"} items-center justify-center rounded-[2.5rem] border-4 border-white/60 bg-white/20 font-display ${palette.ink} shadow-2xl backdrop-blur-sm`}>{member.initials}</motion.div>
    <Coffee className={`absolute -bottom-4 -right-3 ${large ? "h-24 w-24" : "h-20 w-20"} opacity-15 ${palette.ink}`} />
  </div>;
}

export default function StaffExperience({ members }: { members: StaffMember[] }) {
  const [selected, setSelected] = useState<StaffMember | null>(null);
  const selectedIndex = selected ? members.findIndex(member => member.id === selected.id) : -1;

  return <>
    <section className="relative isolate overflow-hidden bg-[#fffaf1] px-4 py-16 sm:py-24">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_20%,rgba(248,220,107,.45),transparent_28%),radial-gradient(circle_at_90%_22%,rgba(90,169,230,.25),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgba(74,51,37,.15)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_.88fr]">
        <div>
          <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease }} className="inline-flex items-center gap-2 rounded-full border border-hola-yellow bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-hola-blue-dark"><Sparkles className="h-4 w-4" /> The humans behind HOLA</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .08, ease }} className="mt-7 max-w-3xl text-5xl leading-[.93] tracking-[-.04em] text-hola-brown sm:text-7xl">Great coffee starts with <span className="text-hola-blue-dark">good people.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .2, ease }} className="mt-6 max-w-xl text-base leading-8 text-hola-brown-soft sm:text-lg">Meet the friendly faces who remember your usual, perfect every pour, and make HOLA feel like your neighborhood home.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }} className="mt-8 flex flex-wrap gap-3"><span className="inline-flex items-center gap-2 rounded-full bg-hola-brown px-4 py-2 text-sm text-white"><Users className="h-4 w-4 text-hola-yellow" /> One close-knit team</span><span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-hola-brown shadow-sm"><Heart className="h-4 w-4 fill-hola-yellow text-hola-yellow" /> One warm welcome</span></motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .85, delay: .15, ease }} className="relative mx-auto grid w-full max-w-xl grid-cols-3 items-end gap-3 sm:gap-5">
          {members.map((member, index) => <motion.button key={member.id} type="button" onClick={() => setSelected(member)} aria-label={`Meet ${member.name}`} whileHover={{ y: -10 }} className={`overflow-hidden rounded-[2rem] bg-white shadow-xl ${index === 1 ? "mb-10" : ""}`}><Portrait member={member} index={index} /><div className="p-3 text-center"><p className="truncate font-display text-sm text-hola-brown sm:text-base">{member.name.split(" ")[0]}</p></div></motion.button>)}
          <div className="absolute -bottom-4 left-1/2 -z-10 h-16 w-[85%] -translate-x-1/2 rounded-[50%] bg-hola-brown/15 blur-xl" />
        </motion.div>
      </div>
    </section>

    <section className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-[.62fr_1.38fr] lg:items-end"><div><span className="text-xs font-bold uppercase tracking-[.18em] text-hola-blue-dark">Say HOLA</span><h2 className="mt-4 text-4xl leading-tight text-hola-brown sm:text-6xl">Meet your coffee crew.</h2></div><p className="max-w-xl text-base leading-8 text-hola-brown-soft lg:justify-self-end">Tap any team member to learn what they bring to your HOLA experience—and discover their favorite drink.</p></div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {members.map((member, index) => {
            const detail = roleDetails[member.position] ?? { label: "HOLA team member", description: "Bringing skill, care, and genuine hospitality to every shift.", favorite: "HOLA favorite" };
            return <motion.button key={member.id} type="button" onClick={() => setSelected(member)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .1, duration: .6, ease }} whileHover={{ y: -8 }} className="group overflow-hidden rounded-[2.25rem] border border-hola-brown/[.07] bg-hola-beige text-left shadow-[0_20px_50px_-35px_rgba(74,51,37,.65)] transition-shadow hover:shadow-2xl">
              <Portrait member={member} index={index} />
              <div className="p-6"><p className="text-xs font-bold uppercase tracking-[.15em] text-hola-blue-dark">{detail.label}</p><div className="mt-2 flex items-start justify-between gap-4"><div><h3 className="text-2xl text-hola-brown">{member.name}</h3><p className="text-sm text-hola-brown-soft">{member.position}</p></div><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-hola-brown shadow-sm transition group-hover:rotate-12 group-hover:bg-hola-yellow"><ArrowRight className="h-4 w-4" /></span></div><div className="mt-5 flex items-start gap-2 border-t border-hola-brown/10 pt-4"><Quote className="mt-1 h-4 w-4 shrink-0 text-hola-yellow" /><p className="text-sm italic leading-6 text-hola-brown-soft">{member.quote}</p></div></div>
            </motion.button>;
          })}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-hola-blue-dark px-4 py-20 text-white sm:py-24">
      <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative mx-auto max-w-[1280px]"><div className="mx-auto max-w-2xl text-center"><Smile className="mx-auto h-9 w-9 text-hola-yellow" /><h2 className="mt-5 text-4xl sm:text-5xl">The HOLA way of serving.</h2><p className="mt-4 leading-8 text-white/70">Skill matters. But the feeling we leave you with matters even more.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-3">{[{ icon: Heart, title: "Serve with heart", copy: "Every interaction should feel personal and genuine." },{ icon: Star, title: "Care about craft", copy: "Small details turn a good cup into a memorable one." },{ icon: MessageCircleHeart, title: "Know our community", copy: "Regulars aren’t order numbers—they’re part of HOLA." }].map(({icon: Icon,title,copy},index) => <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur"><Icon className="h-7 w-7 text-hola-yellow" /><h3 className="mt-8 text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-white/65">{copy}</p></motion.div>)}</div></div>
    </section>

    <section className="bg-hola-yellow-soft px-4 py-16 text-center sm:py-20"><h2 className="text-3xl text-hola-brown sm:text-5xl">Come say hello in person.</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-hola-brown-soft">Your next favorite drink—and a friendly face to make it—are waiting.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/menu" className="inline-flex items-center justify-center gap-2 rounded-full bg-hola-brown px-7 py-3.5 font-display text-white transition hover:-translate-y-1 hover:bg-hola-blue-dark"><Coffee className="h-5 w-5" /> Explore the menu</Link><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-display text-hola-brown shadow-sm transition hover:-translate-y-1 hover:shadow-lg">Plan your visit <ArrowRight className="h-5 w-5" /></Link></div></section>

    <AnimatePresence>{selected && <motion.div className="fixed inset-0 z-[210] flex items-end justify-center bg-hola-brown/65 p-0 backdrop-blur-sm sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label={`About ${selected.name}`}><motion.div initial={{ opacity: 0, y: 40, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: .97 }} transition={{ duration: .35, ease }} onClick={event => event.stopPropagation()} className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2.5rem] bg-white shadow-2xl sm:rounded-[2.5rem]"><button type="button" onClick={() => setSelected(null)} aria-label="Close profile" className="absolute right-5 top-5 z-10 rounded-full bg-white p-2 text-hola-brown shadow"><X className="h-5 w-5" /></button><div className="grid md:grid-cols-[.8fr_1.2fr]"><Portrait member={selected} index={selectedIndex} large /><div className="p-7 sm:p-10"><span className="text-xs font-bold uppercase tracking-[.16em] text-hola-blue-dark">{roleDetails[selected.position]?.label ?? "HOLA team member"}</span><h2 className="mt-2 text-4xl text-hola-brown">{selected.name}</h2><p className="text-lg font-display text-hola-brown-soft">{selected.position}</p><p className="mt-6 leading-8 text-hola-brown-soft">{roleDetails[selected.position]?.description ?? "Bringing skill, care, and genuine hospitality to every shift."}</p><blockquote className="mt-6 rounded-[1.5rem] bg-hola-beige p-5"><Quote className="h-5 w-5 text-hola-yellow" /><p className="mt-2 font-display text-xl leading-relaxed text-hola-brown">“{selected.quote}”</p></blockquote><div className="mt-5 flex items-center gap-3 rounded-full border border-hola-brown/10 px-4 py-3"><Coffee className="h-5 w-5 text-hola-blue-dark" /><span className="text-sm text-hola-brown-soft">HOLA favorite: <strong className="text-hola-brown">{roleDetails[selected.position]?.favorite ?? "Barista’s choice"}</strong></span></div></div></div></motion.div></motion.div>}</AnimatePresence>
  </>;
}
