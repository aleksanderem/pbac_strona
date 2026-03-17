import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PBAC — Klimatyzacja i Pompy Ciepła",
    short_name: "PBAC",
    description:
      "Profesjonalny montaż i serwis klimatyzacji w Warszawie i okolicach.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#1A337F",
    icons: [
      {
        src: "/images/pbac-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
