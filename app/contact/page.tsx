import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Coffee, Mail, MapPin, MessageCircleHeart, Phone, Sparkles } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Visit HOLA Coffee, send us a message, or connect with our team—we would love to hear from you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <>
    <section className="relative isolate overflow-hidden bg-[#fffaf1] px-4 py-16 sm:py-24">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_15%,rgba(248,220,107,.48),transparent_28%),radial-gradient(circle_at_88%_35%,rgba(90,169,230,.28),transparent_31%)]" />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgba(74,51,37,.15)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_.82fr]">
        <AnimatedSection direction="left"><span className="inline-flex items-center gap-2 rounded-full border border-hola-yellow bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-hola-blue-dark"><Sparkles className="h-4 w-4" /> We&apos;re listening</span><h1 className="mt-7 max-w-3xl text-5xl leading-[.93] tracking-[-.04em] text-hola-brown sm:text-7xl">A conversation<br />starts with <span className="text-hola-blue-dark">HOLA.</span></h1><p className="mt-6 max-w-xl text-base leading-8 text-hola-brown-soft sm:text-lg">Planning a visit, sharing feedback, or dreaming up a partnership? Reach out—there&apos;s a real person on the other side ready to help.</p><a href="#send-message" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-hola-brown px-7 py-4 font-display text-white shadow-xl transition hover:-translate-y-1 hover:bg-hola-blue-dark">Send us a message <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></a></AnimatedSection>
        <AnimatedSection direction="right" delay={.1} className="grid gap-4 sm:grid-cols-2">
          <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`} className="group rounded-[2rem] bg-hola-yellow p-6 text-hola-brown shadow-xl transition duration-300 hover:-translate-y-2"><Phone className="h-7 w-7" /><p className="mt-10 text-xs font-bold uppercase tracking-wider text-hola-brown-soft">Call us</p><p className="mt-1 font-display text-xl">{businessInfo.phone}</p></a>
          <a href={`mailto:${businessInfo.email}`} className="group mt-0 rounded-[2rem] bg-hola-blue p-6 text-white shadow-xl transition duration-300 hover:-translate-y-2 sm:mt-8"><Mail className="h-7 w-7 text-hola-yellow" /><p className="mt-10 text-xs font-bold uppercase tracking-wider text-white/60">Email us</p><p className="mt-1 break-all font-display text-lg">{businessInfo.email}</p></a>
          <div className="rounded-[2rem] bg-white p-6 text-hola-brown shadow-xl sm:col-span-2"><Clock3 className="h-7 w-7 text-hola-blue-dark" /><div className="mt-5 grid gap-3 sm:grid-cols-2">{businessInfo.hours.map(hour => <div key={hour.day}><p className="text-xs font-bold uppercase tracking-wider text-hola-brown-soft">{hour.day}</p><p className="mt-1 font-display text-lg">{hour.time}</p></div>)}</div></div>
        </AnimatedSection>
      </div>
    </section>

    <section id="send-message" className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px]"><AnimatedSection className="mb-12 grid gap-5 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-hola-blue-dark"><MessageCircleHeart className="h-4 w-4" /> Send a message</span><h2 className="mt-4 text-4xl text-hola-brown sm:text-6xl">Tell us what&apos;s on your mind.</h2></div><p className="max-w-xl text-base leading-8 text-hola-brown-soft lg:justify-self-end">Questions, feedback, customer concerns, or partnerships—give us the details and our team will take it from there.</p></AnimatedSection>
        <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr]"><AnimatedSection direction="left"><ContactForm /></AnimatedSection><AnimatedSection direction="right" delay={.1} className="space-y-5"><div className="overflow-hidden rounded-[2.5rem] bg-hola-brown p-3 shadow-xl"><div className="overflow-hidden rounded-[2rem]"><iframe title="HOLA Coffee location on Google Maps" src={businessInfo.mapsEmbedUrl} width="100%" height="300" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border-0" /></div><div className="p-5 text-white"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-hola-yellow"><MapPin className="h-4 w-4" /> Find your way to HOLA</span><p className="mt-3 text-sm leading-7 text-white/70">{businessInfo.address}</p></div></div><div className="rounded-[2rem] bg-hola-beige p-6"><p className="font-display text-xl text-hola-brown">Follow the daily brew</p><p className="mt-2 text-sm leading-6 text-hola-brown-soft">New drinks, café moments, and HOLA updates—fresh from our socials.</p><div className="mt-5 flex gap-3"><a href={businessInfo.facebook} target="_blank" rel="noopener noreferrer" aria-label="HOLA Coffee on Facebook" className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-hola-blue-dark shadow-sm transition hover:-translate-y-1 hover:bg-hola-blue hover:text-white"><FacebookIcon className="h-5 w-5" /></a><a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" aria-label="HOLA Coffee on Instagram" className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-hola-blue-dark shadow-sm transition hover:-translate-y-1 hover:bg-hola-yellow hover:text-hola-brown"><InstagramIcon className="h-5 w-5" /></a></div></div></AnimatedSection></div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-hola-blue-dark px-4 py-16 text-white sm:py-20"><Coffee className="absolute -bottom-14 -right-10 h-56 w-56 rotate-12 text-white/[.05]" /><div className="relative mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-hola-yellow">Prefer coffee over email?</p><h2 className="mt-3 text-3xl sm:text-4xl">Come by and let&apos;s talk over a cup.</h2></div><Link href="/menu" className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-hola-yellow px-7 py-4 font-display text-hola-brown shadow-xl transition hover:-translate-y-1 hover:bg-white">See what&apos;s brewing <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Link></div></section>
  </>;
}
