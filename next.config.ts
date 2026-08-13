import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents the site from being embedded in a hostile iframe (clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stops browsers from MIME-sniffing a response away from its declared Content-Type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send the origin (not full URL/path) as a referrer to other sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features this site never needs.
  { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
  // Force HTTPS for a full year once a browser has seen it once (Vercel serves over HTTPS).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // don't leak "X-Powered-By: Next.js"
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Vercel Blob storage (menu/reward/staff/gallery image uploads — see lib/upload.ts)
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
