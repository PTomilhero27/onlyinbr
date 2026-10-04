"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  CalendarDays,
  Users2,
  Church,
  ShieldCheck,
  Layers,
  Zap,
  FileCheck2,
  Award,
  Palette,
  Megaphone,
  Check,
  Sparkles,
  UtensilsCrossed,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { homeSolutions, serviceSections, type ServiceSection } from "@/data/services";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  CalendarDays,
  Users: Users2,
  Church,
  ShieldCheck,
  Layers,
  Zap,
  FileCheck: FileCheck2,
  Award,
  Palette,
  Megaphone,
  UtensilsCrossed,
  Workflow,
};

const sectionTheme = {
  yellow: {
    checkIcon: "text-brand-yellow",
    checkBg: "bg-brand-yellow/15 text-brand-yellow",
    ctaBg: "bg-brand-yellow text-neutral-950 hover:bg-brand-yellow-dark shadow-brand-yellow/20",
    glow: "from-brand-yellow/15",
    accentText: "text-brand-yellow",
    quoteBorder: "border-brand-yellow/40",
  },
  green: {
    checkIcon: "text-emerald-400",
    checkBg: "bg-emerald-500/15 text-emerald-400",
    ctaBg: "bg-brand-green text-white hover:bg-brand-green-dark shadow-brand-green/20",
    glow: "from-emerald-500/15",
    accentText: "text-emerald-400",
    quoteBorder: "border-emerald-500/40",
  },
  blue: {
    checkIcon: "text-sky-400",
    checkBg: "bg-sky-500/15 text-sky-400",
    ctaBg: "bg-sky-500 text-neutral-950 hover:bg-sky-400 shadow-sky-500/20",
    glow: "from-sky-500/15",
    accentText: "text-sky-400",
    quoteBorder: "border-sky-500/40",
  },
  emerald: {
    checkIcon: "text-emerald-400",
    checkBg: "bg-emerald-500/15 text-emerald-400",
    ctaBg: "bg-emerald-500 text-neutral-950 hover:bg-emerald-400 shadow-emerald-500/20",
    glow: "from-emerald-500/15",
    accentText: "text-emerald-400",
    quoteBorder: "border-emerald-500/40",
  },
};

