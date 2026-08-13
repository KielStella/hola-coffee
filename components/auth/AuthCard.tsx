import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import FloatingDecor from "@/components/FloatingDecor";

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-b from-hola-blue/15 to-hola-beige px-4 py-16">
      <FloatingDecor variant="bubbles" />
      <div className="hola-shadow relative w-full max-w-md rounded-hola-lg bg-white p-8 sm:p-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/images/hola-logo.png" alt="HOLA Coffee" width={56} height={56} className="h-14 w-14 rounded-[22%]" />
          </Link>
          <h1 className="mt-4 text-2xl text-hola-brown">{title}</h1>
          <p className="mt-1 text-sm text-hola-brown-soft">{subtitle}</p>
        </div>
        <div className="mt-8">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-hola-brown-soft">{footer}</div>}
      </div>
    </section>
  );
}
