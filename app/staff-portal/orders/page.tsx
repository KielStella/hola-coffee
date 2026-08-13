import { prisma } from "@/lib/prisma";
import OrderStatusControls from "@/components/dashboard/OrderStatusControls";
import OrderSourceBadge from "@/components/dashboard/OrderSourceBadge";
import { formatSize, formatSweetness } from "@/lib/menu-data";

export const dynamic = "force-dynamic";

export default async function StaffOrdersPage() {
  const orders = await prisma.order.findMany({
    where: { status: { in: ["PENDING", "CONFIRMED", "PREPARING", "READY"] } },
    orderBy: { createdAt: "asc" },
    include: { items: true, user: true },
  });

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Active Orders</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Orders currently in the pipeline, oldest first.</p>

      <div className="mt-6 space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="rounded-hola-lg bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="flex items-center gap-2 font-display text-hola-brown">
                  {order.orderNumber}
                  <OrderSourceBadge source={order.source} />
                </p>
                <p className="text-xs text-hola-brown-soft">{order.user?.name ?? order.guestName ?? "Guest"}</p>
              </div>
              <OrderStatusControls orderId={order.id} currentStatus={order.status} />
            </div>
            <ul className="mt-3 space-y-1 text-sm text-hola-brown-soft">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.productName} × {item.quantity} ({formatSize(item.size)}, {formatSweetness(item.sweetness)})
                  {item.instructions && <span className="italic"> — &ldquo;{item.instructions}&rdquo;</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="rounded-hola-lg bg-white p-8 text-center text-sm text-hola-brown-soft shadow-sm">
            No active orders right now.
          </p>
        )}
      </div>
    </div>
  );
}
