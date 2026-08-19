"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";

const easePaint = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Variantes de texto
const textVariants: Variants = {
  hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easePaint },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-center overflow-hidden pt-36 pb-16 sm:pt-40 sm:pb-24"
      aria-label="Hero — A energia que conecta pessoas"
    >
      {/* ── 1. PINCELADAS DE LUZ FLUIDAS (TOTALMENTE SUAVES, SEM CORTES) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* Pincelada Dourada Suave no Topo Direito */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: easePaint }}
          className="absolute -top-24 -right-24 w-[600px] h-[500px] bg-brand-yellow/15 rounded-full blur-[100px] pointer-events-none"
        />
      </div>

      {/* ── 2. LOGO FLUTUANTE (NO MOBILE: DIREITA E INCLINADA PARA O OUTRO LADO; NO DESKTOP: ESQUERDA) ── */}
      <div className="absolute right-[-8%] sm:right-auto sm:left-[-6%] md:left-[-3%] lg:left-[0%] top-[4%] sm:top-[-10%] md:top-[-8%] lg:top-[-6%] pointer-events-none select-none z-[1]">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.55,
            filter: "blur(20px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.3,
            delay: 0.15,
            ease: easePaint,
          }}
          className="relative w-[240px] sm:w-[480px] md:w-[580px] lg:w-[680px] xl:w-[760px] aspect-square flex items-center justify-center opacity-30 sm:opacity-94"
        >
          {/* Halo de luz colorida atrás da logo */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-yellow/30 via-emerald-400/20 to-blue-500/20 blur-3xl animate-pulse" />

          {/* Animação Contínua: Positiva (+12deg) no mobile, Negativa (-12deg) no desktop */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center rotate-12 sm:-rotate-12"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5.5,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/logos/PNG/Logo Only in BR COMPLETO PNG 1.png"
              alt="Logo Only in BR Oficial"
              fill
              priority
              className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
              sizes="(max-width: 768px) 50vw, 55vw"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── 3. CONTEÚDO PRINCIPAL NA DIREITA COM ALTURA E ESPAÇO ADEQUADO ── */}
      <div className="container-site relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 flex justify-end">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="w-full max-w-xl lg:max-w-2xl text-white flex flex-col items-start text-left z-10"
        >

          {/* Headline */}
          <motion.h1
            variants={textVariants}
            className="text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold leading-[1.08] tracking-tight text-white mb-2.5 sm:mb-3.5 drop-shadow-md text-left"
          >
            A energia que{" "}
            <span
              className="relative inline-block text-brand-green-light"
              style={{ fontFamily: "var(--font-brasilero)", fontWeight: 700, WebkitTextStroke: "0.4px currentColor" }}
            >
              conecta
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
                aria-hidden="true"
                className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-2 sm:h-3 text-brand-green-light fill-none stroke-current stroke-[5]"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path d="M0,7 Q50,0 100,7" strokeLinecap="round" />
              </motion.svg>
            </span>
            <br />
            pessoas.
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={textVariants}
            className="text-xs sm:text-base md:text-lg text-neutral-200 leading-relaxed mb-4 sm:mb-6 max-w-xl font-normal drop-shadow-xs text-left"
          >
            Marca autoral de entretenimento e produção executiva de grandes eventos.
            Estrutura, documentação com ART, equipe especializada e operação completa em São Paulo e região.
          </motion.p>

          {/* CTAs de Conversão — Altura idêntica e sem quebras estranhas */}
          <motion.div
            variants={textVariants}
            className="flex flex-row gap-2.5 sm:gap-3 items-center mb-5 sm:mb-6 w-full sm:w-auto"
          >
            <WhatsAppCTA
              context="hero"
              label="WhatsApp"
              variant="secondary"
              size="sm"
              className="bg-brand-green hover:bg-brand-green-dark text-white shadow-xl shadow-brand-green/30 font-black hover:scale-[1.02] transition-all h-12 sm:h-14 px-5 sm:px-7 border border-emerald-400/30 justify-center items-center text-center text-sm sm:text-lg whitespace-nowrap flex-1 sm:flex-initial tracking-wide"
            />
            <Link
              href="#servicos"
              style={{ fontFamily: "var(--font-brasilero)", fontWeight: 700, WebkitTextStroke: "0.4px currentColor" }}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-lg font-bold text-white hover:text-brand-yellow liquid-glass hover:bg-white/20 rounded-full h-12 sm:h-14 px-5 sm:px-7 transition-all duration-200 shadow-sm text-center whitespace-nowrap flex-1 sm:flex-initial tracking-wide"
              aria-label="Ver serviços da Only in BR"
            >
              Ver Serviços
            </Link>
          </motion.div>


        </motion.div>
      </div>

      {/* Indicador de rolagem discreto no rodapé da primeira tela */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-0.5 opacity-60 hover:opacity-100 transition-opacity z-10">
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-white/70" />
        </motion.div>
      </div>
    </section>
  );
}
