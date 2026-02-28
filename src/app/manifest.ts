import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LumaWear — Premium Fashion",
    short_name: "LumaWear",
    description:
      "A premium fashion e-commerce experience featuring curated collections, sustainable materials, and timeless design.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#1a1a1a",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
