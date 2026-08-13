import { ShoppingBag, Clock, ChefHat, PackageCheck, CircleCheck, Users, Gift, TrendingUp, QrCode, Store } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DashboardBarChart from "@/components/dashboard/DashboardBarChart";
import PeriodTabs from "@/components/dashboard/PeriodTabs";
import OrderSourceBadge from "@/components/dashboard/OrderSourceBadge";
import {
  salesPeriods,
  revenuePeriods,
  getSalesBuckets,
  getSalesOverallRange,
  getRevenueDateRange,
  type SalesPeriod,
  type RevenuePeriod,
} from "@/lib/dashboard-analytics";

export const dynamic = "force-dynamic";

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSalesPeriod(v: string | undefined): v is SalesPeriod {
  return v === "weekly" || v === "monthly" || v === "yearly";
}
function isRevenuePeriod(v: string | undefined): v is RevenuePeriod {
  return v === "today" || v === "week" || v === "month" || v === "year";
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ sales?: string; revenue?: string }>;
}) {
  const params = await searchParams;
  const salesPeriod: SalesPeriod = isSalesPeriod(params.sales) ? params.sales : "weekly";
  const revenuePeriod: RevenuePeriod = isRevenuePeriod(params.revenue) ? params.revenue : "today";

  const today = startOfDay(new Date());
  const now = new Date();

  const salesRange = getSalesOverallRange(salesPeriod, now);
  const revenueRange = getRevenueDateRange(revenuePeriod, now);

  // "Sales"/"Revenue" exclude cancelled orders — a cancelled order isn't a completed sale.
  const NOT_CANCELLED = { status: { not: "CANCELLED" as const } };

  const [
    todayOrders,
    pending,
    preparing,
    ready,
    completedToday,
    customersToday,
    redemptionsToday,
    salesOrders,
    revenueBySource,
    recentOrders,
    popularProducts,
  ] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: today } } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "PREPARING" } }),
    prisma.order.count({ where: { status: "READY" } }),
    prisma.order.count({ where: { status: "COMPLETED", completedAt: { gte: today } } }),
    prisma.order.findMany({ where: { createdAt: { gte: today } }, distinct: ["userId"], select: { userId: true } }),
    prisma.rewardRedemption.count({ where: { createdAt: { gte: today } } }),
    prisma.order.findMany({
      where: { ...NOT_CANCELLED, createdAt: { gte: salesRange.start, lt: salesRange.end } },
      select: { createdAt: true, total: true },
    }),
    prisma.order.groupBy({
      by: ["source"],
      where: { ...NOT_CANCELLED, createdAt: { gte: revenueRange.start, lte: revenueRange.end } },
      _count: { _all: true },
      _sum: { total: true },
    }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { items: true } }),
    prisma.orderItem.groupBy({ by: ["productName"], _sum: { quantity: true }, orderBy: { _sum: { quantity: "desc" } }, take: 5 }),
  ]);

  const cards = [
    { label: "Today's Orders", value: todayOrders, icon: ShoppingBag },
    { label: "Pending", value: pending, icon: Clock },
    { label: "Preparing", value: preparing, icon: ChefHat },
    { label: "Ready", value: ready, icon: PackageCheck },
    { label: "Completed Today", value: completedToday, icon: CircleCheck },
    { label: "Customers Today", value: customersToday.length, icon: Users },
    { label: "Reward Redemptions", value: redemptionsToday, icon: Gift },
  ];

  const salesBuckets = getSalesBuckets(salesPeriod, now);
  const salesChart = salesBuckets.map((bucket) => ({
    label: bucket.label,
    value: salesOrders
      .filter((o) => o.createdAt >= bucket.start && o.createdAt < bucket.end)
      .reduce((sum, o) => sum + o.total, 0),
  }));

  const qrRow = revenueBySource.find((r) => r.source === "QR");
  const walkInRow = revenueBySource.find((r) => r.source === "WALK_IN");
  const qrOrders = qrRow?._count._all ?? 0;
  const walkInOrders = walkInRow?._count._all ?? 0;
  const qrRevenue = qrRow?._sum.total ?? 0;
  const walkInRevenue = walkInRow?._sum.total ?? 0;

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

      {/* Revenue + Walk-In vs QR breakdown */}
      <div className="mt-8 rounded-hola-lg bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg text-hola-brown">Revenue</h2>
          <PeriodTabs
            options={revenuePeriods}
            active={revenuePeriod}
            paramName="revenue"
            basePath="/admin"
            otherParams={{ sales: salesPeriod }}
          />
        </div>

        <p className="mt-4 font-display text-3xl text-hola-brown">
          ₱{(qrRevenue + walkInRevenue).toLocaleString()}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-hola-md bg-hola-beige p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-hola-brown-soft">
              <TrendingUp className="h-3.5 w-3.5" /> Total Orders
            </p>
            <p className="mt-1 font-display text-xl text-hola-brown">{qrOrders + walkInOrders}</p>
          </div>
          <div className="rounded-hola-md bg-hola-blue/10 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-hola-blue-dark">
              <QrCode className="h-3.5 w-3.5" /> QR
            </p>
            <p className="mt-1 font-display text-xl text-hola-brown">{qrOrders} orders</p>
            <p className="text-sm text-hola-brown-soft">₱{qrRevenue.toLocaleString()}</p>
          </div>
          <div className="rounded-hola-md bg-hola-yellow/20 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-hola-brown">
              <Store className="h-3.5 w-3.5" /> Walk-In
            </p>
            <p className="mt-1 font-display text-xl text-hola-brown">{walkInOrders} orders</p>
            <p className="text-sm text-hola-brown-soft">₱{walkInRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-hola-lg bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg text-hola-brown">Sales</h2>
            <PeriodTabs
              options={salesPeriods}
              active={salesPeriod}
              paramName="sales"
              basePath="/admin"
              otherParams={{ revenue: revenuePeriod }}
            />
          </div>
          <div className="mt-4">
            <DashboardBarChart data={salesChart} />
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
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-hola-brown-soft">
                <th className="pb-2">Order</th>
                <th className="pb-2">Source</th>
                <th className="pb-2">Items</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-hola-beige">
                  <td className="py-2 font-display text-hola-brown">{order.orderNumber}</td>
                  <td className="py-2">
                    <OrderSourceBadge source={order.source} />
                  </td>
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
                  <td colSpan={5} className="py-6 text-center text-hola-brown-soft">
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
