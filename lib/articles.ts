import type { Article } from "@/types";

// Blog articles — 63 articles scraped from pbac.pl
// TODO: Populate with full article data from scraping agents
export const articles: Article[] = [
  {
    slug: "5-powodow-zeby-zamontowac-klimatyzacje",
    title: "5 powodów, żeby zamontować klimatyzację",
    excerpt: "Klimatyzacja to nie tylko komfort w upalne dni. Oto pięć powodów, dla których warto zainwestować w profesjonalny montaż klimatyzacji w domu lub biurze.",
    metaDescription: "5 najważniejszych powodów, żeby zamontować klimatyzację w domu lub biurze. Komfort, zdrowie, oszczędności i wartość nieruchomości.",
    sections: [
      {
        heading: "Komfort termiczny przez cały rok",
        content: "Nowoczesne klimatyzatory to nie tylko chłodzenie latem. Wyposażone w pompę ciepła, skutecznie ogrzewają pomieszczenia zimą przy kosztach niższych nawet o 60% w porównaniu z tradycyjnym ogrzewaniem elektrycznym. Jeden klimatyzator z funkcją grzania może zastąpić grzejnik elektryczny, zapewniając komfortową temperaturę przez cały rok.",
      },
      {
        heading: "Lepsza jakość powietrza",
        content: "Klimatyzatory wyposażone są w zaawansowane systemy filtracji, które usuwają z powietrza kurz, pyłki, roztocza i inne alergeny. Modele premium, takie jak Samsung Wind-Free czy LG DualCool, oferują dodatkową jonizację, lampy UV-C i filtry antyalergiczne certyfikowane przez Allergy UK. To szczególnie ważne dla alergików i osób z problemami oddechowymi.",
      },
      {
        heading: "Oszczędność energii",
        content: "Nowoczesne klimatyzatory inwerterowe klasy A++ lub A+++ zużywają znacznie mniej energii niż starsze modele on/off. Szacunkowy koszt chłodzenia mieszkania 50 m² przez cały sezon letni to zaledwie 200-400 zł. W trybie grzania klasa A+++ oznacza, że za każdy 1 kWh energii elektrycznej klimatyzator generuje nawet 4 kWh ciepła.",
      },
      {
        heading: "Wzrost wartości nieruchomości",
        content: "Klimatyzacja podnosi wartość mieszkania lub domu. Kupujący coraz częściej traktują klimatyzację jako standard, a jej brak może być czynnikiem decydującym o wyborze innej nieruchomości. Profesjonalny montaż z estetycznym prowadzeniem instalacji nie psuje wyglądu wnętrza.",
      },
      {
        heading: "Lepsza produktywność i sen",
        content: "Badania pokazują, że temperatura powyżej 26°C znacząco obniża produktywność umysłową. W sypialni optymalna temperatura do snu to 18-21°C. Klimatyzator z trybem nocnym (np. Samsung Good Sleep) automatycznie reguluje temperaturę w nocy, zapewniając głębszy i bardziej regenerujący sen.",
      },
    ],
    date: "2025-06-15",
    category: "Klimatyzatory",
    readingTime: 5,
    coverImage: "/images/blog/5-powodow-klimatyzacja.jpg",
    coverAlt: "Nowoczesny klimatyzator ścienny w jasnym salonie",
    authorSlug: "pbac-team",
    relatedSlugs: [],
  },
];

export function getAllArticles(): Article[] {
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}

export function getRelatedArticles(slugs: string[]): Article[] {
  return slugs
    .map((s) => articles.find((a) => a.slug === s))
    .filter((a): a is Article => a !== undefined);
}

export function getLatestArticles(count: number): Article[] {
  return getAllArticles().slice(0, count);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getCategories(): string[] {
  return [...new Set(articles.map((a) => a.category))];
}
