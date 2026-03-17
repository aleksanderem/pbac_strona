import type { Author } from "@/types";

export const authors: Author[] = [
  {
    slug: "pbac-team",
    name: "Zespół PBAC",
    role: "Specjaliści klimatyzacji i pomp ciepła",
    description:
      "Certyfikowani instalatorzy klimatyzacji z wieloletnim doświadczeniem w montażu i serwisie urządzeń Samsung, LG, Toshiba, Gree, Daikin i wielu innych marek. Obsługujemy Warszawę i okolice.",
    image: "/images/pbac-logo.png",
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
