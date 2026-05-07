import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role"],
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      label: "Imię i nazwisko",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Administrator", value: "admin" },
        { label: "Edytor", value: "editor" },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === "admin",
      },
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === "admin",
    update: ({ req: { user }, id }) =>
      user?.role === "admin" || user?.id === id,
    delete: ({ req: { user } }) => user?.role === "admin",
  },
};
