"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Users, Star, Globe, Award } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { defaultViewport } from "@/lib/motion";

/**
 * About — Only in BR
 * Layout limpo: headline + parágrafo + cards de pilares.
 */

const pillars = [
  {
    icon: Zap,
    title: "Energia & Conexão",
    desc: "Eventos que criam experiências reais e marcam memórias.",
    color: "text-brand-yellow",
    bg: "bg-brand-yellow/10",
  },
  {
    icon: Shield,
    title: "Documentação Completa",
    desc: "ART, alvará, laudos e toda a burocracia resolvida.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    desc: "Operação técnica de ponta a ponta, do briefing à desmontagem.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Star,
    title: "Marca Autoral",
    desc: "Identidade própria, marca brasileira com cultura e positividade.",
    color: "text-brand-yellow",
    bg: "bg-brand-yellow/10",
  },
  {
    icon: Globe,
    title: "São Paulo e Região",
    desc: "Atendemos corporativos, igrejas, prefeituras e agências.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Award,
    title: "Execução Total",
    desc: "Estrutura, audiovisual, alimentação e operação completa.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

export function About() {
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, defaultViewport);

  return (
    <SectionWrapper
      id="sobre"
      className="section-padding relative overflow-hidden"
      animate={false}
    >
      <div className="container-site relative z-10">

        {/* Topo: headline + parágrafo lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-16">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-brand-yellow font-heading text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-80">
              Quem somos
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-[1.25] tracking-tight text-white">
              Cada evento, uma{" "}
              <span
                className="relative inline-block text-brand-yellow"
                style={{ fontFamily: "var(--font-brasilero)", fontWeight: 700, WebkitTextStroke: "0.4px currentColor" }}
              >
                história
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={defaultViewport}
                  transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-2 sm:h-3 text-brand-yellow fill-none stroke-current stroke-[5]"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,7 Q50,0 100,7" strokeLinecap="round" />
                </motion.svg>
              </span>
              {" "}que o Brasil vai lembrar.
            </h2>
          </motion.div>

          {/* Parágrafo curto e direto */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal lg:pb-1"
          >
            Somos a <span className="text-white font-semibold">Only in BR</span> — marca autoral de entretenimento e produção executiva de eventos em São Paulo. Estrutura, equipe, documentação e operação completa para eventos corporativos, comunitários e públicos.
          </motion.p>
        </div>

        {/* Grid de pilares */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isGridInView ? "visible" : "hidden"}
                className="group flex items-start gap-4 p-5 rounded-2xl liquid-glass border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-xl ${pillar.bg} ${pillar.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-heading font-bold text-sm sm:text-base leading-tight mb-1">
                    {pillar.title}
                  </p>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
