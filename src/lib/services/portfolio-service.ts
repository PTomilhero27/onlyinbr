import { supabaseHttp, isSupabaseConfigured } from "@/lib/api-client";
import {
  portfolioProjectSchema,
  projectEditionSchema,
  projectEditionPhotoSchema,
  type PortfolioProjectInput,
  type ProjectEditionInput,
  type ProjectEditionPhotoInput,
} from "@/lib/validations/portfolio";
import { type PortfolioProject, type ProjectEdition, type ProjectEditionPhoto } from "@/data/portfolio";

/**
 * Converte dados do Supabase (snake_case) para o formato do Frontend (camelCase)
 */
export function normalizeSupabaseProject(item: any): PortfolioProject {
  const editions = (item.editions || []).map((ed: any): ProjectEdition => ({
    id: ed.id,
    editionNumber: ed.edition_number || "1ª Edição",
    year: ed.year || new Date().getFullYear().toString(),
    title: ed.title || "",
    date: ed.date || "",
    location: ed.location || "São Paulo, SP",
    audience: ed.audience || "",
    description: ed.description || "",
    coverImage: ed.cover_image || "",
    highlights: Array.isArray(ed.highlights) ? ed.highlights : [],
    scope: Array.isArray(ed.scope) ? ed.scope : [],
    isPublished: true,
    status: "published",
    gallery: (ed.edition_images || []).map((img: any): ProjectEditionPhoto => ({
      id: img.id,
      url: img.url,
      alt: img.alt || ed.title || "Foto da edição",
      caption: img.caption || "",
    })),
  }));

  const project: PortfolioProject = {
    id: item.id,
    slug: item.slug,
    name: item.name,
    category: item.category,
    categoryLabel: item.category_label || item.category,
    tagline: item.tagline || "",
    description: item.description || "",
    coverImage: item.cover_image || "",
    featuredEdition: item.featured_edition || (editions[0]?.title || ""),
    totalEditions: item.total_editions || editions.length || 1,
    isPublished: true,
    status: "published",
    stats: {
      totalAudience: item.total_audience || "+10.000 pessoas",
      totalEditions: `${item.total_editions || editions.length || 1} Edições`,
      highlightTag: item.highlight_tag || "Produção 360°",
    },
    editions,
  };

  // Validação pelo Zod
  const validated = portfolioProjectSchema.safeParse(project);
  if (!validated.success) {
    console.warn("Aviso de validação Zod no projeto:", validated.error.format());
    return project;
  }
  return validated.data as PortfolioProject;
}

/**
 * Converte dados do Frontend (camelCase) para o schema do Supabase (snake_case)
 */
export function toSupabaseProjectPayload(project: Partial<PortfolioProject>) {
  return {
    id: project.id,
    slug: project.slug || project.id,
    name: project.name,
    category: project.category,
    category_label: project.categoryLabel || "Produção Autoral",
    tagline: project.tagline || "",
    description: project.description || "",
    cover_image: project.coverImage || "",
    featured_edition: project.featuredEdition || "",
    total_editions: project.totalEditions || (project.editions ? project.editions.length : 1),
    total_audience: project.stats?.totalAudience || "+10.000 pessoas",
    highlight_tag: project.stats?.highlightTag || "Produção 360°",
    updated_at: new Date().toISOString(),
  };
}

export function toSupabaseEditionPayload(projectId: string, ed: Partial<ProjectEdition>) {
  return {
    id: ed.id,
    project_id: projectId,
    edition_number: ed.editionNumber || "1ª Edição",
    year: ed.year || new Date().getFullYear().toString(),
    title: ed.title,
    date: ed.date || "",
    location: ed.location || "São Paulo, SP",
    audience: ed.audience || "",
    description: ed.description || "",
    cover_image: ed.coverImage || "",
    highlights: ed.highlights || [],
    scope: ed.scope || [],
    updated_at: new Date().toISOString(),
  };
}

export function toSupabaseImagePayload(editionId: string, img: Partial<ProjectEditionPhoto>) {
  return {
    id: img.id,
    edition_id: editionId,
    url: img.url,
    alt: img.alt || "Foto do evento",
    caption: img.caption || null,
  };
}

