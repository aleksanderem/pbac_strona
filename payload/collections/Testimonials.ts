import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Opinia", plural: "Opinie klientów" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "rating", "service", "location"],
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Imię i nazwisko" },
    { name: "body", type: "textarea", required: true, label: "Treść opinii" },
    {
      name: "rating",
      type: "number",
      required: true,
      defaultValue: 5,
      min: 1,
      max: 5,
      label: "Ocena (1–5)",
    },
    { name: "location", type: "text", label: "Miejscowość" },
    {
      name: "service",
      type: "select",
      label: "Typ usługi",
      options: [
        { label: "Montaż", value: "montaz" },
        { label: "Serwis", value: "serwis" },
        { label: "Wynajem", value: "wynajem" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 100,
      label: "Kolejność wyświetlania",
    },
  ],
};
