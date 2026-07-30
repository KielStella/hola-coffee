import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding HOLA Coffee database...");

  // ---------- Settings ----------
  await prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteName: "HOLA Coffee",
      address: "123 Sampaguita Street, Quezon City, Metro Manila, Philippines",
      phone: "+63 917 123 4567",
      email: "hello@holacoffee.ph",
      facebookUrl: "https://facebook.com/holacoffee",
      instagramUrl: "https://instagram.com/holacoffee",
      hoursWeekday: "7:00 AM – 9:00 PM",
      hoursWeekend: "8:00 AM – 10:00 PM",
      pointsPerOrder: 15,
      birthdayBonusPoints: 100,
      pointsMultiplier: 1,
      seoTitle: "HOLA Coffee — Brewing Happiness One Cup at a Time.",
      seoDescription: "Freshly brewed coffee, handcrafted drinks, and cozy moments made for everyone.",
    },
  });

  // ---------- Accounts ----------
  const adminPassword = await bcrypt.hash("Admin123!", 12);
  const staffPassword = await bcrypt.hash("Staff123!", 12);
  const customerPassword = await bcrypt.hash("Customer123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@holacoffee.ph" },
    update: {},
    create: {
      name: "Maria Santos",
      email: "admin@holacoffee.ph",
      password: adminPassword,
      role: "ADMIN",
      position: "Manager",
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: "staff@holacoffee.ph" },
    update: {},
    create: {
      name: "John Cruz",
      email: "staff@holacoffee.ph",
      password: staffPassword,
      role: "STAFF",
      position: "Barista",
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      name: "Jasmine Ortiz",
      email: "customer@example.com",
      password: customerPassword,
      role: "CUSTOMER",
      points: 245,
      tier: "Bronze",
      ordersCompleted: 18,
    },
  });

  // ---------- Menu ----------
  const categories = [
    { name: "COFFEE" as const, label: "Coffee" },
    { name: "ICED_COFFEE" as const, label: "Iced Coffee" },
    { name: "NON_COFFEE" as const, label: "Non Coffee" },
    { name: "FRAPPES" as const, label: "Frappes" },
    { name: "PASTRIES" as const, label: "Pastries" },
    { name: "DESSERTS" as const, label: "Desserts" },
  ];

  const categoryRecords: Record<string, string> = {};
  for (const [i, cat] of categories.entries()) {
    const record = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name, label: cat.label, sortOrder: i },
    });
    categoryRecords[cat.name] = record.id;
  }

  const products = [
    { name: "Spanish Latte", description: "Rich espresso balanced with condensed milk.", ingredients: ["Espresso", "Condensed milk", "Steamed milk"], basePrice: 135, tag: "BEST_SELLER" as const, category: "COFFEE" },
    { name: "Caramel Macchiato", description: "Espresso layered with steamed milk and caramel.", ingredients: ["Espresso", "Steamed milk", "Caramel"], basePrice: 145, tag: "BEST_SELLER" as const, category: "COFFEE" },
    { name: "HOLA House Brew", description: "Our signature medium-roast drip coffee.", ingredients: ["Arabica beans", "Filtered water"], basePrice: 110, tag: null, category: "COFFEE" },
    { name: "Iced Spanish Latte", description: "The HOLA classic, chilled over ice.", ingredients: ["Espresso", "Condensed milk", "Milk", "Ice"], basePrice: 145, tag: "BEST_SELLER" as const, category: "ICED_COFFEE" },
    { name: "Iced Americano", description: "Bold espresso shots over ice.", ingredients: ["Espresso", "Water", "Ice"], basePrice: 120, tag: null, category: "ICED_COFFEE" },
    { name: "Matcha Latte", description: "Stone-ground matcha whisked with milk over ice.", ingredients: ["Matcha", "Milk", "Ice"], basePrice: 150, tag: null, category: "NON_COFFEE" },
    { name: "Strawberry Milk", description: "Fresh strawberry puree with creamy milk.", ingredients: ["Strawberry puree", "Milk", "Ice"], basePrice: 140, tag: "NEW" as const, category: "NON_COFFEE" },
    { name: "Mocha Frappe", description: "Blended coffee, chocolate, and milk.", ingredients: ["Coffee", "Chocolate syrup", "Milk", "Ice"], basePrice: 155, tag: "BEST_SELLER" as const, category: "FRAPPES" },
    { name: "Cookies & Cream Frappe", description: "Crushed cookies blended into a creamy frappe.", ingredients: ["Cookies", "Milk", "Ice"], basePrice: 160, tag: "SOLD_OUT" as const, category: "FRAPPES" },
    { name: "Croissant", description: "Buttery, flaky, baked fresh every morning.", ingredients: ["Butter", "Flour", "Yeast"], basePrice: 95, tag: null, category: "PASTRIES" },
    { name: "Chocolate Muffin", description: "A soft, fudgy muffin loaded with chocolate chips.", ingredients: ["Cocoa", "Chocolate chips", "Flour"], basePrice: 90, tag: "BEST_SELLER" as const, category: "PASTRIES" },
    { name: "Blueberry Cheesecake", description: "Creamy cheesecake topped with blueberry compote.", ingredients: ["Cream cheese", "Graham crust", "Blueberry"], basePrice: 165, tag: "BEST_SELLER" as const, category: "DESSERTS" },
    { name: "Mango Panna Cotta", description: "Silky panna cotta with fresh mango puree.", ingredients: ["Cream", "Gelatin", "Mango"], basePrice: 155, tag: "NEW" as const, category: "DESSERTS" },
  ];

  for (const [i, p] of products.entries()) {
    const existing = await prisma.product.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.product.create({
        data: {
          name: p.name,
          description: p.description,
          ingredients: p.ingredients,
          basePrice: p.basePrice,
          tag: p.tag ?? undefined,
          categoryId: categoryRecords[p.category],
          isFeatured: p.tag === "BEST_SELLER",
          sortOrder: i,
        },
      });
    }
  }

  // ---------- Rewards ----------
  const rewards = [
    { name: "Free Americano", description: "Redeem a classic Americano.", points: 150, category: "COFFEE" as const },
    { name: "Free Spanish Latte", description: "The HOLA signature, on us.", points: 250, category: "COFFEE" as const },
    { name: "Free Matcha Latte", description: "Creamy stone-ground matcha latte.", points: 260, category: "NON_COFFEE" as const },
    { name: "Free Croissant", description: "Buttery croissant baked fresh daily.", points: 180, category: "PASTRIES" as const },
    { name: "Blueberry Cheesecake Slice", description: "Creamy cheesecake with blueberry compote.", points: 320, category: "DESSERTS" as const },
    { name: "HOLA Coffee Mug", description: "Our signature ceramic mug.", points: 500, category: "MERCHANDISE" as const },
    { name: "HOLA Tumbler", description: "Insulated stainless steel tumbler.", points: 900, category: "MERCHANDISE" as const },
    { name: "Limited Edition T-Shirt", description: "Soft cotton tee with an exclusive HOLA print.", points: 1500, category: "LIMITED_EDITION" as const },
  ];

  for (const [i, r] of rewards.entries()) {
    const existing = await prisma.reward.findFirst({ where: { name: r.name } });
    if (!existing) {
      await prisma.reward.create({ data: { ...r, sortOrder: i } });
    }
  }

  // ---------- Testimonials ----------
  const testimonials = [
    { name: "Jasmine Ortiz", rating: 5, review: "The Spanish Latte is my favorite. I order it every single morning." },
    { name: "Miguel Bautista", rating: 5, review: "The atmosphere is perfect for studying. Never feels rushed." },
    { name: "Karla Villanueva", rating: 5, review: "I always come back because of the friendly staff." },
    { name: "Ethan Dizon", rating: 4, review: "Cozy spot with genuinely good coffee." },
  ];
  for (const [i, t] of testimonials.entries()) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name, review: t.review } });
    if (!existing) await prisma.testimonial.create({ data: { ...t, sortOrder: i } });
  }

  // ---------- Gallery ----------
  const galleryCaptions = [
    "Latte art on a warm Spanish Latte",
    "Golden hour by the window seats",
    "Fresh croissants straight from the oven",
    "Friends catching up over iced coffee",
    "Our cozy corner reading nook",
    "Weekend regulars and their furry friends",
  ];
  for (const [i, caption] of galleryCaptions.entries()) {
    const existing = await prisma.gallery.findFirst({ where: { caption } });
    if (!existing) await prisma.gallery.create({ data: { image: `/images/gallery/${i + 1}.jpg`, caption, sortOrder: i } });
  }

  // ---------- Promotions ----------
  const promotions = [
    { title: "Buy 2 Get 1 Free", description: "Order two handcrafted drinks and get a third free.", startDate: new Date("2026-07-01"), endDate: new Date("2026-08-31") },
    { title: "20% Student Discount", description: "Show a valid student ID for 20% off, every weekday.", startDate: new Date("2026-01-01"), endDate: new Date("2026-12-31") },
  ];
  for (const promo of promotions) {
    const existing = await prisma.promotion.findFirst({ where: { title: promo.title } });
    if (!existing) await prisma.promotion.create({ data: promo });
  }

  // ---------- Sample orders & points history for the demo customer ----------
  const spanishLatte = await prisma.product.findFirst({ where: { name: "Spanish Latte" } });
  if (spanishLatte) {
    const existingOrder = await prisma.order.findFirst({ where: { userId: customer.id } });
    if (!existingOrder) {
      const order = await prisma.order.create({
        data: {
          orderNumber: "HOLA-104822",
          userId: customer.id,
          status: "COMPLETED",
          subtotal: spanishLatte.basePrice,
          total: spanishLatte.basePrice,
          pointsAwarded: 15,
          completedAt: new Date(),
          items: {
            create: [
              {
                productId: spanishLatte.id,
                productName: spanishLatte.name,
                size: "MEDIUM",
                sweetness: "ORIGINAL",
                quantity: 1,
                unitPrice: spanishLatte.basePrice,
              },
            ],
          },
        },
      });

      await prisma.pointsHistory.create({
        data: { userId: customer.id, orderId: order.id, pointsEarned: 15, runningTotal: customer.points },
      });
    }
  }

  // ---------- Sample contact message ----------
  const existingMessage = await prisma.contactMessage.findFirst();
  if (!existingMessage) {
    await prisma.contactMessage.create({
      data: {
        fullName: "Ethan Dizon",
        email: "ethan@example.com",
        subject: "Catering inquiry",
        message: "Hi! Do you offer catering for office events? We'd love 20 drinks for a Friday morning meeting.",
      },
    });
  }

  console.log("Seed complete.");
  console.log("Admin login:    admin@holacoffee.ph / Admin123!");
  console.log("Staff login:    staff@holacoffee.ph / Staff123!");
  console.log("Customer login: customer@example.com / Customer123!");
  console.log(`(created by user ids: admin=${admin.id}, staff=${staff.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
