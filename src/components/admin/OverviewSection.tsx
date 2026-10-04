"use client";

import { ArrowRight, HelpCircle, Layers, Phone, Shield } from "lucide-react";
import { type ContactConfig } from "@/lib/store";
import { FormattedNumericText } from "@/components/shared/formatted-numeric-text";
import { type FaqItem } from "@/data/faq";
import { type PortfolioProject } from "@/data/portfolio";

type OverviewSectionProps = {
  projects: PortfolioProject[];
  faq: FaqItem[];
  contact: ContactConfig;
  totalEditionsCount: number;
  setActiveSection: (section: "hub" | "projects" | "faq" | "contact" | "security") => void;
  setContactForm: (value: ContactConfig) => void;
};

export function OverviewSection({
  projects,
  faq,
  contact,
  totalEditionsCount,
  setActiveSection,
  setContactForm,
}: OverviewSectionProps) {
  return (
    <div className="h-full max-h-[82vh] flex flex-col justify-between max-w-6xl w-full mx-auto space-y-4">
      <div className="flex items-center justify-between gap-4 flex-shrink-0 px-1">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            O que você deseja gerenciar hoje?
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-neutral-300">
          <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <FormattedNumericText value={`${projects.length} Projetos`} />
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <FormattedNumericText value={`${totalEditionsCount} Edições`} />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        <div
          onClick={() => setActiveSection("projects")}
          className="group relative p-6 rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent hover:border-brand-yellow/50 transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-yellow/20 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>

              <span className="text-[11px] font-sans font-semibold px-3 py-1 rounded-full bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30">
                <FormattedNumericText value={`${projects.length} Projetos · ${totalEditionsCount} Edições`} />
              </span>
            </div>

            <h3 className="text-lg font-heading font-bold text-white group-hover:text-brand-yellow transition-colors mb-2">
              Crie e edite projetos
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {projects.map((p) => (
                <span
                  key={p.id}
                  className="text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-lg bg-white/[0.06] text-neutral-300 border border-white/10"
                >
                  <FormattedNumericText value={p.name} />
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-brand-yellow font-heading">
            <span className="group-hover:underline">Acessar Projetos</span>
            <div className="w-7 h-7 rounded-full bg-brand-yellow text-neutral-950 flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-md">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <div
          onClick={() => setActiveSection("faq")}
          className="group relative p-6 rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent hover:border-emerald-400/50 transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>

              <span className="text-[11px] font-sans font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {faq.length} Perguntas Cadastradas
              </span>
            </div>

            <h3 className="text-lg font-heading font-bold text-white group-hover:text-brand-yellow transition-colors mb-2">
              Perguntas Frequentes (FAQ)
            </h3>

            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-lg bg-white/[0.06] text-neutral-300 border border-white/10">
                ART & Alvará
              </span>
              <span className="text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-lg bg-white/[0.06] text-neutral-300 border border-white/10">
                Estrutura & Palco 360°
              </span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-brand-yellow font-heading">
            <span className="group-hover:underline">Gerenciar FAQ</span>
            <div className="w-7 h-7 rounded-full bg-brand-yellow text-neutral-950 flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-md">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setContactForm(contact);
            setActiveSection("contact");
          }}
          className="group relative p-6 rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent hover:border-sky-400/50 transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/20 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-sky-500/15 border border-sky-400/30 text-sky-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>

              <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                +{contact.whatsappNumber}
              </span>
            </div>

            <h3 className="text-lg font-heading font-bold text-white group-hover:text-brand-yellow transition-colors mb-2">
              WhatsApp
            </h3>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-brand-yellow font-heading">
            <span className="group-hover:underline">Configurar WhatsApp</span>
            <div className="w-7 h-7 rounded-full bg-brand-yellow text-neutral-950 flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-md">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <div
          onClick={() => setActiveSection("security")}
          className="group relative p-6 rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent hover:border-purple-400/50 transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5" />
              </div>

              <span className="text-[11px] font-sans font-semibold px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Sessão Criptografada
              </span>
            </div>

            <h3 className="text-lg font-heading font-bold text-white group-hover:text-brand-yellow transition-colors mb-2">
              Segurança & Backup JSON
            </h3>

            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-lg bg-white/[0.06] text-neutral-300 border border-white/10">
                Troca de Senha
              </span>
              <span className="text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-lg bg-white/[0.06] text-neutral-300 border border-white/10">
                Exportar JSON
              </span>
              <span className="text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-lg bg-white/[0.06] text-neutral-300 border border-white/10">
                Restaurar Padrões
              </span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-brand-yellow font-heading">
            <span className="group-hover:underline">Abrir Segurança</span>
            <div className="w-7 h-7 rounded-full bg-brand-yellow text-neutral-950 flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-md">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
