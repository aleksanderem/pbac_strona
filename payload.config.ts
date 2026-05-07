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

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — PBAC CMS",
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
