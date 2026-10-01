import type { MetadataRoute } from "next";

/**
 * Robots.txt dinâmico — Only in BR
 * Permite indexação da landing page e bloqueia a rota administrativa.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://onlyinbr.com.br";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/gestao-onlyinbr-x92k", "/gestao-onlyinbr-x92k/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
