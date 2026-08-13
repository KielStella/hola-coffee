"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIdentifier, RateLimitError } from "@/lib/rate-limit";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function subscribeToNewsletter(email: string) {
  const parsed = newsletterSchema.safeParse({ email });
  if (!parsed.success) {
    return { success: false as const, error: "Please enter a valid email address." };
  }

  try {
    await checkRateLimit(`newsletter:${await getClientIdentifier()}`, 5, 60_000);
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { success: false as const, error: error.message };
    }
    throw error;
  }

  await prisma.newsletter.upsert({
    where: { email: parsed.data.email.toLowerCase() },
    update: {},
    create: { email: parsed.data.email.toLowerCase() },
  });

  return { success: true as const };
}
