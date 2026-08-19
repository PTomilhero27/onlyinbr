/**
 * Dados dos serviços — Only in BR
 * ONLYINBR Produções Culturais Ltda
 * Lista de Serviços: Produção completa de eventos — estrutura, documentação, equipe e operação
 */

export type ServiceItem = {
  id: string;
  number: string;
  category: "destaque" | "geral";
  badge?: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  items: string[];
  audience?: string[];
  ctaLabel: string;
  ctaContext: string;
  iconName?: string;
};

export const featuredServices: ServiceItem[] = [
  {
    id: "corporativo",
    number: "01",
    category: "destaque",
    badge: "Destaque Corporativo",
    slug: "eventos-corporativos",
    title: "Produção de Eventos Corporativos",
    headline: "Soluções corporativas completas com ART, nota fiscal e excelência executiva.",
    description:
      "Do encontro de liderança à convenção anual da sua empresa. Cuidamos de todo o processo com rigor técnico, pontualidade, suporte de engenharia e prestação de contas transparente.",
    items: [
      "Convenção, encontro de equipe e treinamento",
      "Confraternização e festa de fim de ano",
      "Lançamento de produto e ativação de marca",
      "Feira, exposição e premiação",
      "Estrutura, audiovisual, cenografia, credenciamento, equipe e alimentação",
      "Contrato, nota fiscal e responsável técnico com ART",
    ],
    audience: ["RH & Diretoria", "Marketing & Trade", "Agências Corporativas", "Empresas em Geral"],
    ctaLabel: "Cotar Evento Corporativo",
    ctaContext: "corporativo",
    iconName: "Briefcase",
  },
  {
    id: "igrejas",
    number: "02",
    category: "destaque",
    badge: "Destaque Religioso & Social",
    slug: "festas-igrejas",
    title: "Produção de Festas e Eventos para Igrejas",
    headline: "Estrutura completa para quermesses, festas juninas, padroeiras e bazares.",
    description:
      "Festa junina, quermesse, arraiá, festa da padroeira, bazar e evento beneficente de arrecadação. Montagem ágil, segurança, alvará para vias públicas ou pátios e controle financeiro.",
    items: [
      "Montagem completa da festa: barracas, praça de alimentação, palco e área de shows",
      "Tendas, tensionado, fechamento de área, iluminação de ambiente e sonorização",
      "Gerador, distribuição elétrica e pontos de energia por barraca",
      "Documentação e alvará para evento temporário em pátio, quadra, salão ou rua",
      "Equipe de apoio: segurança, limpeza, carregadores, bombeiro civil e recepção",
      "Controle de venda por ficha ou cartão, caixa e prestação de contas",
      "Programação de atrações, quadrilha e cronograma do dia",
      "Comunicação e divulgação da festa nas redes",
    ],
    audience: ["Paróquias & Igrejas", "Comissões de Festa", "Entidades Beneficentes", "Comunidades"],
    ctaLabel: "Planejar Festa da Igreja",
    ctaContext: "igrejas",
    iconName: "Church",
  },
];

