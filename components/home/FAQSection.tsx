"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { faqs } from "@/lib/rewards-data";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-hola-beige px-4 py-1.5 text-sm font-semibold text-hola-blue-dark">
            <HelpCircle className="h-4 w-4" /> FAQ
          </span>
          <h2 className="mt-4 text-3xl text-hola-brown sm:text-4xl">Frequently Asked Questions</h2>
        </AnimatedSection>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <AnimatedSection key={faq.id} delay={i * 0.04}>
                <div className="overflow-hidden rounded-hola-md border border-hola-beige bg-hola-beige/40">
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-hola-brown">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-hola-blue-dark transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-panel-${faq.id}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-hola-brown-soft">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
