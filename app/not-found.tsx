import Link from "next/link";
import { Coffee, Home } from "lucide-react";
import FloatingDecor from "@/components/FloatingDecor";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-linear-to-b from-hola-blue/15 to-hola-beige px-4 py-20 text-center">
      <FloatingDecor />
      <div className="relative mx-auto max-w-lg">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
          <Coffee className="h-10 w-10 text-hola-blue-dark" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-4xl text-hola-brown sm:text-5xl">Oops!</h1>
        <p className="mt-4 text-lg leading-relaxed text-hola-brown-soft">
          Looks like this page took a coffee break.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-hola-blue px-8 py-3.5 font-display text-white shadow-lg shadow-hola-blue/30 transition hover:-translate-y-0.5 hover:bg-hola-blue-dark"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-hola-brown/15 bg-white px-8 py-3.5 font-display text-hola-brown shadow-md transition hover:-translate-y-0.5 hover:border-hola-yellow"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
