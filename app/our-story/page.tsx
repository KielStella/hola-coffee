import type { Metadata } from "next";
import { Heart, Target, Eye, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingDecor from "@/components/FloatingDecor";
import Timeline from "@/components/Timeline";
import WaveDivider from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn how HOLA Coffee started and the mission behind every cup we serve.",
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-hola-blue/15 to-hola-beige px-4 py-20 text-center sm:py-28">
        <FloatingDecor variant="beans" />
        <div className="relative mx-auto max-w-3xl">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-hola-blue-dark shadow-sm">
              <Heart className="h-4 w-4" /> Our Story
            </span>
            <h1 className="mt-5 text-4xl text-hola-brown sm:text-5xl">
              A Café Built on Warmth and Belonging
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-hola-brown-soft">
              HOLA Coffee was created to bring people together through quality coffee and genuine
              hospitality. Whether you&apos;re meeting friends, studying, working remotely, or simply
              enjoying your favorite drink, our café is designed to be a welcoming place where everyone
              feels at home.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <WaveDivider color="var(--hola-beige)" />

      <section className="bg-hola-beige px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 sm:grid-cols-3">
          <AnimatedSection>
            <div className="h-full rounded-hola-lg bg-white p-8 shadow-md">
              <Target className="h-9 w-9 text-hola-blue-dark" strokeWidth={1.75} />
              <h2 className="mt-4 text-xl text-hola-brown">Mission</h2>
              <p className="mt-2 text-sm leading-relaxed text-hola-brown-soft">
                To serve handcrafted beverages made with passion while creating memorable experiences
                for every customer.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="h-full rounded-hola-lg bg-white p-8 shadow-md">
              <Eye className="h-9 w-9 text-hola-blue-dark" strokeWidth={1.75} />
              <h2 className="mt-4 text-xl text-hola-brown">Vision</h2>
              <p className="mt-2 text-sm leading-relaxed text-hola-brown-soft">
                To become one of the most loved neighborhood coffee shops, known for exceptional
                drinks and customer experience.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="h-full rounded-hola-lg bg-white p-8 shadow-md">
              <Sparkles className="h-9 w-9 text-hola-blue-dark" strokeWidth={1.75} />
              <h2 className="mt-4 text-xl text-hola-brown">Coffee Philosophy</h2>
              <p className="mt-2 text-sm leading-relaxed text-hola-brown-soft">
                Great coffee starts with care — from sourcing quality beans to the moment a cup is
                handed to you with a smile.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-hola-brown sm:text-4xl">Our Journey</h2>
            <p className="mt-3 text-hola-brown-soft">From a small dream to a home away from home.</p>
          </AnimatedSection>
          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      <section className="bg-hola-beige px-4 py-16 text-center sm:py-20">
        <AnimatedSection className="mx-auto max-w-2xl">
          <h2 className="text-2xl text-hola-brown sm:text-3xl">An Owner&apos;s Note</h2>
          <p className="mt-4 text-base italic leading-relaxed text-hola-brown-soft">
            &ldquo;We didn&apos;t just want to open a coffee shop — we wanted to build a second home
            for our community, one warm cup at a time.&rdquo;
          </p>
        </AnimatedSection>
      </section>
    </>
  );
}
