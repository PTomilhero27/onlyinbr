"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { company } from "@/data/company";
import { SectionWrapper, SectionLabel } from "@/components/shared/section-wrapper";
import { defaultViewport } from "@/lib/motion";

/**
 * About — Only in BR
 * Seção de posicionamento da marca no tema claro.
 */

const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" as const },
  }),
};

export function About() {
  const valuesRef = useRef(null);
  const isValuesInView = useInView(valuesRef, defaultViewport);

  return (
    <SectionWrapper
      id="sobre"
      className="section-padding relative overflow-hidden"
      animate={false}
    >
      <div className="container-site relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionLabel>Sobre a Only in BR</SectionLabel>
        </motion.div>

        {/* Layout assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Coluna esquerda — texto manifesto */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-[1.12] tracking-tight text-white mb-8"
            >
              Não queremos ser
              <br />
              mais uma produtora.
              <br />
              <span className="text-brand-yellow">Queremos ser</span>
              <br />
              referência nacional.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-neutral-200 text-base sm:text-lg leading-relaxed mb-6 font-normal"
            >
              {company.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal"
            >
              {company.mission}
            </motion.p>
          </div>

          {/* Coluna direita — valores em escala */}
          <div ref={valuesRef} className="lg:pt-4">
            <div
              aria-label="Valores da Only in BR"
              className="flex flex-wrap gap-2.5 sm:gap-3"
            >
              {company.values.map((value, i) => (
                <motion.span
                  key={value}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate={isValuesInView ? "visible" : "hidden"}
                  className="inline-block px-4 py-2 rounded-2xl liquid-glass font-heading font-bold text-white/80 hover:text-brand-yellow hover:border-brand-yellow/50 transition-all duration-300 cursor-default select-none text-sm sm:text-base shadow-sm"
                >
                  {value}
                </motion.span>
              ))}
            </div>

            {/* Frase de impacto */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 p-7 rounded-3xl liquid-glass-opaque border border-white/20 border-l-4 border-l-brand-yellow shadow-2xl"
            >
              <p className="text-xl sm:text-2xl font-heading font-bold text-white leading-snug">
                "A energia que conecta pessoas."
              </p>
              <p className="text-xs text-brand-yellow font-bold mt-2 tracking-widest uppercase">
                — Only in BR • Marca Autoral
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
