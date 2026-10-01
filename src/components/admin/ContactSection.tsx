"use client";

import { ExternalLink, MessageCircle, Phone, Save } from "lucide-react";
import { type ContactConfig } from "@/lib/store";

type ContactSectionProps = {
  contactForm: ContactConfig;
  setContactForm: (value: ContactConfig) => void;
  updateContact: (payload: ContactConfig) => void;
  showToast: (message: string) => void;
};

export function ContactSection({
  contactForm,
  setContactForm,
  updateContact,
  showToast,
}: ContactSectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
      <div className="md:col-span-7 rounded-[30px] border border-white/15 bg-[rgba(10,40,24,0.46)] p-6 backdrop-blur-xl shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">WhatsApp</p>
            <h3 className="text-lg font-heading font-bold text-white">Configurar contato oficial</h3>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-yellow mb-2">
              Número do WhatsApp
            </label>
            <input
              type="text"
              value={contactForm.whatsappNumber}
              onChange={(e) =>
                setContactForm({
                  ...contactForm,
                  whatsappNumber: e.target.value.replace(/\D/g, ""),
                })
              }
              placeholder="5511999999999"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white font-mono text-xs focus:border-brand-yellow/60 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Telefone visual</label>
              <input
                type="text"
                value={contactForm.displayPhone}
                onChange={(e) => setContactForm({ ...contactForm, displayPhone: e.target.value })}
                placeholder="(11) 99999-9999"
                className="w-full px-3 py-2 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs focus:border-brand-yellow/60 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">E-mail oficial</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="contato@onlyinbr.com.br"
                className="w-full px-3 py-2 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs focus:border-brand-yellow/60 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Mensagem inicial</label>
            <textarea
              rows={3}
              value={contactForm.messages?.default || ""}
              onChange={(e) =>
                setContactForm({
                  ...contactForm,
                  messages: { ...contactForm.messages, default: e.target.value },
                })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs focus:border-brand-yellow/60 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => {
              updateContact(contactForm);
              showToast("WhatsApp salvo com sucesso!");
            }}
            className="px-5 py-2.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer font-heading shadow-[0_16px_32px_-16px_rgba(245,189,44,0.95)]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar Dados</span>
          </button>
        </div>
      </div>

      <div className="md:col-span-5 rounded-[30px] border border-white/15 bg-[rgba(7,32,17,0.42)] p-6 backdrop-blur-xl shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-[0.18em] font-heading">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Simulador</span>
        </div>

        <div className="rounded-[24px] border border-emerald-500/30 bg-emerald-950/35 p-4 space-y-2 text-xs">
          <div>
            <span className="text-[10px] text-neutral-400 block font-semibold">Destino:</span>
            <span className="text-white font-mono font-bold">+{contactForm.whatsappNumber || "5511999999999"}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 block font-semibold">Mensagem:</span>
            <p className="text-neutral-200 italic text-[11px] leading-relaxed bg-black/35 p-2.5 rounded-xl border border-white/10 mt-1">
              &ldquo;{contactForm.messages?.default || "Olá! Vim pelo site da Only in BR..."}&rdquo;
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/${contactForm.whatsappNumber}?text=${encodeURIComponent(
            contactForm.messages?.default || ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all font-heading shadow-[0_16px_32px_-16px_rgba(16,185,129,0.9)]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Testar conversa</span>
        </a>
      </div>
    </div>
  );
}
