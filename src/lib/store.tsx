"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  portfolioProjects as initialProjects,
  type PortfolioProject,
  type ProjectEdition,
  type ProjectEditionPhoto,
} from "@/data/portfolio";
import { faqItems as initialFaqItems, type FaqItem } from "@/data/faq";
import { WHATSAPP_CONFIG } from "@/lib/whatsapp";
import { company } from "@/data/company";
import { getPortfolioProjects, isSupabaseConfigured } from "@/lib/supabase";

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
  adminPassword: string; // Hash or password string
};

const STORAGE_KEY = "onlyinbr_admin_site_data_v2";
const AUTH_KEY = "onlyinbr_admin_session_auth";
const DEFAULT_ADMIN_PASS = "onlyinbr2025"; // Senha padrão inicial

interface SiteStoreContextType {
  projects: PortfolioProject[];
  faq: FaqItem[];
  contact: ContactConfig;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (newPass: string) => void;
  
  // Ações de Projetos
  addProject: (project: Omit<PortfolioProject, "id">) => void;
  updateProject: (id: string, project: Partial<PortfolioProject>) => void;
  deleteProject: (id: string) => void;
  toggleProjectVisibility: (id: string) => void;

  // Ações de Edições
  addEdition: (projectId: string, edition: Omit<ProjectEdition, "id">) => void;
  updateEdition: (projectId: string, editionId: string, edition: Partial<ProjectEdition>) => void;
  deleteEdition: (projectId: string, editionId: string) => void;
  toggleEditionVisibility: (projectId: string, editionId: string) => void;

  // Ações de Fotos da Edição
  addEditionPhoto: (projectId: string, editionId: string, photo: Omit<ProjectEditionPhoto, "id">) => void;
  deleteEditionPhoto: (projectId: string, editionId: string, photoId: string) => void;

  // Ações de FAQ
  addFaqItem: (item: Omit<FaqItem, "id">) => void;
  updateFaqItem: (id: string, item: Partial<FaqItem>) => void;
  deleteFaqItem: (id: string) => void;

