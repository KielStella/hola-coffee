import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import LegalSection from "@/components/legal/LegalSection";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HOLA Coffee collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

const LAST_UPDATED = "July 30, 2026";

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-hola-beige px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-hola-blue-dark shadow-sm">
            <ShieldCheck className="h-4 w-4" /> Privacy Policy
          </span>
          <h1 className="mt-4 text-3xl text-hola-brown sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-hola-brown-soft">Last updated: {LAST_UPDATED}</p>
        </AnimatedSection>

        <AnimatedSection className="mt-10 rounded-hola-lg bg-white p-6 shadow-md sm:p-10" delay={0.1}>
          <p className="text-sm leading-relaxed text-hola-brown-soft">
            HOLA Coffee (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is
            committed to protecting it through this Privacy Policy. This page explains what information we
            collect, how we use it, and the choices you have when you visit our website, place an order, or
            join HOLA Rewards.
          </p>

          <LegalSection title="1. Information We Collect">
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Account details — name, email address, phone number, and password (stored securely hashed).</li>
              <li>Order information — items ordered, size and sweetness preferences, special instructions, and order history.</li>
              <li>Loyalty information — points balance, tier, and reward redemptions.</li>
              <li>Contact form submissions — name, email, phone (optional), subject, and message.</li>
              <li>If you sign in with Google, Facebook, or Apple, we receive the name, email, and profile photo associated with that account.</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. How We Use Your Information">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>To process and fulfill your self-pickup orders.</li>
              <li>To operate the HOLA Rewards loyalty program, including tracking and redeeming points.</li>
              <li>To respond to inquiries submitted through our Contact Us page.</li>
              <li>To send transactional emails, such as order confirmations and password reset links.</li>
              <li>To improve our menu, website, and overall customer experience.</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. Cookies and Similar Technologies">
            <p>
              We use essential cookies to keep you signed in and to remember items in your cart. We do not
              use third-party advertising cookies. You can control cookies through your browser settings, though
              disabling them may affect certain features of the site (such as staying logged in).
            </p>
          </LegalSection>

          <LegalSection title="4. Sharing of Information">
            <p>
              We do not sell your personal information. We may share information with trusted service
              providers who help us operate our business (such as email delivery and hosting providers),
              and only to the extent necessary for them to provide those services. We may also disclose
              information if required by law.
            </p>
          </LegalSection>

          <LegalSection title="5. Data Retention">
            <p>
              We retain account and order information for as long as your account remains active, or as
              needed to comply with our legal obligations, resolve disputes, and enforce our agreements.
              You may request deletion of your account at any time by contacting us below.
            </p>
          </LegalSection>

          <LegalSection title="6. Your Choices">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>You can review and update your profile information anytime from your Account page.</li>
              <li>You can request a copy of your data or ask us to delete your account by contacting us.</li>
              <li>You can unsubscribe from marketing emails using the link included in those emails.</li>
            </ul>
          </LegalSection>

          <LegalSection title="7. Children's Privacy">
            <p>
              Our services are not directed to children under 13, and we do not knowingly collect personal
              information from children under 13.
            </p>
          </LegalSection>

          <LegalSection title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will post the updated version on this
              page and revise the &ldquo;Last updated&rdquo; date above.
            </p>
          </LegalSection>

          <LegalSection title="9. Contact Us">
            <p>
              If you have questions about this Privacy Policy or how we handle your information, reach out
              to us at{" "}
              <a href={`mailto:${businessInfo.email}`} className="font-semibold text-hola-blue-dark hover:underline">
                {businessInfo.email}
              </a>{" "}
              or visit us at {businessInfo.address}.
            </p>
          </LegalSection>
        </AnimatedSection>
      </div>
    </section>
  );
}
