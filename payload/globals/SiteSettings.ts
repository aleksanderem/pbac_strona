import type { GlobalConfig } from "payload";
import { homeUrl } from "../livePreviewUrl";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Ustawienia globalne",
  access: { read: () => true },
  admin: {
    livePreview: { url: homeUrl },
  },
  fields: [
    {
      name: "phonePrimary",
      type: "text",
      required: true,
      label: "Telefon główny",
      defaultValue: "+48 503 151 802",
    },
    {
      name: "phonePlayair",
      type: "text",
      label: "Telefon PlayAir",
      defaultValue: "+48 692 981 431",
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "Email kontaktowy",
      defaultValue: "biuro@pbac.pl",
    },
    {
      name: "address",
      type: "textarea",
      label: "Adres",
    },
    {
      name: "socialMedia",
      type: "group",
      label: "Social media",
      fields: [
        { name: "facebook", type: "text" },
        { name: "instagram", type: "text" },
        { name: "linkedin", type: "text" },
        { name: "youtube", type: "text" },
      ],
    },
  ],
};
