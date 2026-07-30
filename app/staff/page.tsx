import type { Metadata } from "next";
import { Users } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingDecor from "@/components/FloatingDecor";
import StaffCard from "@/components/StaffCard";
import { staffMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description: "Meet the people behind every cup at HOLA Coffee.",
  alternates: { canonical: "/staff" },
};

export default function StaffPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-hola-blue/15 to-hola-beige px-4 py-20 text-center sm:py-28">
        <FloatingDecor variant="bubbles" />
        <div className="relative mx-auto max-w-2xl">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-hola-blue-dark shadow-sm">
              <Users className="h-4 w-4" /> Our Team
            </span>
            <h1 className="mt-5 text-4xl text-hola-brown sm:text-5xl">Meet Our Team</h1>
            <p className="mt-4 text-lg leading-relaxed text-hola-brown-soft">
              Behind every perfect cup is a passionate team dedicated to serving you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {staffMembers.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <StaffCard member={member} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
