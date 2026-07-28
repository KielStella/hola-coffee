"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Skeleton from "@/components/Skeleton";
import { testimonials } from "@/lib/rewards-data";

export default function TestimonialsSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-hola-beige px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-hola-brown sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-3 text-hola-brown-soft">Real words from the HOLA community.</p>
        </AnimatedSection>

        {loading ? (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-hola-lg bg-white p-6 shadow-md">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-4 h-16 w-full" />
                <Skeleton className="mt-4 h-4 w-32" />
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="mt-14 flex flex-col items-center py-10 text-center">
            <Quote className="h-10 w-10 text-hola-brown-soft/40" />
            <p className="mt-3 font-display text-lg text-hola-brown">No reviews yet.</p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-hola-lg bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-hola-blue to-hola-blue-dark font-display text-sm text-white">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-4 w-4 ${idx < t.rating ? "fill-hola-yellow text-hola-yellow" : "text-hola-beige"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm italic leading-relaxed text-hola-brown-soft">
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <p className="mt-4 font-display text-sm text-hola-brown">{t.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
