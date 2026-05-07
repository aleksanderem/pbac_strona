import "server-only";
import { cache } from "react";
import { getPayload } from "./payload";
import type {
  Brand as BrandDoc,
  Product as ProductDoc,
  Location as LocationDoc,
  Service as ServiceDoc,
  Testimonial as TestimonialDoc,
  Author as AuthorDoc,
} from "@/payload-types";
import type {
  BrandInfo,
  Brand,
  Product,
  Location,
  ServiceInfo,
  Testimonial,
  Author,
  ProductCategory,
  ProductSpec,
  ProductModel,
  GalleryImage,
  FAQ,
} from "@/types";

export {
  getAllArticlesAsync,
  getArticleBySlugAsync,
  getAllArticleSlugsAsync,
  getRelatedArticlesAsync,
  getLatestArticlesAsync,
  getArticlesByCategoryAsync,
  getCategoriesAsync,
} from "./articles";

// ─── Brands ────────────────────────────────────────────────────────────
function mapBrand(doc: BrandDoc): BrandInfo {
  return {
    slug: doc.slug as Brand,
    name: doc.name,
    description: doc.description,
    logo: doc.logoUrl ?? "",
    country: doc.country ?? "",
  };
}

export const getAllBrandsAsync = cache(async (): Promise<BrandInfo[]> => {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "brands",
    limit: 100,
    depth: 0,
    sort: "order",
  });
  return result.docs.map((d) => mapBrand(d as BrandDoc));
});

export async function getBrandBySlugAsync(
  slug: string,
): Promise<BrandInfo | undefined> {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "brands",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  if (!result.docs.length) return undefined;
  return mapBrand(result.docs[0] as BrandDoc);
}

// ─── Products ──────────────────────────────────────────────────────────
function mapProduct(doc: ProductDoc): Product {
  const brandSlug =
    typeof doc.brand === "object" && doc.brand
      ? ((doc.brand as BrandDoc).slug as Brand)
      : ((doc.brandSlug ?? "samsung") as Brand);

  return {
    slug: doc.slug,
    name: doc.name,
    brand: brandSlug,
    category: doc.category as ProductCategory,
    tagline: doc.tagline,
    origin: doc.origin,
    description: doc.description,
    descriptionLong: (doc.descriptionLong ?? []).map((p) => p.paragraph),
    highlight: doc.highlight,
    features: (doc.features ?? []).map((f) => f.feature),
    advantages: (doc.advantages ?? []).map((a) => ({
      title: a.title,
      desc: a.desc,
      icon: a.icon,
    })),
    specs: (doc.specs ?? []).map((s) => ({
      label: s.label,
      value: s.value,
      icon: s.icon,
    })) as ProductSpec[],
    models: (doc.models ?? []).map((m) => ({
      name: m.name,
      power: m.power,
      energyClass: m.energyClass,
      noise: m.noise,
      phase: m.phase,
      price: m.price ?? undefined,
      area: m.area ?? undefined,
    })) as ProductModel[],
    refrigerant: doc.refrigerant,
    refrigerantNote: doc.refrigerantNote ?? "",
    powerRange: doc.powerRange,
    warranty: doc.warranty,
    imageUrl: doc.imageUrl ?? "",
    imageAlt: doc.imageAlt,
    gallery: (doc.gallery ?? []).map((g) => ({
      src: g.src ?? "",
      alt: g.alt,
      caption: g.caption ?? undefined,
    })) as GalleryImage[],
    faq: (doc.faq ?? []).map((f) => ({
      question: f.question,
      answer: f.answer,
    })) as FAQ[],
  };
}

export const getAllProductsAsync = cache(async (): Promise<Product[]> => {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "products",
    limit: 1000,
    depth: 1,
  });
  return result.docs.map((d) => mapProduct(d as ProductDoc));
});

export async function getProductBySlugAsync(
  slug: string,
): Promise<Product | undefined> {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  if (!result.docs.length) return undefined;
  return mapProduct(result.docs[0] as ProductDoc);
}

export async function getProductsByBrandAsync(
  brandSlug: string,
): Promise<Product[]> {
  const all = await getAllProductsAsync();
  return all.filter((p) => p.brand === brandSlug);
}

const FEATURED_PRODUCT_SLUGS = [
  "samsung-wind-free-elite",
  "lg-artcool-gallery",
  "toshiba-haori",
  "gree-clivia-silver",
  "daikin-stylish-white",
  "haier-jade-plus",
];

