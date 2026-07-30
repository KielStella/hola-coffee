import Link from "next/link";
import { ShieldAlert, Home } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-hola-beige px-4 py-20 text-center">
      <div>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
          <ShieldAlert className="h-10 w-10 text-red-500" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-4xl text-hola-brown">Access Denied</h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-hola-brown-soft">
          You don&apos;t have permission to view this page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-hola-blue px-8 py-3.5 font-display text-white shadow-lg shadow-hola-blue/30 transition hover:-translate-y-0.5 hover:bg-hola-blue-dark"
        >
          <Home className="h-4 w-4" /> Go Home
        </Link>
      </div>
    </section>
  );
}
