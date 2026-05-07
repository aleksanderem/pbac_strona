import type { CollectionConfig } from "payload";
import { brandUrl } from "../livePreviewUrl";

export const Brands: CollectionConfig = {
  slug: "brands",
  labels: { singular: "Marka", plural: "Marki" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "country"],
    livePreview: { url: brandUrl },
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "name", type: "text", required: true, label: "Nazwa marki" },
    { name: "description", type: "textarea", required: true, label: "Opis" },
    { name: "country", type: "text", label: "Kraj pochodzenia" },
    { name: "logo", type: "upload", relationTo: "media", label: "Logo" },
    {
      name: "logoUrl",
      type: "text",
      label: "URL logo (jeśli plik w public/)",
      admin: {
        description:
          "Używane tylko gdy nie ustawiono uploadu w polu 'Logo'. Format: /images/brands/samsung-logo.png.",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Kolejność wyświetlania",
      defaultValue: 100,
    },
  ],
};
