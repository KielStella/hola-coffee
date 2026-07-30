"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

const settingsSchema = z.object({
  siteName: z.string().min(1).optional(),
  logoUrl: z.string().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  mapsUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  hoursWeekday: z.string().optional(),
  hoursWeekend: z.string().optional(),
  pointsPerOrder: z.number().int().nonnegative().optional(),
  birthdayBonusPoints: z.number().int().nonnegative().optional(),
  pointsMultiplier: z.number().positive().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

export async function getSettings() {
  return prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
}

export async function updateSettings(input: SettingsInput) {
  const session = await requireRole("ADMIN");
  const parsed = settingsSchema.parse(input);

  const settings = await prisma.settings.upsert({
    where: { id: "singleton" },
    update: parsed,
    create: { id: "singleton", ...parsed },
  });

  await logActivity({ userId: session.user.id, action: "Admin updated website settings", entity: "Settings" });

  revalidatePath("/", "layout");
  return settings;
}
