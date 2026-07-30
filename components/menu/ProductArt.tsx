import { Coffee, CupSoda, Leaf, IceCreamCone, Croissant as CroissantIcon, CakeSlice } from "lucide-react";
import type { MenuCategory } from "@/lib/menu-data";

const iconMap: Record<MenuCategory, typeof Coffee> = {
  Coffee: Coffee,
  "Iced Coffee": CupSoda,
  "Non Coffee": Leaf,
  Frappes: IceCreamCone,
  Pastries: CroissantIcon,
  Desserts: CakeSlice,
};

const gradientMap: Record<MenuCategory, string> = {
  Coffee: "from-hola-brown-soft to-hola-brown",
  "Iced Coffee": "from-hola-blue to-hola-blue-dark",
  "Non Coffee": "from-emerald-400 to-hola-blue-dark",
  Frappes: "from-hola-brown to-hola-blue-dark",
  Pastries: "from-hola-yellow-soft to-hola-yellow",
  Desserts: "from-hola-blue to-hola-brown-soft",
};

export default function ProductArt({
  category,
  name,
  className = "",
  iconClassName = "h-16 w-16 sm:h-20 sm:w-20",
}: {
  category: MenuCategory;
  name: string;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = iconMap[category];
  const gradient = gradientMap[category];

  return (
    <div
      role="img"
      aria-label={name}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/10" />
      <Icon className={`relative text-white drop-shadow-sm ${iconClassName}`} strokeWidth={1.5} />
    </div>
  );
}
