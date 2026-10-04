"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Image as ImageIcon } from "lucide-react";
import { type PortfolioProject, type ProjectEdition } from "@/data/portfolio";
import { compressFileToDataUrl, renderEditionLabel } from "./utils/image-compression";
import { FormattedNumericText } from "@/components/shared/formatted-numeric-text";
import { cn } from "@/lib/utils";

type EditionModalProps = {
  editingEdition: {
    projectId: string;
    edition: ProjectEdition;
    isNew?: boolean;
  } | null;
  setEditingEdition: React.Dispatch<
    React.SetStateAction<{
      projectId: string;
      edition: ProjectEdition;
      isNew?: boolean;
    } | null>
  >;
  currentProject?: PortfolioProject;
  onSave: (projectId: string, edition: ProjectEdition, isNew?: boolean) => void;
  onClose: () => void;
  showToast: (message: string) => void;
};

/**
 * Modal para criação e edição de edições de projetos (ex: 1ª Edição, 2ª Edição 2025).
 * Permite configurar data, local, público, destaques técnicos, escopo de montagem e capa.
 */
export function EditionModal({
  editingEdition,
  setEditingEdition,
  currentProject,
  onSave,
  onClose,
  showToast,
}: EditionModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  if (!editingEdition) return null;

  const edition = editingEdition.edition;

  const processCoverFile = (file: File | null) => {
    if (!file) return;
    setIsUploading(true);
    compressFileToDataUrl(file)
      .then(({ dataUrl }) => {
        setEditingEdition({
          ...editingEdition,
          edition: { ...editingEdition.edition, coverImage: dataUrl },
        });
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 18 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[30px] border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.42)] liquid-glass-opaque bg-[#072312]/95"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow/80">
                {editingEdition.isNew ? "Nova edição" : "Edição ativa"}
              </p>
              <h3 className="text-xl font-heading font-bold text-white mt-1">
                {editingEdition.isNew ? "Adicionar nova edição" : "Editar edição"}
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

          {/* Form */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] overflow-y-auto max-h-[calc(90vh-92px)]">
            <div className="space-y-4 p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Edição *
                  </label>
                  <input
                    type="text"
                    value={edition.editionNumber}
                    onChange={(e) =>
                      setEditingEdition({
                        ...editingEdition,
                        edition: { ...edition, editionNumber: e.target.value },
                      })
                    }
                    placeholder="Ex: 5ª Edição"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Ano *
                  </label>
                  <input
                    type="text"
                    value={edition.year}
                    onChange={(e) =>
                      setEditingEdition({
                        ...editingEdition,
                        edition: { ...edition, year: e.target.value },
                      })
                    }
                    placeholder="Ex: 2025"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                  Título da Edição *
                </label>
                <input
                  type="text"
                  value={edition.title}
                  onChange={(e) =>
                    setEditingEdition({
                      ...editingEdition,
                      edition: { ...edition, title: e.target.value },
                    })
                  }
                  placeholder="Ex: Sambê — Edição de Verão"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Data
                  </label>
                  <input
                    type="text"
                    value={edition.date}
                    onChange={(e) =>
                      setEditingEdition({
                        ...editingEdition,
                        edition: { ...edition, date: e.target.value },
                      })
                    }
                    placeholder="Ex: Dezembro de 2025"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Local
                  </label>
                  <input
                    type="text"
                    value={edition.location}
                    onChange={(e) =>
                      setEditingEdition({
                        ...editingEdition,
                        edition: { ...edition, location: e.target.value },
                      })
                    }
                    placeholder="Ex: Parque Ibirapuera · São Paulo, SP"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                  Público Estimado / Consolidado
                </label>
                <input
                  type="text"
                  value={edition.audience || ""}
                  onChange={(e) =>
                    setEditingEdition({
                      ...editingEdition,
                      edition: { ...edition, audience: e.target.value },
                    })
                  }
                  placeholder="Ex: 8.000+ participantes"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                  Descrição dos Fatos e Cobertura
                </label>
                <textarea
                  value={edition.description}
                  onChange={(e) =>
                    setEditingEdition({
                      ...editingEdition,
                      edition: { ...edition, description: e.target.value },
                    })
                  }
                  rows={3}
                  placeholder="Detalhes da produção, estrutura montada, atrações..."
                  className="w-full resize-none px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                  Destaques (separados por vírgula)
                </label>
                <input
                  type="text"
                  value={edition.highlights?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingEdition({
                      ...editingEdition,
                      edition: {
                        ...edition,
                        highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                  placeholder="Palco 360°, Som Line Array, ART CREA/SP"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                />
              </div>
            </div>

            {/* Painel de Capa da Edição */}
            <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-5 space-y-4">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-4 shadow-inner shadow-white/5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-300">
                  <span>Preview da Edição</span>
                  <span className="rounded-full px-2 py-1 border border-brand-yellow/40 bg-brand-yellow/10 text-brand-yellow">
                    <FormattedNumericText value={edition.year} />
                  </span>
                </div>

                <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-neutral-950/50 shadow-xl">
                  <div className="relative h-28">
                    <Image
                      src={edition.coverImage || currentProject?.coverImage || "/images/placeholder.jpg"}
                      alt={edition.title || "Preview"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2 p-3">
                    <div className="flex items-center gap-2">
                      {renderEditionLabel(
                        edition.editionNumber || "Edição",
                        "inline-flex items-center rounded-full border border-brand-yellow/50 bg-brand-yellow/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-yellow"
                      )}
                      <span className="text-[9px] uppercase tracking-[0.14em] text-neutral-400">
                        <FormattedNumericText value={edition.year || "2025"} />
                      </span>
                    </div>

                    <h4 className="text-base font-heading font-bold text-white leading-snug">
                      <FormattedNumericText value={edition.title || `${currentProject?.name || "Projeto"} — Edição`} />
                    </h4>

                    <div className="space-y-1 text-[11px] text-neutral-300">
                      <p><FormattedNumericText value={edition.location || "São Paulo, SP"} /></p>
                      <p><FormattedNumericText value={edition.audience || "5.000+ pessoas"} /></p>
                      <p><FormattedNumericText value={edition.date || "Dez/2024"} /></p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div
                    onClick={() => coverInputRef.current?.click()}
                    className="group flex min-h-[80px] cursor-pointer items-center justify-center rounded-[20px] border border-dashed border-white/20 bg-white/[0.03] p-3 text-center transition-all hover:border-brand-yellow/50 hover:bg-brand-yellow/5"
                  >
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        processCoverFile(e.target.files?.[0] || null);
                        e.target.value = "";
                      }}
                    />

                    <div className="flex items-center gap-3 text-neutral-200">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-yellow">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-yellow">
                          {edition.coverImage ? "Alterar Capa" : "Carregar Capa"}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {isUploading ? "Processando imagem..." : "Clique para selecionar foto"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <input
                    type="text"
                    value={edition.coverImage || ""}
                    onChange={(e) =>
                      setEditingEdition({
                        ...editingEdition,
                        edition: { ...edition, coverImage: e.target.value },
                      })
                    }
                    placeholder="Ou cole a URL da imagem de capa..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer hover:bg-white/15 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!edition.title?.trim() || !edition.editionNumber?.trim()) {
                      showToast("Preencha ao menos o número e título da edição.");
                      return;
                    }
                    onSave(editingEdition.projectId, edition, editingEdition.isNew);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer font-heading shadow-[0_16px_32px_-16px_rgba(245,189,44,0.95)] hover:scale-[1.02] transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar edição</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
