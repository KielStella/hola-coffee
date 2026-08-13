export type NavLink = {
  label: string;
  href: string;
  caption: string;
};

export const primaryNavLinksLeft: NavLink[] = [
  {
    label: "Our Story",
    href: "/our-story",
    caption: "Learn how HOLA Coffee started.",
  },
  {
    label: "Menu",
    href: "/menu",
    caption: "Browse handcrafted drinks and snacks.",
  },
];

export const primaryNavLinksRight: NavLink[] = [
  {
    label: "Staff",
    href: "/staff",
    caption: "Meet the people behind every cup.",
  },
  {
    label: "Rewards",
    href: "/rewards",
    caption: "Earn points and redeem exclusive rewards.",
  },
  {
    label: "Contact Us",
    href: "/contact",
    caption: "Questions, concerns, or feedback? We'd love to hear from you.",
  },
];

export type ProductIcon =
  | "spanish-latte"
  | "caramel-macchiato"
  | "matcha-latte"
  | "mocha-frappe"
  | "croissant"
  | "chocolate-muffin"
  | "blueberry-cheesecake";

export type FeaturedProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: ProductIcon;
  badge?: "Popular";
  category: string;
};

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    description: "Rich espresso balanced with condensed milk for a smooth, sweet sip.",
    price: "₱135",
    icon: "spanish-latte",
    badge: "Popular",
    category: "Coffee",
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    description: "Espresso layered with steamed milk and a swirl of caramel.",
    price: "₱145",
    icon: "caramel-macchiato",
    badge: "Popular",
    category: "Coffee",
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    description: "Stone-ground matcha whisked with creamy milk over ice.",
    price: "₱150",
    icon: "matcha-latte",
    category: "Non Coffee",
  },
  {
    id: "mocha-frappe",
    name: "Mocha Frappe",
    description: "Blended coffee, chocolate, and milk topped with whipped cream.",
    price: "₱155",
    icon: "mocha-frappe",
    badge: "Popular",
    category: "Frappes",
  },
  {
    id: "croissant",
    name: "Croissant",
    description: "Buttery, flaky, and baked fresh every morning.",
    price: "₱95",
    icon: "croissant",
    category: "Pastries",
  },
  {
    id: "chocolate-muffin",
    name: "Chocolate Muffin",
    description: "A soft, fudgy muffin loaded with chocolate chips.",
    price: "₱90",
    icon: "chocolate-muffin",
    category: "Pastries",
  },
  {
    id: "blueberry-cheesecake",
    name: "Blueberry Cheesecake",
    description: "Creamy cheesecake topped with a sweet blueberry compote.",
    price: "₱165",
    icon: "blueberry-cheesecake",
    category: "Desserts",
  },
];

export type StaffMember = {
  id: string;
  name: string;
  position: string;
  quote: string;
  initials: string;
};

export const staffMembers: StaffMember[] = [
  {
    id: "maria-santos",
    name: "Maria Santos",
    position: "Manager",
    quote: "Our goal is to make every customer feel at home.",
    initials: "MS",
  },
  {
    id: "john-cruz",
    name: "John Cruz",
    position: "Barista",
    quote: "Crafting every cup with passion.",
    initials: "JC",
  },
  {
    id: "angela-reyes",
    name: "Angela Reyes",
    position: "Cashier",
    quote: "Serving every guest with a smile.",
    initials: "AR",
  },
];

export type TimelineEvent = {
  id: string;
  title: string;
  year: string;
  description: string;
};

export const storyTimeline: TimelineEvent[] = [
  {
    id: "dream",
    title: "The Dream",
    year: "2019",
    description:
      "A small idea sparked between friends who believed a neighborhood deserved a warmer place to gather over coffee.",
  },
  {
    id: "opening-day",
    title: "Opening Day",
    year: "2021",
    description:
      "HOLA Coffee opened its doors for the first time, welcoming the community with its very first cup of Spanish Latte.",
  },
  {
    id: "growing-community",
    title: "Growing Community",
    year: "2023",
    description:
      "Regulars became friends, and HOLA Coffee grew into a daily ritual for students, remote workers, and families alike.",
  },
  {
    id: "future-goals",
    title: "Future Goals",
    year: "Ahead",
    description:
      "New branches, new blends, and new ways to bring people together — one cup, one HOLA at a time.",
  },
];

