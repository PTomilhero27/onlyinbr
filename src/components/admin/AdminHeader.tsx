"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, HelpCircle, LayoutGrid, Layers, Lock, Phone, Shield, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { type FaqItem } from "@/data/faq";
import { type ContactConfig } from "@/lib/store";

type AdminSection = "hub" | "projects" | "faq" | "contact" | "security";

type AdminHeaderProps = {
  activeSection: AdminSection;
  setActiveSection: (section: AdminSection) => void;
  projectsCount: number;
  faqCount: number;
  contact: ContactConfig;
  setContactForm: (contact: ContactConfig) => void;
  logout: () => void;
};

export function AdminHeader({
  activeSection,
  setActiveSection,
  projectsCount,
  faqCount,
  contact,
  setContactForm,
  logout,
}: AdminHeaderProps) {
  return (
    <header className="h-14 flex-shrink-0 bg-[#092615]/90 border-b border-white/15 backdrop-blur-xl px-5 sm:px-8 flex items-center justify-between gap-3 z-30">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="w-8 h-8 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center transition-all border border-white/15"
          title="Ir para o site"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={() => setActiveSection("hub")}
          className="flex items-center gap-2 cursor-pointer text-left"
        >
          <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest font-heading">
            Only in BR
          </span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="text-xs font-heading font-bold text-white hidden sm:inline">
            Painel de Gestão
          </span>
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 bg-white/[0.05] border border-white/10 rounded-2xl">
        <button
          onClick={() => setActiveSection("hub")}
          className={cn(
            "px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-sans",
            activeSection === "hub"
              ? "bg-brand-yellow text-neutral-950 shadow-sm font-semibold"
              : "text-neutral-300 hover:text-white"
          )}
        >
          <LayoutGrid className="w-3 h-3" />
          <span className="hidden md:inline">Visão Geral</span>
        </button>

        <button
          onClick={() => setActiveSection("projects")}
          className={cn(
            "px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-sans",
            activeSection === "projects"
              ? "bg-brand-yellow text-neutral-950 shadow-sm font-semibold"
              : "text-neutral-300 hover:text-white"
          )}
        >
          <Layers className="w-3 h-3" />
          <span>Projetos ({projectsCount})</span>
        </button>

        <button
          onClick={() => setActiveSection("faq")}
          className={cn(
            "px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-sans",
            activeSection === "faq"
              ? "bg-brand-yellow text-neutral-950 shadow-sm font-semibold"
              : "text-neutral-300 hover:text-white"
          )}
        >
          <HelpCircle className="w-3 h-3" />
          <span>FAQ ({faqCount})</span>
        </button>

        <button
          onClick={() => {
            setContactForm(contact);
            setActiveSection("contact");
          }}
          className={cn(
            "px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-sans",
            activeSection === "contact"
              ? "bg-brand-yellow text-neutral-950 shadow-sm font-semibold"
              : "text-neutral-300 hover:text-white"
          )}
        >
          <Phone className="w-3 h-3" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => setActiveSection("security")}
          className={cn(
            "px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-sans",
            activeSection === "security"
              ? "bg-brand-yellow text-neutral-950 shadow-sm font-semibold"
              : "text-neutral-300 hover:text-white"
          )}
        >
          <Shield className="w-3 h-3" />
          <span>Segurança</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          target="_blank"
          className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-white transition-colors border border-white/15"
        >
          <span>Ver Site</span>
          <ExternalLink className="w-3 h-3 text-brand-yellow" />
        </Link>

        <button
          onClick={logout}
          className="px-2.5 py-1 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-200 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
        >
          <Unlock className="w-3 h-3" />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}
