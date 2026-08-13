import { NextResponse } from "next/server";
import { requireRole, UnauthorizedError } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { toCsv, csvResponse } from "@/lib/csv";

const VALID_TYPES = ["orders", "customers", "rewards", "messages", "sales"] as const;
type ExportType = (typeof VALID_TYPES)[number];

export async function GET(_request: Request, { params }: { params: Promise<{ type: string }> }) {
  try {
    await requireRole("ADMIN");
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    throw error;
  }

  const { type } = await params;
  if (!VALID_TYPES.includes(type as ExportType)) {
    return NextResponse.json({ error: "Unknown export type." }, { status: 400 });
  }

  const dateStamp = new Date().toISOString().slice(0, 10);

  switch (type as ExportType) {
    case "orders": {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { items: true, user: true },
      });
      const csv = toCsv(orders, [
        { key: "orderNumber", label: "Order Number" },
        { key: (o) => o.user?.name ?? o.guestName ?? "Guest", label: "Customer" },
        { key: (o) => o.user?.email ?? o.guestEmail ?? "", label: "Email" },
        { key: (o) => o.items.length, label: "Items" },
        { key: "subtotal", label: "Subtotal (PHP)" },
        { key: "total", label: "Total (PHP)" },
        { key: "status", label: "Status" },
        { key: "pointsAwarded", label: "Points Awarded" },
        { key: (o) => o.createdAt.toISOString(), label: "Created At" },
        { key: (o) => o.completedAt?.toISOString() ?? "", label: "Completed At" },
      ]);
      return csvResponse(csv, `hola-orders-${dateStamp}.csv`);
    }

    case "customers": {
      const customers = await prisma.user.findMany({
        where: { role: "CUSTOMER" },
        orderBy: { createdAt: "desc" },
      });
      const csv = toCsv(customers, [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "points", label: "Points" },
        { key: "tier", label: "Tier" },
        { key: "ordersCompleted", label: "Orders Completed" },
        { key: (c) => (c.isActive ? "Active" : "Deactivated"), label: "Status" },
        { key: (c) => c.createdAt.toISOString(), label: "Joined" },
      ]);
      return csvResponse(csv, `hola-customers-${dateStamp}.csv`);
    }

    case "rewards": {
      const redemptions = await prisma.rewardRedemption.findMany({
        orderBy: { createdAt: "desc" },
        include: { reward: true, user: true },
      });
      const csv = toCsv(redemptions, [
        { key: (r) => r.user.name ?? "", label: "Customer" },
        { key: (r) => r.reward.name, label: "Reward" },
        { key: "points", label: "Points" },
        { key: "status", label: "Status" },
        { key: (r) => r.createdAt.toISOString(), label: "Redeemed At" },
        { key: (r) => r.approvedAt?.toISOString() ?? "", label: "Approved At" },
      ]);
      return csvResponse(csv, `hola-reward-redemptions-${dateStamp}.csv`);
    }

    case "messages": {
      const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
      const csv = toCsv(messages, [
        { key: "fullName", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "subject", label: "Subject" },
        { key: "message", label: "Message" },
        { key: "status", label: "Status" },
        { key: (m) => m.createdAt.toISOString(), label: "Received At" },
      ]);
      return csvResponse(csv, `hola-messages-${dateStamp}.csv`);
    }

    case "sales": {
      const orders = await prisma.order.findMany({
        where: { status: "COMPLETED" },
        orderBy: { completedAt: "desc" },
        include: { items: true },
      });
      const csv = toCsv(orders, [
        { key: "orderNumber", label: "Order Number" },
        { key: (o) => o.completedAt?.toISOString() ?? "", label: "Completed At" },
        { key: (o) => o.items.reduce((sum, i) => sum + i.quantity, 0), label: "Items Sold" },
        { key: "total", label: "Revenue (PHP)" },
        { key: "pointsAwarded", label: "Points Awarded" },
      ]);
      return csvResponse(csv, `hola-sales-${dateStamp}.csv`);
    }
  }
}
