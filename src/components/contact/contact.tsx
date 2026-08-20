"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, MessageCircle, Clock, ShieldCheck, Zap } from "lucide-react";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { serviceOptions } from "@/data/contact";
import { defaultViewport } from "@/lib/motion";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section
      id="contato"
      className="relative py-20 lg:py-28 overflow-hidden"
      aria-labelledby="contact-title"
    >
      {/* Efeito de luz ambiente de fundo */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-brand-yellow/10 rounded-full blur-[180px] opacity-25" />
      </div>

      <div className="container-site relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16">

        {/* ── BLOCO PRINCIPAL DE CONVERSÃO & CONTATO ── */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <h2
              id="contact-title"
              className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.08] tracking-tight text-white mb-4"
            >
              Vamos criar{" "}
              <span
                className="relative inline-block text-brand-yellow"
                style={{
                  fontFamily: "var(--font-brasilero)",
                  fontWeight: 700,
                  WebkitTextStroke: "0.4px currentColor",
                }}
              >
                algo único?
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={defaultViewport}
                  transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1.5 w-full h-2.5 text-brand-yellow fill-none stroke-current stroke-[5]"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,7 Q50,0 100,7" strokeLinecap="round" />
                </motion.svg>
              </span>
            </h2>

            <p className="text-neutral-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              Da estrutura pesada à responsabilidade técnica com ART, da equipe de staff à cobertura de mídia. Converse diretamente com nossos especialistas no WhatsApp e tenha uma operação sem imprevistos.
            </p>
          </motion.div>

          {/* CTA Principal de WhatsApp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <WhatsAppCTA
              context="contact"
              label="Iniciar Conversa no WhatsApp"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-brand-yellow text-neutral-950 hover:bg-brand-yellow-dark shadow-2xl font-bold py-4 px-8 text-base sm:text-lg hover:scale-105 transition-all cursor-pointer"
            />
          </motion.div>


        </div>

        {/* ── FORMULÁRIO DE BRIEFING TÉCNICO (OPCIONAL) ── */}
        <div className="max-w-2xl mx-auto pt-8 border-t border-white/10">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">
              Ou se preferir, envie os dados do seu projeto por e-mail:
            </span>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              role="alert"
              className="text-center py-10 px-6 border border-brand-yellow/40 rounded-3xl bg-gradient-to-b from-emerald-950/60 to-emerald-950/20 backdrop-blur-md shadow-2xl"
            >
              <CheckCircle2 className="w-10 h-10 text-brand-yellow mx-auto mb-2" />
              <p className="text-white font-heading font-bold text-xl mb-1">
                Mensagem recebida com sucesso!
              </p>
              <p className="text-neutral-300 text-sm font-normal">
                Em breve nossa equipe técnica entrará em contato com você.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs text-brand-yellow hover:text-white font-bold underline transition-colors cursor-pointer"
              >
                Enviar outro briefing
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              aria-label="Formulário de contato"
              className="space-y-4 p-6 sm:p-8 bg-gradient-to-b from-emerald-950/40 via-emerald-950/20 to-black/30 backdrop-blur-md rounded-3xl border border-emerald-500/20 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <Label htmlFor="contact-name" className="text-neutral-200 text-xs font-semibold">
                    Nome completo *
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="bg-black/35 border-white/15 text-white placeholder:text-neutral-400 focus:border-brand-yellow focus:bg-black/50 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contact-company" className="text-neutral-200 text-xs font-semibold">
                    Empresa / Paróquia / Órgão
                  </Label>
                  <Input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Nome da organização"
                    className="bg-black/35 border-white/15 text-white placeholder:text-neutral-400 focus:border-brand-yellow focus:bg-black/50 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <Label htmlFor="contact-email" className="text-neutral-200 text-xs font-semibold">
                    E-mail de contato *
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seuemail@empresa.com"
                    className="bg-black/35 border-white/15 text-white placeholder:text-neutral-400 focus:border-brand-yellow focus:bg-black/50 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contact-phone" className="text-neutral-200 text-xs font-semibold">
                    Telefone / WhatsApp *
                  </Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className="bg-black/35 border-white/15 text-white placeholder:text-neutral-400 focus:border-brand-yellow focus:bg-black/50 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="contact-service" className="text-neutral-200 text-xs font-semibold">
                  Serviço de interesse principal
                </Label>
                <select
                  id="contact-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full bg-black/35 border border-white/15 text-white placeholder:text-neutral-400 focus:border-brand-yellow focus:bg-black/50 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-yellow transition-colors shadow-2xs font-normal"
                  aria-label="Selecione o serviço de interesse"
                >
                  <option value="" className="bg-[#0b3318] text-white">Selecione o serviço...</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0b3318] text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="contact-message" className="text-neutral-200 text-xs font-semibold">
                  Detalhes do Evento ou Necessidades Técnicas *
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Data prevista, localidade, público estimado, necessidades de palco, som, luz, alvará ou staff..."
                  rows={3}
                  className="bg-black/35 border-white/15 text-white placeholder:text-neutral-400 focus:border-brand-yellow focus:bg-black/50 rounded-xl resize-none text-sm font-normal"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellow-dark text-neutral-950 font-bold rounded-xl py-3 px-6 transition-all duration-200 shadow-xl cursor-pointer text-sm sm:text-base hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                Enviar Briefing Técnico
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
