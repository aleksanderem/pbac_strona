import type { CollectionConfig } from "payload";

export const Authors: CollectionConfig = {
  slug: "authors",
  labels: { singular: "Autor", plural: "Autorzy" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "slug"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "name", type: "text", required: true, label: "Imię i nazwisko" },
    { name: "role", type: "text", label: "Stanowisko / rola" },
    { name: "description", type: "textarea", label: "Bio" },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Zdjęcie / awatar",
    },
    {
      name: "imageUrl",
      type: "text",
      label: "URL zdjęcia (opcjonalnie, jeśli bez Media)",
      admin: {
        description:
          "Używane tylko gdy nie ustawiono uploadu w polu 'Zdjęcie'. Pozwala wskazać plik z public/.",
      },
    },
  ],
};
