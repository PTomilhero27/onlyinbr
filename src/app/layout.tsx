import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/shared/lenis-provider";

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
  title: "Only in BR — Produção de Eventos, Estrutura & Gestão de Staff",
  description:
    "Produção executiva de eventos em São Paulo e região. Palcos 360°, box truss, som Line Array, painéis de LED, alimentação e gestão de staff, laudos com ART no CREA/SP e alvará.",
  keywords: [
    "produção de eventos",
    "eventos corporativos sp",
    "festas de igrejas quermesses",
    "locação de palco e som",
    "painel de led eventos",
    "alvará evento temporário sp",
    "laudo art crea sp",
    "equipe de staff para eventos",
    "Only in BR",
  ],
  icons: {
    icon: [
      { url: "/logos/PNG/ICONE Only in BR 1.png", sizes: "any" },
      { url: "/logos/PNG/ICONE Only in BR 2.png", type: "image/png" },
    ],
    shortcut: "/logos/PNG/ICONE Only in BR 1.png",
    apple: "/logos/PNG/ICONE Only in BR 1.png",
  },
  authors: [{ name: "Only in BR" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://onlyinbr.com.br",
    siteName: "Only in BR",
    title: "Only in BR — Produção de Eventos, Estrutura & Gestão de Staff",
    description:
      "Produção executiva de eventos em São Paulo e região. Palcos 360°, box truss, som Line Array, painéis de LED, equipe de staff e laudos com ART no CREA/SP.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Only in BR — Produção de Eventos, Estrutura & Gestão de Staff",
    description:
      "Produção executiva de eventos em São Paulo e região. Estrutura, tecnologia e operação especializada.",
  },
  robots: {
    index: true,
    follow: true,
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
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
