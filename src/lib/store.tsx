"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  portfolioProjects as initialProjects,
  type PortfolioProject,
  type ProjectEdition,
  type ProjectEditionPhoto,
} from "@/data/portfolio";
import { faqItems as initialFaqItems, type FaqItem } from "@/data/faq";
import { WHATSAPP_CONFIG } from "@/lib/whatsapp";
import { company } from "@/data/company";
import { portfolioService } from "@/lib/services/portfolio-service";
import { isSupabaseConfigured } from "@/lib/api-client";

export type ContactConfig = {
  whatsappNumber: string;
  displayPhone: string;
  email: string;
  instagram: string;
  botecagemInstagram: string;
  address: string;
  cnpj: string;
  messages: Record<string, string>;
};

const initialContactConfig: ContactConfig = {
  whatsappNumber: "",
  displayPhone: "",
  email: "contato@onlyinbr.com.br",
  instagram: "",
  botecagemInstagram: "",
  address: "São Paulo, SP e Região Metropolitana",
  cnpj: company.cnpj,
  messages: { ...WHATSAPP_CONFIG.messages },
};

export type SiteStoreData = {
  projects: PortfolioProject[];
  faq: FaqItem[];
  contact: ContactConfig;
};

const STORAGE_KEY = "onlyinbr_admin_site_data_v2";
const AUTH_KEY = "onlyinbr_admin_session_auth";

interface SiteStoreContextType {
  projects: PortfolioProject[];
  faq: FaqItem[];
  contact: ContactConfig;
  isAuthenticated: boolean;
  authenticateAdmin: () => void;
  logout: () => void;

  // Status de Sincronização Supabase
  isSyncing: boolean;
  syncError: string | null;
  syncSuccess: boolean;
  syncToSupabase: () => Promise<boolean>;
  refreshFromSupabase: () => Promise<void>;

