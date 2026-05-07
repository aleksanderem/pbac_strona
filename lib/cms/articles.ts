import "server-only";
import { cache } from "react";
import { getPayload } from "./payload";
import type {
  Article,
  Article as ArticleDoc,
  Category,
  Author as PayloadAuthor,
} from "@/payload-types";
import type { Article as ArticleShape } from "@/types";

function mapArticle(doc: ArticleDoc): ArticleShape {
  const category =
    typeof doc.category === "object" && doc.category
      ? (doc.category as Category).name
      : (doc.categoryName ?? "");
  const authorSlug =
    typeof doc.author === "object" && doc.author
      ? (doc.author as PayloadAuthor).slug
      : (doc.authorSlug ?? "");

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    metaDescription: doc.metaDescription ?? "",
    summary: doc.summary ?? undefined,
    sections: (doc.sections ?? []).map((s) => ({
      heading: s.heading,
      content: s.content,
    })),
    date:
      typeof doc.publishedAt === "string"
        ? doc.publishedAt
        : new Date(doc.publishedAt).toISOString(),
    category,
    readingTime: doc.readingTime ?? 5,
    coverImage: doc.coverImageUrl ?? "",
    coverAlt: doc.coverAlt ?? "",
    authorSlug,
    relatedSlugs: (doc.relatedSlugs ?? []).map((r) => r.slug),
  };
}

export const getAllArticlesAsync = cache(async (): Promise<ArticleShape[]> => {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "articles",
    limit: 1000,
    depth: 1,
    sort: "-publishedAt",
  });
  return result.docs.map((d) => mapArticle(d as ArticleDoc));
});

export const getArticleBySlugAsync = cache(
  async (slug: string): Promise<ArticleShape | undefined> => {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "articles",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    if (!result.docs.length) return undefined;
    return mapArticle(result.docs[0] as ArticleDoc);
  },
);

export async function getAllArticleSlugsAsync(): Promise<string[]> {
  const articles = await getAllArticlesAsync();
  return articles.map((a) => a.slug);
}

export async function getRelatedArticlesAsync(
  slugs: string[],
): Promise<ArticleShape[]> {
  if (!slugs.length) return [];
  const payload = await getPayload();
  const result = await payload.find({
    collection: "articles",
    where: { slug: { in: slugs } },
    limit: 100,
    depth: 1,
  });
  return result.docs.map((d) => mapArticle(d as ArticleDoc));
}

export async function getLatestArticlesAsync(count: number): Promise<ArticleShape[]> {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "articles",
    limit: count,
    depth: 1,
    sort: "-publishedAt",
  });
  return result.docs.map((d) => mapArticle(d as ArticleDoc));
}

export async function getArticlesByCategoryAsync(
  category: string,
): Promise<ArticleShape[]> {
  const all = await getAllArticlesAsync();
  return all.filter((a) => a.category === category);
}

export async function getCategoriesAsync(): Promise<string[]> {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "categories",
    limit: 1000,
    depth: 0,
  });
  return result.docs.map((c) => c.name);
}