export function Services() {
  return (
    <div id="servicos" className="relative">
      <section
        id="solucoes"
        className="relative py-16 sm:py-20 border-b border-white/[0.08]"
        aria-labelledby="solutions-title"
      >
        <div className="container-site relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.16em] font-bold text-brand-yellow mb-2">
              Da ideia à operação
            </p>
            <h2
              id="solutions-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight"
            >
              Tudo para o seu evento acontecer.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mt-3 max-w-2xl">
              Você pensa no evento. A Only in BR conecta produção, estrutura, equipes, alimentação e
              divulgação em um plano alinhado ao seu projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {homeSolutions.map((solution) => {
              const Icon = iconMap[solution.iconName] || Layers;

              return (
                <Link
                  key={solution.title}
                  href={solution.href}
                  className="group liquid-glass-card p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-brand-yellow/40 transition-colors focus-visible:outline-2 focus-visible:outline-brand-yellow"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/25 text-brand-yellow flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-heading font-bold text-white leading-snug group-hover:text-brand-yellow transition-colors">
                        {solution.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-1.5">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-brand-yellow">
                    Conheça a solução
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {serviceSections.map((service, index) => {
        const theme = sectionTheme[service.accentColor] || sectionTheme.yellow;

        return (
          <section
            key={service.id}
            id={service.id}
            className="relative py-12 sm:py-16 lg:py-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-start lg:pt-8 lg:pb-10 overflow-hidden border-b border-white/[0.08]"
            aria-labelledby={`service-title-${service.id}`}
          >
            {/* Efeito de luz ambiente de fundo */}
            <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
              <div
                className={cn(
                  "absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[120px] sm:blur-[140px] opacity-20 bg-gradient-to-br",
                  theme.glow,
                  "to-transparent",
                  index % 2 === 0 ? "top-1/4 -right-16" : "top-1/3 -left-16"
                )}
              />
            </div>

            <div className="container-site relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.65 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* ── COLUNA ESQUERDA: NARRATIVA ESTRATÉGICA, MANIFESTO & CTA ── */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-2.5 lg:pr-2">
                  {/* Título & Subtítulo */}
                  <div>
                    <h2
                      id={`service-title-${service.id}`}
                      className="text-2xl sm:text-3xl lg:text-[2.2rem] font-heading font-bold text-white mb-2 leading-[1.15] tracking-tight"
                    >
                      {service.title}
                    </h2>
                    <p className={cn("text-xs sm:text-[0.82rem] font-medium leading-normal mb-2", theme.accentText)}>
                      {service.tagline}
                    </p>
                  </div>

                  {/* Parágrafo Principal */}
                  <div className="space-y-1 text-neutral-200 text-xs sm:text-[0.82rem] leading-normal font-normal">
                    <p className="text-white font-medium">
                      {service.headline}
                    </p>
                    <p className="text-neutral-300 text-[11px] sm:text-xs leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bloco Manifesto / Citação Lateral */}
                  {service.closingTitle && (
                    <div className={cn("pl-3 border-l-2 py-0 space-y-0.5 my-0.5", theme.quoteBorder)}>
                      <h3 className="text-xs sm:text-sm font-heading font-bold text-white leading-tight">
                        {service.closingTitle}
                      </h3>
                      <p className="text-neutral-300 text-[10.5px] sm:text-[11px] leading-normal">
                        {service.closingText}
                      </p>
                      {service.closingHighlight && (
                        <p className={cn("text-[10.5px] sm:text-[11px] font-semibold pt-0.5", theme.accentText)}>
                          {service.closingHighlight}
                        </p>
                      )}
                    </div>
                  )}

                  {/* CTA & Público */}
                  <div className="pt-1 space-y-2">
                    <WhatsAppCTA
                      context={service.ctaContext}
                      label={service.ctaLabel}
                      variant="primary"
                      size="sm"
                      className={cn("w-full sm:w-auto font-bold shadow-xl hover:scale-[1.02] transition-all", theme.ctaBg)}
                    />

                    {service.audience && (
                      <div className="flex flex-wrap items-center gap-1 pt-0.5">
                        <span className="text-[10.5px] text-neutral-400 font-semibold mr-1">Ideal para:</span>
                        {service.audience.map((aud) => (
                          <span
                            key={aud}
                            className="text-[10.5px] font-medium text-neutral-300 bg-white/[0.06] px-2 py-0.5 rounded-md border border-white/10"
                          >
                            {aud}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── COLUNA DIREITA: OS PILARES & ITENS ESTRUTURADOS ── */}
                <div className="lg:col-span-6 space-y-5 pt-6 border-t border-white/10 lg:pt-0 lg:border-t-0 lg:pl-6 lg:border-l lg:border-white/10">
                  {service.highlights.map((h, hIdx) => {
                    const Icon = iconMap[h.iconName] || Briefcase;

                    return (
                      <div key={hIdx} className={cn("space-y-2.5", hIdx > 0 && "pt-4 border-t border-white/10")}>
                        {/* Título do Pilar */}
                        <div className="flex items-center gap-2.5">
                          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm", theme.checkBg)}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-base font-heading font-bold text-white leading-tight">
                              {h.title}
                            </h3>
                            {h.description && (
                              <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                                {h.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Itens com checks elegantes */}
                        <ul className="space-y-1.5 pl-9">
                          {h.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2 text-xs sm:text-[0.82rem] text-neutral-200 leading-snug">
                              <Check className={cn("w-3.5 h-3.5 flex-shrink-0 mt-0.5", theme.checkIcon)} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
