import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import ProductIllustration from "./ProductIllustration";
import { featuredProducts } from "@/lib/data";

export default function FeaturedSection() {
  const products = featuredProducts.slice(0, 3);
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:py-28">
      <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-hola-yellow-soft/35 blur-3xl" />
      <div className="relative mx-auto max-w-[1280px]">
        <AnimatedSection className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-hola-blue-dark"><Flame className="h-4 w-4" /> Crowd favorites</span><h2 className="mt-4 text-4xl text-hola-brown sm:text-6xl">Start with these.</h2><p className="mt-3 text-hola-brown-soft">The drinks our regulars keep coming back for.</p></div>
          <Link href="/menu" className="group inline-flex w-fit items-center gap-2 rounded-full border border-hola-brown/10 px-5 py-3 font-display text-hola-brown transition hover:border-hola-blue hover:text-hola-blue-dark">See full menu <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </AnimatedSection>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {products.map((product, i) => <AnimatedSection key={product.id} delay={i * .1}>
            <Link href="/menu" className="group block overflow-hidden rounded-[2.25rem] border border-hola-brown/5 bg-hola-beige shadow-[0_20px_55px_-35px_rgba(74,51,37,.6)] transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative h-64 overflow-hidden"><div className="h-full transition duration-700 group-hover:scale-110 group-hover:rotate-1"><ProductIllustration icon={product.icon} name={product.name} className="h-full w-full" /></div><span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-hola-brown shadow">{product.badge ?? "HOLA pick"}</span><span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-hola-brown shadow-lg transition group-hover:rotate-[-8deg] group-hover:bg-hola-yellow"><ArrowRight className="h-5 w-5" /></span></div>
              <div className="p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><h3 className="text-2xl text-hola-brown">{product.name}</h3><span className="rounded-full bg-white px-3 py-1 font-display text-hola-blue-dark">{product.price}</span></div><p className="mt-3 text-sm leading-7 text-hola-brown-soft">{product.description}</p></div>
            </Link>
          </AnimatedSection>)}
        </div>
      </div>
    </section>
  );
}
