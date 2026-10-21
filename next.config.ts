import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Keep the original assets on Workers without a paid Images binding.
    unoptimized: process.env.CLOUDFLARE_BUILD === "1",
  },
};

export default nextConfig;
