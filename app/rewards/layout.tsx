import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOLA Rewards",
  description: "Earn points and redeem exclusive rewards with HOLA Coffee.",
  alternates: { canonical: "/rewards" },
};

export default function RewardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
