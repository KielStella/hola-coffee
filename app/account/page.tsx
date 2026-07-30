import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Gift, ShoppingBag, History } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false },
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: { orderBy: { createdAt: "desc" }, take: 5, include: { items: true } },
      rewardRedemptions: { orderBy: { createdAt: "desc" }, take: 5, include: { reward: true } },
    },
  });

  if (!user) redirect("/login");

  return (
    <section className="bg-hola-beige px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-hola-blue-dark shadow-sm">
            <User className="h-4 w-4" /> My Account
          </span>
          <h1 className="mt-4 text-3xl text-hola-brown sm:text-4xl">Hi, {user.name?.split(" ")[0]}</h1>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-hola-lg bg-white p-6 text-center shadow-md">
            <Gift className="mx-auto h-6 w-6 text-hola-blue-dark" />
            <p className="mt-2 font-display text-2xl text-hola-brown">{user.points}</p>
            <p className="text-xs uppercase tracking-wide text-hola-brown-soft">Points · {user.tier}</p>
          </div>
          <div className="rounded-hola-lg bg-white p-6 text-center shadow-md">
            <ShoppingBag className="mx-auto h-6 w-6 text-hola-blue-dark" />
            <p className="mt-2 font-display text-2xl text-hola-brown">{user.ordersCompleted}</p>
            <p className="text-xs uppercase tracking-wide text-hola-brown-soft">Orders Completed</p>
          </div>
          <div className="rounded-hola-lg bg-white p-6 text-center shadow-md">
            <History className="mx-auto h-6 w-6 text-hola-blue-dark" />
            <p className="mt-2 font-display text-2xl text-hola-brown">{user.rewardRedemptions.length}</p>
            <p className="text-xs uppercase tracking-wide text-hola-brown-soft">Rewards Redeemed</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-hola-lg bg-white p-6 shadow-md sm:p-8">
            <h2 className="font-display text-xl text-hola-brown">Profile</h2>
            <ProfileForm name={user.name ?? ""} phone={user.phone ?? ""} image={user.image ?? ""} />
          </div>

          <div className="space-y-8">
            <div className="rounded-hola-lg bg-white p-6 shadow-md sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl text-hola-brown">Recent Orders</h2>
                <Link href="/menu" className="text-sm font-semibold text-hola-blue-dark hover:underline">
                  Order again
                </Link>
              </div>
              {user.orders.length === 0 ? (
                <p className="mt-4 text-sm text-hola-brown-soft">No orders yet. Browse our menu to get started.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {user.orders.map((order) => (
                    <li key={order.id} className="flex items-center justify-between rounded-hola-sm bg-hola-beige px-4 py-3 text-sm">
                      <div>
                        <p className="font-display text-hola-brown">{order.orderNumber}</p>
                        <p className="text-xs text-hola-brown-soft">
                          {order.items.length} item{order.items.length === 1 ? "" : "s"} · ₱{order.total}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-hola-blue-dark">
                        {order.status.replace("_", " ")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-hola-lg bg-white p-6 shadow-md sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl text-hola-brown">Recent Rewards</h2>
                <Link href="/rewards" className="text-sm font-semibold text-hola-blue-dark hover:underline">
                  View Rewards
                </Link>
              </div>
              {user.rewardRedemptions.length === 0 ? (
                <p className="mt-4 text-sm text-hola-brown-soft">No rewards redeemed yet.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {user.rewardRedemptions.map((r) => (
                    <li key={r.id} className="flex items-center justify-between rounded-hola-sm bg-hola-beige px-4 py-3 text-sm">
                      <p className="font-display text-hola-brown">{r.reward.name}</p>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-hola-blue-dark">
                        {r.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
