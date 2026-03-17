import type { Article } from "@/types";
import { articlesData } from "./articles-data";

// Blog articles — 63 articles from pbac.pl WordPress
export const articles: Article[] = articlesData;

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
