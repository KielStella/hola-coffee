import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { businessInfo } from "@/lib/data";

const quickLinks = [
  { label: "Our Story", href: "/our-story" },
  { label: "Menu", href: "/menu" },
  { label: "Staff", href: "/staff" },
  { label: "Rewards", href: "/rewards" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-hola-brown text-hola-beige">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/hola-logo.png"
              alt="HOLA Coffee logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-hola-sm bg-white/95 p-1"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-hola-beige/80">
            A warm, welcoming neighborhood café brewing handcrafted drinks and cozy moments for everyone.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={businessInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HOLA Coffee on Facebook"
              className="rounded-full bg-white/10 p-2.5 transition hover:bg-hola-blue"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={businessInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HOLA Coffee on Instagram"
              className="rounded-full bg-white/10 p-2.5 transition hover:bg-hola-blue"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg text-hola-yellow">Quick Links</h2>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-hola-beige/80 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-hola-yellow">Business Hours</h2>
          <ul className="mt-4 space-y-3 text-sm text-hola-beige/80">
            {businessInfo.hours.map((h) => (
              <li key={h.day} className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-hola-blue" aria-hidden="true" />
                <span>
                  {h.day}
                  <br />
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-hola-yellow">Visit Us</h2>
          <ul className="mt-4 space-y-3 text-sm text-hola-beige/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-hola-blue" aria-hidden="true" />
              <span>{businessInfo.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-hola-blue" aria-hidden="true" />
              <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {businessInfo.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-hola-blue" aria-hidden="true" />
              <a href={`mailto:${businessInfo.email}`} className="hover:text-white">
                {businessInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-hola-beige/60">
        © {new Date().getFullYear()} HOLA Coffee. Designed with love for coffee lovers.
      </div>
    </footer>
  );
}
