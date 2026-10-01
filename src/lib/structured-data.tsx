import { company } from "@/data/company";

/**
 * JSON-LD Structured Data — Only in BR
 * Schema.org para Google Rich Results.
 *
 * Inclui:
 * - Organization (dados da empresa)
 * - LocalBusiness (negócio local em SP)
 * - WebSite (site institucional com barra de busca)
 * - Service (serviços oferecidos)
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data
 * @see https://schema.org/LocalBusiness
 */

const BASE_URL = "https://onlyinbr.com.br";

/**
 * Schema principal da organização/negócio local
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "EventPlanner"],
    "@id": `${BASE_URL}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: BASE_URL,
    logo: `${BASE_URL}/logos/PNG/COMPLETO Only in BR horizontal yellow.png`,
    image: `${BASE_URL}/opengraph-image`,
    description: company.description,
    slogan: company.tagline,
    foundingLocation: {
      "@type": "Place",
      name: "São Paulo, SP",
    },
    areaServed: [
      {
        "@type": "State",
        name: "São Paulo",
        "@id": "https://www.wikidata.org/wiki/Q175",
      },
      {
        "@type": "City",
        name: "São Paulo",
        "@id": "https://www.wikidata.org/wiki/Q174",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    taxID: company.cnpj,
    priceRange: "$$$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Pix, Boleto, Transferência, Cartão",
    sameAs: [
      "https://www.instagram.com/onlyinbr",
      "https://www.instagram.com/botecagemsp",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "commercial",
      availableLanguage: ["pt-BR"],
    },
    knowsAbout: [
      "Produção de eventos",
      "Eventos corporativos",
      "Quermesse para igrejas",
      "Locação de palco e som",
      "Painel de LED para eventos",
      "Alvará para evento temporário",
      "ART CREA/SP",
      "Gestão de staff para eventos",
      "Produção de festas juninas",
      "Box truss Q30",
      "Som Line Array",
    ],
  };
}

/**
 * Schema do WebSite para Google Sitelinks Search Box
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: company.name,
    description: company.description,
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "pt-BR",
  };
}

/**
 * Schema de WebPage para a página principal
 */
export function getWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: "Only in BR — Produção de Eventos, Estrutura & Gestão de Staff em São Paulo",
    description:
      "Produção executiva de eventos corporativos e comunitários em São Paulo e região. Palcos 360°, box truss, som Line Array, painéis de LED, alimentação de staff, laudos com ART no CREA/SP e alvará para evento temporário.",
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    about: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "pt-BR",
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };
}

/**
 * Schema de serviços oferecidos
 */
export function getServicesSchema() {
  const services = [
    {
      name: "Produção de Eventos Corporativos e Gestão de Staff",
      description:
        "Produção executiva 360° para convenções, feiras, lançamentos, confraternizações — incluindo gestão de fornecedores, equipe de staff, alimentação, credenciamento e logística.",
    },
    {
      name: "Produção de Festas e Eventos para Igrejas e Comunidades",
      description:
        "Produção completa de quermesses, arraiás, festas juninas, festas de padroeiras — com barracas, jogos, bilheteria, som, iluminação e alvará.",
    },
    {
      name: "Estrutura e Locação de Equipamentos para Eventos",
      description:
        "Palco 360°, box truss Q30/Q15, som Line Array profissional, painéis de LED, iluminação cênica, geradores e tendas cobertas.",
    },
    {
      name: "Documentação e Alvará para Evento Temporário",
      description:
        "Responsabilidade técnica com ART emitida no CREA/SP, laudos estruturais, licenciamento junto ao Corpo de Bombeiros, CET e COVISA.",
    },
    {
      name: "Design e Identidade Visual para Eventos",
      description:
        "Criação de identidade visual, artes para redes sociais, ingressos, sinalização, banners, conteúdo para painéis de LED e comunicação visual integrada.",
    },
    {
      name: "Marketing de Influência e Divulgação de Eventos",
      description:
        "Divulgação pela página @botecagemsp, cobertura de eventos, ativação de marca, stories, reels e conteúdo UGC para engajamento orgânico.",
    },
  ];

  return services.map((service, index) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/#service-${index + 1}`,
    name: service.name,
    description: service.description,
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    areaServed: {
      "@type": "State",
      name: "São Paulo",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: BASE_URL,
    },
  }));
}

/**
 * Componente que injeta todos os JSON-LD na página
 */
export function StructuredData() {
  const schemas = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getWebPageSchema(),
    ...getServicesSchema(),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`ld-json-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
