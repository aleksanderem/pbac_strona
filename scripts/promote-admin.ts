/* eslint-disable no-console */
/**
 * Promote a user to admin role.
 * Usage:  npx tsx scripts/promote-admin.ts <email>
 */

import { config as dotenvConfig } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenvConfig({ path: path.resolve(__dirname, "../.env.local") });

if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
  throw new Error("Missing DATABASE_URI or PAYLOAD_SECRET");
}

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npx tsx scripts/promote-admin.ts <email>");
    process.exit(1);
  }

  const { getPayload } = await import("payload");
  const { default: config } = await import("../payload.config.js");
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (!result.docs.length) {
    console.error(`✗ No user with email ${email}`);
    process.exit(1);
  }

  const user = result.docs[0];
  console.log(`Found user ${user.email} (id ${user.id}), current role: ${user.role}`);

  if (user.role === "admin") {
    console.log("Already admin — nothing to do.");
    process.exit(0);
  }

  await payload.update({
    collection: "users",
    id: user.id,
    data: { role: "admin" },
    overrideAccess: true,
  });

  console.log(`✓ ${email} promoted to admin`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