/**
 * Serviço de Portfólio com Ky e Zod
 */
export const portfolioService = {
  /**
   * Busca todos os projetos do Supabase com edições e imagens relacionadas
   */
  async getProjects(): Promise<PortfolioProject[]> {
    if (!isSupabaseConfigured) {
      return [];
    }

    try {
      const response = await supabaseHttp.get("projects", {
        searchParams: {
          select: "*,editions(*,edition_images(*))",
          order: "sort_order.asc,created_at.asc",
        },
      });

      const raw = await response.json<any[]>();
      if (!Array.isArray(raw)) return [];

      return raw.map(normalizeSupabaseProject);
    } catch (error) {
      console.error("Falha ao buscar projetos via Ky:", error);
      throw error;
    }
  },

  /**
   * Salva ou atualiza um projeto no Supabase (com upsert)
   */
  async upsertProject(project: PortfolioProject): Promise<PortfolioProject> {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase não está configurado no .env.local.");
    }

    const payload = toSupabaseProjectPayload(project);

    // 1. Salva o projeto
    await supabaseHttp.post("projects", {
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      json: payload,
    });

    // 2. Salva as edições do projeto (se houver)
    if (project.editions && project.editions.length > 0) {
      for (const ed of project.editions) {
        const edPayload = toSupabaseEditionPayload(project.id, ed);
        await supabaseHttp.post("editions", {
          headers: {
            Prefer: "resolution=merge-duplicates,return=representation",
          },
          json: edPayload,
        });

        // 3. Salva a galeria de imagens da edição
        if (ed.gallery && ed.gallery.length > 0) {
          for (const img of ed.gallery) {
            const imgPayload = toSupabaseImagePayload(ed.id, img);
            await supabaseHttp.post("edition_images", {
              headers: {
                Prefer: "resolution=merge-duplicates,return=representation",
              },
              json: imgPayload,
            });
          }
        }
      }
    }

    return project;
  },

  /**
   * Exclui um projeto e todas as suas dependências (cascata no banco)
   */
  async deleteProject(projectId: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;

    await supabaseHttp.delete("projects", {
      searchParams: {
        id: `eq.${projectId}`,
      },
    });

    return true;
  },

  /**
   * Salva ou atualiza uma edição no Supabase
   */
  async upsertEdition(projectId: string, edition: ProjectEdition): Promise<ProjectEdition> {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase não está configurado.");
    }

    const edPayload = toSupabaseEditionPayload(projectId, edition);

    await supabaseHttp.post("editions", {
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      json: edPayload,
    });

    // Atualiza fotos da edição se fornecidas
    if (edition.gallery && edition.gallery.length > 0) {
      for (const img of edition.gallery) {
        const imgPayload = toSupabaseImagePayload(edition.id, img);
        await supabaseHttp.post("edition_images", {
          headers: {
            Prefer: "resolution=merge-duplicates,return=representation",
          },
          json: imgPayload,
        });
      }
    }

    return edition;
  },

  /**
   * Exclui uma edição
   */
  async deleteEdition(editionId: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;

    await supabaseHttp.delete("editions", {
      searchParams: {
        id: `eq.${editionId}`,
      },
    });

    return true;
  },

  /**
   * Adiciona ou atualiza uma foto na galeria da edição
   */
  async upsertImage(editionId: string, image: ProjectEditionPhoto): Promise<ProjectEditionPhoto> {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase não está configurado.");
    }

    const imgPayload = toSupabaseImagePayload(editionId, image);

    await supabaseHttp.post("edition_images", {
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      json: imgPayload,
    });

    return image;
  },

  /**
   * Exclui uma foto da galeria
   */
  async deleteImage(imageId: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;

    await supabaseHttp.delete("edition_images", {
      searchParams: {
        id: `eq.${imageId}`,
      },
    });

    return true;
  },

  /**
   * Sincroniza uma lista inteira de projetos com o Supabase
   */
  async syncAllProjects(projects: PortfolioProject[]): Promise<void> {
    for (const project of projects) {
      await this.upsertProject(project);
    }
  },
};
