import { Leaf, Coffee, Sofa, Smile } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { whyChooseHola } from "@/lib/data";

const iconMap = { Leaf, Coffee, Sofa, Smile };

export default function WhyChooseHola() {
  return (
    <section className="relative bg-hola-beige px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-hola-brown sm:text-4xl">Why Choose HOLA</h2>
          <p className="mt-3 text-hola-brown-soft">
            Every visit is crafted to feel like a warm hug in a cup.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseHola.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <AnimatedSection key={item.id} delay={i * 0.1}>
                <div className="group h-full rounded-hola-lg bg-white p-8 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hola-blue/10 transition group-hover:bg-hola-blue/20">
                    <Icon className="h-8 w-8 text-hola-blue-dark" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-xl text-hola-brown">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-hola-brown-soft">{item.description}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
