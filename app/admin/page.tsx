import { ShoppingBag, Clock, ChefHat, PackageCheck, CircleCheck, TrendingUp, Users, Gift } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DashboardBarChart from "@/components/dashboard/DashboardBarChart";

export const dynamic = "force-dynamic";

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default async function AdminDashboardPage() {
  const today = startOfDay(new Date());
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 6);

  const [
    todayOrders,
    pending,
    preparing,
    ready,
    completedToday,
    revenueTodayAgg,
    customersToday,
    redemptionsToday,
    weekOrders,
    recentOrders,
    popularProducts,
  ] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: today } } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "PREPARING" } }),
    prisma.order.count({ where: { status: "READY" } }),
    prisma.order.count({ where: { status: "COMPLETED", completedAt: { gte: today } } }),
    prisma.order.aggregate({ where: { createdAt: { gte: today } }, _sum: { total: true } }),
    prisma.order.findMany({ where: { createdAt: { gte: today } }, distinct: ["userId"], select: { userId: true } }),
    prisma.rewardRedemption.count({ where: { createdAt: { gte: today } } }),
    prisma.order.findMany({ where: { createdAt: { gte: weekAgo } }, select: { createdAt: true, total: true } }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { items: true } }),
    prisma.orderItem.groupBy({ by: ["productName"], _sum: { quantity: true }, orderBy: { _sum: { quantity: "desc" } }, take: 5 }),
  ]);

  const cards = [
    { label: "Today's Orders", value: todayOrders, icon: ShoppingBag },
    { label: "Pending", value: pending, icon: Clock },
    { label: "Preparing", value: preparing, icon: ChefHat },
    { label: "Ready", value: ready, icon: PackageCheck },
    { label: "Completed Today", value: completedToday, icon: CircleCheck },
    { label: "Revenue Today", value: `₱${revenueTodayAgg._sum.total ?? 0}`, icon: TrendingUp },
    { label: "Customers Today", value: customersToday.length, icon: Users },
    { label: "Reward Redemptions", value: redemptionsToday, icon: Gift },
  ];

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(weekAgo);
    d.setDate(d.getDate() + i);
    return d;
  });
  const weeklySales = days.map((d) => {
    const label = d.toLocaleDateString("en-US", { weekday: "short" });
    const value = weekOrders
      .filter((o) => startOfDay(o.createdAt).getTime() === startOfDay(d).getTime())
      .reduce((sum, o) => sum + o.total, 0);
    return { label, value };
  });

  const popularChart = popularProducts.map((p) => ({ label: p.productName, value: p._sum.quantity ?? 0 }));

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Dashboard</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">A quick look at how HOLA Coffee is doing today.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-hola-lg bg-white p-4 shadow-sm">
            <card.icon className="h-5 w-5 text-hola-blue-dark" />
            <p className="mt-2 font-display text-xl text-hola-brown">{card.value}</p>
            <p className="text-xs text-hola-brown-soft">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-hola-lg bg-white p-5 shadow-sm">
          <h2 className="font-display text-lg text-hola-brown">Weekly Sales</h2>
          <div className="mt-4">
            <DashboardBarChart data={weeklySales} />
          </div>
        </div>
        <div className="rounded-hola-lg bg-white p-5 shadow-sm">
          <h2 className="font-display text-lg text-hola-brown">Popular Drinks</h2>
          <div className="mt-4">
            <DashboardBarChart data={popularChart} color="#F8DC6B" />
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-hola-lg bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg text-hola-brown">Recent Orders</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-hola-brown-soft">
                <th className="pb-2">Order</th>
                <th className="pb-2">Items</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-hola-beige">
                  <td className="py-2 font-display text-hola-brown">{order.orderNumber}</td>
                  <td className="py-2 text-hola-brown-soft">{order.items.length}</td>
                  <td className="py-2 text-hola-brown-soft">₱{order.total}</td>
                  <td className="py-2">
                    <span className="rounded-full bg-hola-beige px-2.5 py-1 text-xs font-semibold text-hola-blue-dark">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-hola-brown-soft">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
