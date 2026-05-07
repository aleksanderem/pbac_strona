import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { pl } from "@payloadcms/translations/languages/pl";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Articles } from "./payload/collections/Articles";
import { Authors } from "./payload/collections/Authors";
import { Brands } from "./payload/collections/Brands";
import { Categories } from "./payload/collections/Categories";
import { Locations } from "./payload/collections/Locations";
import { Media } from "./payload/collections/Media";
import { Products } from "./payload/collections/Products";
import { Services } from "./payload/collections/Services";
import { Testimonials } from "./payload/collections/Testimonials";
import { Users } from "./payload/collections/Users";
import { SiteSettings } from "./payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  "https://pbac.pl";

export default buildConfig({
  serverURL: SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — PBAC CMS",
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    Users,
    Media,
    Authors,
    Categories,
    Articles,
    Brands,
    Products,
    Locations,
    Services,
    Testimonials,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      max: 3,
      idleTimeoutMillis: 10_000,
    },
  }),
  i18n: {
    supportedLanguages: { pl, en },
    fallbackLanguage: "pl",
  },
});
