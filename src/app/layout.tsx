import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/shared/lenis-provider";
import { SiteStoreProvider } from "@/lib/store";
import { StructuredData } from "@/lib/structured-data";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-custom",
  display: "swap",
});

/**
 * Cocogoose Pro — tipografia de destaque (headings & marcas)
 * Arquivos em public/fontes/
 */
const cocogoose = localFont({
  src: [
    {
      path: "../../public/fontes/Cocogoose-Pro-Regular-trial.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fontes/Cocogoose-Pro-Bold-trial.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fontes/Cocogoose-Pro-Light-trial.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-heading-custom",
  display: "swap",
});

/**
 * Brasilero 2018 — fonte artística opcional
 */
const brasilero = localFont({
  src: "../../public/fontes/Brasilero2018Free.otf",
  variable: "--font-brasilero-custom",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onlyinbr.com.br"),
  title: {
    default: "Only in BR — Produção de Eventos em São Paulo | Estrutura, Staff & Alvará",
    template: "%s | Only in BR",
  },
  description:
    "Produção executiva de eventos corporativos e comunitários em São Paulo e região. Palcos 360°, box truss Q30, som Line Array, painéis de LED, alimentação e gestão de staff, laudos com ART no CREA/SP, alvará para evento temporário, quermesses e festas juninas.",
  keywords: [
    "produção de eventos são paulo",
    "produção de eventos sp",
    "empresa de eventos corporativos sp",
    "produção de festas corporativas",
    "produção de quermesse são paulo",
    "festa junina para igrejas sp",
    "locação de palco para eventos",
    "aluguel de som line array sp",
    "painel de led para eventos sp",
    "box truss q30 locação",
    "alvará evento temporário são paulo",
    "art crea sp eventos",
    "laudo técnico para eventos",
    "equipe de staff para eventos sp",
    "gestão de staff eventos corporativos",
    "alimentação de staff eventos",
    "produção executiva 360 eventos",
    "infraestrutura para eventos sp",
    "produtora de eventos são paulo",
    "Only in BR",
    "ONLYINBR",
    "onlyinbr produções culturais",
  ],
  icons: {
    icon: [
      { url: "/logos/PNG/ICONE Only in BR 1.png", sizes: "any" },
      { url: "/logos/PNG/ICONE Only in BR 2.png", type: "image/png" },
    ],
    shortcut: "/logos/PNG/ICONE Only in BR 1.png",
    apple: "/logos/PNG/ICONE Only in BR 1.png",
  },
  authors: [{ name: "Only in BR", url: "https://onlyinbr.com.br" }],
  creator: "Only in BR",
  publisher: "ONLYINBR Produções Culturais Ltda",
  alternates: {
    canonical: "https://onlyinbr.com.br",
  },
  category: "Produção de Eventos",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://onlyinbr.com.br",
    siteName: "Only in BR",
    title: "Only in BR — Produção de Eventos em São Paulo | Estrutura, Staff & Alvará",
    description:
      "Produção executiva de eventos corporativos e comunitários em São Paulo. Palcos 360°, box truss Q30, som Line Array, painéis de LED, equipe de staff, alimentação, ART CREA/SP e alvará.",
    countryName: "Brasil",
  },
  twitter: {
    card: "summary_large_image",
    title: "Only in BR — Produção de Eventos em São Paulo",
    description:
      "Produção executiva de eventos em São Paulo e região. Estrutura completa, tecnologia e operação especializada.",
    creator: "@onlyinbr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Descomente quando tiver o código de verificação do Google Search Console:
  // verification: {
  //   google: "SEU_CODIGO_GOOGLE_SEARCH_CONSOLE",
  // },
  other: {
    "geo.region": "BR-SP",
    "geo.placename": "São Paulo",
    "geo.position": "-23.5505;-46.6333",
    ICBM: "-23.5505, -46.6333",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cocogoose.variable} ${brasilero.variable} scroll-smooth`}
    >
      <body className="bg-white text-neutral-900 font-body antialiased">
        <StructuredData />
        <SiteStoreProvider>
          <LenisProvider>{children}</LenisProvider>
        </SiteStoreProvider>
      </body>
      <Analytics />
    </html>
  );
}
