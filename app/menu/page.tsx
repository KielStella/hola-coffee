"use client";

import { useMemo, useState } from "react";
import { Coffee } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingDecor from "@/components/FloatingDecor";
import CategoryTabs from "@/components/menu/CategoryTabs";
import ProductCard from "@/components/menu/ProductCard";
import ProductModal from "@/components/menu/ProductModal";
import { getProductsByCategory, type MenuCategory, type MenuProduct } from "@/lib/menu-data";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Coffee");
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);

  const products = useMemo(() => getProductsByCategory(activeCategory), [activeCategory]);

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

      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

      <section className="bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px]">
          {products.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <Coffee className="h-12 w-12 text-hola-brown-soft/40" />
              <p className="mt-4 font-display text-xl text-hola-brown">Currently unavailable.</p>
              <p className="mt-1 text-sm text-hola-brown-soft">Please check back later.</p>
            </div>
          ) : (
            <div
              key={activeCategory}
              className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              {products.map((product, i) => (
                <AnimatedSection key={product.id} delay={(i % 3) * 0.08}>
                  <ProductCard product={product} onViewDetails={setSelectedProduct} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
