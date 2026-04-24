import type { MetadataRoute } from "next";
import { getAllLocations, getLocationsByService } from "@/lib/locations";
import { getAllProducts, getProductBrands } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pbac.pl";

  const montazLocations: MetadataRoute.Sitemap = getAllLocations()
    .filter((l) => l.services.includes("montaz"))
    .map((l) => ({
      url: `${baseUrl}/montaz/${l.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const serwisLocations: MetadataRoute.Sitemap = getLocationsByService("serwis").map(
    (l) => ({
      url: `${baseUrl}/serwis/${l.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const brandPages: MetadataRoute.Sitemap = getProductBrands().map((brand) => ({
    url: `${baseUrl}/produkty/${brand}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${baseUrl}/produkty/${p.brand}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/klimatyzacja`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/produkty`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/montaz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/serwis`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pompy-ciepla`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wynajem-klimatyzatorow`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/playair`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...montazLocations,
    ...serwisLocations,
    ...brandPages,
    ...productPages,
    ...articlePages,
  ];
}
