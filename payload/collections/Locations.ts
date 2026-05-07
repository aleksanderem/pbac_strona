import type { CollectionConfig } from "payload";
import { locationUrl } from "../livePreviewUrl";

export const Locations: CollectionConfig = {
  slug: "locations",
  labels: { singular: "Miejscowość", plural: "Miejscowości" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "region", "slug"],
    livePreview: { url: locationUrl },
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
            { name: "name", type: "text", required: true, label: "Nazwa miejscowości" },
            { name: "region", type: "text", required: true, label: "Region / województwo" },
            {
              name: "services",
              type: "select",
              hasMany: true,
              required: true,
              options: [
                { label: "Montaż", value: "montaz" },
                { label: "Serwis", value: "serwis" },
              ],
            },
          ],
        },
        {
          label: "Treść",
          fields: [
            { name: "description", type: "textarea", required: true, label: "Główny opis" },
            {
              name: "sections",
              type: "array",
              label: "Sekcje (heading + content)",
              fields: [
                { name: "heading", type: "text", required: true },
                { name: "content", type: "textarea", required: true },
              ],
            },
            {
              name: "faq",
              type: "array",
              label: "FAQ dla miejscowości",
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Mapa & SEO",
          fields: [
            {
              name: "coordinates",
              type: "group",
              label: "Współrzędne (mapa)",
              fields: [
                { name: "lat", type: "number", required: true },
                { name: "lng", type: "number", required: true },
              ],
            },
            { name: "metaTitle", type: "text", required: true, label: "SEO title" },
            { name: "metaDescription", type: "textarea", required: true, label: "SEO description" },
          ],
        },
      ],
    },
  ],
};
