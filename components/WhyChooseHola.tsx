import Link from "next/link";
import { ArrowUpRight, Coffee, Heart, Leaf, Smile, Sofa, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { whyChooseHola } from "@/lib/data";

const iconMap = { Leaf, Coffee, Sofa, Smile };
const styles = ["bg-hola-yellow-soft", "bg-hola-blue text-white", "bg-white", "bg-hola-brown text-white"];

export default function WhyChooseHola() {
  return (
    <section id="discover" className="relative overflow-hidden bg-hola-beige px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection className="grid items-end gap-6 lg:grid-cols-[1fr_.72fr]">
          <div><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-hola-blue-dark"><Sparkles className="h-4 w-4" /> The HOLA feeling</span><h2 className="mt-4 max-w-3xl text-4xl leading-[1.05] text-hola-brown sm:text-6xl">More than coffee.<br />It&apos;s your pause in the day.</h2></div>
          <p className="max-w-xl text-base leading-8 text-hola-brown-soft lg:pb-2">Come for a carefully made drink. Stay for the friendly faces, comfortable corners, and little moments that make life feel lighter.</p>
        </AnimatedSection>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseHola.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return <AnimatedSection key={item.id} delay={i * .08}><article className={`group relative min-h-72 overflow-hidden rounded-[2rem] p-7 shadow-[0_18px_45px_-30px_rgba(74,51,37,.5)] transition duration-500 hover:-translate-y-2 hover:shadow-xl ${styles[i]}`}>
              <span className="absolute right-5 top-4 font-display text-6xl opacity-[.08]">0{i + 1}</span>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${i === 1 || i === 3 ? "bg-white/15" : "bg-white/70"}`}><Icon className={`h-7 w-7 ${i === 1 || i === 3 ? "text-hola-yellow" : "text-hola-blue-dark"}`} /></div>
              <h3 className={`mt-14 text-2xl ${i === 1 || i === 3 ? "text-white" : "text-hola-brown"}`}>{item.title}</h3>
              <p className={`mt-3 text-sm leading-7 ${i === 1 || i === 3 ? "text-white/75" : "text-hola-brown-soft"}`}>{item.description}</p>
            </article></AnimatedSection>;
          })}
        </div>

        <AnimatedSection className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-white px-7 py-6 shadow-sm sm:flex-row">
          <div className="flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-hola-yellow-soft"><Heart className="h-6 w-6 fill-hola-yellow text-hola-brown" /></span><div><p className="font-display text-lg text-hola-brown">A café with a heart for community</p><p className="text-sm text-hola-brown-soft">See the story and people behind every cup.</p></div></div>
          <Link href="/our-story" className="group inline-flex items-center gap-2 font-display text-hola-blue-dark">Meet HOLA <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
