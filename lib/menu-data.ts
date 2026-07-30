export const menuCategories = [
  "Coffee",
  "Iced Coffee",
  "Non Coffee",
  "Frappes",
  "Pastries",
  "Desserts",
] as const;

export type MenuCategory = (typeof menuCategories)[number];

export type ProductTag = "NEW" | "BEST SELLER" | "SOLD OUT";

export type SizeOption = "Small" | "Medium" | "Large";

export type MenuProduct = {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  tag?: ProductTag;
  /** Base price at Medium size, in PHP */
  basePrice: number;
  ingredients: string[];
};

export const sizeAdjustments: Record<SizeOption, number> = {
  Small: -15,
  Medium: 0,
  Large: 15,
};

export const sweetnessOptions = ["Original", "Less Sweet", "Sweeter"] as const;
export type SweetnessOption = (typeof sweetnessOptions)[number];

export const menuProducts: MenuProduct[] = [
  // Coffee
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    description: "Rich espresso balanced with condensed milk for a smooth, sweet sip.",
    category: "Coffee",
    tag: "BEST SELLER",
    basePrice: 135,
    ingredients: ["Espresso", "Condensed milk", "Steamed milk"],
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    description: "Espresso layered with steamed milk and a swirl of caramel.",
    category: "Coffee",
    tag: "BEST SELLER",
    basePrice: 145,
    ingredients: ["Espresso", "Steamed milk", "Vanilla syrup", "Caramel drizzle"],
  },
  {
    id: "hola-brew",
    name: "HOLA House Brew",
    description: "Our signature medium-roast drip coffee, brewed fresh all day.",
    category: "Coffee",
    basePrice: 110,
    ingredients: ["Arabica coffee beans", "Filtered water"],
  },
  {
    id: "honey-cinnamon-latte",
    name: "Honey Cinnamon Latte",
    description: "Espresso and steamed milk sweetened with honey and warm cinnamon.",
    category: "Coffee",
    tag: "NEW",
    basePrice: 150,
    ingredients: ["Espresso", "Steamed milk", "Honey", "Cinnamon"],
  },

  // Iced Coffee
  {
    id: "iced-spanish-latte",
    name: "Iced Spanish Latte",
    description: "The HOLA classic, chilled and poured over ice.",
    category: "Iced Coffee",
    tag: "BEST SELLER",
    basePrice: 145,
    ingredients: ["Espresso", "Condensed milk", "Milk", "Ice"],
  },
  {
    id: "iced-americano",
    name: "Iced Americano",
    description: "Bold espresso shots over ice with a splash of water.",
    category: "Iced Coffee",
    basePrice: 120,
    ingredients: ["Espresso", "Water", "Ice"],
  },
  {
    id: "vanilla-iced-latte",
    name: "Vanilla Iced Latte",
    description: "Smooth espresso and milk with a hint of vanilla, served cold.",
    category: "Iced Coffee",
    tag: "NEW",
    basePrice: 145,
    ingredients: ["Espresso", "Milk", "Vanilla syrup", "Ice"],
  },

  // Non Coffee
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    description: "Stone-ground matcha whisked with creamy milk over ice.",
    category: "Non Coffee",
    basePrice: 150,
    ingredients: ["Matcha powder", "Milk", "Ice"],
  },
  {
    id: "strawberry-milk",
    name: "Strawberry Milk",
    description: "Fresh strawberry puree blended with creamy fresh milk.",
    category: "Non Coffee",
    tag: "NEW",
    basePrice: 140,
    ingredients: ["Strawberry puree", "Fresh milk", "Ice"],
  },
  {
    id: "choco-hola",
    name: "Choco HOLA",
    description: "Rich chocolate milk topped with whipped cream.",
    category: "Non Coffee",
    basePrice: 135,
    ingredients: ["Chocolate syrup", "Milk", "Whipped cream"],
  },

  // Frappes
  {
    id: "mocha-frappe",
    name: "Mocha Frappe",
    description: "Blended coffee, chocolate, and milk topped with whipped cream.",
    category: "Frappes",
    tag: "BEST SELLER",
    basePrice: 155,
    ingredients: ["Coffee", "Chocolate syrup", "Milk", "Ice", "Whipped cream"],
  },
  {
    id: "caramel-frappe",
    name: "Caramel Frappe",
    description: "Blended coffee and caramel finished with caramel drizzle.",
    category: "Frappes",
    basePrice: 155,
    ingredients: ["Coffee", "Caramel syrup", "Milk", "Ice", "Whipped cream"],
  },
  {
    id: "cookies-cream-frappe",
    name: "Cookies & Cream Frappe",
    description: "Crushed cookies blended into a creamy, dreamy frappe.",
    category: "Frappes",
    tag: "SOLD OUT",
    basePrice: 160,
    ingredients: ["Cookies", "Milk", "Ice", "Whipped cream"],
  },

  // Pastries
  {
    id: "croissant",
    name: "Croissant",
    description: "Buttery, flaky, and baked fresh every morning.",
    category: "Pastries",
    basePrice: 95,
    ingredients: ["Butter", "Flour", "Yeast"],
  },
  {
    id: "chocolate-muffin",
    name: "Chocolate Muffin",
    description: "A soft, fudgy muffin loaded with chocolate chips.",
    category: "Pastries",
    tag: "BEST SELLER",
    basePrice: 90,
    ingredients: ["Cocoa", "Chocolate chips", "Flour", "Butter"],
  },
  {
    id: "cheese-roll",
    name: "Cheese Roll",
    description: "Soft milk bread rolled with a generous layer of cheese.",
    category: "Pastries",
    tag: "NEW",
    basePrice: 85,
    ingredients: ["Milk bread", "Cheese"],
  },

  // Desserts
  {
    id: "blueberry-cheesecake",
    name: "Blueberry Cheesecake",
    description: "Creamy cheesecake topped with a sweet blueberry compote.",
    category: "Desserts",
    tag: "BEST SELLER",
    basePrice: 165,
    ingredients: ["Cream cheese", "Graham crust", "Blueberry compote"],
  },
  {
    id: "chocolate-lava-cake",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten chocolate center.",
    category: "Desserts",
    tag: "SOLD OUT",
    basePrice: 175,
    ingredients: ["Dark chocolate", "Butter", "Flour", "Eggs"],
  },
  {
    id: "mango-panna-cotta",
    name: "Mango Panna Cotta",
    description: "Silky panna cotta topped with fresh mango puree.",
    category: "Desserts",
    tag: "NEW",
    basePrice: 155,
    ingredients: ["Cream", "Gelatin", "Mango puree"],
  },
];

export function getProductsByCategory(category: MenuCategory): MenuProduct[] {
  return menuProducts
    .filter((p) => p.category === category)
    .sort((a, b) => {
      if (a.tag === "NEW" && b.tag !== "NEW") return -1;
      if (b.tag === "NEW" && a.tag !== "NEW") return 1;
      return 0;
    });
}

export function getProductById(id: string): MenuProduct | undefined {
  return menuProducts.find((p) => p.id === id);
}
