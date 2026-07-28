import { Tag, CalendarDays } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { promotions } from "@/lib/rewards-data";

export default function PromotionsSection() {
  return (
    <section className="bg-hola-beige px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-hola-brown sm:text-4xl">Current Promotions</h2>
          <p className="mt-3 text-hola-brown-soft">More reasons to visit HOLA this week.</p>
        </AnimatedSection>

        {promotions.length === 0 ? (
          <div className="mt-14 flex flex-col items-center py-10 text-center">
            <Tag className="h-10 w-10 text-hola-brown-soft/40" />
            <p className="mt-3 font-display text-lg text-hola-brown">No active promotions.</p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promotions.map((promo, i) => (
              <AnimatedSection key={promo.id} delay={i * 0.08}>
                <div className="group h-full overflow-hidden rounded-hola-lg bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="flex h-28 items-center justify-center bg-gradient-to-br from-hola-blue to-hola-blue-dark">
                    <Tag className="h-10 w-10 text-white/90 transition duration-300 group-hover:scale-110" strokeWidth={1.5} />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg text-hola-brown">{promo.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-hola-brown-soft">{promo.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-hola-brown-soft/80">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>
                        {promo.startDate} – {promo.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
