/**
 * Variantes de animação reutilizáveis — Only in BR
 *
 * Centraliza a linguagem de motion do projeto.
 * Usar estas variantes nos componentes para consistência visual.
 *
 * Nota: ease bezier custom requer tipagem como tupla [n,n,n,n] no Framer Motion v13+.
 */

import type { Variants } from "framer-motion";

/** Bezier custom padrão de transição — tipado como tupla */
const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/** Fade + slide up — reveal padrão de seções */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

/** Fade simples */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Stagger container — para animar filhos em sequência */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Stagger container lento — para seções mais espaçadas */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

/** Slide da esquerda */
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease },
  },
};

/** Slide da direita */
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease },
  },
};

/** Scale up — para elementos que "surgem" */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

/** Zoom out cinematográfico — exclusivo do Hero */
export const heroImageVariants: Variants = {
  initial: { scale: 1.08, opacity: 0.7 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 2.5, ease },
  },
};

/** Configuração padrão de viewport para animações de scroll */
export const defaultViewport = {
  once: true,
  margin: "-80px",
} as const;
