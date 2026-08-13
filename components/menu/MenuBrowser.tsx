"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import ProductCard from "@/components/menu/ProductCard";
import ProductModal from "@/components/menu/ProductModal";
import { menuCategories, type MenuCategory, type MenuProduct } from "@/lib/menu-data";

type CategoryFilter = "All" | MenuCategory;
type SortOption = "featured" | "price-low" | "price-high";

export default function MenuBrowser({ products }: { products: MenuProduct[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => activeCategory === "All" || product.category === activeCategory)
      .filter((product) => !normalized || `${product.name} ${product.description} ${product.ingredients.join(" ")}`.toLowerCase().includes(normalized))
      .sort((a, b) => {
        if (sort === "price-low") return a.basePrice - b.basePrice;
        if (sort === "price-high") return b.basePrice - a.basePrice;
        const rank = (item: MenuProduct) => item.tag === "NEW" ? 0 : item.tag === "BEST_SELLER" ? 1 : item.tag === "SOLD_OUT" ? 3 : 2;
        return rank(a) - rank(b);
      });
  }, [products, activeCategory, query, sort]);

  const categories: CategoryFilter[] = ["All", ...menuCategories];

  return <>
    <div className="sticky top-[64px] z-30 border-b border-hola-brown/10 bg-white/90 backdrop-blur-xl sm:top-[76px]">
      <div className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Menu categories">
          {categories.map(category => <button key={category} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-5 py-2.5 font-display text-sm transition duration-300 ${activeCategory === category ? "bg-hola-brown text-white shadow-lg" : "bg-hola-beige text-hola-brown hover:bg-hola-yellow-soft"}`}>{category}{category === "All" && <span className="ml-2 text-xs opacity-60">{products.length}</span>}</button>)}
        </div>
      </div>
    </div>

    <section className="min-h-[600px] bg-[#fffdf9] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-hola-blue-dark"><Sparkles className="h-4 w-4" /> Explore the menu</span><h2 className="mt-3 text-3xl text-hola-brown sm:text-5xl">{activeCategory === "All" ? "Everything delicious" : activeCategory}</h2><p className="mt-2 text-sm text-hola-brown-soft">{visibleProducts.length} {visibleProducts.length === 1 ? "item" : "items"} ready to discover</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative block"><span className="sr-only">Search menu</span><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-hola-brown-soft" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search drinks, ingredients..." className="w-full rounded-full border border-hola-brown/10 bg-white py-3 pl-11 pr-11 text-sm text-hola-brown shadow-sm outline-none transition focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/20 sm:w-72" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-hola-brown-soft hover:bg-hola-beige"><X className="h-4 w-4" /></button>}</label>
            <label className="relative"><span className="sr-only">Sort menu</span><SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-hola-blue-dark" /><select value={sort} onChange={e => setSort(e.target.value as SortOption)} className="w-full appearance-none rounded-full border border-hola-brown/10 bg-white py-3 pl-11 pr-9 text-sm text-hola-brown shadow-sm outline-none focus:border-hola-blue sm:w-auto"><option value="featured">Featured first</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {visibleProducts.length === 0 ? <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-12 flex flex-col items-center rounded-[2.5rem] border-2 border-dashed border-hola-blue/20 bg-hola-beige/60 px-6 py-20 text-center"><Coffee className="h-12 w-12 text-hola-blue/40" /><p className="mt-4 font-display text-2xl text-hola-brown">No perfect match yet.</p><p className="mt-2 text-sm text-hola-brown-soft">Try another search or browse all categories.</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("All"); }} className="mt-6 rounded-full bg-hola-brown px-6 py-3 font-display text-white">Show everything</button></motion.div> :
          <motion.div key={`${activeCategory}-${query}-${sort}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .3 }} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((product, i) => <motion.div key={product.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * .045, .3), duration: .45 }}><ProductCard product={product} onViewDetails={setSelectedProduct} /></motion.div>)}</motion.div>}
        </AnimatePresence>
      </div>
    </section>
    <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
  </>;
}
