import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioService } from "@/lib/services/portfolio-service";
import { type PortfolioProject, type ProjectEdition, type ProjectEditionPhoto } from "@/data/portfolio";

export const PORTFOLIO_QUERY_KEY = ["portfolio-projects"] as const;

/**
 * Hook para buscar todos os projetos do Supabase via TanStack Query e Ky
 */
export function usePortfolioProjects(initialData?: PortfolioProject[]) {
  return useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: () => portfolioService.getProjects(),
    initialData: initialData && initialData.length > 0 ? initialData : undefined,
  });
}

/**
 * Hook de Mutação para salvar ou atualizar um projeto no Supabase
 */
export function useUpsertProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: PortfolioProject) => portfolioService.upsertProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
    },
  });
}

/**
 * Hook de Mutação para excluir um projeto do Supabase
 */
export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => portfolioService.deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
    },
  });
}

/**
 * Hook de Mutação para criar ou atualizar uma edição de projeto
 */
export function useUpsertEditionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      edition,
    }: {
      projectId: string;
      edition: ProjectEdition;
    }) => portfolioService.upsertEdition(projectId, edition),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
    },
  });
}

/**
 * Hook de Mutação para excluir uma edição do Supabase
 */
export function useDeleteEditionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (editionId: string) => portfolioService.deleteEdition(editionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
    },
  });
}

/**
 * Hook de Mutação para adicionar foto em uma edição
 */
export function useAddPhotoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      editionId,
      photo,
    }: {
      editionId: string;
      photo: ProjectEditionPhoto;
    }) => portfolioService.upsertImage(editionId, photo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
    },
  });
}

/**
 * Hook de Mutação para excluir foto de uma edição
 */
export function useDeletePhotoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photoId: string) => portfolioService.deleteImage(photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
    },
  });
}

/**
 * Hook de Mutação para sincronizar todos os projetos em massa com o Supabase
 */
export function useSyncAllProjectsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projects: PortfolioProject[]) => portfolioService.syncAllProjects(projects),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
    },
  });
}
