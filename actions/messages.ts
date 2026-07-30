"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

export async function listContactMessages() {
  await requireRole("ADMIN", "STAFF");
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
}

export async function markMessageRead(id: string) {
  await requireRole("ADMIN", "STAFF");
  await prisma.contactMessage.update({ where: { id }, data: { status: "READ" } });
  revalidatePath("/staff-portal/messages");
  revalidatePath("/admin/messages");
}

export async function markMessageReplied(id: string) {
  const session = await requireRole("ADMIN", "STAFF");
  await prisma.contactMessage.update({ where: { id }, data: { status: "REPLIED" } });
  await logActivity({ userId: session.user.id, action: "Replied to a contact message", entity: "ContactMessage", entityId: id });
  revalidatePath("/staff-portal/messages");
  revalidatePath("/admin/messages");
}

export async function archiveMessage(id: string) {
  await requireRole("ADMIN", "STAFF");
  await prisma.contactMessage.update({ where: { id }, data: { status: "ARCHIVED" } });
  revalidatePath("/staff-portal/messages");
  revalidatePath("/admin/messages");
}

export async function deleteMessagePermanently(id: string) {
  const session = await requireRole("ADMIN");
  await prisma.contactMessage.delete({ where: { id } });
  await logActivity({ userId: session.user.id, action: "Admin permanently deleted a contact message" });
  revalidatePath("/admin/messages");
}
