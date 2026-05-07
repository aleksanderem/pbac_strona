import type { CollectionConfig } from "payload";
import { articleUrl } from "../livePreviewUrl";

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: "Artykuł", plural: "Artykuły blog" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "slug"],
    listSearchableFields: ["title", "slug", "excerpt"],
    livePreview: { url: articleUrl },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Treść",
          fields: [
            { name: "title", type: "text", required: true, label: "Tytuł" },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              label: "Slug (URL)",
            },
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              label: "Zajawka",
            },
            {
              name: "summary",
              type: "textarea",
              label: "Podsumowanie (opcjonalne, krótkie streszczenie)",
            },
            {
              name: "body",
              type: "richText",
              label: "Treść artykułu",
            },
            {
              name: "sections",
              type: "array",
              label: "Sekcje (legacy — z importu)",
              admin: {
                description:
                  "Stara struktura sekcji z importu. Nowe artykuły pisz w polu 'Treść artykułu' powyżej.",
              },
              fields: [
                { name: "heading", type: "text", required: true, label: "Nagłówek" },
                { name: "content", type: "textarea", required: true, label: "Treść" },
              ],
            },
          ],
        },
        {
          label: "Meta",
          fields: [
            {
              name: "category",
              type: "relationship",
              relationTo: "categories",
              required: true,
            },
            {
              name: "categoryName",
              type: "text",
              label: "Kategoria (legacy string)",
              admin: {
                description: "Tekstowa nazwa kategorii (z importu, fallback gdy brak relacji).",
              },
            },
            {
              name: "author",
              type: "relationship",
              relationTo: "authors",
            },
            {
              name: "authorSlug",
              type: "text",
              label: "Autor slug (legacy)",
              admin: { description: "Tekstowy fallback, jeśli relacja nie jest ustawiona." },
            },
            {
              name: "publishedAt",
              type: "date",
              required: true,
              admin: { date: { pickerAppearance: "dayOnly", displayFormat: "yyyy-MM-dd" } },
            },
            {
              name: "readingTime",
              type: "number",
              label: "Czas czytania (min)",
              defaultValue: 5,
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: "SEO Meta description",
            },
            {
              name: "relatedArticles",
              type: "relationship",
              relationTo: "articles",
              hasMany: true,
              label: "Powiązane artykuły",
            },
            {
              name: "relatedSlugs",
              type: "array",
              label: "Powiązane slugi (legacy)",
              fields: [{ name: "slug", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Cover",
          fields: [
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              label: "Obraz tytułowy",
            },
            {
              name: "coverImageUrl",
              type: "text",
              label: "URL obrazu (legacy / public/)",
              admin: {
                description: "Używane gdy nie wybrano uploadu. Format: /images/blog/...",
              },
            },
            { name: "coverAlt", type: "text", label: "Alt obrazu" },
          ],
        },
      ],
    },
  ],
};
