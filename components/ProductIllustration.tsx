import { Coffee, CupSoda, IceCreamCone, Croissant as CroissantIcon, CakeSlice, Leaf } from "lucide-react";
import type { ProductIcon } from "@/lib/data";

const iconMap: Record<ProductIcon, typeof Coffee> = {
  "spanish-latte": Coffee,
  "caramel-macchiato": CupSoda,
  "matcha-latte": Leaf,
  "mocha-frappe": IceCreamCone,
  croissant: CroissantIcon,
  "chocolate-muffin": CakeSlice,
  "blueberry-cheesecake": CakeSlice,
};

const gradientMap: Record<ProductIcon, string> = {
  "spanish-latte": "from-hola-brown-soft to-hola-brown",
  "caramel-macchiato": "from-hola-yellow to-hola-brown-soft",
  "matcha-latte": "from-hola-blue to-emerald-600",
  "mocha-frappe": "from-hola-brown to-hola-blue-dark",
  croissant: "from-hola-yellow-soft to-hola-yellow",
  "chocolate-muffin": "from-hola-brown-soft to-hola-brown",
  "blueberry-cheesecake": "from-hola-blue to-hola-blue-dark",
};

export default function ProductIllustration({
  icon,
  name,
  className = "",
}: {
  icon: ProductIcon;
  name: string;
  className?: string;
}) {
  const Icon = iconMap[icon];
  const gradient = gradientMap[icon];

  return (
    <div
      role="img"
      aria-label={name}
      className={`relative flex items-center justify-center overflow-hidden bg-linear-to-br ${gradient} ${className}`}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/10" />
      <Icon className="relative h-16 w-16 text-white drop-shadow-sm sm:h-20 sm:w-20" strokeWidth={1.5} />
    </div>
  );
}
