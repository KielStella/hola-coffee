import type { Metadata } from "next";
import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/baloo-2/700.css";
import "@fontsource/baloo-2/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { LoyaltyProvider } from "@/lib/loyalty-context";
import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";
<<<<<<< HEAD

const siteUrl = "https://holacoffee.ph";
=======
import AuthSessionProvider from "@/components/auth/AuthSessionProvider";

const siteUrl = "https://holacoffee.ph";

>>>>>>> c71a751 (Initial commit)
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HOLA Coffee — Brewing Happiness One Cup at a Time.",
    template: "%s | HOLA Coffee",
  },
  description:
    "Freshly brewed coffee, handcrafted drinks, and cozy moments made for everyone at HOLA Coffee.",
  keywords: ["HOLA Coffee", "coffee shop", "café", "handcrafted drinks", "coffee rewards"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "HOLA Coffee — Brewing Happiness One Cup at a Time.",
    description:
      "Freshly brewed coffee, handcrafted drinks, and cozy moments made for everyone at HOLA Coffee.",
    url: siteUrl,
    siteName: "HOLA Coffee",
<<<<<<< HEAD
    images: [
      {
        url: "/images/hola-logo.png",
        width: 1254,
        height: 1254,
        alt: "HOLA Coffee logo",
      },
    ],
=======
    images: [{ url: "/images/hola-logo.png", width: 1254, height: 1254, alt: "HOLA Coffee logo" }],
>>>>>>> c71a751 (Initial commit)
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "HOLA Coffee — Brewing Happiness One Cup at a Time.",
    description:
      "Freshly brewed coffee, handcrafted drinks, and cozy moments made for everyone at HOLA Coffee.",
    images: ["/images/hola-logo.png"],
  },
  icons: {
    icon: "/images/hola-logo.png",
    apple: "/images/hola-logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "HOLA Coffee",
  description: "Freshly brewed coffee, handcrafted drinks, and cozy moments made for everyone.",
  url: siteUrl,
  image: `${siteUrl}/images/hola-logo.png`,
  telephone: "+63 917 123 4567",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Sampaguita Street",
    addressLocality: "Quezon City",
    addressRegion: "Metro Manila",
    addressCountry: "PH",
  },
  servesCuisine: "Coffee",
  priceRange: "₱₱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-hola-beige">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-hola-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <CartProvider>
          <LoyaltyProvider>
<<<<<<< HEAD
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartButton />
            <CartDrawer />
=======
            <AuthSessionProvider>
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <CartButton />
              <CartDrawer />
            </AuthSessionProvider>
>>>>>>> c71a751 (Initial commit)
          </LoyaltyProvider>
        </CartProvider>
      </body>
    </html>
  );
}
