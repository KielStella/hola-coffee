import type { ReactNode } from "react";

export default function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl text-hola-brown">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-hola-brown-soft">{children}</div>
    </section>
  );
}
