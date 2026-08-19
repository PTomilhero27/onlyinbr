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
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { featuredServices, generalServices, allServices, type ServiceItem } from "@/data/services";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { SectionLabel } from "@/components/shared/section-wrapper";
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

type FilterCategory = "todos" | "destaques" | "estrutura" | "gestao";

export function Services() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("todos");

  const filteredServices = allServices.filter((service) => {
    if (activeFilter === "destaques") return service.category === "destaque";
    if (activeFilter === "estrutura")
      return ["estrutura-locacao", "alvara-documentacao", "equipe-alimentacao"].includes(service.id);
    if (activeFilter === "gestao")
      return ["corporativo", "igrejas", "producao-executiva", "design-eventos", "marketing-influencia"].includes(
        service.id
      );
    return true;
  });

  return (
    <section
      id="servicos"
      className="section-padding relative overflow-hidden"
      aria-labelledby="services-main-title"
    >
      <div className="container-site relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <SectionLabel>Nossos Serviços & Soluções</SectionLabel>
          </motion.div>

          <motion.h2
            id="services-main-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-[1.12] tracking-tight text-white mb-5"
          >
            Produção completa de eventos —{" "}
            <span className="text-brand-yellow">estrutura, documentação, equipe e operação.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral-200 text-base sm:text-lg leading-relaxed font-normal"
          >
            Atuamos em São Paulo e região com soluções de ponta a ponta. Cuidamos do alvará, laudos técnicos com ART no CREA/SP,
            montagem de palcos, tendas, som, iluminação, escala de equipe e divulgação.
          </motion.p>
        </div>

        {/* ── SEÇÃO DE DESTAQUES (Cards Principais) ── */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-yellow">
              Especialidades em Destaque
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredServices.map((service, index) => {
              const Icon = iconMap[service.iconName ?? "Briefcase"] ?? Briefcase;
              const isFirst = index === 0;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className={cn(
                    "relative rounded-3xl p-7 sm:p-9 transition-all duration-300 liquid-glass-opaque shadow-2xl flex flex-col justify-between border",
                    isFirst
                      ? "border-brand-yellow/30 hover:border-brand-yellow"
                      : "border-emerald-400/30 hover:border-emerald-400"
                  )}
                >
                  {/* Badge & Número */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center shadow-md",
                            isFirst ? "bg-brand-yellow text-neutral-950" : "bg-emerald-500 text-neutral-950"
                          )}
                        >
                          <Icon className="w-6 h-6 font-bold" />
                        </div>
                        <div>
                          <span
                            className={cn(
                              "text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider",
                              isFirst
                                ? "bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40"
                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            )}
                          >
                            {service.badge}
                          </span>
                        </div>
                      </div>
                      <span className="text-4xl font-heading font-bold text-white/20 select-none">
                        {service.number}
                      </span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
                      {service.title}
                    </h4>

                    <p className="text-neutral-200 text-sm sm:text-base mb-6 leading-relaxed font-normal">
                      {service.headline}
                    </p>

                    {/* Lista de itens inclusos */}
                    <div className="liquid-glass rounded-2xl p-5 border border-white/15 mb-6">
                      <p className="text-[11px] font-bold tracking-wider uppercase text-neutral-400 mb-3">
                        Itens e Cobertura Inclusos:
                      </p>
                      <ul className="space-y-2.5">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-100">
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                                isFirst ? "bg-brand-yellow text-neutral-950" : "bg-emerald-400 text-neutral-950"
                              )}
                            >
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Público atendido */}
                    {service.audience && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-8">
                        <span className="text-xs text-neutral-400 font-semibold mr-1">Atende:</span>
                        {service.audience.map((aud) => (
                          <span
                            key={aud}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg liquid-glass text-neutral-200 border border-white/15"
                          >
                            {aud}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                    <WhatsAppCTA
                      context={service.ctaContext}
                      label={service.ctaLabel}
                      variant="primary"
                      size="md"
                      className="w-full sm:w-auto bg-brand-yellow text-neutral-950 hover:bg-brand-yellow-dark shadow-xl font-bold"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── SEÇÃO DE SERVIÇOS GERAIS (Grade Completa) ── */}
        <div className="pt-6">
          {/* Barra de Filtros */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-yellow" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-yellow">
                Grade Geral de Serviços Técnicos
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5 p-1 liquid-glass-opaque rounded-2xl border border-white/15">
              <button
                onClick={() => setActiveFilter("todos")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  activeFilter === "todos"
                    ? "bg-brand-yellow text-neutral-950 shadow-md"
                    : "text-neutral-300 hover:text-white"
                )}
              >
                Todos (8)
              </button>
              <button
                onClick={() => setActiveFilter("destaques")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  activeFilter === "destaques"
                    ? "bg-brand-yellow text-neutral-950 shadow-md"
                    : "text-neutral-300 hover:text-white"
                )}
              >
                Destaques
              </button>
              <button
                onClick={() => setActiveFilter("estrutura")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  activeFilter === "estrutura"
                    ? "bg-brand-yellow text-neutral-950 shadow-md"
                    : "text-neutral-300 hover:text-white"
                )}
              >
                Estrutura & Legal
              </button>
              <button
                onClick={() => setActiveFilter("gestao")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  activeFilter === "gestao"
                    ? "bg-brand-yellow text-neutral-950 shadow-md"
                    : "text-neutral-300 hover:text-white"
                )}
              >
                Produção & Mídia
              </button>
            </div>
          </div>

          {/* Cards em Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredServices.map((service, index) => {
                const Icon = iconMap[service.iconName ?? "CalendarDays"] ?? CalendarDays;

                return (
                  <motion.div
                    layout
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="liquid-glass-opaque rounded-3xl p-6 sm:p-7 border border-white/18 shadow-xl hover:border-brand-yellow/50 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Header do Card */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-brand-yellow text-white group-hover:text-neutral-950 flex items-center justify-center transition-colors shadow-sm">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-neutral-400 font-mono">
                          {service.number}
                        </span>
                      </div>

                      <div className="mb-2">
                        {service.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md liquid-glass text-brand-yellow border border-brand-yellow/30">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="text-lg sm:text-xl font-heading font-bold text-white mb-2 leading-snug">
                        {service.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-neutral-300 mb-5 leading-relaxed font-normal">
                        {service.headline}
                      </p>

                      {/* Lista de itens compacta */}
                      <div className="pt-4 border-t border-white/10 mb-6">
                        <ul className="space-y-2">
                          {service.items.slice(0, 4).map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs text-neutral-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0 mt-1.5" />
                              <span className="font-normal leading-snug">{item}</span>
                            </li>
                          ))}
                          {service.items.length > 4 && (
                            <li className="text-[11px] font-semibold text-brand-yellow pt-1">
                              + {service.items.length - 4} outros serviços inclusos
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Botão de WhatsApp */}
                    <div className="pt-4 border-t border-white/10">
                      <WhatsAppCTA
                        context={service.ctaContext}
                        label={service.ctaLabel}
                        variant="outline"
                        size="sm"
                        className="w-full justify-between liquid-glass text-white border-white/20 hover:bg-brand-yellow hover:text-neutral-950 hover:border-brand-yellow transition-all font-semibold"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Banner de Consulta e Responsabilidade Técnica */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7 }}
          className="mt-16 p-8 sm:p-10 rounded-3xl liquid-glass-opaque border border-white/20 text-white relative overflow-hidden shadow-2xl"
        >
          <div
            aria-hidden="true"
            className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-brand-yellow/20 blur-2xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3 border border-brand-yellow/30">
                CNPJ 65.112.374/0001-44 • São Paulo, SP
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                Precisa de uma proposta técnica ou regularização de alvará?
              </h3>
              <p className="text-neutral-200 text-sm sm:text-base font-normal">
                Emitimos Nota Fiscal, contrato de prestação de serviços e laudos técnicos com ART no CREA/SP.
              </p>
            </div>

            <WhatsAppCTA
              context="contact"
              label="Solicitar Proposta Agora"
              variant="primary"
              size="lg"
              className="flex-shrink-0 bg-brand-yellow text-neutral-950 hover:bg-brand-yellow-dark shadow-2xl font-bold"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
