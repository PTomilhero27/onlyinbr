import type { MetadataRoute } from "next";

/**
 * Web App Manifest — Only in BR
 * Permite instalação como PWA e melhora presença em mobile/SEO.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Only in BR — Produção de Eventos",
    short_name: "Only in BR",
    description:
      "Produção executiva de eventos em São Paulo e região. Estrutura, tecnologia e operação especializada.",
    start_url: "/",
    display: "standalone",
    background_color: "#072312",
    theme_color: "#196132",
    icons: [
      {
        src: "/logos/PNG/ICONE Only in BR 1.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logos/PNG/ICONE Only in BR 1.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
