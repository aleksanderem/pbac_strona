import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { pl } from "@payloadcms/translations/languages/pl";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Users } from "./payload/collections/Users";

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
  collections: [Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  i18n: {
    supportedLanguages: { pl, en },
    fallbackLanguage: "pl",
  },
});
