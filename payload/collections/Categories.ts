import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Kategoria", plural: "Kategorie" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "name", type: "text", required: true, label: "Nazwa kategorii" },
    { name: "description", type: "textarea", label: "Opis (opcjonalnie)" },
  ],
};
