"use client";

import Link from "next/link";
import { ArrowUp, ExternalLink, ShieldCheck, MapPin } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { socialLinks } from "@/data/social";
import { serviceSections } from "@/data/services";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative bg-gradient-to-b from-[#0b3318] via-[#072411] to-[#031409] text-white overflow-hidden"
      aria-label="Rodapé Institucional"
    >
      {/* ── LINHA DEGRADÊ DE TOPO COM AS CORES DO BRASIL ── */}
      <div className="w-full h-[2px] bg-gradient-to-r from-emerald-500 via-brand-yellow to-sky-500 opacity-80" />

      {/* ── EFEITOS DE LUZ AMBIENTE COM AS CORES DO BRASIL ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Glow Verde */}
        <div className="absolute -top-24 left-10 w-[400px] h-[300px] bg-emerald-500/15 rounded-full blur-[140px] opacity-40" />
        {/* Glow Amarelo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-yellow/10 rounded-full blur-[150px] opacity-35" />
        {/* Glow Azul */}
        <div className="absolute -bottom-20 right-10 w-[400px] h-[300px] bg-sky-500/15 rounded-full blur-[140px] opacity-40" />
      </div>

      <div className="container-site relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 pt-16 pb-12">
        {/* Grid Principal do Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">

          {/* ── COLUNA 1: IDENTIDADE & DADOS DA EMPRESA (5 cols) ── */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="lg" color="yellow" />
            </div>

            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
              Produção executiva de eventos, engenharia de palco, estruturas, audiovisual, documentação técnica com ART e operação de staff em São Paulo e região.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-neutral-300 font-normal">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>ONLYINBR Produções Culturais Ltda</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-neutral-300">CNPJ: 65.112.374/0001-44</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                <span>São Paulo, SP • Atendimento em todo o Estado</span>
              </div>
            </div>
          </div>

          {/* ── COLUNA 2: NOSSOS SERVIÇOS (4 cols) ── */}
          <div className="lg:col-span-4 space-y-3.5">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-brand-yellow">
              Nossos Serviços
            </p>
            <ul className="space-y-2 text-xs sm:text-sm font-normal">
              {serviceSections.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`#${s.id}`}
                    className="text-neutral-300 hover:text-brand-yellow transition-colors duration-200 block truncate"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUNA 3: CONTATO & CANAIS OFICIAIS (3 cols) ── */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-brand-yellow">
              Atendimento Oficial
            </p>

            <WhatsAppCTA
              context="footer"
              label="Falar no WhatsApp"
              variant="primary"
              size="sm"
              className="w-full font-bold shadow-lg hover:scale-[1.02] transition-all bg-brand-yellow text-neutral-950 hover:bg-brand-yellow-dark"
            />

            <div className="pt-2 space-y-2">
              <span className="text-[11px] text-neutral-300 uppercase tracking-wider font-semibold block">
                Canais & Redes
              </span>
              <div className="flex flex-col gap-2">
                {socialLinks.map((social) => (
                  <Link
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" aria-hidden="true" />
                    <span>{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── BARRA INFERIOR DO FOOTER ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-300 font-normal">
          <p className="text-center sm:text-left">
            © {currentYear} Only in BR. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-neutral-400">
              Operação de alta performance sem improvisos
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Voltar ao topo da página"
              className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-brand-yellow hover:text-neutral-950 border border-white/15 flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
