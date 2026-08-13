import { prisma } from "@/lib/prisma";
import WalkInOrderForm from "@/components/dashboard/WalkInOrderForm";

export const dynamic = "force-dynamic";

export default async function StaffWalkInPage() {
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
    include: { category: true },
  });

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Walk-In Order</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Ring up an order for a customer at the counter.</p>
      <div className="mt-6">
        <WalkInOrderForm products={products} ordersBasePath="/staff-portal/orders" />
      </div>
    </div>
  );
}