export type RewardPreview = {
  id: string;
  name: string;
  category: "Coffee" | "Pastries" | "Desserts" | "Gift Items";
};

export const rewardsPreview: RewardPreview[] = [
  { id: "free-americano", name: "Free Americano", category: "Coffee" },
  { id: "free-croissant", name: "Free Croissant", category: "Pastries" },
  { id: "free-cheesecake", name: "Slice of Cheesecake", category: "Desserts" },
  { id: "hola-tumbler", name: "HOLA Tumbler", category: "Gift Items" },
];

export const whyChooseHola = [
  {
    id: "fresh-ingredients",
    title: "Fresh Ingredients",
    description: "Every drink is made fresh using carefully selected ingredients.",
    icon: "Leaf",
  },
  {
    id: "handcrafted-drinks",
    title: "Handcrafted Drinks",
    description: "Every cup is prepared with care and consistency.",
    icon: "Coffee",
  },
  {
    id: "cozy-environment",
    title: "Cozy Environment",
    description: "Perfect for studying, relaxing, or meeting friends.",
    icon: "Sofa",
  },
  {
    id: "friendly-service",
    title: "Friendly Service",
    description: "Our team is committed to making every visit enjoyable.",
    icon: "Smile",
  },
];

export const businessInfo = {
  address: "123 Sampaguita Street, Quezon City, Metro Manila, Philippines",
  hours: [
    { day: "Monday – Friday", time: "7:00 AM – 9:00 PM" },
    { day: "Saturday – Sunday", time: "8:00 AM – 10:00 PM" },
  ],
  phone: "+63 917 123 4567",
  email: "hello@holacoffee.ph",
  facebook: "https://facebook.com/holacoffee",
  instagram: "https://instagram.com/holacoffee",
  tiktok: "https://www.tiktok.com/@holacoffee",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.6!2d121.0437!3d14.6760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQwJzMzLjYiTiAxMjHCsDAyJzM3LjMiRQ!5e0!3m2!1sen!2sph",
};

import { menuProducts } from "./menu-data";
import { rewards as fullRewardsCatalog } from "./rewards-data";

/** Flat search index used by the global search overlay */
export type SearchItem = {
  id: string;
  title: string;
  type: "Page" | "Menu" | "Category" | "Reward" | "Staff";
  href: string;
  description: string;
};

export const searchIndex: SearchItem[] = [
  { id: "page-home", title: "Home", type: "Page", href: "/", description: "HOLA Coffee homepage." },
  { id: "page-our-story", title: "Our Story", type: "Page", href: "/our-story", description: "Learn how HOLA Coffee started." },
  { id: "page-menu", title: "Menu", type: "Page", href: "/menu", description: "Browse handcrafted drinks and snacks." },
  { id: "page-staff", title: "Staff", type: "Page", href: "/staff", description: "Meet the people behind every cup." },
  { id: "page-rewards", title: "Rewards", type: "Page", href: "/rewards", description: "Earn points and redeem exclusive rewards." },
  { id: "page-contact", title: "Contact Us", type: "Page", href: "/contact", description: "Questions, concerns, or feedback? We'd love to hear from you." },
  ...menuProducts.map((p) => ({
    id: `product-${p.id}`,
    title: p.name,
    type: "Menu" as const,
    href: "/menu",
    description: p.description,
  })),
  ...[...new Set(menuProducts.map((p) => p.category))].map((c) => ({
    id: `category-${c}`,
    title: c,
    type: "Category" as const,
    href: "/menu",
    description: `Browse the ${c} category.`,
  })),
  ...fullRewardsCatalog.map((r) => ({
    id: `reward-${r.id}`,
    title: r.name,
    type: "Reward" as const,
    href: "/rewards",
    description: `${r.points} points — ${r.description}`,
  })),
  ...staffMembers.map((s) => ({
    id: `staff-${s.id}`,
    title: s.name,
    type: "Staff" as const,
    href: "/staff",
    description: `${s.position} at HOLA Coffee.`,
  })),
];
