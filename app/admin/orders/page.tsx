import { prisma } from "@/lib/prisma";
import OrderStatusControls from "@/components/dashboard/OrderStatusControls";
import OrderSourceBadge from "@/components/dashboard/OrderSourceBadge";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { items: true, user: true },
  });

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Orders</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">All customer and guest orders, most recent first.</p>

      <div className="mt-6 overflow-x-auto rounded-hola-lg bg-white shadow-sm">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-hola-beige text-xs uppercase tracking-wide text-hola-brown-soft">
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-hola-beige last:border-none">
                <td className="px-5 py-3 font-display text-hola-brown">{order.orderNumber}</td>
                <td className="px-5 py-3">
                  <OrderSourceBadge source={order.source} />
                </td>
                <td className="px-5 py-3 text-hola-brown-soft">
                  {order.user?.name ?? order.guestName ?? "Guest"}
                </td>
                <td className="px-5 py-3 text-hola-brown-soft">{order.items.length}</td>
                <td className="px-5 py-3 text-hola-brown-soft">₱{order.total}</td>
                <td className="px-5 py-3">
                  <OrderStatusControls orderId={order.id} currentStatus={order.status} />
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-hola-brown-soft">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