  // Ações de Projetos
  addProject: (project: Omit<PortfolioProject, "id">) => Promise<PortfolioProject>;
  updateProject: (id: string, project: Partial<PortfolioProject>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  toggleProjectVisibility: (id: string) => Promise<void>;

  // Ações de Edições
  addEdition: (projectId: string, edition: Omit<ProjectEdition, "id">) => Promise<ProjectEdition>;
  updateEdition: (projectId: string, editionId: string, edition: Partial<ProjectEdition>) => Promise<void>;
  deleteEdition: (projectId: string, editionId: string) => Promise<void>;
  toggleEditionVisibility: (projectId: string, editionId: string) => Promise<void>;

  // Ações de Fotos da Edição
  addEditionPhoto: (projectId: string, editionId: string, photo: Omit<ProjectEditionPhoto, "id">) => Promise<ProjectEditionPhoto>;
  deleteEditionPhoto: (projectId: string, editionId: string, photoId: string) => Promise<void>;

  // Ações de FAQ
  addFaqItem: (item: Omit<FaqItem, "id">) => void;
  updateFaqItem: (id: string, item: Partial<FaqItem>) => void;
  deleteFaqItem: (id: string) => void;

  // Ações de Contato / WhatsApp
  updateContact: (newContact: Partial<ContactConfig>) => Promise<void>;

  // Utilidades
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const SiteStoreContext = createContext<SiteStoreContextType | null>(null);

export function SiteStoreProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);
  const [faq, setFaq] = useState<FaqItem[]>(initialFaqItems);
  const [contact, setContact] = useState<ContactConfig>(initialContactConfig);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Estados de Sincronização Supabase
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncSuccess, setSyncSuccess] = useState<boolean>(false);

  const clearSyncFeedback = useCallback(() => {
    setTimeout(() => {
      setSyncSuccess(false);
      setSyncError(null);
    }, 4000);
  }, []);

  // Carrega dados salvos no localStorage e sincroniza com Supabase
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem(AUTH_KEY);
      if (savedAuth === "true") {
        fetch("/api/admin/session", { cache: "no-store" })
          .then((response) => {
            if (response.ok) {
              setIsAuthenticated(true);
            } else {
              sessionStorage.removeItem(AUTH_KEY);
            }
          })
          .catch(() => sessionStorage.removeItem(AUTH_KEY));
      }

      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Partial<SiteStoreData> = JSON.parse(raw);
        if (parsed.projects && Array.isArray(parsed.projects) && parsed.projects.length > 0) {
          setProjects(parsed.projects);
        }
        if (parsed.faq && Array.isArray(parsed.faq)) {
          setFaq(parsed.faq);
        }
      }

      fetch("/api/contact-settings", { cache: "no-store" })
        .then(async (response) => {
          if (!response.ok) return;
          const result = await response.json();
          if (!result.contact) return;

          setContact((current) => ({
            ...current,
            ...result.contact,
            messages: { ...current.messages, ...(result.contact.messages || {}) },
          }));
        })
        .catch((err) => console.warn("Não foi possível carregar o contato global:", err));

      // Sincroniza com o Supabase oficial
      if (isSupabaseConfigured) {
        setIsSyncing(true);
        portfolioService
          .getProjects()
          .then((remoteProjects) => {
            if (Array.isArray(remoteProjects) && remoteProjects.length > 0) {
              setProjects(remoteProjects);
            }
          })
          .catch((err) => {
            console.warn("Supabase fetch notice:", err);
          })
          .finally(() => {
            setIsSyncing(false);
          });
      }
    } catch (e) {
      console.warn("Erro ao carregar dados locais:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Salva alterações no localStorage para backup offline
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const dataToSave = { projects, faq };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error("Erro ao salvar dados no localStorage:", e);
    }
  }, [projects, faq, isLoaded]);

  // Recarrega dados diretamente do Supabase
  const refreshFromSupabase = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setIsSyncing(true);
    try {
      const remote = await portfolioService.getProjects();
      if (Array.isArray(remote)) {
        setProjects(remote);
        setSyncSuccess(true);
      }
    } catch (err: any) {
      console.error("Erro ao recarregar do Supabase:", err);
      setSyncError("Erro ao buscar dados do Supabase. Verifique se o RLS está liberado.");
    } finally {
      setIsSyncing(false);
      clearSyncFeedback();
    }
  }, [clearSyncFeedback]);

  // Sincroniza todos os projetos atuais com o Supabase
  const syncToSupabase = useCallback(async (): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      setSyncError("Supabase não configurado no .env.local.");
      clearSyncFeedback();
      return false;
    }

    setIsSyncing(true);
    setSyncError(null);
    try {
      await portfolioService.syncAllProjects(projects);
      setSyncSuccess(true);
      clearSyncFeedback();
      return true;
    } catch (err: any) {
      console.error("Erro ao sincronizar com o Supabase:", err);
      const msg = err?.message || "Erro ao salvar no Supabase. Execute o script de RLS no Supabase.";
      setSyncError(msg);
      clearSyncFeedback();
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [projects, clearSyncFeedback]);

  // A API já validou a senha no Supabase antes de criar a sessão HTTP-only.
  const authenticateAdmin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem(AUTH_KEY, "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  // ── PROJETOS ──
  const addProject = async (projectData: Omit<PortfolioProject, "id">): Promise<PortfolioProject> => {
    const rawId = (projectData.slug || projectData.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")) + "-" + Date.now();
    const newProject: PortfolioProject = {
      ...projectData,
      id: rawId,
      slug: projectData.slug || rawId,
      totalEditions: projectData.editions ? projectData.editions.length : 0,
      stats: projectData.stats || {
        totalAudience: "+5.000 pessoas",
        totalEditions: `${projectData.editions ? projectData.editions.length : 1} Edições`,
        highlightTag: "Produção 360°",
      },
      editions: projectData.editions || [],
    };

    setProjects((prev) => [newProject, ...prev]);

    if (isSupabaseConfigured) {
      setIsSyncing(true);
      try {
        await portfolioService.upsertProject(newProject);
        setSyncSuccess(true);
      } catch (err: any) {
        console.error("Erro ao salvar projeto no Supabase:", err);
        setSyncError(err?.message || "Erro ao salvar no Supabase.");
      } finally {
        setIsSyncing(false);
        clearSyncFeedback();
      }
    }

    return newProject;
  };

  const updateProject = async (id: string, projectData: Partial<PortfolioProject>) => {
    let updatedProj: PortfolioProject | null = null;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, ...projectData };
        if (updated.editions) {
          updated.totalEditions = updated.editions.length;
        }
        updatedProj = updated;
        return updated;
      })
    );

    if (isSupabaseConfigured && updatedProj) {
      setIsSyncing(true);
      try {
        await portfolioService.upsertProject(updatedProj);
        setSyncSuccess(true);
      } catch (err: any) {
        console.error("Erro ao atualizar projeto no Supabase:", err);
        setSyncError(err?.message || "Erro ao salvar no Supabase.");
      } finally {
        setIsSyncing(false);
        clearSyncFeedback();
      }
    }
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));

    if (isSupabaseConfigured) {
      setIsSyncing(true);
      try {
        await portfolioService.deleteProject(id);
        setSyncSuccess(true);
      } catch (err: any) {
        console.error("Erro ao deletar projeto do Supabase:", err);
        setSyncError(err?.message || "Erro ao deletar no Supabase.");
      } finally {
        setIsSyncing(false);
        clearSyncFeedback();
      }
    }
  };

  const toggleProjectVisibility = async (id: string) => {
    let targetProject: PortfolioProject | null = null;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const currentPublished = p.isPublished !== false && p.status !== "draft";
        const updated: PortfolioProject = {
          ...p,
          isPublished: !currentPublished,
          status: !currentPublished ? "published" : "draft",
        };
        targetProject = updated;
        return updated;
      })
    );

    if (isSupabaseConfigured && targetProject) {
      try {
        await portfolioService.upsertProject(targetProject);
      } catch (err) {
        console.error("Erro ao alternar visibilidade no Supabase:", err);
      }
    }
  };

  // ── EDIÇÕES ──
  const addEdition = async (projectId: string, editionData: Omit<ProjectEdition, "id">): Promise<ProjectEdition> => {
    const newEditionId = `ed-${Date.now()}`;
    const newEdition: ProjectEdition = {
      ...editionData,
      id: newEditionId,
      isPublished: editionData.isPublished ?? true,
      status: editionData.status ?? "published",
      gallery: editionData.gallery || [],
      highlights: editionData.highlights || [],
      scope: editionData.scope || [],
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const newEditions = [newEdition, ...p.editions];
        return {
          ...p,
          editions: newEditions,
          totalEditions: newEditions.length,
          featuredEdition: newEdition.title,
        };
      })
    );

    if (isSupabaseConfigured) {
      setIsSyncing(true);
      try {
        await portfolioService.upsertEdition(projectId, newEdition);
        setSyncSuccess(true);
      } catch (err: any) {
        console.error("Erro ao adicionar edição no Supabase:", err);
        setSyncError(err?.message || "Erro ao salvar edição no Supabase.");
      } finally {
        setIsSyncing(false);
        clearSyncFeedback();
      }
    }

    return newEdition;
  };

  const updateEdition = async (projectId: string, editionId: string, editionData: Partial<ProjectEdition>) => {
    let updatedEd: ProjectEdition | null = null;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          editions: p.editions.map((ed) => {
            if (ed.id === editionId) {
              const u = { ...ed, ...editionData };
              updatedEd = u;
              return u;
            }
            return ed;
          }),
        };
      })
    );

    if (isSupabaseConfigured && updatedEd) {
      setIsSyncing(true);
      try {
        await portfolioService.upsertEdition(projectId, updatedEd);
        setSyncSuccess(true);
      } catch (err: any) {
        console.error("Erro ao atualizar edição no Supabase:", err);
        setSyncError(err?.message || "Erro ao salvar edição no Supabase.");
      } finally {
        setIsSyncing(false);
        clearSyncFeedback();
      }
    }
  };

  const deleteEdition = async (projectId: string, editionId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const newEditions = p.editions.filter((ed) => ed.id !== editionId);
        return {
          ...p,
          editions: newEditions,
          totalEditions: newEditions.length,
        };
      })
    );

    if (isSupabaseConfigured) {
      setIsSyncing(true);
      try {
        await portfolioService.deleteEdition(editionId);
        setSyncSuccess(true);
      } catch (err: any) {
        console.error("Erro ao excluir edição no Supabase:", err);
        setSyncError(err?.message || "Erro ao excluir edição no Supabase.");
      } finally {
        setIsSyncing(false);
        clearSyncFeedback();
      }
    }
  };

  const toggleEditionVisibility = async (projectId: string, editionId: string) => {
    let targetEd: ProjectEdition | null = null;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          editions: p.editions.map((ed) => {
            if (ed.id !== editionId) return ed;
            const currentPublished = ed.isPublished !== false && ed.status !== "draft";
            const updated = {
              ...ed,
              isPublished: !currentPublished,
              status: !currentPublished ? ("published" as const) : ("draft" as const),
            };
            targetEd = updated;
            return updated;
          }),
        };
      })
    );

    if (isSupabaseConfigured && targetEd) {
      try {
        await portfolioService.upsertEdition(projectId, targetEd);
      } catch (err) {
        console.error("Erro ao alternar visibilidade da edição no Supabase:", err);
      }
    }
  };

  // ── FOTOS DA EDIÇÃO ──
  const addEditionPhoto = async (
    projectId: string,
    editionId: string,
    photoData: Omit<ProjectEditionPhoto, "id">
  ): Promise<ProjectEditionPhoto> => {
    const newPhoto: ProjectEditionPhoto = {
      ...photoData,
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          editions: p.editions.map((ed) => {
            if (ed.id !== editionId) return ed;
            return {
              ...ed,
              gallery: [...ed.gallery, newPhoto],
            };
          }),
        };
      })
    );

    if (isSupabaseConfigured) {
      try {
        await portfolioService.upsertImage(editionId, newPhoto);
      } catch (err) {
        console.error("Erro ao adicionar foto no Supabase:", err);
      }
    }

    return newPhoto;
  };

  const deleteEditionPhoto = async (projectId: string, editionId: string, photoId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          editions: p.editions.map((ed) => {
            if (ed.id !== editionId) return ed;
            return {
              ...ed,
              gallery: ed.gallery.filter((ph) => ph.id !== photoId),
            };
          }),
        };
      })
    );

    if (isSupabaseConfigured) {
      try {
        await portfolioService.deleteImage(photoId);
      } catch (err) {
        console.error("Erro ao deletar foto do Supabase:", err);
      }
    }
  };

  // ── FAQ ──
  const addFaqItem = (itemData: Omit<FaqItem, "id">) => {
    const newId = `faq-${Date.now()}`;
    const newItem: FaqItem = {
      ...itemData,
      id: newId,
    };
    setFaq((prev) => [...prev, newItem]);
  };

  const updateFaqItem = (id: string, itemData: Partial<FaqItem>) => {
    setFaq((prev) => prev.map((item) => (item.id === id ? { ...item, ...itemData } : item)));
  };

  const deleteFaqItem = (id: string) => {
    setFaq((prev) => prev.filter((item) => item.id !== id));
  };

  // ── CONTATO ──
  const updateContact = async (newContact: Partial<ContactConfig>) => {
    const response = await fetch("/api/admin/contact-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Não foi possível salvar o contato global no Supabase.");
    }

    if (result.contact) {
      setContact((current) => ({
        ...current,
        ...result.contact,
        messages: { ...current.messages, ...(result.contact.messages || {}) },
      }));
    }
  };

  // ── UTILITÁRIOS ──
  const resetToDefaults = () => {
    setProjects(initialProjects);
    setFaq(initialFaqItems);
    setContact(initialContactConfig);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportDataJson = (): string => {
    const data: SiteStoreData = {
      projects,
      faq,
      contact,
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed: SiteStoreData = JSON.parse(jsonString);
      if (parsed.projects && Array.isArray(parsed.projects)) {
        setProjects(parsed.projects);
      }
      if (parsed.faq && Array.isArray(parsed.faq)) {
        setFaq(parsed.faq);
      }
      if (parsed.contact) void updateContact(parsed.contact).catch((error) => console.error(error));
      return true;
    } catch (e) {
      console.error("Erro ao importar JSON:", e);
      return false;
    }
  };

  return (
    <SiteStoreContext.Provider
      value={{
        projects,
        faq,
        contact,
        isAuthenticated,
        authenticateAdmin,
        logout,
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
        importDataJson,
      }}
    >
      {children}
    </SiteStoreContext.Provider>
  );
}

export function useSiteStore() {
  const context = useContext(SiteStoreContext);
  if (!context) {
    return {
      projects: initialProjects,
      faq: initialFaqItems,
      contact: initialContactConfig,
      isAuthenticated: false,
      authenticateAdmin: () => {},
      logout: () => {},
      isSyncing: false,
      syncError: null,
      syncSuccess: false,
      syncToSupabase: async () => false,
      refreshFromSupabase: async () => {},
      addProject: async (p: any) => p,
      updateProject: async () => {},
      deleteProject: async () => {},
      toggleProjectVisibility: async () => {},
      addEdition: async (_: any, e: any) => e,
      updateEdition: async () => {},
      deleteEdition: async () => {},
      toggleEditionVisibility: async () => {},
      addEditionPhoto: async (_: any, __: any, ph: any) => ph,
      deleteEditionPhoto: async () => {},
      addFaqItem: () => {},
      updateFaqItem: () => {},
      deleteFaqItem: () => {},
      updateContact: async () => {},
      resetToDefaults: () => {},
      exportDataJson: () => "",
      importDataJson: () => false,
    };
  }
  return context;
}
