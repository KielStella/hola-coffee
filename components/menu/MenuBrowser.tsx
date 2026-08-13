"use client";

import { useMemo, useState } from "react";
import { Coffee } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CategoryTabs from "@/components/menu/CategoryTabs";
import ProductCard from "@/components/menu/ProductCard";
import ProductModal from "@/components/menu/ProductModal";
import { getProductsByCategory, type MenuCategory, type MenuProduct } from "@/lib/menu-data";

export default function MenuBrowser({ products }: { products: MenuProduct[] }) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Coffee");
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);

  const visibleProducts = useMemo(
    () => getProductsByCategory(products, activeCategory),
    [products, activeCategory]
  );

  return (
    <>
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

      <section className="bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px]">
          {visibleProducts.length === 0 ? (
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
              {visibleProducts.map((product, i) => (
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
