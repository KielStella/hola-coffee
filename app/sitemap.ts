import type { MetadataRoute } from "next";

const siteUrl = "https://holacoffee.ph";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/our-story",
    "/menu",
    "/staff",
    "/rewards",
    "/rewards/history",
    "/rewards/points",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
