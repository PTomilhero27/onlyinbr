"use client";

import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Database,
  Calendar,
  MapPin,
  Users,
  Sparkles,
} from "lucide-react";
import { type PortfolioProject, type ProjectEdition } from "@/data/portfolio";
import { renderEditionLabel } from "./utils/image-compression";
import { cn } from "@/lib/utils";

type ProjectSectionProps = {
  projects: PortfolioProject[];
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  onOpenNewProject: () => void;
  onOpenEditProject: (project: PortfolioProject) => void;
  onDeleteProject: (id: string) => void;
  onToggleProjectVisibility: (id: string) => void;
  onOpenNewEdition: (projectId: string) => void;
  onOpenEditEdition: (projectId: string, edition: ProjectEdition) => void;
  onDeleteEdition: (projectId: string, editionId: string) => void;
  onToggleEditionVisibility: (projectId: string, editionId: string) => void;
  onOpenPhotoModal: (projectId: string, editionId: string) => void;
  onDeletePhoto: (projectId: string, editionId: string, photoId: string) => void;
};

/**
 * Seção completa de gerenciamento de Projetos e Edições do painel administrativo.
 * Apresenta a navegação por abas de projetos, metadados, controle de visibilidade,
 * gestão de edições e galerias fotográficas.
 */
export function ProjectSection({
  projects,
  selectedProjectId,
  setSelectedProjectId,
  onOpenNewProject,
  onOpenEditProject,
  onDeleteProject,
  onToggleProjectVisibility,
  onOpenNewEdition,
  onOpenEditEdition,
  onDeleteEdition,
  onToggleEditionVisibility,
  onOpenPhotoModal,
  onDeletePhoto,
}: ProjectSectionProps) {
  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="h-full max-h-[82vh] flex flex-col min-h-0 w-full max-w-7xl mx-auto space-y-3">
      {/* Abas Superiores de Projetos & Botão Novo Projeto */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 flex-shrink-0 scrollbar-none">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {projects.map((proj) => {
            const isSel = proj.id === (currentProject?.id || selectedProjectId);
            const isDraft = proj.isPublished === false || proj.status === "draft";

            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap border flex-shrink-0 font-heading",
                  isSel
                    ? "bg-brand-yellow text-neutral-950 border-brand-yellow font-bold shadow-[0_12px_24px_-10px_rgba(245,189,44,0.7)] scale-[1.02]"
                    : "bg-white/[0.04] text-neutral-300 border-white/10 hover:border-white/20 hover:text-white"
                )}
              >
                <span
                  className={cn(
                    "w-2 h-2 rounded-full flex-shrink-0",
                    isDraft ? "bg-amber-400" : "bg-emerald-400"
                  )}
                />
                <span>{proj.name}</span>
                {isDraft && (
                  <span className="text-[10px] font-sans px-1 py-0.2 rounded bg-amber-500/20 text-amber-300">
                    Rascunho
                  </span>
                )}
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full",
                    isSel ? "bg-neutral-950 text-brand-yellow font-bold" : "bg-white/10"
                  )}
                >
                  {proj.editions.length}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onOpenNewProject}
          className="px-3.5 py-1.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer font-heading flex-shrink-0 shadow-[0_10px_25px_-14px_rgba(245,189,44,0.8)] hover:scale-[1.02] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Novo Projeto</span>
        </button>
      </div>

      {/* Conteúdo do Projeto Selecionado OU Estado Vazio */}
      {currentProject ? (
        <div className="flex-1 min-h-0 rounded-[28px] border border-white/10 bg-[#0a2818]/75 p-3 sm:p-4 flex flex-col backdrop-blur-xl shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)]">
          {/* Header do Projeto */}
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/15 flex-shrink-0 shadow-lg bg-neutral-900">
                {currentProject.coverImage ? (
                  <Image
                    src={currentProject.coverImage}
                    alt={currentProject.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-yellow bg-brand-yellow/10">
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold tracking-tight text-white truncate">
                    {currentProject.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30 font-sans">
                    {currentProject.categoryLabel}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full border font-sans",
                      currentProject.isPublished === false || currentProject.status === "draft"
                        ? "border-amber-400/40 bg-amber-500/10 text-amber-200"
                        : "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                    )}
                  >
                    {currentProject.isPublished === false || currentProject.status === "draft"
                      ? "Rascunho"
                      : "Publicado"}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 truncate mt-0.5 font-normal">
                  {currentProject.tagline || currentProject.description}
                </p>
              </div>
            </div>

            {/* Ações do Projeto */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => onToggleProjectVisibility(currentProject.id)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title={
                  currentProject.isPublished === false ? "Publicar projeto" : "Ocultar projeto"
                }
              >
                {currentProject.isPublished === false ? (
                  <EyeOff className="w-4 h-4 text-amber-300" />
                ) : (
                  <Eye className="w-4 h-4 text-emerald-400" />
                )}
              </button>

              <button
                onClick={() => onOpenEditProject(currentProject)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Editar informações do projeto"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onDeleteProject(currentProject.id)}
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
                title="Excluir projeto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-Header: Edições do Projeto */}
          <div className="flex items-center justify-between py-2.5 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                Edições Realizadas ({currentProject.editions.length})
              </span>
            </div>

            <button
              onClick={() => onOpenNewEdition(currentProject.id)}
              className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors font-heading"
            >
              <Plus className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Nova Edição</span>
            </button>
          </div>

          {/* Lista de Edições e Galerias (Scroll Vertical Suave) */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 scrollbar-none">
            {currentProject.editions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
                <p className="text-xs text-neutral-300 mb-3">
                  Nenhuma edição cadastrada para este projeto.
                </p>
                <button
                  onClick={() => onOpenNewEdition(currentProject.id)}
                  className="px-4 py-2 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer font-heading"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Cadastrar 1ª Edição</span>
                </button>
              </div>
            ) : (
              currentProject.editions.map((edition) => {
                const isEditionDraft =
                  edition.isPublished === false || edition.status === "draft";

                return (
                  <div
                    key={edition.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 hover:border-white/20 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        {renderEditionLabel(
                          edition.editionNumber,
                          "px-2 py-0.5 rounded-lg bg-brand-yellow/15 text-brand-yellow font-bold text-xs border border-brand-yellow/25 font-sans"
                        )}
                        <h4 className="text-sm font-heading font-bold text-white truncate">
                          {edition.title}
                        </h4>
                        <span className="text-xs text-neutral-400 font-mono">({edition.year})</span>
                        {isEditionDraft && (
                          <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                            Rascunho
                          </span>
                        )}
                      </div>

                      {/* Ações da Edição */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onToggleEditionVisibility(currentProject.id, edition.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
                          title={isEditionDraft ? "Publicar edição" : "Ocultar edição"}
                        >
                          {isEditionDraft ? (
                            <EyeOff className="w-3.5 h-3.5 text-amber-300" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                        </button>

                        <button
                          onClick={() => onOpenEditEdition(currentProject.id, edition)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                          title="Editar edição"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteEdition(currentProject.id, edition.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
                          title="Excluir edição"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Metadados rápidos da Edição */}
                    <div className="flex items-center gap-4 text-xs text-neutral-400 flex-wrap">
                      {edition.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-brand-yellow" />
                          <span>{edition.location}</span>
                        </div>
                      )}
                      {edition.audience && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-sky-400" />
                          <span>{edition.audience}</span>
                        </div>
                      )}
                      {edition.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-emerald-400" />
                          <span>{edition.date}</span>
                        </div>
                      )}
                    </div>

                    {/* Galeria de Fotos da Edição */}
                    <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                      {edition.gallery.map((photo) => (
                        <div
                          key={photo.id}
                          className="group relative w-20 h-14 rounded-xl overflow-hidden border border-white/15 flex-shrink-0 bg-neutral-900 shadow-sm"
                        >
                          <Image
                            src={photo.url}
                            alt={photo.alt || "Foto"}
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => onDeletePhoto(currentProject.id, edition.id, photo.id)}
                            className="absolute inset-0 bg-red-950/85 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                            title="Remover foto"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-300" />
                          </button>
                        </div>
                      ))}

                      {/* Botão de Adicionar Fotos */}
                      <button
                        type="button"
                        onClick={() => onOpenPhotoModal(currentProject.id, edition.id)}
                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[20px] border border-dashed border-white/20 bg-white/[0.04] text-neutral-300 transition-all hover:border-brand-yellow/50 hover:bg-brand-yellow/10 hover:text-brand-yellow cursor-pointer"
                        title="Adicionar mais fotos"
                        aria-label="Adicionar mais fotos"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* Estado Vazio do Banco (Zero Projetos) */
        <div className="flex-1 min-h-0 rounded-[28px] border border-white/10 bg-[#0a2818]/75 p-8 flex flex-col items-center justify-center text-center backdrop-blur-xl">
          <div className="w-16 h-16 rounded-3xl bg-brand-yellow/10 border border-brand-yellow/25 flex items-center justify-center text-brand-yellow mb-4 shadow-lg">
            <Database className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-2">
            Nenhum projeto cadastrado no banco
          </h3>
          <p className="text-neutral-300 text-sm max-w-md mb-6 font-normal">
            Seu banco de dados do Supabase está limpo e pronto para receber seus eventos reais.
            Clique abaixo para cadastrar o primeiro projeto!
          </p>
          <button
            onClick={onOpenNewProject}
            className="px-5 py-2.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-sm flex items-center gap-2 cursor-pointer font-heading shadow-[0_10px_25px_-10px_rgba(245,189,44,0.9)] hover:scale-[1.02] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Primeiro Projeto</span>
          </button>
        </div>
      )}
    </div>
  );
}
