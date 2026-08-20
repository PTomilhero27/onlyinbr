"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";
import {
  portfolioItems,
  portfolioCategories,
  clients,
  partners,
  type PortfolioCategory,
} from "@/data/portfolio";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>("todos");

  const filteredItems =
    selectedCategory === "todos"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="relative py-20 lg:py-28 overflow-hidden border-b border-white/[0.08]"
      aria-labelledby="portfolio-title"
    >
      {/* Efeito de luz ambiente de fundo */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-yellow/10 rounded-full blur-[160px] opacity-25" />
      </div>

      <div className="container-site relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16">

        {/* ── CABEÇALHO DA SEÇÃO DE PORTFÓLIO ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <h2
              id="portfolio-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white mb-2 leading-[1.12]"
            >
              Onde a energia{" "}
              <span
                className="relative inline-block text-brand-yellow"
                style={{ fontFamily: "var(--font-brasilero)", fontWeight: 700, WebkitTextStroke: "0.4px currentColor" }}
              >
                acontece.
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={defaultViewport}
                  transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 w-full h-2 text-brand-yellow fill-none stroke-current stroke-[5]"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,7 Q50,0 100,7" strokeLinecap="round" />
                </motion.svg>
              </span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Registros de produções executivas, palcos de grande porte, eventos corporativos e celebrações comunitárias em São Paulo e região.
            </p>
          </div>

          {/* CTA Rápido */}
          <div className="flex-shrink-0">
            <WhatsAppCTA
              context="portfolio"
              label="Realizar Meu Evento"
              variant="primary"
              size="sm"
              className="font-bold shadow-xl hover:scale-[1.02] transition-all whitespace-nowrap"
            />
          </div>
        </div>

        {/* ── FILTROS INTERATIVOS POR CATEGORIA (SEM CARDS) ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {portfolioCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as PortfolioCategory)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap border",
                  isSelected
                    ? "bg-brand-yellow text-neutral-950 border-brand-yellow font-bold shadow-lg shadow-brand-yellow/20"
                    : "text-neutral-300 border-white/10 hover:text-white hover:border-white/25 hover:bg-white/[0.05]"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── GRID DE FOTOS EDITORIAL (SEM CARDS PESADOS) ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  "group relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[16/11] transition-all duration-500 hover:border-white/30",
                  item.size === "featured" && "md:col-span-2 lg:col-span-2 aspect-[16/9]"
                )}
              >
                {/* Imagem em Alta Definição */}
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradiente Cinematográfico de Fundo */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Badge de Categoria Flutuante no Topo */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-neutral-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Informações na Base da Foto */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 text-xs text-brand-yellow font-medium mb-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-heading font-bold text-white leading-snug mb-1 group-hover:text-brand-yellow transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-16 overflow-hidden">
                    {item.highlight}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── NÚMEROS DE AUTORIDADE E RESULTADOS (FONTE SANS NÍTIDA) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16 pt-10 border-t border-white/10">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/25 flex items-center justify-center text-brand-yellow flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-sans font-black text-brand-yellow tracking-tight leading-none block mb-1">
                +100
              </span>
              <span className="text-xs sm:text-sm text-neutral-300 font-medium leading-snug block">
                Eventos realizados e estruturados
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-sans font-black text-emerald-400 tracking-tight leading-none block mb-1">
                100%
              </span>
              <span className="text-xs sm:text-sm text-neutral-300 font-medium leading-snug block">
                Conformidade com ART no CREA/SP
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-400/25 flex items-center justify-center text-sky-400 flex-shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-sans font-black text-sky-400 tracking-tight leading-none block mb-1">
                SP & Região
              </span>
              <span className="text-xs sm:text-sm text-neutral-300 font-medium leading-snug block">
                Cobertura operacional completa
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-sans font-black text-white tracking-tight leading-none block mb-1">
                360°
              </span>
              <span className="text-xs sm:text-sm text-neutral-300 font-medium leading-snug block">
                Do projeto à desmontagem final
              </span>
            </div>
          </div>
        </div>

        {/* ── PARCEIROS ESTRATÉGICOS & MÍDIA ── */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Parceiros de Mídia & Operação
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            {partners.map((p) => (
              <span
                key={p.id}
                className="text-xs font-medium text-neutral-200 bg-white/[0.06] hover:bg-white/[0.12] hover:text-white border border-white/10 hover:border-brand-yellow/30 px-3.5 py-1.5 rounded-full transition-all duration-200 shadow-sm cursor-default"
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
