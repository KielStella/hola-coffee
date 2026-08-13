export const rewardCategories = [
  "Coffee",
  "Non Coffee",
  "Pastries",
  "Desserts",
  "Merchandise",
  "Limited Edition",
] as const;

export type RewardCategory = (typeof rewardCategories)[number];

/** Matches the Prisma `RewardCategoryName` enum exactly — used to map DB rows to display labels. */
export type RewardCategoryName =
  | "COFFEE"
  | "NON_COFFEE"
  | "PASTRIES"
  | "DESSERTS"
  | "MERCHANDISE"
  | "LIMITED_EDITION";

const categoryLabels: Record<RewardCategoryName, RewardCategory> = {
  COFFEE: "Coffee",
  NON_COFFEE: "Non Coffee",
  PASTRIES: "Pastries",
  DESSERTS: "Desserts",
  MERCHANDISE: "Merchandise",
  LIMITED_EDITION: "Limited Edition",
};

export function formatRewardCategory(category: RewardCategoryName): RewardCategory {
  return categoryLabels[category];
}

export type Reward = {
  id: string;
  name: string;
  description: string;
  points: number;
  category: RewardCategory;
  badge?: "Popular" | "Limited";
  image?: string | null;
};

export const rewards: Reward[] = [
  {
    id: "free-americano",
    name: "Free Americano",
    description: "Redeem a classic, bold Americano — hot or iced.",
    points: 150,
    category: "Coffee",
    badge: "Popular",
  },
  {
    id: "free-spanish-latte",
    name: "Free Spanish Latte",
    description: "The HOLA signature, on us.",
    points: 250,
    category: "Coffee",
    badge: "Popular",
  },
  {
    id: "free-iced-coffee-upsize",
    name: "Free Size Upgrade",
    description: "Upsize any iced coffee to Large, free of charge.",
    points: 90,
    category: "Coffee",
  },
  {
    id: "free-matcha-latte",
    name: "Free Matcha Latte",
    description: "Treat yourself to a creamy, stone-ground matcha latte.",
    points: 260,
    category: "Non Coffee",
  },
  {
    id: "free-strawberry-milk",
    name: "Free Strawberry Milk",
    description: "Fresh, fruity, and refreshing — completely free.",
    points: 230,
    category: "Non Coffee",
  },
  {
    id: "free-croissant",
    name: "Free Croissant",
    description: "A buttery, flaky croissant baked fresh daily.",
    points: 180,
    category: "Pastries",
  },
  {
    id: "chocolate-muffin-reward",
    name: "Chocolate Muffin",
    description: "A rich, fudgy chocolate chip muffin.",
    points: 180,
    category: "Pastries",
    badge: "Popular",
  },
  {
    id: "blueberry-cheesecake-reward",
    name: "Blueberry Cheesecake Slice",
    description: "Creamy cheesecake topped with blueberry compote.",
    points: 320,
    category: "Desserts",
  },
  {
    id: "mango-panna-cotta-reward",
    name: "Mango Panna Cotta",
    description: "Silky panna cotta with fresh mango puree.",
    points: 300,
    category: "Desserts",
  },
  {
    id: "hola-mug",
    name: "HOLA Coffee Mug",
    description: "Our signature ceramic mug, perfect for home brews.",
    points: 500,
    category: "Merchandise",
  },
  {
    id: "hola-tumbler",
    name: "HOLA Tumbler",
    description: "Insulated stainless steel tumbler with the HOLA logo.",
    points: 900,
    category: "Merchandise",
  },
  {
    id: "hola-tote-bag",
    name: "HOLA Canvas Tote Bag",
    description: "A sturdy, everyday canvas tote featuring our logo.",
    points: 650,
    category: "Merchandise",
  },
  {
    id: "hola-tshirt",
    name: "Limited Edition T-Shirt",
    description: "Soft cotton tee with an exclusive HOLA Coffee print.",
    points: 1500,
    category: "Limited Edition",
    badge: "Limited",
  },
  {
    id: "hola-anniversary-box",
    name: "Anniversary Gift Box",
    description: "A curated box of HOLA favorites, available for a limited time.",
    points: 2000,
    category: "Limited Edition",
    badge: "Limited",
  },
];

