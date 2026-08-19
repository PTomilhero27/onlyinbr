"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { SectionLabel } from "@/components/shared/section-wrapper";
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
      className="section-padding relative overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div className="container-site relative z-10">

        {/* Cabeçalho da seção */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <SectionLabel>Vamos Conversar</SectionLabel>
          </motion.div>

          <motion.h2
            id="contact-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-heading font-bold leading-[1.08] tracking-tight text-white mb-5"
          >
            Vamos criar{" "}
            <span className="text-brand-yellow">algo juntos?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral-200 text-base sm:text-lg max-w-xl mx-auto mb-8 font-normal"
          >
            O canal mais ágil é o WhatsApp. Nossa equipe está pronta para atender seu evento, licitação ou orçamento.
          </motion.p>

          {/* CTA WhatsApp — principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <WhatsAppCTA
              context="contact"
              label="Iniciar conversa no WhatsApp"
              variant="primary"
              size="lg"
              className="bg-brand-yellow text-neutral-950 hover:bg-brand-yellow-dark shadow-2xl font-bold"
            />
          </motion.div>
        </div>

        {/* Divisor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center gap-6 mb-12 max-w-2xl mx-auto"
        >
          <div className="flex-1 h-px bg-white/15" />
          <span className="text-brand-yellow/80 text-xs uppercase tracking-widest font-bold">
            ou envie uma mensagem técnica
          </span>
          <div className="flex-1 h-px bg-white/15" />
        </motion.div>

        {/* Formulário — secundário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          {submitted ? (
            <div
              role="alert"
              className="text-center py-12 px-6 border border-brand-yellow/40 rounded-3xl liquid-glass-opaque shadow-2xl"
            >
              <CheckCircle2 className="w-12 h-12 text-brand-yellow mx-auto mb-3" />
              <p className="text-white font-heading font-bold text-2xl mb-2">
                Mensagem recebida com sucesso!
              </p>
              <p className="text-neutral-200 font-normal">
                Em breve nossa equipe técnica entrará em contato com você.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-brand-yellow hover:text-white font-bold underline transition-colors"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              aria-label="Formulário de contato"
              className="space-y-4 p-6 sm:p-9 liquid-glass-opaque rounded-3xl border border-white/20 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name" className="text-neutral-200 text-xs font-bold uppercase tracking-wider">
                    Nome *
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="liquid-glass border-white/20 text-white placeholder:text-neutral-400 focus:border-brand-yellow rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-company" className="text-neutral-200 text-xs font-bold uppercase tracking-wider">
                    Empresa / Paróquia / Órgão
                  </Label>
                  <Input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Nome da organização"
                    className="liquid-glass border-white/20 text-white placeholder:text-neutral-400 focus:border-brand-yellow rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email" className="text-neutral-200 text-xs font-bold uppercase tracking-wider">
                    E-mail corporativo *
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="contato@empresa.com.br"
                    className="liquid-glass border-white/20 text-white placeholder:text-neutral-400 focus:border-brand-yellow rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone" className="text-neutral-200 text-xs font-bold uppercase tracking-wider">
                    Telefone / WhatsApp
                  </Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className="liquid-glass border-white/20 text-white placeholder:text-neutral-400 focus:border-brand-yellow rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-service" className="text-neutral-200 text-xs font-bold uppercase tracking-wider">
                  Serviço de interesse
                </Label>
                <select
                  id="contact-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full liquid-glass border border-white/20 text-white placeholder:text-neutral-400 focus:border-brand-yellow rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-yellow transition-colors shadow-2xs font-normal"
                  aria-label="Selecione o serviço de interesse"
                >
                  <option value="" className="bg-[#0f2e1b] text-white">Selecione um serviço...</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0f2e1b] text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-message" className="text-neutral-200 text-xs font-bold uppercase tracking-wider">
                  Mensagem ou Detalhes do Evento *
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Conte sobre data prevista, local, porte do evento ou necessidades técnicas..."
                  rows={4}
                  className="liquid-glass border-white/20 text-white placeholder:text-neutral-400 focus:border-brand-yellow rounded-xl resize-none font-normal"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellow-dark text-neutral-950 font-bold rounded-xl py-3.5 px-6 transition-all duration-200 shadow-xl cursor-pointer text-sm sm:text-base"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                Enviar mensagem
              </button>

              <p className="text-[11px] text-neutral-300 text-center font-normal pt-1">
                Seus dados serão tratados com total confidencialidade técnica.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
