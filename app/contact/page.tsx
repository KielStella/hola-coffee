import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircleHeart } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingDecor from "@/components/FloatingDecor";
import ContactForm from "@/components/ContactForm";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions, concerns, or feedback? We'd love to hear from you — reach out to HOLA Coffee.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-hola-blue/15 to-hola-beige px-4 py-20 text-center sm:py-28">
        <FloatingDecor variant="beans" />
        <div className="relative mx-auto max-w-2xl">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-hola-blue-dark shadow-sm">
              <MessageCircleHeart className="h-4 w-4" /> Contact Us
            </span>
            <h1 className="mt-5 text-4xl text-hola-brown sm:text-5xl">Let&apos;s Talk</h1>
            <p className="mt-4 text-lg leading-relaxed text-hola-brown-soft">
              General inquiries, feedback, suggestions, business partnerships, or customer concerns —
              we&apos;d love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
          <AnimatedSection direction="left" className="lg:col-span-3">
            <ContactForm />
          </AnimatedSection>

          <AnimatedSection direction="right" className="lg:col-span-2">
            <div className="h-full space-y-6 rounded-hola-lg bg-hola-beige p-8">
              <div>
                <h2 className="font-display text-xl text-hola-brown">Visit Us</h2>
                <ul className="mt-4 space-y-4 text-sm text-hola-brown-soft">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-hola-blue-dark" aria-hidden="true" />
                    {businessInfo.address}
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-hola-blue-dark" aria-hidden="true" />
                    <span>
                      {businessInfo.hours.map((h) => (
                        <span key={h.day} className="block">
                          {h.day}: {h.time}
                        </span>
                      ))}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-hola-blue-dark" aria-hidden="true" />
                    <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`} className="hover:text-hola-brown">
                      {businessInfo.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-hola-blue-dark" aria-hidden="true" />
                    <a href={`mailto:${businessInfo.email}`} className="hover:text-hola-brown">
                      {businessInfo.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <a
                  href={businessInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HOLA Coffee on Facebook"
                  className="rounded-full bg-white p-3 text-hola-blue-dark shadow-sm transition hover:bg-hola-blue hover:text-white"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={businessInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HOLA Coffee on Instagram"
                  className="rounded-full bg-white p-3 text-hola-blue-dark shadow-sm transition hover:bg-hola-blue hover:text-white"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>

              <div className="overflow-hidden rounded-hola-md shadow-sm">
                <iframe
                  title="HOLA Coffee location on Google Maps"
                  src={businessInfo.mapsEmbedUrl}
                  width="100%"
                  height="220"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