export function getRewardsByCategory(rewardsList: Reward[], category: RewardCategory): Reward[] {
  return rewardsList.filter((r) => r.category === category);
}

/** Looks up a reward within a given list (e.g. the fallback catalog). For real redemptions, actions/rewards.ts queries the database directly instead. */
export function getRewardById(rewardsList: Reward[], id: string): Reward | undefined {
  return rewardsList.find((r) => r.id === id);
}

export const testimonials = [
  {
    id: "t1",
    name: "Jasmine Ortiz",
    rating: 5,
    review: "The Spanish Latte is my favorite. I order it every single morning before work.",
  },
  {
    id: "t2",
    name: "Miguel Bautista",
    rating: 5,
    review: "The atmosphere is perfect for studying. Comfortable seats, great wifi, and it never feels rushed.",
  },
  {
    id: "t3",
    name: "Karla Villanueva",
    rating: 5,
    review: "I always come back because of the friendly staff. They remember my order every time.",
  },
  {
    id: "t4",
    name: "Ethan Dizon",
    rating: 4,
    review: "Cozy spot with genuinely good coffee. The rewards program makes every visit even better.",
  },
];

export const galleryImages = [
  { id: "g1", caption: "Latte art on a warm Spanish Latte" },
  { id: "g2", caption: "Golden hour by the window seats" },
  { id: "g3", caption: "Fresh croissants straight from the oven" },
  { id: "g4", caption: "Friends catching up over iced coffee" },
  { id: "g5", caption: "Our cozy corner reading nook" },
  { id: "g6", caption: "Weekend regulars and their furry friends" },
];

export const promotions = [
  {
    id: "buy2get1",
    title: "Buy 2 Get 1 Free",
    description: "Order any two handcrafted drinks and get a third of equal or lesser value free.",
    startDate: "July 1, 2026",
    endDate: "August 31, 2026",
  },
  {
    id: "student-discount",
    title: "20% Student Discount",
    description: "Show a valid student ID and enjoy 20% off your entire order, every weekday.",
    startDate: "Ongoing",
    endDate: "Until further notice",
  },
  {
    id: "happy-hour",
    title: "Happy Hour",
    description: "All frappes and iced drinks are 15% off from 2 PM to 4 PM, daily.",
    startDate: "Daily",
    endDate: "2:00 PM – 4:00 PM",
  },
  {
    id: "weekend-specials",
    title: "Weekend Specials",
    description: "Enjoy a free pastry with any Large drink purchase every Saturday and Sunday.",
    startDate: "Every Saturday",
    endDate: "Every Sunday",
  },
];

export const faqs = [
  {
    id: "reservations",
    question: "Do you accept reservations?",
    answer:
      "We're a walk-in café, but for group gatherings of 6 or more, feel free to message us ahead of time on Facebook or Instagram and we'll do our best to prepare a spot for you.",
  },
  {
    id: "delivery",
    question: "Do you offer delivery?",
    answer:
      "HOLA Coffee is self-pickup only for now. Order ahead using our Menu and QR ordering system, then pick up at the counter — no delivery fees, no waiting in line.",
  },
  {
    id: "customize",
    question: "Can I customize my drink?",
    answer:
      "Yes! Every drink lets you choose your size, sweetness level, and add special instructions like less ice or an extra shot when you order.",
  },
  {
    id: "how-rewards-work",
    question: "How does HOLA Rewards work?",
    answer:
      "Every completed purchase earns you loyalty points. Collect points and redeem them for free drinks, pastries, desserts, and exclusive merchandise on the Rewards page.",
  },
  {
    id: "redeem-rewards",
    question: "How do I redeem rewards?",
    answer:
      "Choose an available reward on the Rewards page, confirm your redemption, and present the generated Reward QR Code to our cashier.",
  },
  {
    id: "qr-validity",
    question: "How long is my QR valid?",
    answer:
      "Order QR codes are scanned to begin preparation right away. Reward QR codes are valid for 30 minutes after you redeem them.",
  },
];
