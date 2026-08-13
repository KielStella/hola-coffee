"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

const staffSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string().min(2),
});

export type StaffInput = z.infer<typeof staffSchema>;

export async function createStaffAccount(input: StaffInput) {
  const session = await requireRole("ADMIN");
  const parsed = staffSchema.parse(input);
  const email = parsed.email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("An account with this email already exists.");

  const temporaryPassword = crypto.randomBytes(6).toString("hex");
  const hashedPassword = await bcrypt.hash(temporaryPassword, 12);

  const staff = await prisma.user.create({
    data: {
      name: parsed.name,
      email,
      phone: parsed.phone,
      position: parsed.position,
      role: "STAFF",
      password: hashedPassword,
    },
  });

  await logActivity({
    userId: session.user.id,
    action: `Admin created staff account for "${staff.name}"`,
    entity: "User",
    entityId: staff.id,
  });

  revalidatePath("/admin/staff");
  // Temporary password returned once so the admin can share it with the new staff member.
  return { staff, temporaryPassword };
}

export async function updateStaffAccount(id: string, input: Partial<StaffInput>) {
  const session = await requireRole("ADMIN");
  const parsed = staffSchema.partial().parse(input);

  const staff = await prisma.user.update({
    where: { id, role: "STAFF" },
    data: parsed,
  });

  await logActivity({
    userId: session.user.id,
    action: `Admin updated staff account "${staff.name}"`,
    entity: "User",
    entityId: id,
  });

  revalidatePath("/admin/staff");
}

export async function deactivateStaffAccount(id: string, isActive: boolean) {
  const session = await requireRole("ADMIN");
  const staff = await prisma.user.update({
    where: { id, role: "STAFF" },
    data: { isActive },
  });

  await logActivity({
    userId: session.user.id,
    action: `Admin ${isActive ? "reactivated" : "deactivated"} staff account "${staff.name}"`,
    entity: "User",
    entityId: id,
  });

  revalidatePath("/admin/staff");
}

export async function resetStaffPassword(id: string) {
  const session = await requireRole("ADMIN");
  const temporaryPassword = crypto.randomBytes(6).toString("hex");
  const hashedPassword = await bcrypt.hash(temporaryPassword, 12);

  const staff = await prisma.user.update({
    where: { id, role: "STAFF" },
    data: { password: hashedPassword },
  });

  await logActivity({
    userId: session.user.id,
    action: `Admin reset password for staff "${staff.name}"`,
    entity: "User",
    entityId: id,
  });

  revalidatePath("/admin/staff");
  return { temporaryPassword };
}
