import Link from "next/link";
import { ArrowRight, ChefHat, CircleCheck, Clock, Coffee, Gift, MessageSquare, PackageCheck, Plus, QrCode, ShoppingBag, Sparkles, Store, TrendingUp, Users } from "lucide-react";
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
  const statusStyle: Record<string, string> = { PENDING: "bg-amber-100 text-amber-700", CONFIRMED: "bg-blue-100 text-blue-700", PREPARING: "bg-violet-100 text-violet-700", READY: "bg-emerald-100 text-emerald-700", COMPLETED: "bg-hola-blue/15 text-hola-blue-dark", CANCELLED: "bg-red-100 text-red-700" };

  return (
    <div>
      <section className="relative overflow-hidden rounded-[2.5rem] bg-hola-blue-dark p-7 text-white shadow-[0_25px_60px_-35px_rgba(62,139,203,.8)] sm:p-9">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]" />
        <Coffee className="absolute -bottom-12 -right-8 h-52 w-52 rotate-12 text-white/[.06]" />
        <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.16em] text-hola-yellow"><Sparkles className="h-4 w-4" /> Live operations</span><h2 className="mt-5 text-3xl sm:text-5xl">Good day, HOLA team.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-white/65">Here&apos;s what&apos;s happening across orders, customers, and rewards right now.</p></div><div className="flex flex-wrap gap-3"><Link href="/admin/walk-in" className="inline-flex items-center gap-2 rounded-full bg-hola-yellow px-5 py-3 font-display text-hola-brown shadow-lg transition hover:-translate-y-1 hover:bg-white"><Plus className="h-4 w-4" /> New walk-in</Link><Link href="/admin/scanner" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 font-display text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"><QrCode className="h-4 w-4" /> Open scanner</Link></div></div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
        {cards.map((card) => (
          <div key={card.label} className="group rounded-[1.75rem] bg-white p-4 shadow-[0_15px_40px_-30px_rgba(74,51,37,.65)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-hola-beige text-hola-blue-dark transition group-hover:bg-hola-yellow"><card.icon className="h-5 w-5" /></span>
            <p className="mt-5 font-display text-3xl text-hola-brown">{card.value}</p>
            <p className="mt-1 text-[11px] leading-4 text-hola-brown-soft">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[2rem] border border-hola-brown/[.06] bg-white p-6 shadow-[0_20px_50px_-38px_rgba(74,51,37,.6)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-xs font-bold uppercase tracking-[.15em] text-hola-blue-dark">Performance</p><h2 className="mt-1 font-display text-2xl text-hola-brown">Revenue overview</h2></div>
          <PeriodTabs
            options={revenuePeriods}
            active={revenuePeriod}
            paramName="revenue"
            basePath="/admin"
            otherParams={{ sales: salesPeriod }}
          />
        </div>

        <p className="mt-6 font-display text-4xl text-hola-brown">
          ₱{(qrRevenue + walkInRevenue).toLocaleString()}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-[1.5rem] bg-hola-beige p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-hola-brown-soft">
              <TrendingUp className="h-3.5 w-3.5" /> Total Orders
            </p>
            <p className="mt-1 font-display text-xl text-hola-brown">{qrOrders + walkInOrders}</p>
          </div>
          <div className="rounded-[1.5rem] bg-hola-blue/10 p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-hola-blue-dark">
              <QrCode className="h-3.5 w-3.5" /> QR
            </p>
            <p className="mt-1 font-display text-xl text-hola-brown">{qrOrders} orders</p>
            <p className="text-sm text-hola-brown-soft">₱{qrRevenue.toLocaleString()}</p>
          </div>
          <div className="rounded-[1.5rem] bg-hola-yellow/25 p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-hola-brown">
              <Store className="h-3.5 w-3.5" /> Walk-In
            </p>
            <p className="mt-1 font-display text-xl text-hola-brown">{walkInOrders} orders</p>
            <p className="text-sm text-hola-brown-soft">₱{walkInRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-hola-brown/[.06] bg-white p-6 shadow-[0_20px_50px_-38px_rgba(74,51,37,.6)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-[.15em] text-hola-blue-dark">Sales trend</p><h2 className="mt-1 font-display text-xl text-hola-brown">Revenue over time</h2></div>
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
        <div className="rounded-[2rem] border border-hola-brown/[.06] bg-white p-6 shadow-[0_20px_50px_-38px_rgba(74,51,37,.6)]">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-hola-blue-dark">Customer favorites</p><h2 className="mt-1 font-display text-xl text-hola-brown">Popular products</h2>
          <div className="mt-4">
            <DashboardBarChart data={popularChart} color="#F8DC6B" />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[2rem] border border-hola-brown/[.06] bg-white p-6 shadow-[0_20px_50px_-38px_rgba(74,51,37,.6)]">
        <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-hola-blue-dark">Order feed</p><h2 className="mt-1 font-display text-xl text-hola-brown">Recent orders</h2></div><Link href="/admin/orders" className="group inline-flex items-center gap-2 text-sm font-display text-hola-brown">View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
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
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[order.status] ?? "bg-hola-beige text-hola-brown"}`}>
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
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{href:"/admin/orders",label:"Manage orders",copy:"Review and update the live queue.",Icon:ShoppingBag},{href:"/admin/menu",label:"Update menu",copy:"Manage products and availability.",Icon:Coffee},{href:"/admin/messages",label:"Customer inbox",copy:"Respond to questions and inquiries.",Icon:MessageSquare},{href:"/admin/rewards",label:"Manage rewards",copy:"Create and update loyalty perks.",Icon:Gift}].map(({href,label,copy,Icon}) => <Link key={href} href={href} className="group flex items-center gap-4 rounded-[1.5rem] border border-hola-brown/[.06] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-hola-beige text-hola-blue-dark transition group-hover:bg-hola-yellow"><Icon className="h-5 w-5" /></span><div><p className="font-display text-hola-brown">{label}</p><p className="mt-1 text-xs leading-5 text-hola-brown-soft">{copy}</p></div></Link>)}</div>
    </div>
  );
}
