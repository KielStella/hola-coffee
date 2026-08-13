import ProductArt from "./ProductArt";
import ProductTagBadge from "./ProductTagBadge";
import type { MenuProduct } from "@/lib/menu-data";

export default function ProductCard({
  product,
  onViewDetails,
}: {
  product: MenuProduct;
  onViewDetails: (product: MenuProduct) => void;
}) {
  const soldOut = product.tag === "SOLD_OUT";

  return (
    <article
      className={`group h-full overflow-hidden rounded-hola-lg bg-white shadow-md ring-1 ring-hola-brown/5 transition duration-300 ${
        soldOut ? "" : "hover:-translate-y-2 hover:shadow-2xl"
      }`}
    >
      <button
        type="button"
        disabled={soldOut}
        onClick={() => onViewDetails(product)}
        aria-disabled={soldOut}
        aria-label={soldOut ? `${product.name} — currently unavailable` : `View details for ${product.name}`}
        className={`relative block h-44 w-full overflow-hidden text-left ${
          soldOut ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div
          className={`h-full w-full transition duration-500 ${
            soldOut ? "opacity-40 grayscale" : "group-hover:scale-110"
          }`}
        >
          <ProductArt category={product.category} name={product.name} image={product.image} className="h-full w-full" />
        </div>
        {product.tag && (
          <span className="absolute left-4 top-4">
            <ProductTagBadge tag={product.tag} />
          </span>
        )}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-hola-brown">
              Currently Unavailable
            </span>
          </div>
        )}
      </button>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg text-hola-brown">{product.name}</h3>
          <span className="whitespace-nowrap font-display text-hola-blue-dark">
            ₱{product.basePrice}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-hola-brown-soft">
          {product.description}
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-hola-brown-soft/70">
          {product.category}
        </p>
        <button
          type="button"
          disabled={soldOut}
          onClick={() => onViewDetails(product)}
          aria-disabled={soldOut}
          className="mt-4 w-full rounded-full bg-hola-brown px-5 py-2.5 text-sm font-display text-white transition enabled:hover:bg-hola-blue-dark enabled:hover:shadow-lg enabled:hover:shadow-hola-blue/30 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {soldOut ? "Sold Out" : "View Details"}
        </button>
      </div>
    </article>
  );
}
