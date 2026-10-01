/**
 * Cliente Supabase e Helpers para o Banco de Imagens do Portfólio — Only in BR
 * Suporta fallback inteligente para dados locais caso as chaves não estejam configuradas no .env.local
 */

import {
  portfolioProjects,
  type PortfolioProject,
  type ProjectEdition,
} from "@/data/portfolio";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes("placeholder")
);

/**
 * Retorna todos os projetos com suas respectivas edições e galerias.
 * Caso o Supabase esteja configurado, pode sincronizar com o banco remoto;
 * caso contrário, utiliza a base curada local de alta performance.
 */
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  if (!isSupabaseConfigured) {
    return portfolioProjects;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*,editions(*,edition_images(*))&order=sort_order.asc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn("Supabase fetch returned error status.", res.status);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Normaliza os dados remotos para o tipo PortfolioProject
    return data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      category: item.category,
      categoryLabel: item.category_label,
      tagline: item.tagline || "",
      description: item.description || "",
      coverImage: item.cover_image,
      featuredEdition: item.featured_edition || "",
      totalEditions: item.total_editions || (item.editions ? item.editions.length : 1),
      stats: {
        totalAudience: item.total_audience || "+10.000 pessoas",
        totalEditions: `${item.total_editions || 1} Edições`,
        highlightTag: item.highlight_tag || "Produção 360°",
      },
      editions: (item.editions || []).map((ed: any) => ({
        id: ed.id,
        editionNumber: ed.edition_number,
        year: ed.year,
        title: ed.title,
        date: ed.date,
        location: ed.location,
        audience: ed.audience || "",
        description: ed.description || "",
        coverImage: ed.cover_image,
        highlights: ed.highlights || [],
        scope: ed.scope || [],
        gallery: (ed.edition_images || []).map((img: any) => ({
          id: img.id,
          url: img.url,
          alt: img.alt || ed.title,
          caption: img.caption,
        })),
      })),
    }));
  } catch (error) {
    console.warn("Erro ao carregar do Supabase, utilizando dados locais curados.", error);
    return portfolioProjects;
  }
}

/**
 * Retorna um projeto específico pelo slug ou ID
 */
export async function getProjectBySlug(slugOrId: string): Promise<PortfolioProject | undefined> {
  const allProjects = await getPortfolioProjects();
  return allProjects.find((p) => p.slug === slugOrId || p.id === slugOrId);
}