export const generalServices: ServiceItem[] = [
  {
    id: "producao-executiva",
    number: "03",
    category: "geral",
    badge: "Gestão 360°",
    slug: "producao-de-eventos",
    title: "Produção de Eventos",
    headline: "Produção executiva completa, do planejamento à desmontagem.",
    description:
      "Coordenação integral de fornecedores, cronogramas operacionais, curadoria de atrações, bilheteria inteligente e layout de expositores.",
    items: [
      "Produção executiva completa, do planejamento à desmontagem",
      "Coordenação de todos os fornecedores e operação no dia",
      "Cronograma de montagem, evento e desmontagem",
      "Contratação de atrações, contratos e grade de horários",
      "Bilheteria: lotes, preços, setorização, venda online e controle de acesso",
      "Feira e expositores: curadoria, taxa de solo, layout, repasse e prestação de contas",
    ],
    ctaLabel: "Falar sobre Produção",
    ctaContext: "producao",
    iconName: "CalendarDays",
  },
  {
    id: "estrutura-locacao",
    number: "04",
    category: "geral",
    badge: "Equipamentos",
    slug: "estrutura-e-locacao",
    title: "Estrutura e Locação de Equipamentos",
    headline: "Palcos, box truss, som, iluminação, painel de LED e geradores.",
    description:
      "Locação de infraestrutura pesada e tecnologia audiovisual de ponta, com operadores técnicos certificados e montagem rigorosa.",
    items: [
      "Palco, inclusive formato 360°, e praticáveis",
      "Box truss Q30 e Q15, torres e coberturas",
      "Tensionado, tendas e fechamento de área",
      "Painel de LED e projeção de alta definição",
      "Som e iluminação, com operadores especializados",
      "Gerador e distribuição elétrica dimensionada",
      "Banheiro químico, mobiliário e climatização",
      "Cenografia, ambientação e sinalização temática",
    ],
    ctaLabel: "Solicitar Orçamento de Estrutura",
    ctaContext: "estrutura",
    iconName: "Layers",
  },
  {
    id: "alvara-documentacao",
    number: "05",
    category: "geral",
    badge: "Engenharia & Legal",
    slug: "documentacao-e-alvara",
    title: "Documentação e Alvará para Evento Temporário",
    headline: "Regularização completa, laudos de engenharia, ART no CREA/SP e bombeiros.",
    description:
      "Evite embargos e multas. Cuidamos de todo o processo burocrático e técnico junto à Prefeitura, Bombeiros, CET, COVISA e Polícia Militar.",
    items: [
      "Requerimento, guia de arrecadação e escala de graduação de risco",
      "Memorial descritivo e cálculo de lotação/escoamento por profissional habilitado",
      "Peças gráficas: implantação, layout, acessos e rotas de fuga",
      "ART no CREA/SP e atestados técnicos de responsabilidade",
      "Laudos: estrutural, elétrico, aterramento, gerador e SPDA",
      "Documentação do local e contrato com empresa de segurança cadastrada",
      "Ofícios e anuências: Polícia Militar, Comurge/GPAE, CET, COVISA e Subprefeitura",
      "Bombeiros: brigada, extintores, sinalização e vistoria",
      "ECAD e seguro de responsabilidade civil",
    ],
    ctaLabel: "Regularizar meu Evento",
    ctaContext: "documentacao",
    iconName: "FileCheck",
  },
  {
    id: "equipe-alimentacao",
    number: "06",
    category: "geral",
    badge: "Operação Humana",
    slug: "equipe-e-alimentacao-staff",
    title: "Equipe e Alimentação de Staff",
    headline: "Staff qualificado de ponta a ponta e alimentação programada por turno.",
    description:
      "Dimensionamento preciso de mão de obra para eventos e logística completa de alimentação de equipe (do lanche matinal à ceia da madrugada).",
    items: [
      "Dimensionamento, contratação e escala completa de equipe",
      "Bar, segurança, limpeza, carregadores, bombeiro civil, recepção e comunicação",
      "Alimentação de staff por turno: lanche manhã, almoço, lanche tarde, janta e ceia",
      "Área de apoio estruturada, refeitório, água e sanitário exclusivo de equipe",
      "Crachá, uniforme, briefing de função e controle de ponto",
    ],
    ctaLabel: "Cotar Staff & Alimentação",
    ctaContext: "equipe",
    iconName: "Users",
  },
  {
    id: "design-eventos",
    number: "07",
    category: "geral",
    badge: "Criatividade & Arte",
    slug: "design-para-eventos",
    title: "Design para Eventos",
    headline: "Identidade visual autoral, peças digitais, ingressos e sinalização física.",
    description:
      "Criação visual marcante e alinhada à proposta do seu evento. Do post no feed ao pórtico de entrada e arte para painéis de LED.",
    items: [
      "Identidade visual completa do evento: logo, paleta de cores e tipografia",
      "Peças digitais para redes sociais: feed, stories e reels animados",
      "Cartaz, flyer, ingresso físico/digital, credencial e camiseta",
      "Sinalização, pórtico de entrada, testeira de palco e arte para painel de LED",
      "Layout de estande e co-assinatura com patrocinadores",
    ],
    ctaLabel: "Criar Identidade Visual",
    ctaContext: "design",
    iconName: "Palette",
  },
  {
    id: "marketing-influencia",
    number: "08",
    category: "geral",
    badge: "Divulgação & Mídia",
    slug: "marketing-de-influencia",
    title: "Marketing de Influência",
    headline: "Divulgação estratégica e cobertura ao vivo com a página @botecagemsp.",
    description:
      "Alcance massivo de público qualificado em São Paulo. Divulgação de vendas de ingressos, ativação de marcas parceiras e cobertura no dia.",
    items: [
      "Divulgação e postagem exclusiva pela página parceira @botecagemsp",
      "Post no feed, stories diários, reels dinâmicos e cobertura presencial no dia",
      "Divulgação de lotes de ingressos e ativação comercial de patrocinadores",
      "Pacotes combinados com a produção e montagem do evento",
    ],
    ctaLabel: "Divulgar com @botecagemsp",
    ctaContext: "marketing",
    iconName: "Megaphone",
  },
];

export const allServices = [...featuredServices, ...generalServices];

// Compatibilidade para tipos legados
export type Service = ServiceItem;
export const services = allServices;