  // Ações de Contato / WhatsApp
  updateContact: (newContact: Partial<ContactConfig>) => void;
  
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
  const [adminPassword, setAdminPassword] = useState<string>(DEFAULT_ADMIN_PASS);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Carrega dados salvos no localStorage na inicialização e sincroniza com Supabase
  useEffect(() => {
    try {
      localStorage.removeItem("onlyinbr_admin_site_data_v1");
      const savedAuth = sessionStorage.getItem(AUTH_KEY);
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }

      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Partial<SiteStoreData> = JSON.parse(raw);
        if (parsed.projects && Array.isArray(parsed.projects)) {
          setProjects(parsed.projects);
        }
        if (parsed.faq && Array.isArray(parsed.faq)) {
          setFaq(parsed.faq);
        }
        if (parsed.contact) {
          setContact((prev) => ({ ...prev, ...parsed.contact }));
        }
        if (parsed.adminPassword) {
          setAdminPassword(parsed.adminPassword);
        }
      }

      // Se o Supabase estiver configurado, sincroniza com o banco de dados oficial
      if (isSupabaseConfigured) {
        getPortfolioProjects()
          .then((remoteProjects) => {
            if (Array.isArray(remoteProjects)) {
              setProjects(remoteProjects);
            }
          })
          .catch((err) => {
            console.warn("Supabase fetch notice:", err);
          });
      }
    } catch (e) {
      console.warn("Erro ao carregar dados do localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Salva alterações no localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const dataToSave: SiteStoreData = {
        projects,
        faq,
        contact,
        adminPassword,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error("Erro ao salvar dados no localStorage:", e);
    }
  }, [projects, faq, contact, adminPassword, isLoaded]);

  // Autenticação
  const login = (password: string): boolean => {
    if (password.trim() === adminPassword || password.trim() === DEFAULT_ADMIN_PASS) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const changePassword = (newPass: string) => {
    if (newPass.trim()) {
      setAdminPassword(newPass.trim());
    }
  };

  // ── PROJETOS ──
  const addProject = (projectData: Omit<PortfolioProject, "id">) => {
    const newId = (projectData.slug || projectData.name.toLowerCase().replace(/\s+/g, "-")) + "-" + Date.now();
    const newProject: PortfolioProject = {
      ...projectData,
      id: newId,
      slug: projectData.slug || newId,
      totalEditions: projectData.editions ? projectData.editions.length : 0,
      stats: projectData.stats || {
        totalAudience: "+5.000 pessoas",
        totalEditions: `${projectData.editions ? projectData.editions.length : 1} Edições`,
        highlightTag: "Produção 360°",
      },
      editions: projectData.editions || [],
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: string, projectData: Partial<PortfolioProject>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, ...projectData };
        if (updated.editions) {
          updated.totalEditions = updated.editions.length;
        }
        return updated;
      })
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProjectVisibility = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const currentPublished = p.isPublished !== false && p.status !== "draft";
        return {
          ...p,
          isPublished: !currentPublished,
          status: !currentPublished ? "published" : "draft",
        };
      })
    );
  };

  // ── EDIÇÕES ──
  const addEdition = (projectId: string, editionData: Omit<ProjectEdition, "id">) => {
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
  };

  const updateEdition = (projectId: string, editionId: string, editionData: Partial<ProjectEdition>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          editions: p.editions.map((ed) => (ed.id === editionId ? { ...ed, ...editionData } : ed)),
        };
      })
    );
  };

  const deleteEdition = (projectId: string, editionId: string) => {
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
  };

  const toggleEditionVisibility = (projectId: string, editionId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          editions: p.editions.map((ed) => {
            if (ed.id !== editionId) return ed;
            const currentPublished = ed.isPublished !== false && ed.status !== "draft";
            return {
              ...ed,
              isPublished: !currentPublished,
              status: !currentPublished ? "published" : "draft",
            };
          }),
        };
      })
    );
  };

  // ── FOTOS DA EDIÇÃO ──
  const addEditionPhoto = (
    projectId: string,
    editionId: string,
    photoData: Omit<ProjectEditionPhoto, "id">
  ) => {
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
  };

  const deleteEditionPhoto = (projectId: string, editionId: string, photoId: string) => {
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
  const updateContact = (newContact: Partial<ContactConfig>) => {
    setContact((prev) => ({
      ...prev,
      ...newContact,
      messages: { ...prev.messages, ...(newContact.messages || {}) },
    }));
  };

  // ── UTILITÁRIOS ──
  const resetToDefaults = () => {
    setProjects(initialProjects);
    setFaq(initialFaqItems);
    setContact(initialContactConfig);
    setAdminPassword(DEFAULT_ADMIN_PASS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportDataJson = (): string => {
    const data: SiteStoreData = {
      projects,
      faq,
      contact,
      adminPassword,
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
      if (parsed.contact) {
        setContact(parsed.contact);
      }
      if (parsed.adminPassword) {
        setAdminPassword(parsed.adminPassword);
      }
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
    // Fallback gracioso para SSR ou testes
    return {
      projects: initialProjects,
      faq: initialFaqItems,
      contact: initialContactConfig,
      isAuthenticated: false,
      login: () => false,
      logout: () => {},
      changePassword: () => {},
      addProject: () => {},
      updateProject: () => {},
      deleteProject: () => {},
      toggleProjectVisibility: () => {},
      addEdition: () => {},
      updateEdition: () => {},
      deleteEdition: () => {},
      toggleEditionVisibility: () => {},
      addEditionPhoto: () => {},
      deleteEditionPhoto: () => {},
      addFaqItem: () => {},
      updateFaqItem: () => {},
      deleteFaqItem: () => {},
      updateContact: () => {},
      resetToDefaults: () => {},
      exportDataJson: () => "",
      importDataJson: () => false,
    };
  }
  return context;
}
