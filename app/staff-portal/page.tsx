import Link from "next/link";
import { Clock, ChefHat, PackageCheck, CircleCheck, MessageSquare, QrCode, ShoppingBag } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function StaffDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [pending, preparing, ready, completedToday, unreadMessages] = await Promise.all([
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "PREPARING" } }),
    prisma.order.count({ where: { status: "READY" } }),
    prisma.order.count({ where: { status: "COMPLETED", completedAt: { gte: today } } }),
    prisma.contactMessage.count({ where: { status: "UNREAD" } }),
  ]);

  const cards = [
    { label: "Pending", value: pending, icon: Clock },
    { label: "Preparing", value: preparing, icon: ChefHat },
    { label: "Ready", value: ready, icon: PackageCheck },
    { label: "Completed Today", value: completedToday, icon: CircleCheck },
    { label: "Unread Inquiries", value: unreadMessages, icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Staff Dashboard</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Here&apos;s what needs attention right now.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {cards.map((card) => (
          <div key={card.label} className="rounded-hola-lg bg-white p-4 shadow-sm">
            <card.icon className="h-5 w-5 text-hola-blue-dark" />
            <p className="mt-2 font-display text-xl text-hola-brown">{card.value}</p>
            <p className="text-xs text-hola-brown-soft">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link href="/staff-portal/scanner" className="flex items-center gap-3 rounded-hola-lg bg-hola-blue p-5 text-white shadow-sm transition hover:bg-hola-blue-dark">
          <QrCode className="h-6 w-6" />
          <span className="font-display">Scan QR</span>
        </Link>
        <Link href="/staff-portal/orders" className="flex items-center gap-3 rounded-hola-lg bg-white p-5 text-hola-brown shadow-sm transition hover:bg-hola-beige">
          <ShoppingBag className="h-6 w-6 text-hola-blue-dark" />
          <span className="font-display">Orders</span>
        </Link>
        <Link href="/staff-portal/messages" className="flex items-center gap-3 rounded-hola-lg bg-white p-5 text-hola-brown shadow-sm transition hover:bg-hola-beige">
          <MessageSquare className="h-6 w-6 text-hola-blue-dark" />
          <span className="font-display">Messages</span>
        </Link>
      </div>
    </div>
  );
}
