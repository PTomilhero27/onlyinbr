/**
 * Dados de portfólio e projetos com múltiplas edições — Only in BR
 * Projetos Autorais e Produções: Feiras Gastronômicas, Sambaravá, Sambê e Madagema Convida
 */

export type ProjectEditionPhoto = {
  id: string;
  url: string;
  alt: string;
  caption?: string;
};

export type ProjectEdition = {
  id: string;
  editionNumber: string;
  year: string;
  title: string;
  date: string;
  location: string;
  audience: string;
  description: string;
  coverImage: string;
  highlights: string[];
  scope: string[];
  gallery: ProjectEditionPhoto[];
  isPublished?: boolean;
  status?: "published" | "draft";
};

export type PortfolioProject = {
  id: string;
  slug: string;
  name: string;
  category: "feiras-gastronomicas" | "sambara" | "sambe" | "madagema-convida" | string;
  categoryLabel: string;
  tagline: string;
  description: string;
  coverImage: string;
  featuredEdition: string;
  totalEditions: number;
  stats: {
    totalAudience: string;
    totalEditions: string;
    highlightTag: string;
  };
  editions: ProjectEdition[];
  isPublished?: boolean;
  status?: "published" | "draft";
};

export type PortfolioCategory =
  | "todos"
  | "feiras-gastronomicas"
  | "sambara"
  | "sambe"
  | "madagema-convida";

export const portfolioCategories = [
  { id: "todos", label: "Todos os Projetos" },
  { id: "feiras-gastronomicas", label: "Feiras Gastronômicas" },
  { id: "sambara", label: "Sambaravá" },
  { id: "sambe", label: "Sambê" },
] as const;

export const portfolioProjects: PortfolioProject[] = [];

