/**
 * Cliente e utilitários Supabase — Only in BR
 * Integrado com Ky e Zod para consultas e mutações seguras e tipadas
 */

import { portfolioService } from "@/lib/services/portfolio-service";
import { isSupabaseConfigured } from "@/lib/api-client";
import { type PortfolioProject } from "@/data/portfolio";

export { isSupabaseConfigured };

/**
 * Retorna todos os projetos com suas respectivas edições e galerias do Supabase
 */
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    return await portfolioService.getProjects();
  } catch (error) {
    console.warn("Erro ao buscar projetos do Supabase via portfolioService:", error);
    return [];
  }
}

/**
 * Retorna um projeto específico pelo slug ou ID
 */
export async function getProjectBySlug(slugOrId: string): Promise<PortfolioProject | undefined> {
  const allProjects = await getPortfolioProjects();
  return allProjects.find((p) => p.slug === slugOrId || p.id === slugOrId);
}
