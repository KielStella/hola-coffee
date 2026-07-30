"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { logActivity } from "@/lib/activity-log";
import { sendEmail, contactConfirmationEmail, contactAdminNotificationEmail } from "@/lib/email";

const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export type ContactInput = z.infer<typeof contactSchema>;

export async function submitContactMessage(input: ContactInput) {
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
  await Promise.all([
    sendEmail({
      to: parsed.data.email,
      subject: "Thank you for contacting HOLA Coffee",
      html: contactConfirmationEmail(parsed.data.fullName),
    }),
    adminEmail
      ? sendEmail({
          to: adminEmail,
          subject: `New inquiry: ${parsed.data.subject}`,
          html: contactAdminNotificationEmail(
            parsed.data.fullName,
            parsed.data.email,
            parsed.data.subject,
            parsed.data.message
          ),
        })
      : Promise.resolve(),
  ]);

  return { success: true as const };
}