export async function getFeaturedProductsAsync(): Promise<Product[]> {
  const all = await getAllProductsAsync();
  const map = new Map(all.map((p) => [p.slug, p]));
  return FEATURED_PRODUCT_SLUGS
    .map((slug) => map.get(slug))
    .filter((p): p is Product => p !== undefined);
}

export async function getProductBrandsAsync(): Promise<Brand[]> {
  const all = await getAllProductsAsync();
  return [...new Set(all.map((p) => p.brand))];
}

export function getLowestPrice(product: Product): number | undefined {
  const prices = product.models
    .map((m) => m.price)
    .filter((p): p is number => p !== undefined);
  return prices.length > 0 ? Math.min(...prices) : undefined;
}

// ─── Locations ─────────────────────────────────────────────────────────
function mapLocation(doc: LocationDoc): Location {
  return {
    slug: doc.slug,
    name: doc.name,
    region: doc.region,
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
    description: doc.description,
    sections: (doc.sections ?? []).map((s) => ({
      heading: s.heading,
      content: s.content,
    })),
    faq: (doc.faq ?? []).map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
    coordinates: { lat: doc.coordinates.lat, lng: doc.coordinates.lng },
    services: doc.services as ("montaz" | "serwis")[],
  };
}

export const getAllLocationsAsync = cache(async (): Promise<Location[]> => {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "locations",
    limit: 1000,
    depth: 0,
  });
  return result.docs.map((d) => mapLocation(d as LocationDoc));
});

export async function getLocationBySlugAsync(
  slug: string,
): Promise<Location | undefined> {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "locations",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  if (!result.docs.length) return undefined;
  return mapLocation(result.docs[0] as LocationDoc);
}

export async function getLocationsByServiceAsync(
  service: "montaz" | "serwis",
): Promise<Location[]> {
  const all = await getAllLocationsAsync();
  return all.filter((l) => l.services.includes(service));
}

// ─── Services ──────────────────────────────────────────────────────────
function mapService(doc: ServiceDoc): ServiceInfo {
  return {
    slug: doc.slug,
    name: doc.name,
    shortDescription: doc.shortDescription,
    longDescription: doc.longDescription,
    icon: doc.icon,
    steps: (doc.steps ?? []).map((s) => ({
      title: s.title,
      description: s.description,
    })),
    faq: (doc.faq ?? []).map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
    link: doc.link,
  };
}

export const getAllServicesAsync = cache(async (): Promise<ServiceInfo[]> => {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "services",
    limit: 100,
    depth: 0,
  });
  return result.docs.map((d) => mapService(d as ServiceDoc));
});

export async function getServiceBySlugAsync(
  slug: string,
): Promise<ServiceInfo | undefined> {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  if (!result.docs.length) return undefined;
  return mapService(result.docs[0] as ServiceDoc);
}

// ─── Testimonials ──────────────────────────────────────────────────────
function mapTestimonial(doc: TestimonialDoc): Testimonial {
  return {
    name: doc.name,
    body: doc.body,
    rating: doc.rating,
    location: doc.location ?? undefined,
    service: (doc.service ?? undefined) as Testimonial["service"],
  };
}

export const getAllTestimonialsAsync = cache(
  async (): Promise<Testimonial[]> => {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "testimonials",
      limit: 200,
      depth: 0,
      sort: "order",
    });
    return result.docs.map((d) => mapTestimonial(d as TestimonialDoc));
  },
);

// ─── Authors ───────────────────────────────────────────────────────────
function mapAuthor(doc: AuthorDoc): Author {
  return {
    slug: doc.slug,
    name: doc.name,
    role: doc.role ?? "",
    description: doc.description ?? "",
    image: doc.imageUrl ?? "",
  };
}

export async function getAuthorBySlugAsync(
  slug: string,
): Promise<Author | undefined> {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "authors",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  if (!result.docs.length) return undefined;
  return mapAuthor(result.docs[0] as AuthorDoc);
}

// ─── Site Settings ─────────────────────────────────────────────────────
export const getSiteSettingsAsync = cache(async () => {
  const payload = await getPayload();
  return payload.findGlobal({
    slug: "site-settings",
  });
});

// ─── PlayAir landing global ────────────────────────────────────────────
export const getPlayairLandingAsync = cache(async () => {
  const payload = await getPayload();
  return payload.findGlobal({
    slug: "playair-landing",
  });
});
