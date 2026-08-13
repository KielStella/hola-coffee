import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  Coffee,
  Croissant,
  Gift,
  GraduationCap,
  Sparkles,
  Tag,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { promotions } from "@/lib/rewards-data";

const cardStyles = [
  {
    ribbon: "Best Deal",
    Icon: Gift,
    header: "from-hola-yellow via-[#f5c84c] to-[#e8a931]",
    iconBg: "bg-hola-yellow text-hola-brown",
    accent: "border-hola-yellow",
  },
  {
    ribbon: "For Students",
    Icon: GraduationCap,
    header: "from-hola-blue-dark via-[#347cb8] to-[#24577d]",
    iconBg: "bg-hola-blue-dark text-white",
    accent: "border-hola-blue",
  },
  {
    ribbon: "Daily Treat",
    Icon: Clock3,
    header: "from-[#f7bd4f] via-[#ec9f2d] to-[#d97821]",
    iconBg: "bg-[#eda53a] text-white",
    accent: "border-[#eda53a]",
  },
  {
    ribbon: "Weekend Only",
    Icon: Croissant,
    header: "from-hola-brown-soft via-hola-brown to-[#2c1a10]",
    iconBg: "bg-hola-brown text-white",
    accent: "border-hola-brown-soft",
  },
] as const;

export default function PromotionsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-20 sm:py-28">
      <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full border-[38px] border-hola-yellow-soft/50" />
      <div className="absolute -bottom-36 -right-24 h-80 w-80 rounded-full bg-hola-blue/10" />
      <Coffee className="absolute left-[4%] top-40 hidden h-16 w-16 -rotate-12 text-hola-brown/7 md:block" />
      <Coffee className="absolute right-[5%] top-28 hidden h-14 w-14 rotate-12 text-hola-yellow md:block" />
      <Sparkles className="absolute bottom-20 left-[6%] hidden h-12 w-12 text-hola-blue/25 md:block" />

      <div className="relative mx-auto max-w-[1280px]">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex w-fit items-center gap-3 text-hola-blue-dark">
            <span className="h-px w-10 bg-hola-yellow" />
            <Coffee className="h-7 w-7" />
            <span className="h-px w-10 bg-hola-yellow" />
          </div>
          <h2 className="mt-4 text-4xl text-hola-brown sm:text-5xl">Current Promotions</h2>
          <p className="mt-3 text-hola-brown-soft">More reasons to visit HOLA this week.</p>
          <div className="mx-auto mt-5 flex w-fit items-center gap-1.5">
            <span className="h-px w-8 bg-hola-yellow" />
            <span className="h-2 w-2 rounded-full bg-hola-blue" />
            <span className="h-2 w-2 rounded-full bg-hola-yellow" />
            <span className="h-px w-8 bg-hola-yellow" />
          </div>
        </AnimatedSection>

        {promotions.length === 0 ? (
          <div className="mt-14 flex flex-col items-center py-10 text-center">
            <Tag className="h-10 w-10 text-hola-brown-soft/40" />
            <p className="mt-3 font-display text-lg text-hola-brown">No active promotions.</p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {promotions.map((promo, i) => {
              const style = cardStyles[i % cardStyles.length];
              const Icon = style.Icon;
              return (
                <AnimatedSection key={promo.id} delay={i * 0.08}>
                  <article
                    className={`group flex h-full flex-col overflow-hidden rounded-hola-md border bg-white shadow-[0_14px_40px_-22px_rgba(74,51,37,0.45)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_22px_50px_-20px_rgba(74,51,37,0.5)] ${style.accent}`}
                  >
                    <div className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br ${style.header}`}>
                      <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_center,white_0_2px,transparent_3px)] [background-size:22px_22px]" />
                      <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full border-[22px] border-white/10" />
                      <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/10" />

                      <div className="absolute left-4 top-0 z-10 flex min-h-20 w-20 flex-col items-center bg-white px-2 pb-5 pt-3 text-center text-[10px] font-bold uppercase tracking-wider text-hola-brown [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)]">
                        {style.ribbon.split(" ").map((word) => <span key={word}>{word}</span>)}
                      </div>

                      <div className="relative flex flex-col items-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/35 bg-white/15 text-white shadow-xl backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                          <Icon className="h-12 w-12" strokeWidth={1.6} />
                        </div>
                        <Image
                          src="/images/hola-logo-nav.png"
                          alt="HOLA Coffee"
                          width={118}
                          height={45}
                          className="mt-4 h-8 w-auto drop-shadow"
                        />
                      </div>
                    </div>

                    <div className="relative flex flex-1 flex-col px-6 pb-6 pt-10 text-center">
                      <div className={`absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white shadow-md ${style.iconBg}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl text-hola-brown">{promo.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-hola-brown-soft">{promo.description}</p>
                      <div className="mt-6 flex items-start justify-center gap-2 border-t border-hola-brown/8 pt-4 text-xs leading-relaxed text-hola-brown-soft">
                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-hola-blue-dark" />
                        <span>{promo.startDate} — {promo.endDate}</span>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        )}

        <AnimatedSection delay={0.15} className="mx-auto mt-12 flex w-fit items-center gap-2 rounded-full bg-hola-beige px-6 py-3 text-sm text-hola-brown-soft shadow-sm">
          <Coffee className="h-4 w-4 text-hola-blue-dark" />
          <span>Good coffee. Great moments. Only at <strong className="text-hola-brown">HOLA.</strong></span>
        </AnimatedSection>
      </div>
    </section>
  );
}
