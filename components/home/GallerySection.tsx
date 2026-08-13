"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, CheckCircle2, Coffee, Images, Plus, X } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ImageUploadField from "@/components/dashboard/ImageUploadField";
import { createMoment } from "@/actions/moments";

const categories = ["Drinks", "Food", "Ambiance", "Latte Art", "Friends", "Sweet Treats"] as const;
const categoryColors: Record<string, string> = {
  Drinks: "bg-hola-yellow text-hola-brown",
  Food: "bg-hola-brown-soft text-white",
  Ambiance: "bg-hola-brown text-white",
  "Latte Art": "bg-emerald-700 text-white",
  Friends: "bg-hola-blue-dark text-white",
  "Sweet Treats": "bg-pink-700 text-white",
};

export type CommunityMoment = {
  id: string;
  image: string;
  caption: string;
  category: string;
  user: { name: string | null; image: string | null };
};

export default function GallerySection({ moments }: { moments: CommunityMoment[] }) {
  const [showForm, setShowForm] = useState(false);
  const [activeMoment, setActiveMoment] = useState<CommunityMoment | null>(null);
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ image: "", caption: "", category: categories[0] as (typeof categories)[number] });

  function submitMoment(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.image) {
      setError("Please upload a photo.");
      return;
    }
    startTransition(async () => {
      try {
        await createMoment(form);
        setSubmitted(true);
        setForm({ image: "", caption: "", category: categories[0] });
      } catch (uploadError) {
        setError(uploadError instanceof Error ? uploadError.message : "Could not submit your moment.");
      }
    });
  }

  function closeForm() {
    setShowForm(false);
    setSubmitted(false);
    setError(null);
  }

  return (
    <section className="relative isolate overflow-hidden bg-hola-beige px-4 py-20 sm:py-28">
      <div className="absolute -left-24 top-20 h-64 w-64 rounded-full border-[32px] border-hola-yellow/20" />
      <div className="absolute -bottom-36 -right-24 h-80 w-80 rounded-full bg-hola-blue/10" />
      <Coffee className="absolute left-[5%] top-48 hidden h-14 w-14 -rotate-12 text-hola-brown/10 md:block" />
      <Coffee className="absolute bottom-28 right-[5%] hidden h-14 w-14 rotate-12 text-hola-brown/10 md:block" />

      <div className="relative mx-auto max-w-[1280px]">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex w-fit items-center gap-2 text-hola-blue-dark">
            <span className="h-px w-10 bg-hola-yellow" />
            <Coffee className="h-6 w-6" />
            <span className="h-px w-10 bg-hola-yellow" />
          </div>
          <h2 className="mt-4 text-4xl text-hola-brown sm:text-5xl">Moments at HOLA Coffee</h2>
          <p className="mt-3 text-hola-brown-soft">Coffee, conversations, and cozy <strong>memories.</strong></p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-hola-yellow px-6 py-3 font-display text-hola-brown shadow-lg shadow-hola-yellow/25 transition hover:-translate-y-1 hover:bg-hola-yellow-soft"
          >
            <Camera className="h-5 w-5" /> Add Your Moment
          </button>
        </AnimatedSection>

        {moments.length === 0 ? (
          <AnimatedSection className="mt-12 flex flex-col items-center rounded-hola-lg border-2 border-dashed border-hola-blue/25 bg-white/70 px-6 py-14 text-center">
            <Images className="h-12 w-12 text-hola-blue/50" />
            <p className="mt-4 font-display text-xl text-hola-brown">Be the first to share a HOLA moment.</p>
            <p className="mt-2 text-sm text-hola-brown-soft">Approved customer photos will appear here.</p>
          </AnimatedSection>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moments.map((moment, i) => {
              const initials = (moment.user.name || "HOLA Guest").split(" ").map((part) => part[0]).join("").slice(0, 2);
              return (
                <AnimatedSection key={moment.id} delay={(i % 3) * 0.07}>
                  <button
                    type="button"
                    onClick={() => setActiveMoment(moment)}
                    className="group relative aspect-[5/4] w-full overflow-hidden rounded-hola-md bg-hola-brown text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Image src={moment.image} alt={moment.caption} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/10" />
                    <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold shadow ${categoryColors[moment.category] ?? "bg-white text-hola-brown"}`}>
                      {moment.category}
                    </span>
                    <div className="absolute inset-x-4 bottom-4 text-white">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-hola-blue text-xs">{initials}</span>
                        <span>@{(moment.user.name || "hola.guest").toLowerCase().replace(/\s+/g, ".")}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/95">{moment.caption}</p>
                    </div>
                  </button>
                </AnimatedSection>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div className="fixed inset-0 z-[210] flex items-center justify-center bg-hola-brown/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeForm}>
            <motion.div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-hola-lg bg-white p-6 shadow-2xl sm:p-8" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }} onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={closeForm} aria-label="Close" className="absolute right-5 top-5 rounded-full bg-hola-beige p-2 text-hola-brown"><X className="h-5 w-5" /></button>
              {submitted ? (
                <div className="py-10 text-center">
                  <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
                  <h3 className="mt-5 text-2xl text-hola-brown">Moment submitted!</h3>
                  <p className="mt-2 text-sm text-hola-brown-soft">An admin will review it before it appears in the gallery.</p>
                  <button type="button" onClick={closeForm} className="mt-6 rounded-full bg-hola-blue px-6 py-2.5 font-display text-white">Done</button>
                </div>
              ) : (
                <form onSubmit={submitMoment} className="space-y-5">
                  <div>
                    <p className="text-2xl text-hola-brown">Share Your HOLA Moment</p>
                    <p className="mt-1 text-sm text-hola-brown-soft">Show us your drink, treat, friends, or favorite café corner.</p>
                  </div>
                  <ImageUploadField folder="moments" value={form.image} onChange={(image) => setForm((current) => ({ ...current, image }))} label="Your Photo" />
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-hola-brown">Category</label>
                    <select value={form.category} onChange={(e) => setForm((current) => ({ ...current, category: e.target.value as (typeof categories)[number] }))} className="w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-4 py-3 text-sm text-hola-brown outline-none focus:border-hola-blue">
                      {categories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-hola-brown">Caption</label>
                    <textarea required minLength={3} maxLength={180} rows={3} value={form.caption} onChange={(e) => setForm((current) => ({ ...current, caption: e.target.value }))} placeholder="Tell us about your experience…" className="w-full resize-none rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-4 py-3 text-sm text-hola-brown outline-none focus:border-hola-blue" />
                    <p className="mt-1 text-right text-xs text-hola-brown-soft">{form.caption.length}/180</p>
                  </div>
                  {error && <p className="rounded-hola-sm bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
                  <button type="submit" disabled={isPending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-hola-blue px-6 py-3 font-display text-white transition hover:bg-hola-blue-dark disabled:opacity-60">
                    <Plus className="h-5 w-5" /> {isPending ? "Submitting…" : "Submit Moment"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}

        {activeMoment && (
          <motion.div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveMoment(null)}>
            <motion.div className="relative w-full max-w-3xl overflow-hidden rounded-hola-lg bg-white shadow-2xl" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[4/3] bg-black"><Image src={activeMoment.image} alt={activeMoment.caption} fill unoptimized sizes="90vw" className="object-contain" /></div>
              <p className="p-5 text-sm text-hola-brown">{activeMoment.caption}</p>
              <button type="button" onClick={() => setActiveMoment(null)} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-hola-brown shadow"><X className="h-5 w-5" /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
