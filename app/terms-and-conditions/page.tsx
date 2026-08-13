import type { Metadata } from "next";
import { FileText } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import LegalSection from "@/components/legal/LegalSection";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions for using the HOLA Coffee website and ordering system.",
  alternates: { canonical: "/terms-and-conditions" },
};

const LAST_UPDATED = "July 30, 2026";

export default function TermsAndConditionsPage() {
  return (
    <section className="bg-hola-beige px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-hola-blue-dark shadow-sm">
            <FileText className="h-4 w-4" /> Terms & Conditions
          </span>
          <h1 className="mt-4 text-3xl text-hola-brown sm:text-4xl">Terms &amp; Conditions</h1>
          <p className="mt-2 text-sm text-hola-brown-soft">Last updated: {LAST_UPDATED}</p>
        </AnimatedSection>

        <AnimatedSection className="mt-10 rounded-hola-lg bg-white p-6 shadow-md sm:p-10" delay={0.1}>
          <p className="text-sm leading-relaxed text-hola-brown-soft">
            Welcome to HOLA Coffee. By accessing our website, creating an account, placing an order, or
            joining HOLA Rewards, you agree to be bound by the following Terms &amp; Conditions. Please read
            them carefully.
          </p>

          <LegalSection title="1. Acceptance of Terms">
            <p>
              By using this website, you confirm that you can form a legally binding contract and agree to
              these Terms. If you do not agree, please do not use our website or services.
            </p>
          </LegalSection>

          <LegalSection title="2. Accounts">
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activity under your account. You must provide accurate information when creating an account
              and keep it up to date. We reserve the right to suspend or deactivate accounts that violate
              these Terms.
            </p>
          </LegalSection>

          <LegalSection title="3. Self-Pickup Ordering">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>HOLA Coffee is a self-pickup café — we do not offer delivery.</li>
              <li>Orders are placed through our website and confirmed via a QR code presented at the counter.</li>
              <li>Payment is made in person at the cashier when you present your Order QR code.</li>
              <li>Your order preparation begins only once our staff scans your QR code.</li>
              <li>Menu items, prices, and availability may change without prior notice.</li>
              <li>We reserve the right to refuse or cancel an order, including in cases of suspected abuse.</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. HOLA Rewards Loyalty Program">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Loyalty points are earned only on completed orders, at the rate set by HOLA Coffee, and are credited once staff marks your order &ldquo;Completed.&rdquo;</li>
              <li>Points have no cash value and cannot be transferred, sold, or exchanged for cash.</li>
              <li>Rewards are redeemed by generating a Reward QR code, which must be presented to and approved by staff before points are deducted.</li>
              <li>Reward QR codes expire 30 minutes after generation.</li>
              <li>We may modify, suspend, or discontinue the HOLA Rewards program, or adjust point values, at any time.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Prohibited Conduct">
            <p>You agree not to:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Use the website for any unlawful purpose or in violation of these Terms.</li>
              <li>Attempt to interfere with, disrupt, or gain unauthorized access to our systems.</li>
              <li>Create multiple accounts to abuse promotions or the rewards program.</li>
              <li>Submit false, misleading, or fraudulent information.</li>
            </ul>
          </LegalSection>

          <LegalSection title="6. Intellectual Property">
            <p>
              The HOLA Coffee name, logo, and all website content are the property of HOLA Coffee and may not
              be copied, reproduced, or used without our prior written consent.
            </p>
          </LegalSection>

          <LegalSection title="7. Limitation of Liability">
            <p>
              HOLA Coffee provides this website and its services on an &ldquo;as is&rdquo; basis. To the
              fullest extent permitted by law, we are not liable for any indirect, incidental, or
              consequential damages arising from your use of our website or services.
            </p>
          </LegalSection>

          <LegalSection title="8. Changes to These Terms">
            <p>
              We may update these Terms &amp; Conditions from time to time. Continued use of our website
              after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </LegalSection>

          <LegalSection title="9. Governing Law">
            <p>These Terms are governed by the laws of the Republic of the Philippines.</p>
          </LegalSection>

          <LegalSection title="10. Contact Us">
            <p>
              Questions about these Terms &amp; Conditions can be sent to{" "}
              <a href={`mailto:${businessInfo.email}`} className="font-semibold text-hola-blue-dark hover:underline">
                {businessInfo.email}
              </a>{" "}
              or by visiting us at {businessInfo.address}.
            </p>
          </LegalSection>
        </AnimatedSection>
      </div>
    </section>
  );
}
