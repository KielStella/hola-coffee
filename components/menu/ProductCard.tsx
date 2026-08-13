import { ArrowUpRight, Plus } from "lucide-react";
import ProductArt from "./ProductArt";
import ProductTagBadge from "./ProductTagBadge";
import type { MenuProduct } from "@/lib/menu-data";

export default function ProductCard({ product, onViewDetails }: { product: MenuProduct; onViewDetails: (product: MenuProduct) => void }) {
  const soldOut = product.tag === "SOLD_OUT";
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-hola-brown/[.07] bg-white shadow-[0_18px_50px_-35px_rgba(74,51,37,.65)] transition duration-500 ${soldOut ? "opacity-75" : "hover:-translate-y-2 hover:shadow-2xl"}`}>
      <button type="button" disabled={soldOut} onClick={() => onViewDetails(product)} aria-label={soldOut ? `${product.name} — currently unavailable` : `Customize ${product.name}`} className={`relative block h-64 w-full overflow-hidden text-left ${soldOut ? "cursor-not-allowed" : "cursor-pointer"}`}>
        <div className={`h-full w-full transition duration-700 ${soldOut ? "grayscale" : "group-hover:scale-110 group-hover:rotate-1"}`}><ProductArt category={product.category} name={product.name} image={product.image} className="h-full w-full" iconClassName="h-24 w-24" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        {product.tag && <span className="absolute left-5 top-5"><ProductTagBadge tag={product.tag} /></span>}
        {!soldOut && <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-hola-brown shadow-lg transition duration-300 group-hover:rotate-90 group-hover:bg-hola-yellow"><Plus className="h-5 w-5" /></span>}
        {soldOut && <div className="absolute inset-0 flex items-center justify-center bg-hola-brown/40"><span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-hola-brown shadow">Currently unavailable</span></div>}
      </button>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-hola-blue-dark">{product.category}</p><h3 className="mt-2 text-2xl leading-tight text-hola-brown">{product.name}</h3></div><span className="shrink-0 rounded-full bg-hola-beige px-3 py-1.5 font-display text-hola-brown">₱{product.basePrice}</span></div>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-7 text-hola-brown-soft">{product.description}</p>
        <button type="button" disabled={soldOut} onClick={() => onViewDetails(product)} className="mt-5 flex w-full items-center justify-between border-t border-hola-brown/[.07] pt-4 text-left font-display text-hola-brown transition enabled:hover:text-hola-blue-dark disabled:cursor-not-allowed disabled:text-hola-brown-soft/50"><span>{soldOut ? "Sold out" : "Customize & add"}</span><ArrowUpRight className="h-5 w-5" /></button>
      </div>
    </article>
  );
}
