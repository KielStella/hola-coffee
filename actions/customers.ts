"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

export async function searchCustomers(query: string) {
  await requireRole("ADMIN");

  return prisma.user.findMany({
    where: {
      role: "CUSTOMER",
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function getCustomerDetail(id: string) {
  await requireRole("ADMIN");

  return prisma.user.findUnique({
    where: { id, role: "CUSTOMER" },
    include: {
      orders: { orderBy: { createdAt: "desc" }, take: 10 },
      rewardRedemptions: { orderBy: { createdAt: "desc" }, take: 10, include: { reward: true } },
      pointsHistory: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  });
}

export async function deactivateCustomerAccount(id: string, isActive: boolean) {
  const session = await requireRole("ADMIN");
  const customer = await prisma.user.update({
    where: { id, role: "CUSTOMER" },
    data: { isActive },
  });

  await logActivity({
    userId: session.user.id,
    action: `Admin ${isActive ? "reactivated" : "deactivated"} customer "${customer.name}"`,
    entity: "User",
    entityId: id,
  });

  revalidatePath("/admin/customers");
  return customer;
}

export async function resetCustomerPassword(id: string) {
  const session = await requireRole("ADMIN");
  const temporaryPassword = crypto.randomBytes(6).toString("hex");
  const hashedPassword = await bcrypt.hash(temporaryPassword, 12);

  const customer = await prisma.user.update({
    where: { id, role: "CUSTOMER" },
    data: { password: hashedPassword },
  });

  await logActivity({
    userId: session.user.id,
    action: `Admin reset password for customer "${customer.name}"`,
    entity: "User",
    entityId: id,
  });

  return { temporaryPassword };
}
