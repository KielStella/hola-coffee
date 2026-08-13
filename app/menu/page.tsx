import type { Metadata } from "next";
import { Coffee, Sparkles, Star, UtensilsCrossed } from "lucide-react";
import MenuBrowser from "@/components/menu/MenuBrowser";
import { prisma } from "@/lib/prisma";
import { menuProducts as fallbackProducts, type MenuProduct } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse handcrafted drinks and snacks at HOLA Coffee.",
  alternates: { canonical: "/menu" },
};

export const dynamic = "force-dynamic";

async function getMenuProducts(): Promise<MenuProduct[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: { sortOrder: "asc" },
      include: { category: true },
    });

    if (products.length === 0) return fallbackProducts;

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category.label as MenuProduct["category"],
      tag: p.tag ?? undefined,
      basePrice: p.basePrice,
      ingredients: p.ingredients,
      image: p.image,
    }));
  } catch (error) {
    console.error("[menu] failed to load products from database, using fallback:", error);
    return fallbackProducts;
  }
}

export default async function MenuPage() {
  const products = await getMenuProducts();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-hola-brown px-4 py-16 text-white sm:py-24">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_15%,rgba(248,220,107,.25),transparent_28%),radial-gradient(circle_at_88%_75%,rgba(90,169,230,.28),transparent_30%)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:26px_26px]" />
        <Coffee className="absolute -right-12 top-1/2 h-72 w-72 -translate-y-1/2 rotate-12 text-white/[.035]" />
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_.65fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-hola-yellow backdrop-blur"><Sparkles className="h-4 w-4" /> Made fresh, made yours</span>
            <h1 className="mt-6 max-w-4xl text-5xl leading-[.95] tracking-[-.035em] sm:text-7xl">What are you<br /><span className="text-hola-yellow">craving today?</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">From bold espresso favorites to creamy coolers and freshly baked treats—discover your next HOLA obsession.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[2rem] bg-hola-yellow p-6 text-hola-brown shadow-xl"><Star className="h-7 w-7 fill-current" /><p className="mt-10 font-display text-2xl">Best sellers</p><p className="mt-1 text-sm text-hola-brown-soft">Loved by our regulars</p></div>
            <div className="mt-8 rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur"><UtensilsCrossed className="h-7 w-7 text-hola-blue" /><p className="mt-10 font-display text-2xl">Made your way</p><p className="mt-1 text-sm text-white/60">Size and sweetness options</p></div>
          </div>
        </div>
      </section>

      <MenuBrowser products={products} />
    </>
  );
}
