/**
 * Dados de portfólio e clientes — Only in BR
 *
 * Inicialmente com placeholders.
 * Substituir src das imagens e nomes de clientes/parceiros pelos reais.
 */

export type PortfolioItem = {
  id: string;
  alt: string;
  src: string;
  size: "small" | "medium" | "large" | "wide";
};

export type ClientLogo = {
  id: string;
  name: string;
  /** Caminho do logo em public/images/logos/ — ou URL externa */
  src?: string;
};

/** Imagens do portfólio — usar fotos reais de eventos no futuro */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    alt: "Evento de grande porte — palco e estrutura",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    size: "large",
  },
  {
    id: "p2",
    alt: "Público em evento cultural",
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    size: "medium",
  },
  {
    id: "p3",
    alt: "Produção de evento corporativo",
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80",
    size: "small",
  },
  {
    id: "p4",
    alt: "Equipe em evento ao vivo",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    size: "wide",
  },
  {
    id: "p5",
    alt: "Estrutura de som e iluminação",
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
    size: "medium",
  },
  {
    id: "p6",
    alt: "Alimentação servida em evento",
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80",
    size: "small",
  },
];

/** Logos de clientes — substituir pelos reais */
export const clients: ClientLogo[] = [
  { id: "c1", name: "Cliente 01" },
  { id: "c2", name: "Cliente 02" },
  { id: "c3", name: "Cliente 03" },
  { id: "c4", name: "Cliente 04" },
  { id: "c5", name: "Cliente 05" },
];

/** Logos de parceiros — substituir pelos reais */
export const partners: ClientLogo[] = [
  { id: "p1", name: "Parceiro 01" },
  { id: "p2", name: "Parceiro 02" },
  { id: "p3", name: "Parceiro 03" },
  { id: "p4", name: "Parceiro 04" },
];
