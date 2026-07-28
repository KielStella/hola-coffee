import { Coffee, Leaf, Croissant as CroissantIcon, CakeSlice, Gift, Shirt } from "lucide-react";
import type { RewardCategory } from "@/lib/rewards-data";

const iconMap: Record<RewardCategory, typeof Coffee> = {
  Coffee: Coffee,
  "Non Coffee": Leaf,
  Pastries: CroissantIcon,
  Desserts: CakeSlice,
  Merchandise: Gift,
  "Limited Edition": Shirt,
};

const gradientMap: Record<RewardCategory, string> = {
  Coffee: "from-hola-brown-soft to-hola-brown",
  "Non Coffee": "from-emerald-400 to-hola-blue-dark",
  Pastries: "from-hola-yellow-soft to-hola-yellow",
  Desserts: "from-hola-blue to-hola-brown-soft",
  Merchandise: "from-hola-blue to-hola-blue-dark",
  "Limited Edition": "from-hola-brown to-hola-yellow",
};

export default function RewardArt({
  category,
  name,
  className = "",
  iconClassName = "h-14 w-14 sm:h-16 sm:w-16",
}: {
  category: RewardCategory;
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
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/15" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10" />
      <Icon className={`relative text-white drop-shadow-sm ${iconClassName}`} strokeWidth={1.5} />
    </div>
  );
}
