import type { Metadata } from "next";
import { Header } from "@/components/header/header";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Services } from "@/components/services/services";
import { Portfolio } from "@/components/portfolio/portfolio";
import { Faq } from "@/components/faq/faq";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

const homeDescription =
  "Produção de eventos em São Paulo e região com planejamento, estrutura, staff, alimentação, marketing e operação. A Only in BR transforma sua ideia em evento.";

export const metadata: Metadata = {
  title: "Produção de Eventos em São Paulo | Only in BR",
  description: homeDescription,
  alternates: {
    canonical: "https://onlyinbr.com.br/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://onlyinbr.com.br/",
    siteName: "Only in BR",
    title: "Produção de Eventos em São Paulo | Only in BR",
    description: homeDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Only in BR — produção de eventos em São Paulo e região",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Produção de Eventos em São Paulo | Only in BR",
    description: homeDescription,
    images: ["/twitter-image"],
  },
};

/**
 * Page — Only in BR
 * ONLYINBR Produções Culturais Ltda · CNPJ 65.112.374/0001-44
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        {/* <About /> */}
        <Services />
        <Portfolio />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
