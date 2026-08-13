import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/staff-portal", "/account", "/order/", "/rewards/qr", "/reset-password"],
    },
    sitemap: "https://holacoffee.ph/sitemap.xml",
  };
}
