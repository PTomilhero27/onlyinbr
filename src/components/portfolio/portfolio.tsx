"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioItems, clients, partners } from "@/data/portfolio";
import { SectionLabel } from "@/components/shared/section-wrapper";
import { defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Portfolio — Only in BR
 * Galeria editorial com clientes e parceiros no tema claro.
 */

const sizeToSpan: Record<string, string> = {
  small: "col-span-1 row-span-1",
  medium: "col-span-1 row-span-2",
  large: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
};

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="section-padding overflow-hidden"
      aria-labelledby="portfolio-title"
    >
      <div className="container-site">

        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <SectionLabel>Portfólio & Experiências</SectionLabel>
        </motion.div>

        <motion.h2
          id="portfolio-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white mb-4"
        >
          Onde a energia{" "}
          <span className="text-brand-yellow">acontece.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-neutral-200 text-base sm:text-lg mb-12 max-w-xl font-normal"
        >
          Registros de produção, grandes estruturas e experiências marcantes em São Paulo.
        </motion.p>

        {/* Galeria assimétrica */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
          aria-label="Galeria de portfólio"
        >
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={cn(
                "relative rounded-3xl overflow-hidden group shadow-2xl border border-white/20",
                sizeToSpan[item.size]
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-xs font-semibold">{item.alt}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Nota placeholder */}
        <p className="text-center text-xs text-neutral-400 mt-4 tracking-wide">
          Portfólio em constante atualização
        </p>
      </div>

      {/* Clientes e Parceiros */}
      <div className="container-site mt-20 pt-16 border-t border-white/15">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <LogoMarquee title="Clientes & Setores Atendidos" items={clients} />
          <LogoMarquee title="Parceiros Estratégicos & Mídia" items={partners} />
        </div>
      </div>
    </section>
  );
}

/* ── Marquee de logos ── */

function LogoMarquee({
  title,
  items,
}: {
  title: string;
  items: { id: string; name: string; src?: string }[];
}) {
  return (
    <div>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 0.5 }}
        className="text-xs font-bold tracking-[0.18em] uppercase text-brand-yellow mb-5"
      >
        {title}
      </motion.p>

      {/* Marquee horizontal */}
      <div
        className="overflow-hidden py-1"
        aria-label={`${title} da Only in BR`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-4"
          style={{
            animation: "marquee 20s linear infinite",
          }}
        >
          {/* Duplicar para efeito contínuo */}
          {[...items, ...items].map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="flex-shrink-0 h-12 px-6 rounded-2xl liquid-glass border border-white/20 flex items-center justify-center min-w-[140px] shadow-md hover:border-brand-yellow/50 transition-colors"
              aria-label={item.name}
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.name}
                  width={80}
                  height={32}
                  className="object-contain filter grayscale brightness-200 opacity-70 hover:opacity-100 transition-opacity"
                />
              ) : (
                <span className="text-xs text-neutral-200 font-semibold whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
