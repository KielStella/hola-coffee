import Link from "next/link";
import { ArrowRight, CakeSlice, Coffee, Croissant, Gift, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { rewardsPreview } from "@/lib/data";

const iconMap = { Coffee, Pastries: Croissant, Desserts: CakeSlice, "Gift Items": Gift };

export default function RewardsPreview() {
  return (
    <section className="relative isolate overflow-hidden bg-hola-blue-dark px-4 py-20 text-white sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(248,220,107,.25),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(255,255,255,.16),transparent_30%)]" />
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <AnimatedSection direction="left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.17em] text-hola-yellow"><Sparkles className="h-4 w-4" /> HOLA Rewards</span>
          <h2 className="mt-6 text-4xl leading-tight sm:text-6xl">Your usual<br />should reward you.</h2>
          <p className="mt-5 max-w-lg leading-8 text-white/75">Earn points whenever you order, then turn them into drinks, pastries, desserts, and HOLA treats you&apos;ll actually love.</p>
          <Link href="/rewards" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-hola-yellow px-7 py-4 font-display text-hola-brown shadow-xl transition hover:-translate-y-1 hover:bg-white">Start earning <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Link>
        </AnimatedSection>
        <div className="grid grid-cols-2 gap-4">
          {rewardsPreview.map((reward, i) => {
            const Icon = iconMap[reward.category as keyof typeof iconMap] ?? Coffee;
            return <AnimatedSection key={reward.id} delay={i * .08}><div className={`group min-h-48 rounded-[2rem] border border-white/15 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/20 ${i === 0 ? "bg-hola-yellow text-hola-brown" : "bg-white/10"}`}><div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? "bg-white/60" : "bg-white/15"}`}><Icon className={`h-6 w-6 ${i === 0 ? "text-hola-blue-dark" : "text-hola-yellow"}`} /></div><p className="mt-8 font-display text-base sm:text-xl">{reward.name}</p><p className={`mt-1 text-xs uppercase tracking-wider ${i === 0 ? "text-hola-brown-soft" : "text-white/60"}`}>{reward.category}</p></div></AnimatedSection>;
          })}
        </div>
      </div>
    </section>
  );
}
