import { prisma } from "@/lib/prisma";
import StaffManager from "@/components/dashboard/StaffManager";

export const dynamic = "force-dynamic";

export default async function AdminStaffPage() {
  const staff = await prisma.user.findMany({ where: { role: "STAFF" }, orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Staff Management</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Create and manage staff accounts.</p>
      <div className="mt-6">
        <StaffManager staff={staff} />
      </div>
    </div>
  );
}
