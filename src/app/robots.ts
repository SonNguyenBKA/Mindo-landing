import type { MetadataRoute } from "next";

const SITE_URL = "https://mindo.vn";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Endpoint nhận biểu mẫu, không có gì để index
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
