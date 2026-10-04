"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  Maximize2,
  Flame,
  ArrowRight,
} from "lucide-react";
import {
  portfolioProjects as initialProjects,
  portfolioCategories,
  clients,
  partners,
  type PortfolioProject,
  type ProjectEdition,
  type PortfolioCategory,
  type ProjectEditionPhoto,
} from "@/data/portfolio";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSiteStore } from "@/lib/store";
import { FormattedNumericText } from "@/components/shared/formatted-numeric-text";

export function Portfolio() {
  const { projects: storeProjects, contact } = useSiteStore();
  const rawProjects = storeProjects || [];

  // Filtra apenas projetos PUBLICADOS que possuem pelo menos 1 edição publicada
  const publishedProjects = rawProjects
    .filter(
      (p) =>
        p.isPublished !== false &&
        p.status !== "draft" &&
        p.editions.filter((ed) => ed.isPublished !== false && ed.status !== "draft").length > 0
    )
    .map((p) => {
      const activeEditions = p.editions.filter(
        (ed) => ed.isPublished !== false && ed.status !== "draft"
      );
      return {
        ...p,
        editions: activeEditions,
        totalEditions: activeEditions.length,
      };
    });
  const publishedEditionCount = publishedProjects.reduce(
    (total, project) => total + project.editions.length,
    0
  );

  // Categorias dinâmicas geradas EXCLUSIVAMENTE dos projetos ativos e publicados
  const dynamicCategories = [
    { id: "todos", label: "Todos os Projetos", count: publishedProjects.length },
    ...publishedProjects.map((p) => ({
      id: p.id,
      label: p.name,
      count: p.editions.length,
    })),
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [activeEditionIndex, setActiveEditionIndex] = useState<number>(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    photo: ProjectEditionPhoto;
    index: number;
    photos: ProjectEditionPhoto[];
  } | null>(null);

  // Garante que se a categoria selecionada for excluída ou oculta, volte para "todos"
  const isSelectedValid = selectedCategory === "todos" || dynamicCategories.some((c) => c.id === selectedCategory);
  const currentCategory = isSelectedValid ? selectedCategory : "todos";

  // Filtragem dos projetos ativos
  const filteredProjects =
    currentCategory === "todos"
      ? publishedProjects
      : publishedProjects.filter((p) => p.id === currentCategory || p.category === currentCategory);

  // Fecha modais com tecla ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (lightboxPhoto) {
          setLightboxPhoto(null);
        } else if (activeProject) {
          setActiveProject(null);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxPhoto, activeProject]);

  // Bloqueia scroll do body quando modal está aberto
  useEffect(() => {
    if (activeProject || lightboxPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeProject, lightboxPhoto]);

  // Abre o projeto na primeira edição
  const handleOpenProject = (project: PortfolioProject, editionIndex: number = 0) => {
    setActiveProject(project);
    setActiveEditionIndex(editionIndex);
  };

  const currentEdition: ProjectEdition | null =
    activeProject && activeProject.editions[activeEditionIndex]
      ? activeProject.editions[activeEditionIndex]
      : null;

  return (
    <section
      id="portfolio"
      className="relative py-20 lg:py-28 overflow-hidden border-b border-white/[0.08]"
      aria-labelledby="portfolio-title"
    >
      {/* Efeito de luz ambiente de fundo */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-brand-yellow/12 rounded-full blur-[170px] opacity-30" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[450px] bg-brand-green/25 rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="container-site relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16">
        {/* ── CABEÇALHO DA SEÇÃO DE PORTFÓLIO ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>

            <h2
              id="portfolio-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white mb-3 leading-[1.12]"
            >
              Onde a energia{" "}
              <span
                className="relative inline-block text-brand-yellow"
                style={{
                  fontFamily: "var(--font-brasilero)",
                  fontWeight: 700,
                  WebkitTextStroke: "0.4px currentColor",
                }}
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
              Cada formato pede uma produção própria: feiras gastronômicas, festivais e eventos corporativos
              têm necessidades diferentes. Aqui você encontra os projetos cadastrados e os detalhes
              disponíveis em cada registro, sem antecipar resultados que ainda não foram publicados.
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

        {/* ── SE NÃO HOUVER PROJETOS CADASTRADOS (INÍCIO DO ZERO) ── */}
        {publishedProjects.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 sm:p-14 text-center max-w-2xl mx-auto backdrop-blur-xl my-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center mx-auto mb-5 text-brand-yellow">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
              Novas produções em breve
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Estamos preparando a cobertura e os registros das próximas grandes experiências da Only in BR.
              Tem uma ideia ou quer planejar seu evento conosco?
            </p>
            <div className="flex justify-center">
              <WhatsAppCTA
                context="portfolio"
                label="Falar com a Equipe"
                variant="primary"
                size="md"
                className="font-bold shadow-xl hover:scale-[1.02] transition-all"
              />
            </div>
          </div>
        ) : (
          <>
            {/* ── FILTROS INTERATIVOS POR PROJETO ── */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {dynamicCategories.map((cat) => {
            const isSelected = currentCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap border flex items-center gap-2",
                  isSelected
                    ? "bg-brand-yellow text-neutral-950 border-brand-yellow font-bold shadow-lg shadow-brand-yellow/20 scale-[1.02]"
                    : "text-neutral-300 border-white/10 hover:text-white hover:border-white/25 hover:bg-white/[0.06]"
                )}
              >
                <span>{cat.label}</span>
                {cat.id !== "todos" && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full",
                      isSelected
                        ? "bg-neutral-950 text-brand-yellow font-bold"
                        : "bg-white/10 text-neutral-300"
                    )}
                  >
                    {cat.count} {cat.count === 1 ? "edição" : "edições"}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── GRID DE CARDS DOS PROJETOS (INTERATIVO) ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                onClick={() => handleOpenProject(project, 0)}
                className="group relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-neutral-900/60 hover:border-brand-yellow/60 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Imagem de Fundo com Zoom Suave */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradiente Cinematográfico */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/20 opacity-90 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Badges Flutuantes Superiores */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-brand-yellow/30 shadow-lg">
                      {project.categoryLabel}
                    </span>

                    <span className="text-[11px] font-bold text-white bg-brand-green/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-lg flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-yellow" />
                      <span><FormattedNumericText value={`${project.totalEditions} Edições Realizadas`} /></span>
                    </span>
                  </div>

                  {/* Informações Centrais / Rodapé da Foto */}
                  <div className="absolute bottom-4 inset-x-4 z-10">
                    <div className="flex items-center gap-2 text-xs text-brand-yellow font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span><FormattedNumericText value={project.editions[0]?.location || "São Paulo, SP"} /></span>
                      <span className="text-white/40">•</span>
                      <span><FormattedNumericText value={project.stats.totalAudience} /></span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight mb-1 group-hover:text-brand-yellow transition-colors flex items-center justify-between">
                      <span><FormattedNumericText value={project.name} /></span>
                      <span className="w-9 h-9 rounded-full bg-brand-yellow text-neutral-950 flex items-center justify-center text-sm transform group-hover:translate-x-1 group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Bloco Inferior: Miniaturas e Navegação Rápida de Edições */}
                <div className="p-4 sm:p-5 bg-neutral-950/90 border-t border-white/10 backdrop-blur-md flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-semibold text-neutral-200">
                      Edições disponíveis para explorar:
                    </span>
                    <span className="text-brand-yellow font-bold group-hover:underline flex items-center gap-1">
                      Ver histórico completo
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Pills das edições do projeto */}
                  <div className="flex flex-wrap gap-2">
                    {project.editions.map((ed, edIdx) => (
                      <button
                        key={ed.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenProject(project, edIdx);
                        }}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/[0.07] hover:bg-brand-yellow hover:text-neutral-950 border border-white/10 hover:border-brand-yellow transition-all duration-200 flex items-center gap-1.5"
                      >
                        <span className="font-bold text-brand-yellow group-hover/btn:text-neutral-950 inline-flex items-center gap-0.5 leading-none">
                          <FormattedNumericText value={`${ed.editionNumber.replace(/\s*Edição.*$/i, "")} Edição`} />
                        </span>
                        <span className="text-neutral-300">(<FormattedNumericText value={ed.year} />)</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
          </>
        )}

        {/* ── NÚMEROS DE AUTORIDADE E RESULTADOS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16 pt-10 border-t border-white/10">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/25 flex items-center justify-center text-brand-yellow flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-sans font-black text-brand-yellow tracking-tight leading-none block mb-1">
                +{publishedEditionCount}
              </span>
              <span className="text-xs sm:text-sm text-neutral-300 font-medium leading-snug block">
                Edições autorais produzidas
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
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-sans font-black text-sky-400 tracking-tight leading-none block mb-1">
                +135 Mil
              </span>
              <span className="text-xs sm:text-sm text-neutral-300 font-medium leading-snug block">
                Público impactado nos eventos
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
                Do alvará à desmontagem final
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

      {/* ── MODAL INTERATIVO DE EDIÇÕES DO PROJETO ── */}
      <AnimatePresence>
        {activeProject && currentEdition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-neutral-950/85 backdrop-blur-xl"
            />

            {/* Container do Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative w-full max-w-5xl max-h-[92vh] bg-[#0a2315] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 40px rgba(245, 189, 44, 0.15)",
              }}
            >
              {/* Header do Modal */}
              <div className="p-5 sm:p-6 bg-neutral-950/60 border-b border-white/10 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-yellow">
                      <FormattedNumericText value={activeProject.name} />
                    </span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-xs text-neutral-300">
                      <FormattedNumericText value={`${activeProject.totalEditions} Edições Registradas`} />
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    <FormattedNumericText value={currentEdition.title} />
                  </h3>
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
                  aria-label="Fechar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Seletor Interativo de Edições (Abas / Pills) */}
              <div className="px-5 sm:px-6 py-3 bg-neutral-950/40 border-b border-white/10 overflow-x-auto flex items-center gap-2 scrollbar-none">
                <span className="text-xs font-semibold text-neutral-400 whitespace-nowrap mr-1">
                  Selecione a Edição:
                </span>
                {activeProject.editions.map((ed, idx) => {
                  const isCurrent = idx === activeEditionIndex;
                  return (
                    <button
                      key={ed.id}
                      onClick={() => setActiveEditionIndex(idx)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer border",
                        isCurrent
                          ? "bg-brand-yellow text-neutral-950 border-brand-yellow shadow-md"
                          : "bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <span className="inline-flex items-center gap-0.5 leading-none">
                        <FormattedNumericText value={ed.editionNumber} />
                      </span>
                      <span className={cn("text-[10px]", isCurrent ? "text-neutral-900" : "text-neutral-400")}>
                        (<FormattedNumericText value={ed.year} />)
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Conteúdo com Scroll da Edição */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                {/* Meta Informações (Local, Data, Público) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Local</span>
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        <FormattedNumericText value={currentEdition.location} />
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Data</span>
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        <FormattedNumericText value={currentEdition.date} />
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-3">
                    <Users className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Público</span>
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        <FormattedNumericText value={currentEdition.audience} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Descrição da Edição */}
                <div className="bg-white/[0.03] p-4 sm:p-5 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-bold text-brand-yellow uppercase tracking-wider mb-2">
                    Sobre Esta Edição
                  </h4>
                  <p className="text-sm text-neutral-200 leading-relaxed">
                    <FormattedNumericText value={currentEdition.description} />
                  </p>
                </div>

                {/* Escopo de Produção Executada Only in BR */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      Destaques & Engenharia
                    </h4>
                    <ul className="space-y-1.5">
                      {currentEdition.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-neutral-200 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span><FormattedNumericText value={h} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                    <h4 className="text-xs font-bold text-brand-yellow uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Estrutura & Operação Only in BR
                    </h4>
                    <ul className="space-y-1.5">
                      {currentEdition.scope.map((s, i) => (
                        <li key={i} className="text-xs text-neutral-200 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0 mt-1.5" />
                          <span><FormattedNumericText value={s} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Galeria de Fotos da Edição */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>Galeria de Fotos da Edição</span>
                      <span className="text-xs font-normal text-neutral-400">
                        ({currentEdition.gallery.length} fotos)
                      </span>
                    </h4>
                    <span className="text-xs text-brand-yellow flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Clique na foto para ampliar
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {currentEdition.gallery.map((photo, photoIdx) => (
                      <div
                        key={photo.id}
                        onClick={() =>
                          setLightboxPhoto({
                            photo,
                            index: photoIdx,
                            photos: currentEdition.gallery,
                          })
                        }
                        className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-white/10 hover:border-brand-yellow cursor-pointer transition-all duration-300"
                      >
                        <Image
                          src={photo.url}
                          alt={photo.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-[11px] text-white font-medium line-clamp-2">
                            {photo.caption || photo.alt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rodapé do Modal com CTA WhatsApp Personalizado */}
              <div className="p-4 sm:p-5 bg-neutral-950/70 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-neutral-300 text-center sm:text-left">
                  Gostou da produção do <strong className="text-brand-yellow">{activeProject.name}</strong>?
                  Solicite um projeto sob medida para seu evento.
                </div>

                <a
                  href={getWhatsAppLink({
                    source: "portfolio",
                    service: activeProject.name,
                    customMessage: `Olá! Vi a ${currentEdition.editionNumber} do projeto ${activeProject.name} no site da Only in BR e gostaria de solicitar um orçamento para o meu evento.`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-brand-yellow text-neutral-950 font-bold text-xs sm:text-sm hover:scale-[1.02] shadow-lg shadow-brand-yellow/25 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Solicitar Orçamento Deste Formato</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── LIGHTBOX FULLSCREEN (ZOOM DE FOTOS) ── */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl">
            {/* Fechar */}
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar foto"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Anterior */}
            {lightboxPhoto.photos.length > 1 && (
              <button
                onClick={() => {
                  const newIndex =
                    (lightboxPhoto.index - 1 + lightboxPhoto.photos.length) %
                    lightboxPhoto.photos.length;
                  setLightboxPhoto({
                    photo: lightboxPhoto.photos[newIndex],
                    index: newIndex,
                    photos: lightboxPhoto.photos,
                  });
                }}
                className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Foto Ampliada */}
            <motion.div
              key={lightboxPhoto.photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-[65vh] sm:h-[75vh]">
                <Image
                  src={lightboxPhoto.photo.url}
                  alt={lightboxPhoto.photo.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {lightboxPhoto.photo.caption && (
                <div className="mt-4 px-4 py-2 rounded-xl bg-neutral-900/80 border border-white/10 text-center max-w-xl">
                  <p className="text-sm text-neutral-200">{lightboxPhoto.photo.caption}</p>
                </div>
              )}

              <div className="mt-2 text-xs text-neutral-400 font-mono">
                {lightboxPhoto.index + 1} de {lightboxPhoto.photos.length}
              </div>
            </motion.div>

            {/* Próxima */}
            {lightboxPhoto.photos.length > 1 && (
              <button
                onClick={() => {
                  const newIndex = (lightboxPhoto.index + 1) % lightboxPhoto.photos.length;
                  setLightboxPhoto({
                    photo: lightboxPhoto.photos[newIndex],
                    index: newIndex,
                    photos: lightboxPhoto.photos,
                  });
                }}
                className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
