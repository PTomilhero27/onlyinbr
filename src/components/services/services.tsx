"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Church,
  CalendarDays,
  Layers,
  FileCheck2,
  Users2,
  Palette,
  Megaphone,
  Check,
  ArrowRight,
} from "lucide-react";
import { allServices, type ServiceItem } from "@/data/services";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Church,
  CalendarDays,
  Layers,
  FileCheck: FileCheck2,
  Users: Users2,
  Palette,
  Megaphone,
};

export function Services() {
  const [active, setActive] = useState<string>(allServices[0].id);

  const activeService = allServices.find((s) => s.id === active)!;
  const Icon = iconMap[activeService.iconName ?? "CalendarDays"] ?? CalendarDays;
  const isFeatured = activeService.category === "destaque";

  return (
    <section
      id="servicos"
      className="section-padding relative overflow-hidden"
      aria-labelledby="services-main-title"
    >
      <div className="container-site relative z-10">

        {/* ── CABEÇALHO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-yellow font-heading text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-80">
              Nossos Serviços
            </p>
            <h2
              id="services-main-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-[1.15] tracking-tight text-white"
            >
              O que a{" "}
              <span
                className="relative inline-block"
                style={{ color: "#3b82f6", fontFamily: "var(--font-brasilero)", fontWeight: 700, WebkitTextStroke: "0.4px #3b82f6" }}
              >
                Only in BR
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={defaultViewport}
                  transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-2 sm:h-3 fill-none stroke-current stroke-[5]"
                  style={{ color: "#3b82f6" }}
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,7 Q50,0 100,7" strokeLinecap="round" />
                </motion.svg>
              </span>
              {" "}entrega.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal lg:pb-1"
          >
            De eventos corporativos a festas de igreja — cobrimos estrutura,
            documentação com ART, equipe e operação de ponta a ponta em São Paulo e região.
          </motion.p>
        </div>

        {/* ── PAINEL INTERATIVO ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-3 lg:gap-5 items-start"
        >
          {/* ── LISTA (esquerda) ── */}
          <div className="liquid-glass-opaque rounded-2xl border border-white/10 p-1.5 flex flex-col h-full">
            {allServices.map((service) => {
              const SIcon = iconMap[service.iconName ?? "CalendarDays"] ?? CalendarDays;
              const isActive = active === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActive(service.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-1 rounded-xl text-left transition-all duration-200 cursor-pointer w-full",
                    isActive
                      ? "bg-brand-yellow/10 border border-brand-yellow/25"
                      : "border border-transparent hover:bg-white/[0.04] hover:border-white/10"
                  )}
                >
                  {/* Ícone */}
                  <div className={cn(
                    "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200",
                    isActive
                      ? "bg-brand-yellow text-neutral-950"
                      : "bg-white/[0.06] text-neutral-500 group-hover:bg-white/10 group-hover:text-neutral-300"
                  )}>
                    <SIcon className="w-3 h-3" />
                  </div>

                  {/* Título + badge */}
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-xs font-heading font-bold leading-snug truncate transition-colors",
                      isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
                    )}>
                      {service.title}
                    </p>
                    <p className={cn(
                      "text-[10px] transition-colors truncate",
                      isActive ? "text-brand-yellow/70" : "text-neutral-600"
                    )}>
                      {service.badge ?? `Serviço ${service.number}`}
                    </p>
                  </div>

                  <ArrowRight className={cn(
                    "w-3 h-3 flex-shrink-0 transition-all duration-200",
                    isActive ? "text-brand-yellow" : "opacity-0 group-hover:opacity-40 text-neutral-400"
                  )} />
                </button>
              );
            })}
          </div>

          {/* ── PAINEL DE DETALHES (direita) ── */}
          <div className="relative h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="liquid-glass-opaque rounded-2xl border border-white/10 p-4 sm:p-6 shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                    isFeatured ? "bg-brand-yellow text-neutral-950" : "bg-emerald-500/20 text-emerald-400"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    {activeService.badge && (
                      <span className={cn(
                        "inline-block text-[10px] font-bold uppercase tracking-widest mb-1",
                        isFeatured ? "text-brand-yellow" : "text-emerald-400"
                      )}>
                        {activeService.badge}
                      </span>
                    )}
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white leading-tight">
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-neutral-300 text-sm leading-relaxed mb-3">
                  {activeService.description}
                </p>

                {/* Itens em 2 colunas */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-3">
                  {activeService.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-200">
                      <div className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                        isFeatured ? "bg-brand-yellow/20 text-brand-yellow" : "bg-emerald-500/20 text-emerald-400"
                      )}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Público atendido */}
                {activeService.audience && (
                  <div className="flex flex-wrap gap-1.5 mb-3 pt-3 border-t border-white/10">
                    <span className="text-xs text-neutral-500 font-semibold self-center mr-1">Atende:</span>
                    {activeService.audience.map((aud) => (
                      <span key={aud} className="text-xs font-medium px-3 py-1 rounded-lg liquid-glass text-neutral-300 border border-white/15">
                        {aud}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="pt-3 border-t border-white/10">
                  <WhatsAppCTA
                    context={activeService.ctaContext}
                    label={activeService.ctaLabel}
                    variant="primary"
                    size="md"
                    className="bg-brand-yellow text-neutral-950 hover:bg-brand-yellow-dark font-bold shadow-lg"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
