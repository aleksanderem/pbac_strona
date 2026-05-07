import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Produkt", plural: "Produkty" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "brand", "category", "slug"],
    listSearchableFields: ["name", "slug", "tagline"],
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Podstawowe",
          fields: [
            { name: "slug", type: "text", required: true, unique: true, index: true },
            { name: "name", type: "text", required: true, label: "Nazwa modelu" },
            { name: "tagline", type: "text", required: true, label: "Krótki tagline" },
            { name: "origin", type: "text", required: true, label: "Pochodzenie" },
            { name: "highlight", type: "text", required: true, label: "Wyróżnik" },
            {
              name: "brand",
              type: "relationship",
              relationTo: "brands",
              required: true,
            },
            {
              name: "brandSlug",
              type: "text",
              label: "Brand slug (legacy fallback)",
            },
            {
              name: "category",
              type: "select",
              required: true,
              options: [
                { label: "Ścienny", value: "scienny" },
                { label: "Multisplit", value: "multisplit" },
                { label: "Kasetonowy", value: "kasetonowy" },
                { label: "Kanałowy", value: "kanalowy" },
                { label: "Podłogowy", value: "podlogowy" },
                { label: "Przenośny", value: "przenosny" },
              ],
            },
          ],
        },
        {
          label: "Opisy",
          fields: [
            { name: "description", type: "textarea", required: true, label: "Krótki opis" },
            {
              name: "descriptionLong",
              type: "array",
              label: "Długi opis (paragrafy)",
              fields: [{ name: "paragraph", type: "textarea", required: true }],
            },
            {
              name: "features",
              type: "array",
              label: "Cechy (lista)",
              fields: [{ name: "feature", type: "text", required: true }],
            },
            {
              name: "advantages",
              type: "array",
              label: "Zalety (z ikonami)",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "desc", type: "textarea", required: true },
                { name: "icon", type: "text", required: true, label: "Nazwa ikony Lucide" },
              ],
            },
          ],
        },
        {
          label: "Specyfikacja",
          fields: [
            { name: "powerRange", type: "text", required: true, label: "Zakres mocy" },
            { name: "refrigerant", type: "text", required: true, label: "Czynnik chłodniczy" },
            { name: "refrigerantNote", type: "text", label: "Notka o czynniku" },
            { name: "warranty", type: "text", required: true, label: "Gwarancja" },
            {
              name: "specs",
              type: "array",
              label: "Specyfikacje (label/value/icon)",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "value", type: "text", required: true },
                { name: "icon", type: "text", required: true },
              ],
            },
            {
              name: "models",
              type: "array",
              label: "Modele (warianty mocy)",
              fields: [
                { name: "name", type: "text", required: true },
                { name: "power", type: "text", required: true },
                { name: "energyClass", type: "text", required: true },
                { name: "noise", type: "text", required: true },
                { name: "phase", type: "text", required: true },
                { name: "price", type: "number" },
                { name: "area", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Galeria",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Obraz główny",
            },
            { name: "imageUrl", type: "text", label: "URL obrazu (legacy)" },
            { name: "imageAlt", type: "text", required: true, label: "Alt obrazu" },
            {
              name: "gallery",
              type: "array",
              label: "Galeria",
              fields: [
                { name: "image", type: "upload", relationTo: "media" },
                { name: "src", type: "text", label: "URL (legacy)" },
                { name: "alt", type: "text", required: true },
                { name: "caption", type: "text" },
              ],
            },
          ],
        },
        {
          label: "FAQ",
          fields: [
            {
              name: "faq",
              type: "array",
              label: "Pytania i odpowiedzi",
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
