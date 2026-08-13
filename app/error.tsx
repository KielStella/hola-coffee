"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Coffee, RotateCcw, Home } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[route error]", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-hola-beige px-4 py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
        <Coffee className="h-10 w-10 text-hola-blue-dark" strokeWidth={1.5} />
      </div>
      <h1 className="mt-6 text-3xl text-hola-brown sm:text-4xl">Something spilled.</h1>
      <p className="mt-3 max-w-md text-hola-brown-soft">
        We hit an unexpected error loading this page. It&apos;s been logged — please try again.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-hola-blue px-8 py-3.5 font-display text-white shadow-lg shadow-hola-blue/30 transition hover:-translate-y-0.5 hover:bg-hola-blue-dark"
        >
          <RotateCcw className="h-4 w-4" /> Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-hola-brown/15 bg-white px-8 py-3.5 font-display text-hola-brown shadow-md transition hover:-translate-y-0.5 hover:border-hola-yellow"
        >
          <Home className="h-4 w-4" /> Go Home
        </Link>
      </div>
    </section>
  );
}