/** Exemplos de referência para testes locais (não exibidos em produção) */
export const samplePortfolioProjects: PortfolioProject[] = [
  {
    id: "feiras-gastronomicas",
    slug: "feiras-gastronomicas",
    name: "Feiras Gastronômicas",
    category: "feiras-gastronomicas",
    categoryLabel: "Gastronomia & Cultura",
    tagline: "Grandes praças gastronômicas, tendas temáticas e estrutura completa",
    description:
      "Produção executiva integral de feiras gastronômicas de rua e parques, integrando mais de 40 operações de food trucks, tendas padronizadas, distribuição elétrica trifásica, licenças municipais, bombeiros e som ambiente.",
    coverImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85&auto=format&fit=crop",
    featuredEdition: "4ª Edição — Parque Villa-Lobos",
    totalEditions: 4,
    stats: {
      totalAudience: "+60.000 pessoas",
      totalEditions: "4 Edições",
      highlightTag: "Mega Estrutura & Alvarás",
    },
    editions: [
      {
        id: "fg-ed-4",
        editionNumber: "4ª Edição",
        year: "2024",
        title: "Feira Gastronômica — Edição Sabores do Brasil (Villa-Lobos)",
        date: "Novembro de 2024",
        location: "Parque Villa-Lobos · São Paulo, SP",
        audience: "22.000+ visitantes no fim de semana",
        description:
          "Megaestrutura com 48 operações gastronômicas, palco acústico para apresentações ao vivo, tendas modulares de proteção solar e chuva, infraestrutura elétrica com geradores dedicados e regularização total perante a Prefeitura e Bombeiros.",
        coverImage:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "48 Food Trucks & Estações Gourmet",
          "Alvará de Autorização de Evento Temporário",
          "ART CREA/SP de Instalações e Estruturas",
          "Palco com Sonorização Line Array",
        ],
        scope: [
          "Tendas Modulares Q30",
          "Gerador Silenciado 250kVA",
          "Praça de Alimentação com 800 lugares",
          "Brigada de Incêndio & Limpeza Contínua",
        ],
        gallery: [
          {
            id: "fg4-1",
            url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=85&auto=format&fit=crop",
            alt: "Praça de alimentação movimentada com público e barracas gastronômicas",
            caption: "Área central de convivência e alimentação com mesas cobertas",
          },
          {
            id: "fg4-2",
            url: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1000&q=85&auto=format&fit=crop",
            alt: "Food trucks iluminados e preparados para atendimento rápido",
            caption: "Linha de food trucks com pontos elétricos individuais certificados",
          },
          {
            id: "fg4-3",
            url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1000&q=85&auto=format&fit=crop",
            alt: "Iluminação cênica noturna na praça de eventos gastronômicos",
            caption: "Ambientação noturna com iluminação decorativa e palco ao fundo",
          },
          {
            id: "fg4-4",
            url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=85&auto=format&fit=crop",
            alt: "Pratos artesanais e diversidade gastronômica da feira",
            caption: "Curadoria de pratos típicos e chefs participantes",
          },
        ],
      },
      {
        id: "fg-ed-3",
        editionNumber: "3ª Edição",
        year: "2024",
        title: "Feira Gastronômica — Edição Memorial da América Latina",
        date: "Junho de 2024",
        location: "Memorial da América Latina · São Paulo, SP",
        audience: "18.000+ participantes",
        description:
          "Edição especial latino-americana reunindo gastronomia típica de 8 países, palco temático de atrações culturais e praça coberta de 1.200m².",
        coverImage:
          "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Área Coberta com Tendas Geodésicas",
          "Gestão de Resíduos e Coleta Seletiva",
          "35 Expositores Gastronômicos",
          "Controle de Acesso com Catracas e Staff",
        ],
        scope: [
          "Documentação CET e COVISA",
          "Sonorização Distribuída",
          "Segurança Patrimonial e Brigadistas",
          "Montagem em Tempo Recorde (12h)",
        ],
        gallery: [
          {
            id: "fg3-1",
            url: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1000&q=85&auto=format&fit=crop",
            alt: "Edição Memorial com praça cheia",
            caption: "Fluxo intenso e operação impecável de atendimento",
          },
          {
            id: "fg3-2",
            url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=85&auto=format&fit=crop",
            alt: "Tendas gastronômicas organizadas",
            caption: "Padronização visual das estações de culinária",
          },
          {
            id: "fg3-3",
            url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1000&q=85&auto=format&fit=crop",
            alt: "Atmosfera festiva e familiar",
            caption: "Espaço familiar com conforto térmico e acústico",
          },
        ],
      },
      {
        id: "fg-ed-2",
        editionNumber: "2ª Edição",
        year: "2023",
        title: "Feira Gastronômica — Edição Parque da Água Branca",
        date: "Outubro de 2023",
        location: "Parque da Água Branca · São Paulo, SP",
        audience: "14.000+ participantes",
        description:
          "Integração harmônica com a natureza do parque histórico, com foco em gastronomia sustentável, produtores artesanais e acústica controlada.",
        coverImage:
          "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "30 Expositores Artesanais",
          "Laudos de Ruído e Impacto Ambiental",
          "Alimentação Completa de Staff",
        ],
        scope: ["Box Truss Q15 Decorativo", "Quadro Elétrico Blindado", "Apoio Médico e Ambulância"],
        gallery: [
          {
            id: "fg2-1",
            url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1000&q=85&auto=format&fit=crop",
            alt: "Praça do Parque da Água Branca",
            caption: "Público aproveitando as opções culinárias ao ar livre",
          },
          {
            id: "fg2-2",
            url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=85&auto=format&fit=crop",
            alt: "Produtos artesanais na feira",
            caption: "Estações de bebidas artesanais e gastronomia regional",
          },
        ],
      },
      {
        id: "fg-ed-1",
        editionNumber: "1ª Edição",
        year: "2023",
        title: "Feira Gastronômica — Edição de Lançamento Jardins",
        date: "Abril de 2023",
        location: "Jardins · São Paulo, SP",
        audience: "8.000+ participantes",
        description:
          "Primeira grande edição do formato gastronômico Only in BR, validando o modelo de alta rotatividade, experiência gastronômica e excelência em infraestrutura.",
        coverImage:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Estreia do Formato Gastronômico",
          "20 Operações Selecionadas",
          "Sucesso de Público e Mídia",
        ],
        scope: ["Planejamento 360°", "Sonorização Ambiente", "Staff de Limpeza e Apoio"],
        gallery: [
          {
            id: "fg1-1",
            url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=85&auto=format&fit=crop",
            alt: "Lançamento da feira gastronômica",
            caption: "Registro da 1ª edição com grande receptividade",
          },
        ],
      },
    ],
  },
  {
    id: "sambara",
    slug: "sambara",
    name: "Sambaravá",
    category: "sambara",
    categoryLabel: "Roda de Samba Autoral",
    tagline: "A maior energia de roda de samba 360° com atmosfera contagiante",
    description:
      "O projeto autoral Sambaravá transforma qualquer espaço em uma autêntica celebração do samba de raiz e contemporâneo. Palco central 360°, sonorização imersiva, iluminação cênica de impacto e operação completa de bares.",
    coverImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=85&auto=format&fit=crop",
    featuredEdition: "5ª Edição — Sambaravá Sunset Edition",
    totalEditions: 5,
    stats: {
      totalAudience: "+28.000 pessoas",
      totalEditions: "5 Edições",
      highlightTag: "Palco 360° & Som Imersivo",
    },
    editions: [
      {
        id: "sb-ed-5",
        editionNumber: "5ª Edição",
        year: "2024",
        title: "Sambaravá Sunset Edition — Palco 360°",
        date: "Dezembro de 2024",
        location: "Espaço Arca & Rooftop · São Paulo, SP",
        audience: "6.500+ pessoas (Sold Out)",
        description:
          "Edição comemorativa de fim de ano com palco 360° no centro da pista, 8 horas ininterruptas de samba, iluminação cênica programada em DMX, sistema Line Array de alta fidelidade e bar de altíssima vazão sem filas.",
        coverImage:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Palco 360° Central em Estrutura Q30",
          "Bar de Alta Vazão com 24 Pontos de Chopp",
          "Transmissão Simultânea em Telões LED P3",
          "Cobertura Digital com @botecagemsp",
        ],
        scope: [
          "Montagem de Palco Redondo 360°",
          "Sonorização Line Array 16 Caixas",
          "Moving Heads & Canhões de Luz Cênica",
          "Equipe de 60 Profissionais de Bar e Staff",
        ],
        gallery: [
          {
            id: "sb5-1",
            url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=85&auto=format&fit=crop",
            alt: "Público vibrando no Sambaravá com luzes cênicas e energia alta",
            caption: "Momento ápice do show com a pista lotada e energia contagiante",
          },
          {
            id: "sb5-2",
            url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&q=85&auto=format&fit=crop",
            alt: "Palco 360 graus com músicos e iluminação dramática",
            caption: "Estrutura do palco circular e sonorização de alta definição",
          },
          {
            id: "sb5-3",
            url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=85&auto=format&fit=crop",
            alt: "Telões de LED e iluminação aérea no festival de samba",
            caption: "Visão geral da cenografia e painéis de LED dinâmicos",
          },
        ],
      },
      {
        id: "sb-ed-4",
        editionNumber: "4ª Edição",
        year: "2024",
        title: "Sambaravá — Edição Feijoada & Roda",
        date: "Agosto de 2024",
        location: "Clube Hípico de Santo Amaro · São Paulo, SP",
        audience: "5.200+ pessoas",
        description:
          "Experiência gastronômica aliada ao melhor do samba raiz. Buffet de feijoada completa servido para milhares de pessoas, seguido por 6 horas de apresentações musicais.",
        coverImage:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Buffet de Feijoada para 5.000 Pessoas",
          "Área VIP com Lounges Exclusivos",
          "Alvará Completo de Evento Temporário",
        ],
        scope: ["Mobiliário Rústico & Tendas", "Operação de Cozinha Industrial", "ART CREA/SP"],
        gallery: [
          {
            id: "sb4-1",
            url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&q=85&auto=format&fit=crop",
            alt: "Roda de samba e feijoada",
            caption: "Clima descontraído com feijoada e samba de primeira",
          },
          {
            id: "sb4-2",
            url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=85&auto=format&fit=crop",
            alt: "Músicos no palco",
            caption: "Performance musical ao vivo com qualidade sonora impecável",
          },
        ],
      },
      {
        id: "sb-ed-3",
        editionNumber: "3ª Edição",
        year: "2023",
        title: "Sambaravá — Edição de Primavera",
        date: "Novembro de 2023",
        location: "Vila Madalena · São Paulo, SP",
        audience: "4.800+ pessoas",
        description:
          "Celebração da primavera com decoração temática floral, palco em dois níveis e participação de convidados ilustres do samba paulista.",
        coverImage:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Cenografia com Elementos Naturais",
          "Dois Palcos Simultâneos",
          "Integração com Bares Locais",
        ],
        scope: ["Estrutura Box Truss Q30", "Iluminação LED Cênica", "Brigada de Segurança"],
        gallery: [
          {
            id: "sb3-1",
            url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=85&auto=format&fit=crop",
            alt: "Primavera Sambaravá",
            caption: "Público em celebração na edição de primavera",
          },
        ],
      },
      {
        id: "sb-ed-2",
        editionNumber: "2ª Edição",
        year: "2023",
        title: "Sambaravá — Edição Inverno Quente",
        date: "Julho de 2023",
        location: "Mooca · São Paulo, SP",
        audience: "4.000+ pessoas",
        description:
          "Edição indoor com aquecedores de ambiente, gastronomia de inverno e acústica tratada para máxima fidelidade sonora.",
        coverImage:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=85&auto=format&fit=crop",
        highlights: ["Ambiente Climatizado", "Tratamento Acústico", "Bar de Coquetelaria Autoral"],
        scope: ["Iluminação Quente", "Staff Completo", "Valet e Estacionamento"],
        gallery: [
          {
            id: "sb2-1",
            url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=85&auto=format&fit=crop",
            alt: "Sambaravá na Mooca",
            caption: "Noite memorável com acústica impecável",
          },
        ],
      },
      {
        id: "sb-ed-1",
        editionNumber: "1ª Edição",
        year: "2022",
        title: "Sambaravá — A Origem",
        date: "Dezembro de 2022",
        location: "Pinheiros · São Paulo, SP",
        audience: "2.500+ pessoas",
        description:
          "O nascimento do conceito Sambaravá: reunir os amantes do samba em um ambiente acolhedor, seguro e com produção de altíssimo nível.",
        coverImage:
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&q=85&auto=format&fit=crop",
        highlights: ["Estreia do Conceito", "Ingressos Esgotados em 48h", "Semente da Marca"],
        scope: ["Produção Executiva 360°", "Controle de Portaria", "Bar e Alimentos"],
        gallery: [
          {
            id: "sb1-1",
            url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&q=85&auto=format&fit=crop",
            alt: "Primeira edição Sambaravá",
            caption: "A primeira de muitas edições inesquecíveis",
          },
        ],
      },
    ],
  },
  {
    id: "sambe",
    slug: "sambe",
    name: "Sambê",
    category: "sambe",
    categoryLabel: "Festival & Pagode",
    tagline: "Grandes festivais de pagode com estrutura de arena e vibe inigualável",
    description:
      "Sambê é o festival jovem de pagode e música brasileira da Only in BR. Reúne grandes nomes da música nacional em palcos monumentais, painéis de LED panorâmicos, camarotes exclusivos e infraestrutura de megafestival.",
    coverImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85&auto=format&fit=crop",
    featuredEdition: "3ª Edição — Sambê Festival Arena Open Air",
    totalEditions: 3,
    stats: {
      totalAudience: "+35.000 pessoas",
      totalEditions: "3 Edições",
      highlightTag: "Mega Palco & Painéis LED",
    },
    editions: [
      {
        id: "sambe-ed-3",
        editionNumber: "3ª Edição",
        year: "2024",
        title: "Sambê Festival — Edição Arena Open Air",
        date: "Setembro de 2024",
        location: "Arena Anhembi · São Paulo, SP",
        audience: "15.000+ participantes",
        description:
          "Megaedição de festival com palco monumental de 22 metros de boca de cena, 60m² de painéis de LED de altíssima definição, camarote open bar com vista privilegiada, backstage com lounges climatizados e operação para 15 mil pessoas.",
        coverImage:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Palco Monumental de 22m com Box Truss Q50",
          "60m² de Painéis de LED P3.9 Outdoor",
          "Camarote VIP Open Bar para 2.000 pessoas",
          "Efeitos Especiais de CO2, Chamas e Silver Jets",
        ],
        scope: [
          "Engenharia Completa com ART CREA/SP",
          "PPCI e Vistoria do Corpo de Bombeiros",
          "Sonorização K1/Kara Line Array de Alta Pressão",
          "Equipe de 120 Colaboradores de Staff e Segurança",
        ],
        gallery: [
          {
            id: "smb3-1",
            url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=85&auto=format&fit=crop",
            alt: "Visão geral da Arena Anhembi lotada no festival Sambê",
            caption: "Multidão cantando junto sob os efeitos de luz e telões do palco principal",
          },
          {
            id: "smb3-2",
            url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&q=85&auto=format&fit=crop",
            alt: "Palco com iluminação de festival e artista no centro",
            caption: "Performance no palco principal com som cristalino de alta pressão",
          },
          {
            id: "smb3-3",
            url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=85&auto=format&fit=crop",
            alt: "Camarote e pista com efeitos de iluminação",
            caption: "Vista panorâmica da arena e dos camarotes corporativos",
          },
        ],
      },
      {
        id: "sambe-ed-2",
        editionNumber: "2ª Edição",
        year: "2023",
        title: "Sambê — Edição White & Glow",
        date: "Dezembro de 2023",
        location: "Komplexo Tempo · São Paulo, SP",
        audience: "11.000+ participantes",
        description:
          "Edição temática com vestimenta branca, cenografia luminosa com neon e LED UV, área gastronômica gourmet e ativações com marcas parceiras.",
        coverImage:
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Cenografia Imersiva Neon & Glow",
          "Ativações com Marcas de Bebidas",
          "Camarote com Lounges Exclusivos",
        ],
        scope: ["Painel LED P3.9", "Moving Heads Sharpy", "Sonorização Line Array"],
        gallery: [
          {
            id: "smb2-1",
            url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&q=85&auto=format&fit=crop",
            alt: "Edição temática Sambê",
            caption: "Cenografia iluminada e público vestido a caráter",
          },
          {
            id: "smb2-2",
            url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=85&auto=format&fit=crop",
            alt: "Show eletrizante no Sambê",
            caption: "Grande coral de vozes entoando os sucessos do pagode",
          },
        ],
      },
      {
        id: "sambe-ed-1",
        editionNumber: "1ª Edição",
        year: "2023",
        title: "Sambê — Edição Sunset de Lançamento",
        date: "Maio de 2023",
        location: "Clube Esperança · São Paulo, SP",
        audience: "9.000+ participantes",
        description:
          "O lançamento arrebatador do festival Sambê, consolidando a marca como referência em festas de grande público e alto padrão de produção.",
        coverImage:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Estreia do Festival Sambê",
          "3 Grandes Grupos Nacionais",
          "Operação Impecável de Estacionamento e Bares",
        ],
        scope: ["Palco Box Truss Q30", "Sistema Line Array", "Segurança Integrada"],
        gallery: [
          {
            id: "smb1-1",
            url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&q=85&auto=format&fit=crop",
            alt: "Primeiro Sambê Sunset",
            caption: "Fim de tarde inesquecível com palco sob a luz do pôr do sol",
          },
        ],
      },
    ],
  },
  {
    id: "madagema-convida",
    slug: "madagema-convida",
    name: "Madagema Convida",
    category: "madagema-convida",
    categoryLabel: "Encontros & Shows Exclusivos",
    tagline: "Gravações audiovisuais, encontros de grandes nomes e acústica impecável",
    description:
      "Madagema Convida é o projeto que une grandes nomes da música brasileira em encontros intimistas e shows exclusivos com gravação audiovisual multicanal, cenografia refinada e excelência técnica em engenharia de áudio.",
    coverImage:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=85&auto=format&fit=crop",
    featuredEdition: "3ª Edição — Madagema Convida Mestres da MPB",
    totalEditions: 3,
    stats: {
      totalAudience: "+12.000 pessoas",
      totalEditions: "3 Edições",
      highlightTag: "Gravação Audiovisual & Acústica",
    },
    editions: [
      {
        id: "mg-ed-3",
        editionNumber: "3ª Edição",
        year: "2024",
        title: "Madagema Convida — Edição Grandes Mestres",
        date: "Outubro de 2024",
        location: "Teatro Bradesco & Espaço Rooftop · São Paulo, SP",
        audience: "4.500+ convidados e público",
        description:
          "Encontro histórico com gravação ao vivo de projeto audiovisual em 4K multicanal (32 canais de áudio digital), iluminação cênica quente em tons âmbar e palco com cenografia em madeira e tecidos nobres.",
        coverImage:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Gravação Audiovisual Multicâmeras 4K",
          "Engenharia de Som de Precisão (Midas HD96)",
          "Iluminação Cênica em Tons Quentes e Âmbar",
          "Recepção VIP com Coquetelaria Exclusiva",
        ],
        scope: [
          "Cenografia em Madeira e Painéis Acústicos",
          "Isolamento e Tratamento Acústico de Palco",
          "Staff Executivo e Coordenação de Camarins",
          "ART CREA/SP de Instalações Elétricas e Sonorização",
        ],
        gallery: [
          {
            id: "mg3-1",
            url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1000&q=85&auto=format&fit=crop",
            alt: "Palco intimista do Madagema Convida com iluminação quente",
            caption: "Atmosfera intimista e gravação ao vivo com fidelidade acústica",
          },
          {
            id: "mg3-2",
            url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=85&auto=format&fit=crop",
            alt: "Plateia atenta e ambiente sofisticado",
            caption: "Público em acomodação premium desfrutando do espetáculo",
          },
          {
            id: "mg3-3",
            url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=85&auto=format&fit=crop",
            alt: "Detalhes de luz e instrumentos acústicos",
            caption: "Harmonia perfeita entre design de luz e performance musical",
          },
        ],
      },
      {
        id: "mg-ed-2",
        editionNumber: "2ª Edição",
        year: "2024",
        title: "Madagema Convida — Roda dos Amigos",
        date: "Maio de 2024",
        location: "Casa Natura Musical · São Paulo, SP",
        audience: "4.000+ participantes",
        description:
          "Uma noite de celebração entre artistas convidados e músicos da nova geração da música brasileira, com transmissão ao vivo e cenografia imersiva.",
        coverImage:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Transmissão Ao Vivo em Alta Definição",
          "Cenografia Imersiva",
          "Área VIP com Open Food Premium",
        ],
        scope: ["Gravação de Áudio 24 pistas", "Microfonação Especializada", "Staff de Hospitalidade"],
        gallery: [
          {
            id: "mg2-1",
            url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=85&auto=format&fit=crop",
            alt: "Madagema Convida 2ª edição",
            caption: "Encontro musical de gerações no palco",
          },
          {
            id: "mg2-2",
            url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1000&q=85&auto=format&fit=crop",
            alt: "Artistas em harmonia musical",
            caption: "Momentos espontâneos capturados durante a apresentação",
          },
        ],
      },
      {
        id: "mg-ed-1",
        editionNumber: "1ª Edição",
        year: "2023",
        title: "Madagema Convida — A Estreia",
        date: "Novembro de 2023",
        location: "Vila Mariana · São Paulo, SP",
        audience: "3.500+ participantes",
        description:
          "A primeira edição do projeto Madagema Convida, marcando o início da série de encontros culturais com foco em excelência artística e produção impecável.",
        coverImage:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=85&auto=format&fit=crop",
        highlights: [
          "Estreia do Formato 'Convida'",
          "Ambiente Acolhedor e Exclusivo",
          "Acústica Perfeita",
        ],
        scope: ["Palco e Estrutura Q30", "Sistema de Áudio Digital", "Bar Premium"],
        gallery: [
          {
            id: "mg1-1",
            url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=85&auto=format&fit=crop",
            alt: "Estreia Madagema Convida",
            caption: "A energia vibrante do primeiro Madagema Convida",
          },
        ],
      },
    ],
  },
];

