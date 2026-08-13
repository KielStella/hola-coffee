"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { logActivity } from "@/lib/activity-log";
import { checkRateLimit, getClientIdentifier, RateLimitError } from "@/lib/rate-limit";
import { philippinePhoneSchema } from "@/lib/validations/auth";

const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: philippinePhoneSchema,
  subject: z.string().min(3),
  message: z.string().min(10),
});

export type ContactInput = z.infer<typeof contactSchema>;

export async function submitContactMessage(input: ContactInput) {
  try {
    await checkRateLimit(`contact:${await getClientIdentifier()}`, 5, 10 * 60_000);
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { success: false as const, error: error.message };
    }
    throw error;
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const session = await auth();

  const contactMessage = await prisma.contactMessage.create({
    data: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject: parsed.data.subject,
      message: parsed.data.message,
      userId: session?.user?.id,
    },
  });

  await logActivity({
    userId: session?.user?.id,
    action: "Customer submitted a contact message",
    entity: "ContactMessage",
    entityId: contactMessage.id,
  });

  const adminEmail = process.env.BUSINESS_EMAIL;
  console.info(`[email disabled] Would send contact confirmation to ${parsed.data.email}`);
  if (adminEmail) {
    console.info(`[email disabled] Would notify admin at ${adminEmail} about subject: ${parsed.data.subject}`);
  }

  return { success: true as const };
}
