"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { requireRole } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";
import { sendEmail, orderConfirmationEmail } from "@/lib/email";

const orderItemSchema = z.object({
  productId: z.string(),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
  sweetness: z.enum(["ORIGINAL", "LESS_SWEET", "SWEETER"]),
  instructions: z.string().optional(),
  quantity: z.number().int().positive(),
});

const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  guestName: z.string().optional(),
  guestEmail: z.string().email().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

const sizeAdjustment: Record<string, number> = { SMALL: -15, MEDIUM: 0, LARGE: 15 };

function generateOrderNumber() {
  return `HOLA-${Math.floor(100000 + Math.random() * 899999)}`;
}

/**
 * Creates a self-pickup QR order. Works for both logged-in customers and
 * guests (self-pickup ordering shouldn't require an account) — prices are
 * always recomputed server-side from the current product catalog, never
 * trusted from the client.
 */
export async function createOrder(input: CreateOrderInput) {
  const parsed = createOrderSchema.parse(input);
  const session = await auth();

  const productIds = [...new Set(parsed.items.map((i) => i.productId))];
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const productMap = new Map(products.map((p) => [p.id, p]));

  let subtotal = 0;
  const itemsData = parsed.items.map((item) => {
    const product = productMap.get(item.productId);
    if (!product || !product.isAvailable) {
      throw new Error(`"${product?.name ?? item.productId}" is currently unavailable.`);
    }
    const unitPrice = product.basePrice + sizeAdjustment[item.size];
    subtotal += unitPrice * item.quantity;
    return {
      productId: product.id,
      productName: product.name,
      size: item.size,
      sweetness: item.sweetness,
      instructions: item.instructions,
      quantity: item.quantity,
      unitPrice,
    };
  });

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      userId: session?.user?.id,
      guestName: session?.user ? undefined : parsed.guestName,
      guestEmail: session?.user ? undefined : parsed.guestEmail,
      subtotal,
      total: subtotal,
      items: { create: itemsData },
    },
    include: { items: true },
  });

  await logActivity({
    userId: session?.user?.id,
    action: `Order ${order.orderNumber} placed`,
    entity: "Order",
    entityId: order.id,
  });

  const recipientEmail = session?.user?.email ?? parsed.guestEmail;
  if (recipientEmail) {
    await sendEmail({
      to: recipientEmail,
      subject: `Your HOLA Coffee order ${order.orderNumber}`,
      html: orderConfirmationEmail(order.orderNumber, order.total),
    });
  }

  return order;
}

export async function getOrderByQrToken(qrToken: string) {
  await requireRole("ADMIN", "STAFF");
  return prisma.order.findUnique({
    where: { qrToken },
    include: { items: true, user: true },
  });
}

const STATUS_TIMESTAMP_FIELD: Record<string, string> = {
  CONFIRMED: "confirmedAt",
  PREPARING: "preparingAt",
  READY: "readyAt",
  COMPLETED: "completedAt",
  CANCELLED: "cancelledAt",
};

export async function updateOrderStatus(
  orderId: string,
  status: "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED"
) {
  const session = await requireRole("ADMIN", "STAFF");

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Order not found.");

  const timestampField = STATUS_TIMESTAMP_FIELD[status];

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      scannedAt: order.scannedAt ?? new Date(),
      ...(timestampField ? { [timestampField]: new Date() } : {}),
    },
  });

  // Points are only ever awarded once, exactly when an order is marked Completed.
  if (status === "COMPLETED" && order.userId && order.pointsAwarded === 0) {
    const settings = await prisma.settings.findUnique({ where: { id: "singleton" } });
    const pointsPerOrder = settings?.pointsPerOrder ?? 15;
    const multiplier = settings?.pointsMultiplier ?? 1;
    const pointsEarned = Math.round(pointsPerOrder * multiplier);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: order.userId! },
        data: {
          points: { increment: pointsEarned },
          ordersCompleted: { increment: 1 },
        },
      });

      await tx.order.update({ where: { id: orderId }, data: { pointsAwarded: pointsEarned } });

      await tx.pointsHistory.create({
        data: {
          userId: order.userId!,
          orderId: order.id,
          pointsEarned,
          runningTotal: user.points,
        },
      });
    });
  }

  await logActivity({
    userId: session.user.id,
    action: `Staff marked order ${order.orderNumber} as ${status}`,
    entity: "Order",
    entityId: orderId,
  });

  revalidatePath("/staff-portal/orders");
  revalidatePath("/admin/orders");
  return updated;
}
