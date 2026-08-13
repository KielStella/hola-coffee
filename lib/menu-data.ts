export const menuCategories = [
  "Coffee",
  "Iced Coffee",
  "Non Coffee",
  "Frappes",
  "Pastries",
  "Desserts",
] as const;

export type MenuCategory = (typeof menuCategories)[number];

/** Matches the Prisma `ProductTag` enum exactly — this is what's stored/validated, not what's displayed. */
export type ProductTag = "NEW" | "BEST_SELLER" | "SOLD_OUT";

export function formatTag(tag: ProductTag): string {
  return { NEW: "New", BEST_SELLER: "Best Seller", SOLD_OUT: "Sold Out" }[tag];
}

/** Matches the Prisma `SizeOption` enum exactly. */
export type SizeOption = "SMALL" | "MEDIUM" | "LARGE";

export const sizeOptions: SizeOption[] = ["SMALL", "MEDIUM", "LARGE"];

export function formatSize(size: SizeOption): string {
  return { SMALL: "Small", MEDIUM: "Medium", LARGE: "Large" }[size];
}

export const sizeAdjustments: Record<SizeOption, number> = {
  SMALL: -15,
  MEDIUM: 0,
  LARGE: 15,
};

/** Matches the Prisma `SweetnessOption` enum exactly. */
export type SweetnessOption = "ORIGINAL" | "LESS_SWEET" | "SWEETER";

export const sweetnessOptions: SweetnessOption[] = ["ORIGINAL", "LESS_SWEET", "SWEETER"];

export function formatSweetness(sweetness: SweetnessOption): string {
  return { ORIGINAL: "Original", LESS_SWEET: "Less Sweet", SWEETER: "Sweeter" }[sweetness];
}

export type MenuProduct = {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  tag?: ProductTag;
  /** Base price at Medium size, in PHP */
  basePrice: number;
  ingredients: string[];
  image?: string | null;
};

/**
 * Fallback menu shown only if the database is unreachable or hasn't been
 * seeded yet. The live `/menu` page fetches real `Product`/`Category` rows
 * from Postgres (see app/menu/page.tsx) — this array exists purely so the
 * page still renders something sensible before that succeeds, and its ids
 * intentionally do NOT match real database rows (ordering with a fallback
 * item will correctly fail with a friendly "unavailable" message rather
 * than silently succeeding against the wrong product).
 */
export const menuProducts: MenuProduct[] = [
  {
    id: "fallback-spanish-latte",
    name: "Spanish Latte",
    description: "Rich espresso balanced with condensed milk for a smooth, sweet sip.",
    category: "Coffee",
    tag: "BEST_SELLER",
    basePrice: 135,
    ingredients: ["Espresso", "Condensed milk", "Steamed milk"],
  },
  {
    id: "fallback-caramel-macchiato",
    name: "Caramel Macchiato",
    description: "Espresso layered with steamed milk and a swirl of caramel.",
    category: "Coffee",
    tag: "BEST_SELLER",
    basePrice: 145,
    ingredients: ["Espresso", "Steamed milk", "Vanilla syrup", "Caramel drizzle"],
  },
  {
    id: "fallback-iced-spanish-latte",
    name: "Iced Spanish Latte",
    description: "The HOLA classic, chilled and poured over ice.",
    category: "Iced Coffee",
    tag: "BEST_SELLER",
    basePrice: 145,
    ingredients: ["Espresso", "Condensed milk", "Milk", "Ice"],
  },
  {
    id: "fallback-matcha-latte",
    name: "Matcha Latte",
    description: "Stone-ground matcha whisked with creamy milk over ice.",
    category: "Non Coffee",
    basePrice: 150,
    ingredients: ["Matcha powder", "Milk", "Ice"],
  },
  {
    id: "fallback-mocha-frappe",
    name: "Mocha Frappe",
    description: "Blended coffee, chocolate, and milk topped with whipped cream.",
    category: "Frappes",
    tag: "BEST_SELLER",
    basePrice: 155,
    ingredients: ["Coffee", "Chocolate syrup", "Milk", "Ice", "Whipped cream"],
  },
  {
    id: "fallback-croissant",
    name: "Croissant",
    description: "Buttery, flaky, and baked fresh every morning.",
    category: "Pastries",
    basePrice: 95,
    ingredients: ["Butter", "Flour", "Yeast"],
  },
  {
    id: "fallback-blueberry-cheesecake",
    name: "Blueberry Cheesecake",
    description: "Creamy cheesecake topped with a sweet blueberry compote.",
    category: "Desserts",
    tag: "BEST_SELLER",
    basePrice: 165,
    ingredients: ["Cream cheese", "Graham crust", "Blueberry compote"],
  },
];

export function getProductsByCategory(products: MenuProduct[], category: MenuCategory): MenuProduct[] {
  return products
    .filter((p) => p.category === category)
    .sort((a, b) => {
      if (a.tag === "NEW" && b.tag !== "NEW") return -1;
      if (b.tag === "NEW" && a.tag !== "NEW") return 1;
      return 0;
    });
}
