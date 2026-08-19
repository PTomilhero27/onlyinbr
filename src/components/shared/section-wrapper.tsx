"use client";

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { fadeUpVariants, staggerContainer, defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const easeCustom = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
}

/**
 * SectionWrapper — Only in BR
 *
 * Wrapper padrão para seções da página.
 * Aplica o reveal animado com fade + slide up ao entrar no viewport.
 * Pode ser desabilitado com animate={false}.
 */
export function SectionWrapper({
  children,
  className,
  id,
  animate = true,
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, defaultViewport);

  if (!animate) {
    return (
      <section id={id} className={className} ref={ref}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
}

/**
 * AnimatedText — Only in BR
 *
 * Texto animado com fade + slide up.
 * Usar dentro de SectionWrapper para stagger automático,
 * ou com delay para sequenciar manualmente.
 */
export function AnimatedText({
  children,
  className,
  as: Tag = "div",
  delay,
}: AnimatedTextProps) {
  const variants: Variants = delay
    ? {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: easeCustom },
        },
      }
    : fadeUpVariants;

  return (
    <motion.div variants={variants} className={cn("w-full", className)}>
      <Tag className="w-full">{children}</Tag>
    </motion.div>
  );
}

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * SectionLabel — Only in BR
 *
 * Label discreta de seção. Ex: "01 — Serviços"
 */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full",
        "liquid-glass-opaque border border-brand-yellow/30 text-brand-yellow",
        "text-xs font-bold uppercase tracking-wider shadow-sm",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
      {children}
    </span>
  );
}
