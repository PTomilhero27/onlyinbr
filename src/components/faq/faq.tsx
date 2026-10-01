"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems as initialFaqItems } from "@/data/faq";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSiteStore } from "@/lib/store";

export function Faq() {
  const { faq: storeFaq } = useSiteStore();
  const items = storeFaq && storeFaq.length > 0 ? storeFaq : initialFaqItems;
  return (
    <section
      id="faq"
      className="relative py-20 lg:py-28 overflow-hidden border-b border-white/[0.08]"
      aria-labelledby="faq-title"
    >
      {/* Efeito de luz ambiente de fundo */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-brand-yellow/10 rounded-full blur-[160px] opacity-20" />
      </div>

      <div className="container-site relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── LADO ESQUERDO: CABEÇALHO & CONTATO RÁPIDO ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div>
              <h2
                id="faq-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-[1.12] tracking-tight text-white mb-3"
              >
                Perguntas{" "}
                <span
                  className="relative inline-block text-brand-yellow"
                  style={{ fontFamily: "var(--font-brasilero)", fontWeight: 700, WebkitTextStroke: "0.4px currentColor" }}
                >
                  frequentes.
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

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Tire suas dúvidas sobre prazos, documentação técnica com ART, estrutura de palcos, equipe e cobertura de eventos.
              </p>
            </div>

            {/* Chamada para conversa direta */}
            <div className="pt-2 space-y-3">
              <p className="text-xs text-neutral-400 font-medium">
                Tem uma dúvida específica sobre seu projeto?
              </p>
              <WhatsAppCTA
                context="faq"
                label="Falar com Especialista"
                variant="primary"
                size="md"
                className="w-full sm:w-auto font-bold shadow-xl hover:scale-[1.02] transition-all"
              />
            </div>
          </div>

          {/* ── LADO DIREITO: ACORDEÃO MODERNO EM LINHAS LIMPAS (SEM CARDS) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <Accordion
              className="divide-y divide-white/10 border-t border-b border-white/10"
              aria-label="Perguntas frequentes"
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="py-1 transition-colors duration-200 hover:bg-white/[0.02]"
                >
                  <AccordionTrigger
                    className="text-left text-white font-heading font-bold py-4 hover:no-underline hover:text-brand-yellow transition-colors duration-200 text-sm sm:text-base cursor-pointer"
                    aria-label={item.question}
                  >
                    <div className="flex items-center gap-3 pr-3">
                      <div className="w-7 h-7 rounded-lg bg-brand-yellow/10 border border-brand-yellow/25 flex items-center justify-center flex-shrink-0 p-1">
                        <Image
                          src="/logos/PNG/ICONE Only in BR 2.png"
                          alt="Only in BR"
                          width={20}
                          height={18}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span>{item.question}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="text-neutral-300 text-xs sm:text-sm leading-relaxed pb-5 pl-10 pr-2 font-normal">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
