import { prisma } from "@/lib/prisma";
import CustomerManager from "@/components/dashboard/CustomerManager";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Customers</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Search, review, and manage customer accounts.</p>
      <div className="mt-6">
        <CustomerManager initialCustomers={customers} />
      </div>
    </div>
  );
}
