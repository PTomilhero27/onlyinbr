"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Image as ImageIcon, Sparkles } from "lucide-react";
import { type PortfolioProject } from "@/data/portfolio";
import { compressFileToDataUrl } from "./utils/image-compression";
import { cn } from "@/lib/utils";
import { FormattedNumericText } from "@/components/shared/formatted-numeric-text";

type ProjectModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: Partial<PortfolioProject>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<PortfolioProject>>>;
  onClose: () => void;
  onSave: () => void;
  showToast: (message: string) => void;
};

/**
 * Modal para criação e edição de projetos no painel administrativo.
 * Suporta upload e compressão direta de imagem de capa para WebP, além de configuração de metadados e status.
 */
export function ProjectModal({
  isOpen,
  isEditing,
  formData,
  setFormData,
  onClose,
  onSave,
  showToast,
}: ProjectModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const projectCoverInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processCoverFile = (file: File | null) => {
    if (!file) return;
    setIsUploading(true);
    compressFileToDataUrl(file)
      .then(({ dataUrl }) => {
        setFormData((prev) => ({ ...prev, coverImage: dataUrl }));
        setIsUploading(false);
      })
      .catch(() => {
        setIsUploading(false);
        showToast("Não foi possível carregar essa imagem.");
      });
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 18 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[30px] border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.42)] liquid-glass-opaque bg-[#072312]/95"
        >
          {/* Header do Modal */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow/80">
                {isEditing ? "Editar projeto" : "Novo projeto"}
              </p>
              <h3 className="mt-1 text-xl font-heading font-bold text-white">
                {isEditing ? "Editar projeto" : "Adicionar projeto"}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conteúdo do Formulário */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] overflow-y-auto max-h-[calc(90vh-92px)]">
            <div className="space-y-4 p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Nome do projeto *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Sambê Festival"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={formData.categoryLabel || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, categoryLabel: e.target.value }))}
                    placeholder="Ex: Samba & Pagode"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
                  placeholder="Frase curta de destaque..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  placeholder="Resumo do projeto e proposta da produção..."
                  className="w-full resize-none px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Público total
                  </label>
                  <input
                    type="text"
                    value={formData.stats?.totalAudience || "+15.000 pessoas"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        stats: {
                          totalAudience: e.target.value,
                          totalEditions: prev.stats?.totalEditions || "1 Edição",
                          highlightTag: prev.stats?.highlightTag || "Produção 360°",
                        },
                      }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Destaque Técnico
                  </label>
                  <input
                    type="text"
                    value={formData.stats?.highlightTag || "Produção 360°"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        stats: {
                          totalAudience: prev.stats?.totalAudience || "+15.000 pessoas",
                          totalEditions: prev.stats?.totalEditions || "1 Edição",
                          highlightTag: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                  Visibilidade do Projeto
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isPublished: true,
                        status: "published",
                      }))
                    }
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                      formData.isPublished !== false && formData.status !== "draft"
                        ? "bg-emerald-500 text-neutral-950 shadow-md"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10"
                    )}
                  >
                    Publicado (Visível no site)
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isPublished: false,
                        status: "draft",
                      }))
                    }
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                      formData.isPublished === false || formData.status === "draft"
                        ? "bg-amber-400 text-neutral-950 shadow-md"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10"
                    )}
                  >
                    Rascunho (Oculto)
                  </button>
                </div>
              </div>
            </div>

            {/* Painel Lateral: Imagem de Capa e Prévia */}
            <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-5 space-y-4">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-4 shadow-inner shadow-white/5">
                {formData.coverImage ? (
                  <>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-300">
                      <span>Preview</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 border",
                          formData.isPublished === false || formData.status === "draft"
                            ? "border-amber-400/50 bg-amber-500/10 text-amber-200"
                            : "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
                        )}
                      >
                        {formData.isPublished === false || formData.status === "draft"
                          ? "Oculto"
                          : "Visível"}
                      </span>
                    </div>

                    <div className="relative mt-4 overflow-hidden rounded-[24px] border border-white/10 bg-neutral-950/50 shadow-xl">
                      <div className="relative h-40">
                        <Image
                          src={formData.coverImage}
                          alt={formData.name || "Preview do projeto"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-2 p-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex rounded-full border border-brand-yellow/50 bg-brand-yellow/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-yellow">
                            <FormattedNumericText value={formData.name || "Projeto"} />
                          </span>
                        </div>

                        <h4 className="text-base font-heading font-bold text-white leading-snug">
                          <FormattedNumericText value={formData.tagline || "Estrutura premium e produção 360°"} />
                        </h4>

                        <p className="text-[11px] text-neutral-300">
                          <FormattedNumericText value={formData.stats?.totalAudience || "+15.000 pessoas"} />
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="mt-4">
                  <div
                    onClick={() => projectCoverInputRef.current?.click()}
                    className="group flex min-h-[92px] cursor-pointer items-center justify-center rounded-[22px] border border-dashed border-white/20 bg-white/[0.03] p-3 text-center transition-all hover:border-brand-yellow/50 hover:bg-brand-yellow/5"
                  >
                    <input
                      ref={projectCoverInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        processCoverFile(e.target.files?.[0] || null);
                        e.target.value = "";
                      }}
                    />

                    {formData.coverImage ? (
                      <div className="flex items-center gap-3 text-neutral-200">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-yellow">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-yellow">
                            Trocar Imagem
                          </p>
                          <p className="text-[11px] text-neutral-400">
                            {isUploading ? "Processando..." : "Clique para alterar a foto de capa"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center py-2">
                        <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center mx-auto text-brand-yellow">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-white">Carregar Imagem de Capa</p>
                        <p className="text-[11px] text-neutral-400">
                          {isUploading ? "Comprimindo imagem..." : "JPG, PNG ou WebP"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Ou colar URL direta da imagem
                  </label>
                  <input
                    type="text"
                    value={formData.coverImage || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>
              </div>

              {/* Ações do Modal */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer hover:bg-white/15 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={onSave}
                  className="px-4 py-2.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer font-heading shadow-[0_16px_32px_-16px_rgba(245,189,44,0.95)] hover:scale-[1.02] transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar projeto</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
