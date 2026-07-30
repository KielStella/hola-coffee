import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse handcrafted drinks and snacks at HOLA Coffee.",
  alternates: { canonical: "/menu" },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
