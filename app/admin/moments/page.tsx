import { prisma } from "@/lib/prisma";
import MomentsManager from "@/components/dashboard/MomentsManager";

export const dynamic = "force-dynamic";

export default async function AdminMomentsPage() {
  const moments = await prisma.moment.findMany({
    orderBy: [{ isApproved: "asc" }, { createdAt: "desc" }],
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Customer Moments</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Review customer photos before they appear on the homepage.</p>
      <div className="mt-6"><MomentsManager moments={moments} /></div>
    </div>
  );
}
