import { z } from "zod";

/**
 * Schema Zod para Fotos de Edição
 */
export const projectEditionPhotoSchema = z.object({
  id: z.string().min(1, "ID da foto é obrigatório"),
  url: z.string().min(1, "URL da imagem é obrigatória"),
  alt: z.string().default("Foto do evento"),
  caption: z.string().optional().default(""),
  sortOrder: z.number().int().optional().default(0),
  isCover: z.boolean().optional().default(false),
});

export type ProjectEditionPhotoInput = z.infer<typeof projectEditionPhotoSchema>;

/**
 * Schema Zod para Edição de Projeto
 */
export const projectEditionSchema = z.object({
  id: z.string().min(1, "ID da edição é obrigatório"),
  projectId: z.string().optional(),
  editionNumber: z.string().min(1, "Número da edição é obrigatório"),
  year: z.string().min(1, "Ano é obrigatório"),
  title: z.string().min(1, "Título da edição é obrigatório"),
  date: z.string().default(""),
  location: z.string().default("São Paulo, SP"),
  audience: z.string().optional().default(""),
  description: z.string().optional().default(""),
  coverImage: z.string().default(""),
  highlights: z.array(z.string()).default([]),
  scope: z.array(z.string()).default([]),
  gallery: z.array(projectEditionPhotoSchema).default([]),
  sortOrder: z.number().int().optional().default(0),
  isPublished: z.boolean().optional().default(true),
  status: z.enum(["published", "draft"]).optional().default("published"),
});

export type ProjectEditionInput = z.infer<typeof projectEditionSchema>;

/**
 * Schema Zod para Projeto Completo do Portfólio
 */
export const portfolioProjectSchema = z.object({
  id: z.string().min(1, "ID do projeto é obrigatório"),
  slug: z.string().min(1, "Slug do projeto é obrigatório"),
  name: z.string().min(1, "Nome do projeto é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  categoryLabel: z.string().min(1, "Rótulo da categoria é obrigatório"),
  tagline: z.string().optional().default(""),
  description: z.string().optional().default(""),
  coverImage: z.string().default(""),
  featuredEdition: z.string().optional().default(""),
  totalEditions: z.number().int().optional().default(1),
  stats: z.object({
    totalAudience: z.string().default("+5.000 pessoas"),
    totalEditions: z.string().default("1 Edição"),
    highlightTag: z.string().default("Produção 360°"),
  }).default({
    totalAudience: "+5.000 pessoas",
    totalEditions: "1 Edição",
    highlightTag: "Produção 360°",
  }),
  editions: z.array(projectEditionSchema).default([]),
  sortOrder: z.number().int().optional().default(0),
  isPublished: z.boolean().optional().default(true),
  status: z.enum(["published", "draft"]).optional().default("published"),
});

export type PortfolioProjectInput = z.infer<typeof portfolioProjectSchema>;

/**
 * Schema para criação rápida de projeto
 */
export const createProjectPayloadSchema = portfolioProjectSchema.partial().extend({
  name: z.string().min(1, "Nome do projeto é obrigatório"),
});
