"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { SectionLabel } from "@/components/shared/section-wrapper";
import { defaultViewport } from "@/lib/motion";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

interface LegacyService {
  id: string;
  number?: string;
  slug?: string;
  title: string;
  headline: string;
  description?: string;
  badge?: string;
  items?: string[];
  audience?: string[];
  ctaLabel?: string;
  ctaContext?: string;
}

interface ServiceSectionProps {
  service: LegacyService | Service;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  dark?: boolean;
}

/**
 * ServiceSection — Only in BR
 * Template base para seções de serviço no tema claro.
 */
export function ServiceSection({
  service,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  dark = false,
}: ServiceSectionProps) {
  const isRight = imagePosition === "right";
  const legacy = service as LegacyService;

  return (
    <section
      id={legacy.slug ?? service.id}
      className={cn(
        "section-padding relative overflow-hidden",
        dark ? "bg-[#f8fafc] border-y border-neutral-200/60" : "bg-white"
      )}
      aria-labelledby={`service-title-${service.id}`}
    >
      {/* Elemento decorativo de número */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 flex items-start justify-end pointer-events-none overflow-hidden"
      >
        <span className="text-[18vw] font-heading font-bold text-neutral-900/[0.03] leading-none select-none pr-8">
          {service.number}
        </span>
      </div>

      <div className="container-site relative z-10">
        {/* Label de serviço */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <SectionLabel>
            {service.number} — {service.title}
          </SectionLabel>
        </motion.div>

        {/* Grid: texto + imagem */}
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
            !isRight && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
          )}
        >
          {/* Bloco de texto */}
          <div>
            <motion.h2
              id={`service-title-${service.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-[1.12] tracking-tight text-neutral-900 mb-6"
            >
              {service.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8 font-normal"
            >
              {service.description}
            </motion.p>

            {/* Benefícios / Itens inclusos */}
            {(legacy.items ?? []).length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3 mb-8"
                aria-label="Itens do serviço"
              >
                {(legacy.items ?? []).map((item: string) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check
                        aria-hidden="true"
                        className="w-3.5 h-3.5 text-brand-green"
                      />
                    </div>
                    <span className="text-neutral-700 text-sm sm:text-base font-medium">{item}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* Público */}
            {service.audience && service.audience.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8 p-4 bg-white border border-neutral-200 rounded-2xl shadow-2xs"
              >
                <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 mb-2.5">
                  Ideal para
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.audience.map((aud: string) => (
                    <span
                      key={aud}
                      className="text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 px-3 py-1 rounded-full transition-colors"
                    >
                      {aud}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <WhatsAppCTA
                context={service.ctaContext}
                label={service.ctaLabel}
                variant="secondary"
                size="md"
              />
            </motion.div>
          </div>

          {/* Imagem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-[4/3] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-neutral-200/80"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />

            {/* Badge do número */}
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-4 font-heading font-bold text-5xl text-white/90 leading-none select-none drop-shadow-md"
            >
              {service.number}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
