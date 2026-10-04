import type { MetadataRoute } from "next";

/**
 * Sitemap XML dinâmico — Only in BR
 * Gera automaticamente o /sitemap.xml para indexação pelo Google.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://onlyinbr.com.br";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
