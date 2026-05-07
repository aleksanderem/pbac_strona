import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // output: "export" removed — Payload CMS admin needs SSR.
  // Public pages remain statically generated; only /admin and /api/* are dynamic.
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
