import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { navItems } from "@/data/navigation";
import { socialLinks } from "@/data/social";

/**
 * Footer — Only in BR
 * Rodapé institucional com fundo verde floresta e logo amarela.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#0f3d1f] text-white border-t border-brand-green/30"
      aria-label="Rodapé"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-16">

        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Coluna 1 — Logo + descrição */}
          <div>
            <Logo size="lg" color="yellow" className="mb-4" />
            <p className="text-neutral-300 text-sm leading-relaxed max-w-xs font-normal">
              A energia que conecta pessoas. Marca autoral de entretenimento
              e produção de grandes eventos.
            </p>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-yellow mb-5">
              Navegação
            </p>
            <nav aria-label="Rodapé — navegação" className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contato"
                className="text-sm text-neutral-300 hover:text-white transition-colors duration-200"
              >
                Contato
              </Link>
            </nav>
          </div>

          {/* Coluna 3 — Contato + Redes */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-yellow mb-5">
              Fale conosco
            </p>
            <WhatsAppCTA
              context="default"
              label="WhatsApp Oficial"
              variant="primary"
              size="sm"
              className="mb-6"
            />

            {/* Redes sociais */}
            <div className="flex flex-col gap-2.5">
              {socialLinks.map((social) => (
                <Link
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Only in BR no ${social.label}`}
                  className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-brand-yellow" aria-hidden="true" />
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-neutral-300 font-medium">
              © {currentYear} Only in BR — ONLYINBR Produções Culturais Ltda
            </p>
            <p className="text-[11px] text-neutral-400 font-normal mt-0.5">
              CNPJ 65.112.374/0001-44 • São Paulo, SP
            </p>
          </div>
          <p className="text-xs text-neutral-400 font-normal">
            Produção completa de eventos — estrutura, documentação, equipe e operação
          </p>
        </div>
      </div>
    </footer>
  );
}
