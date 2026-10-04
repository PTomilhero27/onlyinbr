"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { type PortfolioProject, type ProjectEdition } from "@/data/portfolio";
import { type FaqItem } from "@/data/faq";

// Componentes modulares do painel administrativo
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { OverviewSection } from "@/components/admin/OverviewSection";
import { ProjectSection } from "@/components/admin/ProjectSection";
import { FaqSection } from "@/components/admin/FaqSection";
import { ContactSection } from "@/components/admin/ContactSection";
import { SecuritySection } from "@/components/admin/SecuritySection";

// Modais modulares
import { ProjectModal } from "@/components/admin/ProjectModal";
import { EditionModal } from "@/components/admin/EditionModal";
import { PhotoUploadModal } from "@/components/admin/PhotoUploadModal";

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
    isSyncing,
    syncError,
    syncSuccess,
    syncToSupabase,
    refreshFromSupabase,
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

  // Estados de Autenticação / Login
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

  // Edição de Edições
  const [editingEdition, setEditingEdition] = useState<{
    projectId: string;
    edition: ProjectEdition;
    isNew?: boolean;
  } | null>(null);

  // Modal de Fotos
  const [photoModal, setPhotoModal] = useState<{
    projectId: string;
    editionId: string;
  } | null>(null);

  // Estados de FAQ
  const [faqSearch, setFaqSearch] = useState("");
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");

  // Estados de Contato
  const [contactForm, setContactForm] = useState(contact);

  // Estados de Segurança
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(passwordInput);
    if (!ok) {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    } else {
      setPasswordInput("");
      setLoginError(false);
    }
  };

  // Handlers de Projetos
  const handleOpenNewProject = () => {
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
  };

  const handleOpenEditProject = (project: PortfolioProject) => {
    setProjectFormData({ ...project });
    setIsEditingProject(true);
  };

  const handleSaveProject = async () => {
    if (!projectFormData.name?.trim()) {
      showToast("Preencha ao menos o nome do projeto.");
      return;
    }

    if (isEditingProject && projectFormData.id) {
      await updateProject(projectFormData.id, projectFormData);
      showToast("Projeto atualizado e sincronizado com o Supabase!");
    } else {
      const newId =
        projectFormData.slug ||
        projectFormData.name
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-") ||
        `proj-${Date.now()}`;

      await addProject({
        name: projectFormData.name,
        slug: newId,
        category: projectFormData.category || "feiras-gastronomicas",
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
            date: new Date().getFullYear().toString(),
            location: "São Paulo, SP",
            audience: "5.000+ participantes",
            description: projectFormData.description || "Primeira edição realizada.",
            isPublished: projectFormData.isPublished ?? true,
            status: projectFormData.status ?? "published",
            coverImage: projectFormData.coverImage || "",
            highlights: ["Palco 360°", "ART CREA/SP"],
            scope: ["Sonorização Line Array", "Painel de LED"],
            gallery: [],
          },
        ],
      });
      setSelectedProjectId(newId);
      showToast("Novo projeto salvo no Supabase!");
    }

    setIsAddingProject(false);
    setIsEditingProject(false);
    setProjectFormData({});
  };

  // Handlers de Edições
  const handleOpenNewEdition = (projectId: string) => {
    const parent = projects.find((p) => p.id === projectId);
    const nextNumber = parent ? parent.editions.length + 1 : 1;

    setEditingEdition({
      projectId,
      isNew: true,
      edition: {
        id: `ed-${Date.now()}`,
        editionNumber: `${nextNumber}ª Edição`,
        year: new Date().getFullYear().toString(),
        title: `${parent?.name || "Projeto"} — ${nextNumber}ª Edição`,
        date: new Date().getFullYear().toString(),
        location: "São Paulo, SP",
        audience: "10.000+ participantes",
        description: "",
        isPublished: true,
        status: "published",
        coverImage: parent?.coverImage || "",
        highlights: ["Palco 360°", "ART CREA/SP"],
        scope: ["Sonorização Line Array", "Painel de LED"],
        gallery: [],
      },
    });
  };

  const handleOpenEditEdition = (projectId: string, edition: ProjectEdition) => {
    setEditingEdition({
      projectId,
      isNew: false,
      edition: { ...edition },
    });
  };

  const handleSaveEdition = async (
    projectId: string,
    edition: ProjectEdition,
    isNew?: boolean
  ) => {
    if (isNew) {
      await addEdition(projectId, edition);
      showToast("Nova edição salva no Supabase!");
    } else {
      await updateEdition(projectId, edition.id, edition);
      showToast("Edição atualizada no Supabase!");
    }
    setEditingEdition(null);
  };

  // Handlers de Fotos
  const handleAddPhotos = async (
    projectId: string,
    editionId: string,
    photos: { url: string; caption?: string; alt?: string }[]
  ) => {
    for (const photo of photos) {
      await addEditionPhoto(projectId, editionId, {
        url: photo.url,
        caption: photo.caption,
        alt: photo.alt || "Foto da edição Only in BR",
      });
    }
    showToast(`${photos.length} foto(s) adicionada(s) e salvas no Supabase!`);
  };

  // Métricas
  const totalEditionsCount = projects.reduce((acc, p) => acc + p.editions.length, 0);
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

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

  return (
    <div
      className="h-screen w-screen overflow-hidden text-white flex flex-col font-body select-none"
      style={globalBgStyle}
    >
      {/* Notificação Toast */}
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

      {/* Cabeçalho Fixo do Painel */}
      <AdminHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        projectsCount={projects.length}
        faqCount={faq.length}
        contact={contact}
        setContactForm={setContactForm}
        logout={logout}
        isSyncing={isSyncing}
        syncError={syncError}
        syncSuccess={syncSuccess}
        onSyncSupabase={syncToSupabase}
      />

      {/* Alerta caso haja bloqueio de RLS no Supabase */}
      {syncError && (
        <div className="bg-rose-950/80 border-b border-rose-500/40 text-rose-200 text-xs px-5 py-2 flex items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>
              <strong>Atenção (Supabase):</strong> As alterações foram salvas localmente, mas o Supabase recusou o salvamento remoto (política RLS ativada).
            </span>
          </div>
          <span className="text-[11px] text-rose-300/80">
            Execute o script em <code>supabase/fix-rls.sql</code> no SQL Editor do Supabase.
          </span>
        </div>
      )}

      {/* Conteúdo Dinâmico por Seção */}
      <main className="flex-1 min-h-0 p-3 sm:p-5 flex flex-col overflow-hidden">
        {/* Hub / Visão Geral */}
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

        {/* Gerenciamento de Projetos e Edições */}
        {activeSection === "projects" && (
          <ProjectSection
            projects={projects}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            onOpenNewProject={handleOpenNewProject}
            onOpenEditProject={handleOpenEditProject}
            onDeleteProject={(id) => {
              deleteProject(id);
              showToast("Projeto excluído.");
            }}
            onToggleProjectVisibility={(id) => {
              toggleProjectVisibility(id);
              showToast("Visibilidade do projeto alterada.");
            }}
            onOpenNewEdition={handleOpenNewEdition}
            onOpenEditEdition={handleOpenEditEdition}
            onDeleteEdition={(projId, edId) => {
              deleteEdition(projId, edId);
              showToast("Edição excluída.");
            }}
            onToggleEditionVisibility={(projId, edId) => {
              toggleEditionVisibility(projId, edId);
              showToast("Visibilidade da edição alterada.");
            }}
            onOpenPhotoModal={(projId, edId) => setPhotoModal({ projectId: projId, editionId: edId })}
            onDeletePhoto={(projId, edId, photoId) => {
              deleteEditionPhoto(projId, edId, photoId);
              showToast("Foto excluída.");
            }}
          />
        )}

        {/* Gerenciamento de Perguntas Frequentes (FAQ) */}
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
            closeFaqModal={() => {
              setIsAddingFaq(false);
              setEditingFaq(null);
              setNewFaqQuestion("");
              setNewFaqAnswer("");
            }}
            showToast={showToast}
          />
        )}

        {/* Configurações de WhatsApp e Contato */}
        {activeSection === "contact" && (
          <ContactSection
            contactForm={contactForm}
            setContactForm={setContactForm}
            updateContact={updateContact}
            showToast={showToast}
          />
        )}

        {/* Segurança e Backups */}
        {activeSection === "security" && (
          <SecuritySection
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            changePassword={changePassword}
            exportDataJson={exportDataJson}
            resetToDefaults={resetToDefaults}
            showToast={showToast}
          />
        )}
      </main>

      {/* Modais Globais */}
      <ProjectModal
        isOpen={isAddingProject || isEditingProject}
        isEditing={isEditingProject}
        formData={projectFormData}
        setFormData={setProjectFormData}
        onClose={() => {
          setIsAddingProject(false);
          setIsEditingProject(false);
          setProjectFormData({});
        }}
        onSave={handleSaveProject}
        showToast={showToast}
      />

      <EditionModal
        editingEdition={editingEdition}
        setEditingEdition={setEditingEdition}
        currentProject={currentProject}
        onSave={handleSaveEdition}
        onClose={() => setEditingEdition(null)}
        showToast={showToast}
      />

      <PhotoUploadModal
        photoModal={photoModal}
        onClose={() => setPhotoModal(null)}
        onAddPhotos={handleAddPhotos}
        showToast={showToast}
      />
    </div>
  );
}
