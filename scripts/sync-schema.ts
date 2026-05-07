import { config as dotenvConfig } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenvConfig({ path: path.resolve(__dirname, "../.env.local") });
async function main() {
  const { getPayload } = await import("payload");
  const { default: config } = await import("../payload.config.js");
  const p = await getPayload({ config });
  // Trigger global read which creates tables on dev push
  try { await p.findGlobal({ slug: "playair-landing" }); } catch (e) { console.log("First read", (e as Error).message); }
  console.log("Schema sync done");
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
