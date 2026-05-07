import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // output: "export" removed — Payload CMS admin needs SSR.
  // Public pages remain statically generated; only /admin and /api/* are dynamic.
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  // Atlas → external Postgres has WAN latency; default 60s/page SSG timeout
  // blew up the build, give it 5 min per page and serialize to keep DB
  // connection pool from thrashing.
  staticPageGenerationTimeout: 300,
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
