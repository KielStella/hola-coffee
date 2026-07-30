import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
<<<<<<< HEAD
=======
      disallow: ["/admin", "/staff-portal", "/account", "/order/", "/rewards/qr", "/reset-password"],
>>>>>>> c71a751 (Initial commit)
    },
    sitemap: "https://holacoffee.ph/sitemap.xml",
  };
}
