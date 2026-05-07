import type { CollectionConfig } from "payload";
import { serviceUrl } from "../livePreviewUrl";

export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Usługa", plural: "Usługi" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
    livePreview: { url: serviceUrl },
  },
  access: { read: () => true },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "name", type: "text", required: true, label: "Nazwa usługi" },
    { name: "shortDescription", type: "textarea", required: true, label: "Krótki opis" },
    { name: "longDescription", type: "textarea", required: true, label: "Pełny opis" },
    { name: "icon", type: "text", required: true, label: "Nazwa ikony Lucide" },
    {
      name: "steps",
      type: "array",
      label: "Kroki realizacji",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "faq",
      type: "array",
      label: "FAQ usługi",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    { name: "link", type: "text", required: true, label: "Link strony usługi" },
  ],
};
