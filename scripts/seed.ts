/* eslint-disable no-console */
/**
 * One-shot seed: imports content from lib/*.ts into Payload DB.
 * Idempotent — uses upsert by slug. Safe to re-run.
 *
 * Usage: npx tsx scripts/seed.ts
 */

import { config as dotenvConfig } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenvConfig({ path: path.resolve(__dirname, "../.env.local") });

if (!process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET not loaded — check .env.local");
}
if (!process.env.DATABASE_URI) {
  throw new Error("DATABASE_URI not loaded — check .env.local");
}

async function main() {
  // Dynamic imports so payload.config evaluates AFTER env is loaded.
  const { getPayload } = await import("payload");
  const { default: config } = await import("../payload.config.js");

  const { authors: authorsData } = await import("../lib/authors.js");
  const { brands: brandsData } = await import("../lib/brands.js");
  const { services: servicesData } = await import("../lib/services.js");
  const { testimonials: testimonialsData } = await import("../lib/testimonials.js");
  const { locations: locationsData } = await import("../lib/locations.js");
  const { products: productsData } = await import("../lib/products.js");
  const { articles: articlesData } = await import("../lib/articles.js");
  type Article = typeof articlesData[number];
  type Product = typeof productsData[number];

  console.log("→ Initializing Payload…");
  const payload = await getPayload({ config });

  async function upsertBySlug(
    collection: string,
    slug: string,
    data: Record<string, unknown>,
  ): Promise<{ id: number | string }> {
    const existing = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: collection as any,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs.length) {
      const updated = await payload.update({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: collection as any,
        id: existing.docs[0].id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return { id: updated.id };
    }
    const created = await payload.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: collection as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return { id: created.id };
  }

  function articleSectionsToLexical(
    sections: Article["sections"],
    summary: string | undefined,
  ) {
    const children: unknown[] = [];
    if (summary) {
      children.push({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        textFormat: 0,
        textStyle: "",
        children: [
          {
            type: "text",
            version: 1,
            text: summary,
            format: 1,
            style: "",
            mode: "normal",
            detail: 0,
          },
        ],
      });
    }
    for (const s of sections) {
      children.push({
        type: "heading",
        tag: "h2",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          {
            type: "text",
            version: 1,
            text: s.heading,
            format: 0,
            style: "",
            mode: "normal",
            detail: 0,
          },
        ],
      });
      const paragraphs = s.content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
      for (const p of paragraphs) {
        children.push({
          type: "paragraph",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          textFormat: 0,
          textStyle: "",
          children: [
            {
              type: "text",
              version: 1,
              text: p,
              format: 0,
              style: "",
              mode: "normal",
              detail: 0,
            },
          ],
        });
      }
    }
    return {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children,
      },
    };
  }

  // 1. Authors
  console.log(`→ Authors (${authorsData.length})`);
  const authorIdBySlug = new Map<string, number | string>();
  for (const a of authorsData) {
    const r = await upsertBySlug("authors", a.slug, {
      slug: a.slug,
      name: a.name,
      role: a.role,
      description: a.description,
      imageUrl: a.image,
    });
    authorIdBySlug.set(a.slug, r.id);
  }

  // 2. Brands
  console.log(`→ Brands (${brandsData.length})`);
  const brandIdBySlug = new Map<string, number | string>();
  for (const b of brandsData) {
    const r = await upsertBySlug("brands", b.slug, {
      slug: b.slug,
      name: b.name,
      description: b.description,
      country: b.country,
      logoUrl: b.logo,
      order: 100,
    });
    brandIdBySlug.set(b.slug, r.id);
  }

  // 3. Services
  console.log(`→ Services (${servicesData.length})`);
  for (const s of servicesData) {
    await upsertBySlug("services", s.slug, {
      slug: s.slug,
      name: s.name,
      shortDescription: s.shortDescription,
      longDescription: s.longDescription,
      icon: s.icon,
      steps: s.steps,
      faq: s.faq,
      link: s.link,
    });
  }

  // 4. Testimonials
  console.log(`→ Testimonials (${testimonialsData.length})`);
  for (const t of testimonialsData) {
    const existing = await payload.find({
      collection: "testimonials",
      where: { and: [{ name: { equals: t.name } }, { body: { equals: t.body } }] },
      limit: 1,
      depth: 0,
    });
    const data = {
      name: t.name,
      body: t.body,
      rating: t.rating,
      location: t.location,
      service: t.service,
      order: 100,
    };
    if (existing.docs.length) {
      await payload.update({
        collection: "testimonials",
        id: existing.docs[0].id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
    } else {
      await payload.create({
        collection: "testimonials",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
    }
  }

  // 5. Locations
  console.log(`→ Locations (${locationsData.length})`);
  for (const l of locationsData) {
    await upsertBySlug("locations", l.slug, {
      slug: l.slug,
      name: l.name,
      region: l.region,
      services: l.services,
      description: l.description,
      sections: l.sections,
      faq: l.faq,
      coordinates: l.coordinates,
      metaTitle: l.metaTitle,
      metaDescription: l.metaDescription,
    });
  }

  // 6. Products
  console.log(`→ Products (${productsData.length})`);
  for (const p of productsData as Product[]) {
    const brandId = brandIdBySlug.get(p.brand);
    await upsertBySlug("products", p.slug, {
      slug: p.slug,
      name: p.name,
      brand: brandId,
      brandSlug: p.brand,
      category: p.category,
      tagline: p.tagline,
      origin: p.origin,
      description: p.description,
      descriptionLong: p.descriptionLong.map((paragraph) => ({ paragraph })),
      highlight: p.highlight,
      features: p.features.map((feature) => ({ feature })),
      advantages: p.advantages,
      specs: p.specs,
      models: p.models,
      refrigerant: p.refrigerant,
      refrigerantNote: p.refrigerantNote,
      powerRange: p.powerRange,
      warranty: p.warranty,
      imageUrl: p.imageUrl,
      imageAlt: p.imageAlt,
      gallery: p.gallery.map((g) => ({
        src: g.src,
        alt: g.alt,
        caption: g.caption,
      })),
      faq: p.faq ?? [],
    });
  }

  // 7. Categories from articles
  const categorySet = new Set<string>();
  for (const a of articlesData as Article[]) categorySet.add(a.category);
  console.log(`→ Categories (${categorySet.size})`);
  const categoryIdByName = new Map<string, number | string>();
  for (const cat of categorySet) {
    const slug = cat
      .toLowerCase()
      .replace(/ą/g, "a").replace(/ć/g, "c").replace(/ę/g, "e")
      .replace(/ł/g, "l").replace(/ń/g, "n").replace(/ó/g, "o")
      .replace(/ś/g, "s").replace(/ż/g, "z").replace(/ź/g, "z")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const r = await upsertBySlug("categories", slug, { slug, name: cat });
    categoryIdByName.set(cat, r.id);
  }

  // 8. Articles
  console.log(`→ Articles (${articlesData.length})`);
  for (const a of articlesData as Article[]) {
    const categoryId = categoryIdByName.get(a.category);
    const authorId = authorIdBySlug.get(a.authorSlug);
    await upsertBySlug("articles", a.slug, {
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      summary: a.summary,
      body: articleSectionsToLexical(a.sections, a.summary),
      sections: a.sections,
      category: categoryId,
      categoryName: a.category,
      author: authorId,
      authorSlug: a.authorSlug,
      publishedAt: a.date,
      readingTime: a.readingTime,
      metaDescription: a.metaDescription,
      relatedSlugs: a.relatedSlugs.map((slug) => ({ slug })),
      coverImageUrl: a.coverImage,
      coverAlt: a.coverAlt,
    });
  }

  // 9. SiteSettings global
  console.log("→ SiteSettings global");
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      phonePrimary: "+48 503 151 802",
      phonePlayair: "+48 692 981 431",
      email: "biuro@pbac.pl",
    },
  });

  console.log("✓ Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
