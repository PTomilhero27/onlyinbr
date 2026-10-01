"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  KeyRound,
  Layers,
  HelpCircle,
  Phone,
  Shield,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  X,
  ArrowLeft,
  Database,
  Search,
  MessageCircle,
  ArrowRight,
  LayoutGrid,
  Upload,
  FileUp,
  Zap,
} from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { type PortfolioProject, type ProjectEdition } from "@/data/portfolio";
import { type FaqItem } from "@/data/faq";
import { cn } from "@/lib/utils";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ContactSection } from "@/components/admin/ContactSection";
import { FaqSection } from "@/components/admin/FaqSection";
import { OverviewSection } from "@/components/admin/OverviewSection";
import { SecuritySection } from "@/components/admin/SecuritySection";

type AdminSection = "hub" | "projects" | "faq" | "contact" | "security";

export default function AdminPage() {
  const {
    projects,
    faq,
    contact,
    isAuthenticated,
    login,
    logout,
    changePassword,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectVisibility,
    addEdition,
    updateEdition,
    deleteEdition,
    toggleEditionVisibility,
    addEditionPhoto,
    deleteEditionPhoto,
    addFaqItem,
    updateFaqItem,
    deleteFaqItem,
    updateContact,
    resetToDefaults,
    exportDataJson,
  } = useSiteStore();

  // Estados de Login
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Navegação: Seção ativa
  const [activeSection, setActiveSection] = useState<AdminSection>("projects");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estados de Projetos & Edições
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || "");
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [projectFormData, setProjectFormData] = useState<Partial<PortfolioProject>>({});

  // Edição
  const [editingEdition, setEditingEdition] = useState<{
    projectId: string;
    edition: ProjectEdition;
    isNew?: boolean;
  } | null>(null);

  // Adicionar Foto
  const [photoModal, setPhotoModal] = useState<{
    projectId: string;
    editionId: string;
  } | null>(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [newPhotoAlt, setNewPhotoAlt] = useState("");
  const [uploadPreviews, setUploadPreviews] = useState<{ dataUrl: string; name: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectCoverInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const compressFileToDataUrl = useCallback(
    (file: File) =>
      new Promise<{ dataUrl: string; name: string }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = document.createElement("img");
          img.onload = () => {
            try {
              const canvas = document.createElement("canvas");
              const MAX_DIM = 1200;
              let w = img.width;
              let h = img.height;

              if (w > MAX_DIM || h > MAX_DIM) {
                if (w > h) {
                  h = Math.round((h * MAX_DIM) / w);
                  w = MAX_DIM;
                } else {
                  w = Math.round((w * MAX_DIM) / h);
                  h = MAX_DIM;
                }
              }

              canvas.width = w;
              canvas.height = h;
              const ctx = canvas.getContext("2d");
              ctx?.drawImage(img, 0, 0, w, h);
              const compressed = canvas.toDataURL("image/webp", 0.82);
              resolve({ dataUrl: compressed, name: file.name });
            } catch (error) {
              reject(error);
            }
          };
          img.onerror = () => reject(new Error("Não foi possível processar a imagem."));
          img.src = reader.result as string;
        };
        reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
        reader.readAsDataURL(file);
      }),
    []
  );

  // Processa arquivos selecionados e converte para base64 data URLs
  const processFiles = useCallback((files: FileList | File[]) => {
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
      });
  }, [compressFileToDataUrl]);

  const processProjectCover = useCallback(
    (file: File | null) => {
      if (!file || !file.type.startsWith("image/")) return;

      setIsUploading(true);
      compressFileToDataUrl(file)
        .then(({ dataUrl }) => {
          setProjectFormData((prev) => ({ ...prev, coverImage: dataUrl }));
          setIsUploading(false);
        })
        .catch(() => {
          setIsUploading(false);
          showToast("Não foi possível carregar essa imagem.");
        });
    },
    [compressFileToDataUrl]
  );

  // Drag & Drop handlers
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

  // FAQ
  const [faqSearch, setFaqSearch] = useState("");
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");

  // Contato / WhatsApp
  const [contactForm, setContactForm] = useState(contact);

  // Segurança
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const renderEditionLabel = (editionNumber: string, className = "") => {
    const normalized = editionNumber?.trim() || "";
    const match = normalized.match(/^(\d+)\s*([ºª°])?(?:\s*(.*))?$/i);

    if (!match) {
      return <span className={className}>{normalized || "Edição"}</span>;
    }

    const [, number, suffix = "ª", rest = ""] = match;

    return (
      <span className={className}>
        <span className="edition-number">{number}</span>
        {suffix ? <span className={suffix === "°" ? "degree-symbol" : "edition-ordinal"}>{suffix}</span> : null}
        {rest ? <span className="ml-1">{rest}</span> : null}
      </span>
    );
  };

  const closeProjectModal = () => {
    setIsAddingProject(false);
    setIsEditingProject(false);
    setProjectFormData({});
  };

  const closeEditionModal = () => setEditingEdition(null);

  const closePhotoModal = () => {
    setPhotoModal(null);
    setUploadPreviews([]);
    setNewPhotoUrl("");
    setNewPhotoCaption("");
    setNewPhotoAlt("");
  };

  const closeFaqModal = () => {
    setIsAddingFaq(false);
    setEditingFaq(null);
    setNewFaqQuestion("");
    setNewFaqAnswer("");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isAddingProject || isEditingProject) closeProjectModal();
        if (editingEdition) closeEditionModal();
        if (photoModal) closePhotoModal();
        if (isAddingFaq || editingFaq) closeFaqModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAddingProject, isEditingProject, editingEdition, photoModal, isAddingFaq, editingFaq]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(passwordInput);
    if (!success) {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2500);
    } else {
      setPasswordInput("");
    }
  };

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const totalEditionsCount = projects.reduce((acc, p) => acc + p.editions.length, 0);


  const globalBgStyle = {
    backgroundColor: "#072312",
    backgroundImage: `
      radial-gradient(circle at 10% 20%, rgba(245, 189, 44, 0.18) 0%, transparent 45%),
      radial-gradient(circle at 90% 40%, rgba(25, 97, 50, 0.35) 0%, transparent 55%),
      radial-gradient(circle at 50% 85%, rgba(1, 0, 119, 0.30) 0%, transparent 60%),
      radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(160deg, #072312 0%, #0d381c 30%, #061f12 60%, #020c22 100%)
    `,
    backgroundSize: "auto, auto, auto, 24px 24px, auto",
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loginError={loginError}
        handleLoginSubmit={handleLoginSubmit}
      />
    );
  }

  // ── PAINEL PRINCIPAL (100% EM 1 TELA) ──
  return (
    <div
      className="h-screen w-screen overflow-hidden text-white flex flex-col font-body select-none"
      style={globalBgStyle}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="fixed top-4 right-4 z-[100] px-4 py-2 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs shadow-2xl flex items-center gap-2 border border-black/15 font-heading"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        projectsCount={projects.length}
        faqCount={faq.length}
        contact={contact}
        setContactForm={setContactForm}
        logout={logout}
      />

      {/* ── ÁREA DE TRABALHO PRINCIPAL (FLEX-1, 1 TELA) ── */}
      <main className="flex-1 min-h-0 overflow-hidden p-4 sm:p-6 flex flex-col justify-center">
        {/* ============================================================
            SEÇÃO 1: VISÃO GERAL (CARDS MODERNOS & BENTO LUXURY)
            ============================================================ */}
        {activeSection === "hub" && (
          <OverviewSection
            projects={projects}
            faq={faq}
            contact={contact}
            totalEditionsCount={totalEditionsCount}
            setActiveSection={setActiveSection}
            setContactForm={setContactForm}
          />
        )}

        {/* ============================================================
            SEÇÃO 2: PROJETOS, EDIÇÕES E FOTOS (1 TELA SEM SCROLL GLOBAL)
            ============================================================ */}
        {activeSection === "projects" && (
          <div className="h-full flex flex-col min-h-0 space-y-3">
            <div className="flex items-center justify-between gap-3 flex-shrink-0 rounded-2xl border border-white/10 bg-[#0b2b1c]/80 px-3 py-2 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                {projects.map((proj) => {
                  const isSel = proj.id === (currentProject?.id || selectedProjectId);
                  const isDraft = proj.isPublished === false || proj.status === "draft";

                  return (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer",
                        isSel
                          ? "bg-brand-yellow text-neutral-950 border-brand-yellow shadow-[0_10px_20px_-10px_rgba(245,189,44,0.8)]"
                          : isDraft
                            ? "bg-amber-500/10 text-amber-200 border-amber-500/30 hover:bg-amber-500/20"
                            : "bg-white/[0.04] text-neutral-200 border-white/10 hover:bg-white/[0.08]"
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
                onClick={() => {
                  setProjectFormData({
                    name: "",
                    slug: "",
                    category: "feiras-gastronomicas",
                    categoryLabel: "Produção Autoral",
                    tagline: "",
                    description: "",
                    isPublished: true,
                    status: "published",
                    coverImage: "",
                    stats: {
                      totalAudience: "+10.000 pessoas",
                      totalEditions: "1 Edição",
                      highlightTag: "Produção 360°",
                    },
                  });
                  setIsAddingProject(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer font-heading flex-shrink-0 shadow-[0_10px_25px_-14px_rgba(245,189,44,0.8)]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Novo Projeto</span>
              </button>
            </div>

            {currentProject && (
              <div className="flex-1 min-h-0 rounded-[28px] border border-white/10 bg-[#0a2818]/75 p-3 sm:p-4 flex flex-col backdrop-blur-xl shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 flex-shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/15 flex-shrink-0 shadow-lg">
                      <Image
                        src={currentProject.coverImage}
                        alt={currentProject.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[28px] sm:text-[32px] font-heading font-bold tracking-[-0.04em] text-white">
                          {currentProject.name}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30 font-sans">
                          {currentProject.categoryLabel}
                        </span>
                        {currentProject.isPublished === false || currentProject.status === "draft" ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-sans flex items-center gap-1">
                            <EyeOff className="w-2.5 h-2.5" />
                            Rascunho
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-sans flex items-center gap-1">
                            <Eye className="w-2.5 h-2.5" />
                            Publicado
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                        {currentProject.tagline || "A energia que conecta pessoas."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        toggleProjectVisibility(currentProject.id);
                        const willBePublished =
                          currentProject.isPublished === false || currentProject.status === "draft";
                        showToast(
                          willBePublished
                            ? "Projeto publicado no site!"
                            : "Projeto ocultado (salvo como rascunho)!"
                        );
                      }}
                      title={
                        currentProject.isPublished === false || currentProject.status === "draft"
                          ? "Publicar projeto"
                          : "Ocultar projeto"
                      }
                      className={cn(
                        "px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer border",
                        currentProject.isPublished === false || currentProject.status === "draft"
                          ? "bg-amber-500/20 text-amber-200 border-amber-500/40 hover:bg-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-200 border-emerald-500/40 hover:bg-emerald-500/30"
                      )}
                    >
                      {currentProject.isPublished === false || currentProject.status === "draft" ? (
                        <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <span>
                        {currentProject.isPublished === false || currentProject.status === "draft"
                          ? "Ocultar"
                          : "Visível"}
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        setEditingEdition({
                          projectId: currentProject.id,
                          isNew: true,
                          edition: {
                            id: `ed-${Date.now()}`,
                            editionNumber: `${currentProject.editions.length + 1}ª Edição`,
                            year: new Date().getFullYear().toString(),
                            title: `${currentProject.name} — ${currentProject.editions.length + 1}ª Edição`,
                            date: "Data do Evento",
                            location: "São Paulo, SP",
                            audience: "5.000+ pessoas",
                            description: "Descrição da produção...",
                            coverImage: currentProject.coverImage,
                            isPublished: true,
                            status: "published",
                            highlights: ["Palco 360°", "ART CREA/SP"],
                            scope: ["Sonorização Line Array", "Painéis LED"],
                            gallery: [],
                          },
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer font-heading shadow-[0_12px_30px_-16px_rgba(245,189,44,0.9)]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Nova Edição</span>
                    </button>

                    <button
                      onClick={() => {
                        setProjectFormData({ ...currentProject });
                        setIsEditingProject(true);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Excluir o projeto "${currentProject.name}"?`)) {
                          deleteProject(currentProject.id);
                          showToast("Projeto excluído.");
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Excluir projeto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto pr-1 mt-3 space-y-3 scrollbar-thin">
                  {currentProject.editions.map((edition) => {
                    const isEditionDraft =
                      edition.isPublished === false || edition.status === "draft";

                    return (
                      <div
                        key={edition.id}
                        className={cn(
                          "rounded-[24px] border transition-all p-3 sm:p-4 flex flex-col gap-3",
                          isEditionDraft
                            ? "bg-[#112d20]/90 border-amber-500/25 hover:border-amber-500/40"
                            : "bg-[#0f2d1f]/80 border-white/10 hover:border-white/20"
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="relative w-16 h-16 rounded-[18px] overflow-hidden border border-white/15 flex-shrink-0">
                              <Image
                                src={edition.coverImage || currentProject.coverImage}
                                alt={edition.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                {renderEditionLabel(
                                  edition.editionNumber,
                                  "inline-flex items-center justify-center min-w-[52px] rounded-lg border border-brand-yellow/30 bg-brand-yellow/12 px-2.5 py-0.5 text-[11px] font-black leading-none text-brand-yellow"
                                )}
                                <span className="text-[11px] uppercase tracking-[0.14em] text-neutral-400">
                                  {edition.year}
                                </span>
                                {isEditionDraft ? (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    Rascunho
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                    Publicado
                                  </span>
                                )}
                              </div>

                              <h4 className="mt-1 text-lg font-heading font-bold text-white truncate">
                                {edition.title}
                              </h4>

                              <p className="mt-1 text-[12px] text-neutral-300 truncate">
                                {edition.location} • {edition.audience}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                toggleEditionVisibility(currentProject.id, edition.id);
                                showToast(
                                  isEditionDraft
                                    ? "Edição publicada no site!"
                                    : "Edição salva como rascunho!"
                                );
                              }}
                              title={isEditionDraft ? "Publicar edição" : "Ocultar edição"}
                              className={cn(
                                "h-8 w-8 rounded-lg transition-all flex items-center justify-center cursor-pointer border",
                                isEditionDraft
                                  ? "bg-amber-500/20 text-amber-200 border-amber-500/30 hover:bg-amber-500/30"
                                  : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25"
                              )}
                            >
                              {isEditionDraft ? (
                                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                              ) : (
                                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </button>

                            <button
                              onClick={() =>
                                setEditingEdition({
                                  projectId: currentProject.id,
                                  edition: { ...edition },
                                  isNew: false,
                                })
                              }
                              className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                              title="Editar edição"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Excluir "${edition.editionNumber}"?`)) {
                                  deleteEdition(currentProject.id, edition.id);
                                  showToast("Edição excluída.");
                                }
                              }}
                              className="h-8 w-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 flex items-center justify-center transition-colors cursor-pointer"
                              title="Excluir edição"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
                          {edition.gallery.map((photo) => (
                            <div
                              key={photo.id}
                              className="group relative w-20 h-14 rounded-xl overflow-hidden border border-white/15 flex-shrink-0 bg-neutral-900 shadow-sm"
                            >
                              <Image
                                src={photo.url}
                                alt={photo.alt}
                                fill
                                className="object-cover"
                              />
                              <button
                                onClick={() => {
                                  deleteEditionPhoto(currentProject.id, edition.id, photo.id);
                                  showToast("Foto excluída.");
                                }}
                                className="absolute inset-0 bg-red-950/85 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-300" />
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() =>
                              setPhotoModal({
                                projectId: currentProject.id,
                                editionId: edition.id,
                              })
                            }
                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[22px] border border-dashed border-white/20 bg-white/[0.04] text-neutral-300 transition-all hover:border-white/35 hover:bg-white/[0.08] hover:text-white cursor-pointer"
                            title="Adicionar mais fotos"
                            aria-label="Adicionar mais fotos"
                          >
                            <Plus className="w-7 h-7 font-black" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Modal: Adicionar / Editar Projeto */}
            <AnimatePresence>
              {(isAddingProject || isEditingProject) && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
                  onClick={closeProjectModal}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 18 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[30px] border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.42)] liquid-glass-opaque"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow/80">
                          {isEditingProject ? "Editar projeto" : "Novo projeto"}
                        </p>
                        <h3 className="mt-1 text-xl font-heading font-bold text-white">
                          {isEditingProject ? "Editar projeto" : "Adicionar projeto"}
                        </h3>
                      </div>

                      <button
                        onClick={closeProjectModal}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center cursor-pointer transition-colors"
                        aria-label="Fechar modal"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] overflow-y-auto max-h-[calc(90vh-92px)]">
                      <div className="space-y-4 p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                              Nome do projeto
                            </label>
                            <input
                              type="text"
                              value={projectFormData.name || ""}
                              onChange={(e) =>
                                setProjectFormData({ ...projectFormData, name: e.target.value })
                              }
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
                              value={projectFormData.categoryLabel || ""}
                              onChange={(e) =>
                                setProjectFormData({ ...projectFormData, categoryLabel: e.target.value })
                              }
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
                            value={projectFormData.tagline || ""}
                            onChange={(e) =>
                              setProjectFormData({ ...projectFormData, tagline: e.target.value })
                            }
                            placeholder="Frase curta de destaque..."
                            className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                          />
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                            Descrição
                          </label>
                          <textarea
                            value={projectFormData.description || ""}
                            onChange={(e) =>
                              setProjectFormData({ ...projectFormData, description: e.target.value })
                            }
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
                              value={projectFormData.stats?.totalAudience || "+15.000 pessoas"}
                              onChange={(e) =>
                                setProjectFormData({
                                  ...projectFormData,
                                  stats: {
                                    totalAudience: e.target.value,
                                    totalEditions: projectFormData.stats?.totalEditions || "1 Edição",
                                    highlightTag: projectFormData.stats?.highlightTag || "Produção 360°",
                                  },
                                })
                              }
                              placeholder="+20.000 pessoas"
                              className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                            />
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                              Destacada
                            </label>
                            <input
                              type="text"
                              value={projectFormData.stats?.highlightTag || "Produção 360°"}
                              onChange={(e) =>
                                setProjectFormData({
                                  ...projectFormData,
                                  stats: {
                                    totalAudience: projectFormData.stats?.totalAudience || "+15.000 pessoas",
                                    totalEditions: projectFormData.stats?.totalEditions || "1 Edição",
                                    highlightTag: e.target.value,
                                  },
                                })
                              }
                              placeholder="Produção 360°"
                              className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                            Visibilidade do projeto
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setProjectFormData({
                                  ...projectFormData,
                                  isPublished: true,
                                  status: "published",
                                })
                              }
                              className={cn(
                                "py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all",
                                projectFormData.isPublished !== false && projectFormData.status !== "draft"
                                  ? "bg-emerald-500/20 text-emerald-200 border-emerald-500/50"
                                  : "bg-white/[0.04] text-neutral-300 border-white/10 hover:bg-white/[0.08]"
                              )}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Visível</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setProjectFormData({
                                  ...projectFormData,
                                  isPublished: false,
                                  status: "draft",
                                })
                              }
                              className={cn(
                                "py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all",
                                projectFormData.isPublished === false || projectFormData.status === "draft"
                                  ? "bg-amber-500/20 text-amber-200 border-amber-500/50"
                                  : "bg-white/[0.04] text-neutral-300 border-white/10 hover:bg-white/[0.08]"
                              )}
                            >
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Oculto</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="border-l border-white/10 bg-[#0b2b1c]/60 p-5 flex flex-col">
                        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-4 shadow-inner shadow-white/5">
                          {projectFormData.coverImage ? (
                            <>
                              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-300">
                                <span>Preview</span>
                                <span
                                  className={cn(
                                    "rounded-full px-2 py-1 border",
                                    projectFormData.isPublished === false || projectFormData.status === "draft"
                                      ? "border-amber-400/50 bg-amber-500/10 text-amber-200"
                                      : "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
                                  )}
                                >
                                  {projectFormData.isPublished === false || projectFormData.status === "draft"
                                    ? "Oculto"
                                    : "Visível"}
                                </span>
                              </div>

                              <div className="relative mt-4 overflow-hidden rounded-[24px] border border-white/10 bg-neutral-950/50 shadow-xl">
                                <div className="relative h-40">
                                  <Image
                                    src={projectFormData.coverImage}
                                    alt={projectFormData.name || "Preview do projeto"}
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <div className="space-y-2 p-3">
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex rounded-full border border-brand-yellow/50 bg-brand-yellow/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-yellow">
                                      {projectFormData.name || "Projeto"}
                                    </span>
                                  </div>

                                  <h4 className="text-base font-heading font-bold text-white leading-snug">
                                    {projectFormData.tagline || "Estrutura premium e produção 360°"}
                                  </h4>

                                  <p className="text-[11px] text-neutral-300">
                                    {projectFormData.stats?.totalAudience || "+15.000 pessoas"}
                                  </p>
                                </div>
                              </div>
                            </>
                          ) : null}

                          <div className={cn("mt-4", projectFormData.coverImage && "mt-4")}>
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
                                  processProjectCover(e.target.files?.[0] || null);
                                  e.target.value = "";
                                }}
                              />

                              {projectFormData.coverImage ? (
                                <div className="flex items-center gap-3 text-neutral-200">
                                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-yellow">
                                    <ImageIcon className="h-5 w-5" />
                                  </div>
                                  <div className="text-left">
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-yellow">
                                      Alterar foto
                                    </p>
                                    <p className="text-[11px] text-neutral-300">
                                      Recarregar a capa do projeto
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3 text-neutral-200">
                                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-yellow">
                                    <Plus className="h-6 w-6" />
                                  </div>
                                  <div className="text-left">
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-yellow">
                                      Adicionar foto
                                    </p>
                                    <p className="text-[11px] text-neutral-300">
                                      Faça upload da capa principal
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2 pt-4 border-t border-white/10">
                          <button
                            onClick={closeProjectModal}
                            className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer hover:bg-white/15 transition-colors"
                          >
                            Cancelar
                          </button>

                          <button
                            onClick={() => {
                              if (!projectFormData.name?.trim()) return;
                              if (isEditingProject && currentProject) {
                                updateProject(currentProject.id, projectFormData);
                                showToast("Projeto atualizado!");
                                setIsEditingProject(false);
                              } else {
                                addProject({
                                  name: projectFormData.name,
                                  slug:
                                    projectFormData.slug ||
                                    projectFormData.name.toLowerCase().replace(/\s+/g, "-"),
                                  category: "feiras-gastronomicas",
                                  categoryLabel: projectFormData.categoryLabel || "Produção Autoral",
                                  tagline: projectFormData.tagline || "",
                                  description: projectFormData.description || "",
                                  isPublished: projectFormData.isPublished ?? true,
                                  status: projectFormData.status ?? "published",
                                  coverImage: projectFormData.coverImage || "",
                                  featuredEdition: "1ª Edição",
                                  totalEditions: 1,
                                  stats: {
                                    totalAudience: projectFormData.stats?.totalAudience || "+5.000 pessoas",
                                    totalEditions: "1 Edição",
                                    highlightTag: projectFormData.stats?.highlightTag || "Produção 360°",
                                  },
                                  editions: [
                                    {
                                      id: `ed-${Date.now()}`,
                                      editionNumber: "1ª Edição",
                                      year: new Date().getFullYear().toString(),
                                      title: `${projectFormData.name} — 1ª Edição`,
                                      date: "2024",
                                      location: "São Paulo, SP",
                                      audience: "5.000+ participantes",
                                      description: projectFormData.description || "Primeira edição.",
                                      isPublished: projectFormData.isPublished ?? true,
                                      status: projectFormData.status ?? "published",
                                      coverImage:
                                        projectFormData.coverImage ||
                                        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000",
                                      highlights: ["Palco 360°", "ART CREA/SP"],
                                      scope: ["Sonorização Line Array", "Painel de LED"],
                                      gallery: [],
                                    },
                                  ],
                                });
                                showToast("Novo projeto criado!");
                                setIsAddingProject(false);
                              }
                              setProjectFormData({});
                              setIsEditingProject(false);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer font-heading shadow-[0_16px_32px_-16px_rgba(245,189,44,0.95)]"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Salvar projeto</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Modal: Adicionar / Editar Edição */}
            <AnimatePresence>
              {editingEdition && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
                  onClick={closeEditionModal}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 18 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[30px] border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.42)] liquid-glass-opaque"
                  >
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
                        onClick={() => setEditingEdition(null)}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center cursor-pointer transition-colors"
                        aria-label="Fechar modal"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] overflow-y-auto max-h-[calc(90vh-92px)]">
                      <div className="space-y-4 p-5">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                              Edição
                            </label>
                            <input
                              type="text"
                              value={editingEdition.edition.editionNumber}
                              onChange={(e) =>
                                setEditingEdition({
                                  ...editingEdition,
                                  edition: {
                                    ...editingEdition.edition,
                                    editionNumber: e.target.value,
                                  },
                                })
                              }
                              placeholder="Ex: 5ª Edição"
                              className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                            />
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                              Ano
                            </label>
                            <input
                              type="text"
                              value={editingEdition.edition.year}
                              onChange={(e) =>
                                setEditingEdition({
                                  ...editingEdition,
                                  edition: { ...editingEdition.edition, year: e.target.value },
                                })
                              }
                              placeholder="2024"
                              className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                            Título da edição
                          </label>
                          <input
                            type="text"
                            value={editingEdition.edition.title}
                            onChange={(e) =>
                              setEditingEdition({
                                ...editingEdition,
                                edition: { ...editingEdition.edition, title: e.target.value },
                              })
                            }
                            placeholder="Ex: Sambará — Edição de Primavera"
                            className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                              Data
                            </label>
                            <input
                              type="text"
                              value={editingEdition.edition.date}
                              onChange={(e) =>
                                setEditingEdition({
                                  ...editingEdition,
                                  edition: { ...editingEdition.edition, date: e.target.value },
                                })
                              }
                              placeholder="Dez/2024"
                              className="w-full px-2.5 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                            />
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                              Local
                            </label>
                            <input
                              type="text"
                              value={editingEdition.edition.location}
                              onChange={(e) =>
                                setEditingEdition({
                                  ...editingEdition,
                                  edition: { ...editingEdition.edition, location: e.target.value },
                                })
                              }
                              placeholder="São Paulo, SP"
                              className="w-full px-2.5 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                            />
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                              Público
                            </label>
                            <input
                              type="text"
                              value={editingEdition.edition.audience}
                              onChange={(e) =>
                                setEditingEdition({
                                  ...editingEdition,
                                  edition: { ...editingEdition.edition, audience: e.target.value },
                                })
                              }
                              placeholder="5.000+ pessoas"
                              className="w-full px-2.5 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                            Destaques e engenharia
                          </label>
                          <input
                            type="text"
                            value={editingEdition.edition.highlights?.join(", ")}
                            onChange={(e) =>
                              setEditingEdition({
                                ...editingEdition,
                                edition: {
                                  ...editingEdition.edition,
                                  highlights: e.target.value
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean),
                                },
                              })
                            }
                            placeholder="Palco 360°, ART CREA/SP, Alvará..."
                            className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                          />
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                            Visibilidade da edição
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setEditingEdition({
                                  ...editingEdition,
                                  edition: {
                                    ...editingEdition.edition,
                                    isPublished: true,
                                    status: "published",
                                  },
                                })
                              }
                              className={cn(
                                "py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all",
                                editingEdition.edition.isPublished !== false &&
                                  editingEdition.edition.status !== "draft"
                                  ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/50"
                                  : "bg-white/[0.04] text-neutral-300 border-white/10 hover:bg-white/[0.08]"
                              )}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Publicada</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setEditingEdition({
                                  ...editingEdition,
                                  edition: {
                                    ...editingEdition.edition,
                                    isPublished: false,
                                    status: "draft",
                                  },
                                })
                              }
                              className={cn(
                                "py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all",
                                editingEdition.edition.isPublished === false ||
                                  editingEdition.edition.status === "draft"
                                  ? "bg-amber-500/20 text-amber-200 border-amber-400/50"
                                  : "bg-white/[0.04] text-neutral-300 border-white/10 hover:bg-white/[0.08]"
                              )}
                            >
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Rascunho</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="border-l border-white/10 bg-[#0b2b1c]/60 p-5 flex flex-col">
                        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-4 shadow-inner shadow-white/5">
                          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-300">
                            <span>Preview</span>
                            <span
                              className={cn(
                                "rounded-full px-2 py-1 border",
                                editingEdition.edition.isPublished === false ||
                                  editingEdition.edition.status === "draft"
                                  ? "border-amber-400/50 bg-amber-500/10 text-amber-200"
                                  : "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
                              )}
                            >
                              {editingEdition.edition.isPublished === false ||
                              editingEdition.edition.status === "draft"
                                ? "Oculta"
                                : "Visível"}
                            </span>
                          </div>

                          <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-neutral-950/50 shadow-xl">
                            <div className="relative h-28">
                              <Image
                                src={currentProject?.coverImage || "/images/placeholder.jpg"}
                                alt={editingEdition.edition.title || currentProject?.name || "Preview"}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="space-y-2 p-3">
                              <div className="flex items-center gap-2">
                                {renderEditionLabel(
                                  editingEdition.edition.editionNumber || "Edição",
                                  "inline-flex items-center rounded-full border border-brand-yellow/50 bg-brand-yellow/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-yellow"
                                )}
                                <span className="text-[9px] uppercase tracking-[0.14em] text-neutral-400">
                                  {editingEdition.edition.year || "2025"}
                                </span>
                              </div>

                              <h4 className="text-base font-heading font-bold text-white leading-snug">
                                {editingEdition.edition.title || `${currentProject?.name || "Projeto"} — Edição`}
                              </h4>

                              <div className="space-y-1 text-[11px] text-neutral-300">
                                <p>{editingEdition.edition.location || "São Paulo, SP"}</p>
                                <p>{editingEdition.edition.audience || "5.000+ pessoas"}</p>
                                <p>{editingEdition.edition.date || "Dez/2024"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {(editingEdition.edition.highlights?.length
                              ? editingEdition.edition.highlights
                              : ["Palco 360°", "ART CREA/SP"]
                            ).slice(0, 3).map((tag, index) => (
                              <span
                                key={`${tag}-${index}`}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-neutral-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2 pt-4 border-t border-white/10">
                          <button
                            onClick={() => setEditingEdition(null)}
                            className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer hover:bg-white/15 transition-colors"
                          >
                            Cancelar
                          </button>

                          <button
                            onClick={() => {
                              if (editingEdition.isNew) {
                                addEdition(editingEdition.projectId, editingEdition.edition);
                                showToast("Nova edição adicionada!");
                              } else {
                                updateEdition(
                                  editingEdition.projectId,
                                  editingEdition.edition.id,
                                  editingEdition.edition
                                );
                                showToast("Edição atualizada!");
                              }
                              setEditingEdition(null);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer font-heading shadow-[0_16px_32px_-16px_rgba(245,189,44,0.95)]"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Salvar edição</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Modal: Adicionar Foto (Upload + URL) */}
            <AnimatePresence>
              {photoModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
                  onClick={closePhotoModal}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-[760px] rounded-[30px] border border-white/10 bg-[#1d1d1d]/85 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl max-h-[90vh] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2 text-white">
                        <Upload className="w-4 h-4 text-brand-yellow" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-yellow">Adicionar fotos</span>
                      </div>

                      <button
                        onClick={() => {
                          setPhotoModal(null);
                          setUploadPreviews([]);
                          setNewPhotoUrl("");
                          setNewPhotoCaption("");
                        }}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4 pt-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand-yellow mb-2">
                          Upload de fotos do evento
                        </label>
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={cn(
                            "relative w-full min-h-[170px] rounded-[26px] border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 bg-white/[0.02]",
                            isDragging
                              ? "border-brand-yellow bg-brand-yellow/10 scale-[1.01]"
                              : "border-white/20 hover:border-white/30 hover:bg-white/[0.05]"
                          )}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                processFiles(e.target.files);
                                e.target.value = "";
                              }
                            }}
                          />

                          {isUploading ? (
                            <>
                              <div className="w-10 h-10 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
                              <span className="text-xs text-neutral-300">Processando imagens...</span>
                            </>
                          ) : (
                            <>
                              <div className="w-14 h-14 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow">
                                <FileUp className="w-7 h-7" />
                              </div>
                              <div className="text-center px-4">
                                <p className="text-lg font-bold text-white leading-tight">
                                  Arraste fotos aqui ou <span className="text-brand-yellow underline">selecione do computador</span>
                                </p>
                                <p className="text-[11px] text-neutral-400 mt-1">
                                  JPG, PNG, WebP — várias fotos de uma vez
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {uploadPreviews.length > 0 && (
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-300 mb-2">
                            {uploadPreviews.length} {uploadPreviews.length === 1 ? "foto selecionada" : "fotos selecionadas"}
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {uploadPreviews.map((preview, idx) => (
                              <div
                                key={idx}
                                className="group relative aspect-square rounded-xl overflow-hidden border border-white/15 bg-neutral-900"
                              >
                                <Image
                                  src={preview.dataUrl}
                                  alt={preview.name}
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUploadPreviews((prev) => prev.filter((_, i) => i !== idx));
                                  }}
                                  className="absolute inset-0 bg-red-950/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4 text-red-300" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">ou cole uma URL</span>
                        <div className="flex-1 h-px bg-white/10" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-300 mb-2">
                          URL da foto (externo)
                        </label>
                        <input
                          type="text"
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-300 mb-2">
                          Legenda (opcional)
                        </label>
                        <input
                          type="text"
                          value={newPhotoCaption}
                          onChange={(e) => setNewPhotoCaption(e.target.value)}
                          placeholder="Palco 360°, público..."
                          className="w-full px-3 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                        />
                      </div>

                      {newPhotoUrl && uploadPreviews.length === 0 && (
                        <div className="relative w-full h-28 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                          <Image
                            src={newPhotoUrl}
                            alt="Prévia"
                            fill
                            className="object-cover"
                            onError={() => console.log("Erro de prévia")}
                          />
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setPhotoModal(null);
                          setUploadPreviews([]);
                          setNewPhotoUrl("");
                          setNewPhotoCaption("");
                        }}
                        className="px-5 py-3 rounded-2xl bg-white/10 text-white text-sm font-bold cursor-pointer hover:bg-white/15 transition-colors"
                      >
                        Cancelar
                      </button>

                      <button
                        onClick={() => {
                          const caption = newPhotoCaption.trim() || undefined;
                          const altText = "Foto da edição Only in BR";
                          let count = 0;

                          uploadPreviews.forEach((preview) => {
                            addEditionPhoto(photoModal.projectId, photoModal.editionId, {
                              url: preview.dataUrl,
                              caption,
                              alt: preview.name || altText,
                            });
                            count++;
                          });

                          if (newPhotoUrl.trim() && uploadPreviews.length === 0) {
                            addEditionPhoto(photoModal.projectId, photoModal.editionId, {
                              url: newPhotoUrl.trim(),
                              caption,
                              alt: altText,
                            });
                            count++;
                          }

                          if (count > 0) {
                            showToast(
                              count === 1
                                ? "Foto adicionada!"
                                : `${count} fotos adicionadas!`
                            );
                          }

                          setNewPhotoUrl("");
                          setNewPhotoCaption("");
                          setUploadPreviews([]);
                          setPhotoModal(null);
                        }}
                        disabled={uploadPreviews.length === 0 && !newPhotoUrl.trim()}
                        className={cn(
                          "px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-all",
                          uploadPreviews.length > 0 || newPhotoUrl.trim()
                            ? "bg-brand-yellow text-neutral-950"
                            : "bg-white/10 text-neutral-500 cursor-not-allowed"
                        )}
                      >
                        <Upload className="w-4 h-4" />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ============================================================
            SEÇÃO 3: FAQ EM 1 TELA
            ============================================================ */}
        {activeSection === "faq" && (
          <FaqSection
            faq={faq}
            faqSearch={faqSearch}
            setFaqSearch={setFaqSearch}
            isAddingFaq={isAddingFaq}
            setIsAddingFaq={setIsAddingFaq}
            editingFaq={editingFaq}
            setEditingFaq={setEditingFaq}
            newFaqQuestion={newFaqQuestion}
            setNewFaqQuestion={setNewFaqQuestion}
            newFaqAnswer={newFaqAnswer}
            setNewFaqAnswer={setNewFaqAnswer}
            addFaqItem={addFaqItem}
            updateFaqItem={updateFaqItem}
            deleteFaqItem={deleteFaqItem}
            closeFaqModal={closeFaqModal}
            showToast={showToast}
          />
        )}

        {/* ============================================================
            SEÇÃO 4: WHATSAPP E CONTATO (1 TELA LADO A LADO)
            ============================================================ */}
        {activeSection === "contact" && (
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-7 rounded-[30px] border border-white/15 bg-[rgba(10,40,24,0.46)] p-6 backdrop-blur-xl shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">
                    WhatsApp
                  </p>
                  <h3 className="text-lg font-heading font-bold text-white">
                    Configurar contato oficial
                  </h3>
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
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      Telefone visual
                    </label>
                    <input
                      type="text"
                      value={contactForm.displayPhone}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, displayPhone: e.target.value })
                      }
                      placeholder="(11) 99999-9999"
                      className="w-full px-3 py-2 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs focus:border-brand-yellow/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      E-mail oficial
                    </label>
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
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    Mensagem inicial
                  </label>
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
                  <span className="text-white font-mono font-bold">
                    +{contactForm.whatsappNumber || "5511999999999"}
                  </span>
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
        )}

        {/* ============================================================
            SEÇÃO 5: SEGURANÇA E BACKUPS
            ============================================================ */}
        {activeSection === "security" && (
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="rounded-[30px] border border-white/15 bg-[rgba(10,40,24,0.46)] p-6 backdrop-blur-xl shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow/80">
                    Segurança
                  </p>
                  <h3 className="text-lg font-heading font-bold text-white">
                    Alterar senha do painel
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Nova senha
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 4 dígitos..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Confirmar senha
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a senha..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (!newPassword || newPassword.length < 4) {
                    alert("A senha precisa ter pelo menos 4 caracteres.");
                    return;
                  }
                  if (newPassword !== confirmPassword) {
                    alert("As senhas não coincidem.");
                    return;
                  }
                  changePassword(newPassword);
                  setNewPassword("");
                  setConfirmPassword("");
                  showToast("Senha alterada com sucesso!");
                }}
                className="w-full py-2.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-1 font-heading shadow-[0_16px_32px_-16px_rgba(245,189,44,0.95)]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Atualizar Senha</span>
              </button>
            </div>

            <div className="rounded-[30px] border border-white/15 bg-[rgba(10,40,24,0.42)] p-6 backdrop-blur-xl shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">
                      Backup
                    </p>
                    <h3 className="text-lg font-heading font-bold text-white">
                      Dados completos
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  Baixe um arquivo JSON com todas as suas edições, fotos, FAQ e configurações para
                  guardar em segurança.
                </p>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => {
                    const json = exportDataJson();
                    const blob = new Blob([json], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `onlyinbr_backup_${new Date().toISOString().split("T")[0]}.json`;
                    a.click();
                    showToast("Backup baixado!");
                  }}
                  className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer font-heading"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Backup JSON</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm("Deseja restaurar para os dados originais?")) {
                      resetToDefaults();
                      showToast("Dados restaurados.");
                    }
                  }}
                  className="py-3 px-3.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 font-bold text-xs transition-colors flex items-center justify-center cursor-pointer"
                  title="Restaurar Padrões"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
