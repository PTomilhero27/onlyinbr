/**
 * Dados de portfólio e clientes — Only in BR
 * Fotos curadas em alta definição por categoria de atuação
 */

export type ClientLogo = {
  id: string;
  name: string;
  src?: string;
};

export type PortfolioCategory = "todos" | "corporativo" | "igrejas" | "estrutura" | "engenharia";

export type PortfolioItem = {
  id: string;
  title: string;
  category: "corporativo" | "igrejas" | "estrutura" | "engenharia";
  categoryLabel: string;
  location: string;
  src: string;
  alt: string;
  highlight: string;
  size?: "regular" | "featured";
};

export const portfolioCategories = [
  { id: "todos", label: "Todos os Projetos" },
  { id: "corporativo", label: "Corporativo & Staff" },
  { id: "igrejas", label: "Igrejas & Comunidades" },
  { id: "estrutura", label: "Estrutura & LED" },
  { id: "engenharia", label: "Engenharia & ART" },
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    title: "Convenção Corporativa & Encontro de Líderes",
    category: "corporativo",
    categoryLabel: "Corporativo",
    location: "São Paulo, SP",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=85&auto=format&fit=crop",
    alt: "Convenção corporativa anual com palco e auditório estruturado",
    highlight: "Produção 360°, credenciamento e equipe completa de staff",
    size: "featured",
  },
  {
    id: "p2",
    title: "Palco 360° & Sonorização Line Array",
    category: "estrutura",
    categoryLabel: "Estrutura & Som",
    location: "São Paulo, SP",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&auto=format&fit=crop",
    alt: "Palco profissional com iluminação cênica e sonorização",
    highlight: "Box Truss Q30, moving lights e painéis de LED",
    size: "regular",
  },
  {
    id: "p3",
    title: "Festa Comunitária & Praça de Alimentação",
    category: "igrejas",
    categoryLabel: "Igrejas & Comunidades",
    location: "Região Metropolitana de SP",
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=85&auto=format&fit=crop",
    alt: "Quermesse e festa de padroeiro com barracas gastronômicas iluminadas",
    highlight: "Tendas modulares, pontos elétricos individuais e alvará de rua",
    size: "regular",
  },
  {
    id: "p4",
    title: "Regularização Técnica & Laudos de Engenharia",
    category: "engenharia",
    categoryLabel: "Engenharia & Legal",
    location: "São Paulo, SP",
    src: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&q=85&auto=format&fit=crop",
    alt: "Engenheiro acompanhando vistoria de evento temporário",
    highlight: "ART CREA/SP, laudos elétricos, brigada e aprovação na Prefeitura",
    size: "regular",
  },
  {
    id: "p5",
    title: "Festival Cultural & Transmissão em Telão LED",
    category: "estrutura",
    categoryLabel: "Audiovisual",
    location: "São Paulo, SP",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=85&auto=format&fit=crop",
    alt: "Público vibrando em show com telões de LED de alta definição",
    highlight: "Cobertura de mídia em parceria com @botecagemsp",
    size: "featured",
  },
  {
    id: "p6",
    title: "Lançamento de Produto & Ativação de Marca",
    category: "corporativo",
    categoryLabel: "Corporativo",
    location: "São Paulo, SP",
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=85&auto=format&fit=crop",
    alt: "Experiência de marca corporativa com painel interativo",
    highlight: "Cenografia, recepção VIP e operação de buffet para equipe",
    size: "regular",
  },
];

export const clients = [
  { id: "c1", name: "Empresas & Startups" },
  { id: "c2", name: "Paróquias & Comissões" },
  { id: "c3", name: "Agências de Live Marketing" },
  { id: "c4", name: "Casas Noturnas & Bares" },
  { id: "c5", name: "Produtoras Culturais" },
];

export const partners = [
  { id: "p1", name: "@botecagemsp" },
  { id: "p2", name: "CREA/SP Engenharia" },
  { id: "p3", name: "Equipes de Staff & Brigada" },
  { id: "p4", name: "Locação de Geradores" },
];
