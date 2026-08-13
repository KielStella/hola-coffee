import { formatTag, type ProductTag } from "@/lib/menu-data";

const styles: Record<ProductTag, string> = {
  NEW: "bg-hola-yellow text-hola-brown",
  BEST_SELLER: "bg-red-500 text-white",
  SOLD_OUT: "bg-gray-400 text-white",
};

export default function ProductTagBadge({ tag }: { tag: ProductTag }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow ${styles[tag]}`}
    >
      {formatTag(tag)}
    </span>
  );
}
