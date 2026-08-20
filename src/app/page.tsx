import { Header } from "@/components/header/header";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Services } from "@/components/services/services";
import { Portfolio } from "@/components/portfolio/portfolio";
import { Faq } from "@/components/faq/faq";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

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
