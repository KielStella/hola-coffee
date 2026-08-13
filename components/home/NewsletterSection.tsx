"use client";

import { useState, useTransition, type FormEvent } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingDecor from "@/components/FloatingDecor";
import { subscribeToNewsletter } from "@/actions/newsletter";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await subscribeToNewsletter(email);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setSubmitted(true);
      setEmail("");
    });
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-hola-brown to-hola-brown-soft px-4 py-16 text-center text-white sm:py-20">
      <FloatingDecor variant="beans" />
      <div className="relative mx-auto max-w-xl">
        <AnimatedSection>
          <Mail className="mx-auto h-10 w-10 text-hola-yellow" />
          <h2 className="mt-4 text-3xl sm:text-4xl">Stay Updated</h2>
          <p className="mt-3 text-white/80">
            Be the first to know about new drinks, rewards, and exclusive promotions.
          </p>

          {submitted ? (
            <div className="mt-7 flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 backdrop-blur-sm">
              <CheckCircle2 className="h-5 w-5 text-hola-yellow" />
              <span>You&apos;re subscribed! Welcome to the HOLA family.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-7 flex flex-col gap-3 sm:flex-row"
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white outline-none backdrop-blur-sm placeholder:text-white/60 focus:border-hola-yellow focus:ring-2 focus:ring-hola-yellow/40"
              />
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-hola-yellow px-7 py-3 font-display text-hola-brown shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70"
              >
                <Send className="h-4 w-4" /> {isPending ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
          {error && (
            <p className="mt-3 text-sm text-red-200" role="alert">
              {error}
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
