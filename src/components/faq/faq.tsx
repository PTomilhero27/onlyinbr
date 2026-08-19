"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";
import { SectionLabel } from "@/components/shared/section-wrapper";
import { defaultViewport } from "@/lib/motion";

/**
 * Faq — Only in BR
 * Perguntas frequentes com visual claro e limpo.
 */
export function Faq() {
  return (
    <section
      id="faq"
      className="section-padding relative overflow-hidden"
      aria-labelledby="faq-title"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Cabeçalho */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <SectionLabel>FAQ & Dúvidas</SectionLabel>
            </motion.div>

            <motion.h2
              id="faq-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-[1.12] tracking-tight text-white"
            >
              Perguntas{" "}
              <span className="text-brand-yellow">frequentes.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-neutral-200 text-base sm:text-lg mt-5 max-w-sm font-normal"
            >
              Ficou com alguma dúvida específica? Fale diretamente com nossos especialistas pelo WhatsApp.
            </motion.p>
          </div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <Accordion
              className="space-y-3.5"
              aria-label="Perguntas frequentes"
            >
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border border-white/18 rounded-3xl px-6 liquid-glass-opaque shadow-xl hover:border-brand-yellow/50 transition-all duration-200 data-[panel-open]:border-brand-yellow"
                >
                  <AccordionTrigger
                    className="text-left text-white font-bold py-5 hover:no-underline hover:text-brand-yellow transition-colors duration-200 text-base sm:text-lg"
                    aria-label={item.question}
                  >
                    <span className="flex items-start gap-3.5">
                      <span className="text-xs text-brand-yellow font-bold bg-brand-yellow/20 border border-brand-yellow/30 px-2.5 py-1 rounded-lg mt-0.5 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-200 text-sm sm:text-base leading-relaxed pb-6 pl-11 font-normal">
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
