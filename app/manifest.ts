import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HOLA Coffee",
    short_name: "HOLA Coffee",
    description: "Brewing Happiness One Cup at a Time. Order ahead, earn rewards, skip the line.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8EC",
    theme_color: "#5AA9E6",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
