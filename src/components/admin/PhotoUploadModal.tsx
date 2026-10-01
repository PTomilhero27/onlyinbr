"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Trash2, Plus, Sparkles } from "lucide-react";
import { compressFileToDataUrl } from "./utils/image-compression";
import { cn } from "@/lib/utils";

type PhotoUploadModalProps = {
  photoModal: {
    projectId: string;
    editionId: string;
  } | null;
  onClose: () => void;
  onAddPhotos: (
    projectId: string,
    editionId: string,
    photos: { url: string; caption?: string; alt?: string }[]
  ) => void;
  showToast: (message: string) => void;
};

/**
 * Modal para upload múltiplo de fotos para a galeria de uma edição.
 * Suporta drag-and-drop, compressão automática no cliente para WebP, legendas e prévia visual.
 */
export function PhotoUploadModal({
  photoModal,
  onClose,
  onAddPhotos,
  showToast,
}: PhotoUploadModalProps) {
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [uploadPreviews, setUploadPreviews] = useState<{ dataUrl: string; name: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      setIsUploading(true);
      const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (fileArray.length === 0) {
        setIsUploading(false);
        return;
      }

      Promise.all(fileArray.map((file) => compressFileToDataUrl(file)))
        .then((results) => {
          setUploadPreviews((prev) => [...prev, ...results]);
          setIsUploading(false);
        })
        .catch(() => {
          setIsUploading(false);
          showToast("Erro ao processar as fotos selecionadas.");
        });
    },
    [showToast]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleClose = () => {
    setUploadPreviews([]);
    setNewPhotoUrl("");
    setNewPhotoCaption("");
    onClose();
  };

  const handleSubmit = () => {
    if (!photoModal) return;
    const caption = newPhotoCaption.trim() || undefined;
    const altText = "Foto da edição Only in BR";
    const photosToAdd: { url: string; caption?: string; alt?: string }[] = [];

    uploadPreviews.forEach((preview) => {
      photosToAdd.push({
        url: preview.dataUrl,
        caption,
        alt: preview.name || altText,
      });
    });

    if (newPhotoUrl.trim() && uploadPreviews.length === 0) {
      photosToAdd.push({
        url: newPhotoUrl.trim(),
        caption,
        alt: altText,
      });
    }

    if (photosToAdd.length > 0) {
      onAddPhotos(photoModal.projectId, photoModal.editionId, photosToAdd);
      showToast(
        photosToAdd.length === 1
          ? "1 foto adicionada à galeria!"
          : `${photosToAdd.length} fotos adicionadas à galeria!`
      );
    }

    handleClose();
  };

  if (!photoModal) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[760px] rounded-[30px] border border-white/15 bg-[#072312]/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-yellow block">
                  Galeria da Edição
                </span>
                <h3 className="text-base font-heading font-bold text-white">
                  Adicionar Fotos em Alta Resolução
                </h3>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 pt-4">
            {/* Área de Drag & Drop */}
            <div>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer",
                  isDragging
                    ? "border-brand-yellow bg-brand-yellow/10"
                    : "border-white/20 bg-white/[0.02] hover:border-brand-yellow/50 hover:bg-white/[0.04]"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      processFiles(e.target.files);
                    }
                    e.target.value = "";
                  }}
                />

                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center mx-auto mb-3 text-brand-yellow">
                  <Upload className="w-6 h-6" />
                </div>

                <p className="text-sm font-bold text-white">
                  Arraste suas fotos aqui ou clique para selecionar
                </p>
                <p className="text-xs text-neutral-400 mt-1 font-normal">
                  Suporta JPG, PNG e WebP. Imagens são otimizadas automaticamente no navegador.
                </p>
              </div>
            </div>

            {/* Pré-visualização dos uploads */}
            {uploadPreviews.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                  <span>Fotos prontas para upload ({uploadPreviews.length})</span>
                  <button
                    onClick={() => setUploadPreviews([])}
                    className="text-red-400 hover:text-red-300 text-[11px] cursor-pointer"
                  >
                    Limpar todas
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-44 overflow-y-auto p-1 scrollbar-none">
                  {uploadPreviews.map((preview, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shadow-sm"
                    >
                      <Image
                        src={preview.dataUrl}
                        alt={preview.name}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setUploadPreviews((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="absolute inset-0 bg-red-950/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 text-red-300" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opção de URL Direta */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 block">
                Ou vincular por link direto (URL pública)
              </span>
              <input
                type="text"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="https://sua-foto.com/imagem.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
              />
            </div>

            {/* Campo de Legenda Opcional */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300">
                Legenda da foto (Opcional)
              </label>
              <input
                type="text"
                value={newPhotoCaption}
                onChange={(e) => setNewPhotoCaption(e.target.value)}
                placeholder="Ex: Palco principal ao entardecer com 15 mil pessoas"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
              />
            </div>
          </div>

          {/* Botões do Rodapé */}
          <div className="pt-4 border-t border-white/10 flex justify-end gap-3 mt-4">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer hover:bg-white/15 transition-colors"
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              disabled={uploadPreviews.length === 0 && !newPhotoUrl.trim()}
              className={cn(
                "px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-[0_12px_24px_-10px_rgba(245,189,44,0.9)]",
                uploadPreviews.length > 0 || newPhotoUrl.trim()
                  ? "bg-brand-yellow text-neutral-950 hover:scale-[1.02]"
                  : "bg-white/10 text-neutral-500 cursor-not-allowed"
              )}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>
                {uploadPreviews.length > 1
                  ? `Adicionar ${uploadPreviews.length} Fotos`
                  : "Adicionar Foto"}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
