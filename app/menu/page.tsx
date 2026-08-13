import type { Metadata } from "next";
import { Coffee } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingDecor from "@/components/FloatingDecor";
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
      <section className="relative overflow-hidden bg-gradient-to-b from-hola-blue/15 to-hola-beige px-4 py-16 text-center sm:py-20">
        <FloatingDecor variant="beans" />
        <div className="relative mx-auto max-w-2xl">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-hola-blue-dark shadow-sm">
              <Coffee className="h-4 w-4" /> Menu
            </span>
            <h1 className="mt-5 text-4xl text-hola-brown sm:text-5xl">Our Full Menu</h1>
            <p className="mt-4 text-lg leading-relaxed text-hola-brown-soft">
              Handcrafted drinks and fresh bakes, made your way.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <MenuBrowser products={products} />
    </>
  );
}
