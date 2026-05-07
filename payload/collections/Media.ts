import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Tekst alternatywny (alt)",
    },
    {
      name: "caption",
      type: "text",
      label: "Podpis",
    },
  ],
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: undefined, position: "centre" },
      { name: "card", width: 768, height: undefined, position: "centre" },
      { name: "tablet", width: 1024, height: undefined, position: "centre" },
      { name: "desktop", width: 1920, height: undefined, position: "centre" },
    ],
  },
};
