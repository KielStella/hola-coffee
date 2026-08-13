"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  ingredients: z.array(z.string()).default([]),
  basePrice: z.number().int().positive(),
  image: z.string().optional(),
  tag: z.enum(["NEW", "BEST_SELLER", "SOLD_OUT"]).optional().nullable(),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().min(1),
});

export type ProductInput = z.infer<typeof productSchema>;

export async function createProduct(input: ProductInput) {
  const session = await requireRole("ADMIN");
  const parsed = productSchema.parse(input);

  const product = await prisma.product.create({ data: parsed });
  await logActivity({
    userId: session.user.id,
    action: `Admin created menu item "${product.name}"`,
    entity: "Product",
    entityId: product.id,
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  const session = await requireRole("ADMIN");
  const parsed = productSchema.partial().parse(input);

  const product = await prisma.product.update({ where: { id }, data: parsed });
  await logActivity({
    userId: session.user.id,
    action: `Admin updated menu item "${product.name}"`,
    entity: "Product",
    entityId: product.id,
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function deleteProduct(id: string) {
  const session = await requireRole("ADMIN");
  const product = await prisma.product.delete({ where: { id } });
  await logActivity({
    userId: session.user.id,
    action: `Admin deleted menu item "${product.name}"`,
    entity: "Product",
    entityId: id,
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function toggleProductAvailability(id: string, isAvailable: boolean) {
  const session = await requireRole("ADMIN", "STAFF");
  const product = await prisma.product.update({
    where: { id },
    data: { isAvailable, tag: isAvailable ? undefined : "SOLD_OUT" },
  });

  await logActivity({
    userId: session.user.id,
    action: `${isAvailable ? "Enabled" : "Marked sold out"}: "${product.name}"`,
    entity: "Product",
    entityId: id,
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}
