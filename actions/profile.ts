"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type MyProfile = {
  name: string;
  email: string;
  phone: string;
};

/** Returns the signed-in user's name/email/phone for autofilling forms, or null if not signed in. */
export async function getMyProfile(): Promise<MyProfile | null> {
  const session = await auth();
  if (!session?.user) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, phone: true },
  });
  if (!user) return null;

  return {
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
  };
}
