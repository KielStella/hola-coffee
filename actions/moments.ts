"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

const momentSchema = z.object({
  image: z.string().url(),
  caption: z.string().trim().min(3, "Please add a short caption.").max(180),
  category: z.enum(["Drinks", "Food", "Ambiance", "Latte Art", "Friends", "Sweet Treats"]),
});

export async function getApprovedMoments() {
  return prisma.moment.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
    take: 12,
    select: {
      id: true,
      image: true,
      caption: true,
      category: true,
      createdAt: true,
      user: { select: { name: true, image: true } },
    },
  });
}

export async function createMoment(input: z.infer<typeof momentSchema>) {
  const session = await requireAuth();
  const parsed = momentSchema.parse(input);

  const url = new URL(parsed.image);
  const validBlob =
    url.protocol === "https:" &&
    url.hostname.endsWith(".public.blob.vercel-storage.com") &&
    url.pathname.includes(`/moments/${session.user.id}/`);
  if (!validBlob) throw new Error("Please upload the photo using the Add Moment form.");

  await prisma.moment.create({ data: { ...parsed, userId: session.user.id } });
  revalidatePath("/");
  revalidatePath("/admin/moments");
  return { success: true as const };
}

export async function approveMoment(id: string) {
  const session = await requireRole("ADMIN");
  await prisma.moment.update({ where: { id }, data: { isApproved: true } });
  await logActivity({ userId: session.user.id, action: "Approved customer moment", entity: "Moment", entityId: id });
  revalidatePath("/");
  revalidatePath("/admin/moments");
}

export async function rejectMoment(id: string) {
  const session = await requireRole("ADMIN");
  const moment = await prisma.moment.delete({ where: { id } });
  if (moment.image.includes(".public.blob.vercel-storage.com")) {
    await del(moment.image).catch((error) => console.error("[moments] failed to delete image:", error));
  }
  await logActivity({ userId: session.user.id, action: "Deleted customer moment", entity: "Moment", entityId: id });
  revalidatePath("/");
  revalidatePath("/admin/moments");
}