/* Compatibilidade retroativa para tipos simples de galeria */
export type PortfolioItem = {
  id: string;
  title: string;
  category: "feiras-gastronomicas" | "sambara" | "sambe" | "madagema-convida";
  categoryLabel: string;
  location: string;
  src: string;
  alt: string;
  highlight: string;
  size?: "regular" | "featured";
  projectId: string;
};

export const portfolioItems: PortfolioItem[] = portfolioProjects.map((p) => ({
  id: p.id,
  title: p.name,
  category: p.category as PortfolioItem["category"],
  categoryLabel: p.categoryLabel,
  location: p.editions[0]?.location || "São Paulo, SP",
  src: p.coverImage,
  alt: `${p.name} - Only in BR`,
  highlight: `${p.stats.totalEditions} · ${p.stats.totalAudience} · ${p.stats.highlightTag}`,
  size: (p.category === "feiras-gastronomicas" || p.category === "sambara" ? "featured" : "regular") as "regular" | "featured",
  projectId: p.id,
}));

export type ClientLogo = {
  id: string;
  name: string;
  src?: string;
};

export const clients = [
  { id: "c1", name: "Feiras Gastronômicas SP" },
  { id: "c2", name: "Sambaravá Produções" },
  { id: "c3", name: "Sambê Festival" },
  { id: "c4", name: "Madagema Convida" },
  { id: "c5", name: "Paróquias & Comissões de SP" },
  { id: "c6", name: "Empresas & Startups" },
];

export const partners = [
  { id: "p1", name: "@botecagemsp" },
  { id: "p2", name: "CREA/SP Engenharia" },
  { id: "p3", name: "Equipes de Staff & Bar" },
  { id: "p4", name: "Locação de Geradores & LED" },
];
