/**
 * Dados dos serviços reestruturados — Only in BR
 * ONLYINBR Produções Culturais Ltda
 * 5 Seções Principais com Copywriting Estratégico e Distribuição Widescreen
 */

export type ServiceSection = {
  id: string;
  number: string;
  badge: string;
  title: string;
  tagline: string;
  headline: string;
  description: string;
  closingTitle?: string;
  closingText?: string;
  closingHighlight?: string;
  highlights: {
    title: string;
    description: string;
    items: string[];
    iconName: string;
  }[];
  audience: string[];
  ctaLabel: string;
  ctaContext: string;
  accentColor: "yellow" | "green" | "blue" | "emerald";
};

export type HomeSolution = {
  title: string;
  description: string;
  href: string;
  iconName: string;
};

export const homeSolutions: HomeSolution[] = [
  {
    title: "Produção de Eventos",
    description: "Planejamento, produção executiva, coordenação e operação completa.",
    href: "#producao-corporativa-staff",
    iconName: "CalendarDays",
  },
  {
    title: "Estrutura e Equipamentos",
    description: "Palcos, tendas, som, iluminação, painéis de LED e energia.",
    href: "#estrutura-locacao",
    iconName: "Layers",
  },
  {
    title: "Staff e Operação",
    description: "Equipes preparadas para recepção, apoio, produção e operação.",
    href: "#producao-corporativa-staff",
    iconName: "Users",
  },
  {
    title: "Alimentação para Eventos",
    description: "Refeições para equipes e marmitas sob demanda, conforme cada projeto.",
    href: "#alimentacao-eventos",
    iconName: "UtensilsCrossed",
  },
  {
    title: "Marketing para Eventos",
    description: "Comunicação e divulgação para aproximar o evento do público.",
    href: "#design-marketing-influencia",
    iconName: "Megaphone",
  },
  {
    title: "Gestão e Operação",
    description: "Fornecedores, cronogramas, logística e execução coordenados.",
    href: "#producao-corporativa-staff",
    iconName: "Workflow",
  },
];

export const serviceSections: ServiceSection[] = [
  // ── SEÇÃO 01: PRODUÇÃO DE EVENTOS E GESTÃO DE STAFF ──
  {
    id: "producao-corporativa-staff",
    number: "01",
    badge: "",
    title: "Produção de Eventos e Gestão de Staff",
    tagline: "Produção completa, coordenação e experiência em cada etapa do evento.",
    headline: "Mais do que disponibilizar mão de obra, assumimos a produção executiva e coordenamos a operação do evento do planejamento à execução, conforme o escopo de cada projeto.",
    description: "Você pensa no evento. A Only in BR organiza fornecedores, estrutura e gestão de equipes para fazer a operação acontecer.",
    closingTitle: "Uma operação. Um responsável. Zero improviso.",
    closingText: "A produção completa conecta cronogramas, fornecedores e gestão de equipes em uma operação coordenada. Sua equipe pode se concentrar nos convidados e na experiência que deseja proporcionar.",
    highlights: [
      {
        title: "Convenções, Feiras & Lançamentos",
        description: "Eventos corporativos que representam a força da sua empresa.",
        items: [
          "Convenções, encontros de liderança e eventos institucionais",
          "Lançamentos de produtos, ativações e experiências de marca",
          "Confraternizações, premiações e eventos de relacionamento",
          "Credenciamento, recepção VIP e gestão da jornada do convidado",
          "Coordenação de fornecedores, cronogramas e operação em campo",
        ],
        iconName: "Briefcase",
      },
      {
        title: "Staff Especializado & Operação de Alta Performance",
        description: "A equipe certa, no lugar certo e no momento certo.",
        items: [
          "Staff treinado e dimensionado de acordo com a operação",
          "Segurança, bombeiros civis, limpeza e apoio operacional",
          "Supervisão contínua antes e durante o evento",
          "Controle de ponto, escalas e gestão de equipes",
          "Alimentação completa por turno: café, almoço, lanche e ceia",
          "Estrutura de apoio para garantir produtividade e bem-estar das equipes",
        ],
        iconName: "Users",
      },
    ],
    audience: ["RH & Diretoria", "Marketing & Trade", "Agências Corporativas", "Empresas em Geral"],
    ctaLabel: "Cotar Produção e Staff",
    ctaContext: "corporativo",
    accentColor: "yellow",
  },

  // ── SEÇÃO 02: FESTAS E EVENTOS PARA IGREJAS & COMUNIDADES ──
  {
    id: "festas-igrejas",
    number: "02",
    badge: "",
    title: "Eventos para Igrejas",
    tagline: "Estrutura completa, segurança e organização para sua comunidade celebrar com tranquilidade.",
    headline: "Quermesses, festas juninas, festas de padroeiro e celebrações comunitárias precisam de organização, estrutura e uma operação preparada.",
    description: "A Only in BR apoia a produção de eventos para igrejas do planejamento à desmontagem. Coordenamos estrutura, alimentação, segurança, equipes e documentação conforme o local e as necessidades de cada comunidade.",
    closingTitle: "Tradição preservada. Operação profissional. Arrecadação organizada.",
    closingText: "Respeitamos a identidade e a tradição de cada comunidade enquanto profissionalizamos aquilo que normalmente gera mais trabalho para os organizadores. Mais estrutura para a festa. Mais tranquilidade para a organização. Mais potencial para arrecadar.",
    highlights: [
      {
        title: "Praça de Alimentação & Estrutura de Barracas",
        description: "Uma estrutura modular, funcional e preparada para a dinâmica de cada festa.",
        items: [
          "Barracas padronizadas para comidas, bebidas, doces e produtos",
          "Tendas, fechamentos e iluminação",
          "Pontos de energia individualizados e dimensionamento elétrico",
          "Geradores e distribuição de energia conforme a necessidade da operação",
          "Estrutura para palco, apresentações, quadrilhas e atrações musicais",
          "Organização do layout e fluxo da área de alimentação",
        ],
        iconName: "Church",
      },
      {
        title: "Segurança, Regularização & Operação",
        description: "A comissão organiza a festa. Nós cuidamos da complexidade operacional.",
        items: [
          "Apoio na documentação e regularização necessária para o evento",
          "Estrutura para vias públicas, pátios, praças ou áreas da paróquia",
          "Equipe de segurança, bombeiros civis e limpeza",
          "Supervisão operacional durante o evento",
          "Cronograma de montagem, operação e desmontagem",
          "Apoio técnico aos organizadores e responsáveis pela festa",
        ],
        iconName: "ShieldCheck",
      },
      {
        title: "Controle de Vendas & Arrecadação",
        description: "Organização também significa saber exatamente como a festa está performando.",
        items: [
          "Sistema de controle de caixas e fichas de venda",
          "Organização dos pontos de venda",
          "Controle e acompanhamento da operação financeira",
          "Fluxo estruturado para barracas e equipes",
          "Apoio na organização dos responsáveis por cada operação",
        ],
        iconName: "Award",
      },
    ],
    audience: ["Paróquias & Igrejas", "Comissões de Festas", "Entidades Beneficentes", "Centros Comunitários"],
    ctaLabel: "Planejar Festa da Igreja",
    ctaContext: "igrejas",
    accentColor: "green",
  },

  // ── SEÇÃO 03: ESTRUTURA E LOCAÇÃO DE EQUIPAMENTOS ──
  {
    id: "estrutura-locacao",
    number: "03",
    badge: "",
    title: "Estrutura e Locação de Equipamentos",
    tagline: "Engenharia, tecnologia e operação técnica para eventos que exigem performance.",
    headline: "A estrutura para eventos precisa acompanhar o formato, o público e a produção de cada projeto.",
    description: "Como parte da produção de eventos, planejamos palco, estruturas, audiovisual, iluminação e energia de acordo com o espaço e a necessidade técnica. A equipe acompanha montagem, testes, operação e desmontagem conforme o escopo contratado.",
    closingTitle: "Estrutura robusta. Tecnologia de alto desempenho. Operação especializada.",
    closingText: "Não entregamos apenas equipamentos. Entregamos uma estrutura pronta para funcionar. Palcos, Box Truss, LED, sonorização, iluminação e energia integrados em uma única operação, com equipe técnica preparada para acompanhar o evento do início ao fim.",
    closingHighlight: "Você pensa no evento. Nós fazemos a estrutura acontecer. Solicite um projeto técnico e orçamento para o seu evento.",
    highlights: [
      {
        title: "Palcos, Torres & Estruturas",
        description: "A base física para eventos de todos os formatos.",
        items: [
          "Palcos modulares profissionais, incluindo configurações 360°",
          "Box Truss Q30 e Q15 para estruturas e suspensões técnicas",
          "Torres de som, iluminação e estruturas auxiliares",
          "Coberturas, tendas piramidais e estruturas tensionadas",
          "Pórticos de entrada e sinalização aérea",
          "Dimensionamento e montagem conforme o projeto do evento",
        ],
        iconName: "Layers",
      },
      {
        title: "Som, Luz & Experiência Visual",
        description: "Tecnologia para transformar presença em experiência.",
        items: [
          "Painéis de LED Indoor e Outdoor de alta definição",
          "Sistemas de sonorização Line Array",
          "Processamento e calibração de áudio conforme o ambiente",
          "Iluminação cênica, moving lights e controle DMX",
          "Telões e soluções audiovisuais para apresentações e shows",
          "Operadores técnicos especializados durante o evento",
        ],
        iconName: "Zap",
      },
      {
        title: "Energia & Continuidade Operacional",
        description: "Porque um evento não pode parar.",
        items: [
          "Geradores silenciados para operação com baixo impacto sonoro",
          "Dimensionamento de carga conforme a necessidade técnica",
          "Distribuição e cabeamento elétrico organizado e seguro",
          "Sistemas de alimentação para estruturas, audiovisual e iluminação",
          "Acompanhamento técnico durante a operação",
        ],
        iconName: "Award",
      },
    ],
    audience: ["Produtores de Eventos", "Empresas", "Órgãos Públicos", "Agências de Live Marketing"],
    ctaLabel: "Solicitar Orçamento de Estrutura",
    ctaContext: "estrutura",
    accentColor: "yellow",
  },

  // ── ALIMENTAÇÃO PARA EVENTOS ──
  {
    id: "alimentacao-eventos",
    number: "04",
    badge: "",
    title: "Alimentação para Eventos sob Demanda",
    tagline: "Refeições planejadas para pessoas, equipes e operações de eventos.",
    headline: "Seu evento também precisa alimentar pessoas, equipes e operações.",
    description: "Oferecemos soluções de alimentação e marmitas sob demanda conforme a quantidade, os turnos e a logística de cada projeto. Consulte disponibilidade e condições para eventos corporativos e outras operações.",
    closingTitle: "Alimentação alinhada à rotina do evento.",
    closingText: "Com data, local, volume estimado e horários, avaliamos a demanda e organizamos o fornecimento de refeições para participantes e equipes.",
    highlights: [
      {
        title: "Marmitas sob demanda",
        description: "Fornecimento consultado conforme a necessidade de cada evento.",
        items: [
          "Marmitas para eventos e refeições em quantidade",
          "Consulta de disponibilidade, volume e logística",
          "Planejamento de entrega de acordo com o local e os horários",
        ],
        iconName: "Users",
      },
      {
        title: "Alimentação para equipes",
        description: "Apoio alimentar pensado junto com a operação e os turnos.",
        items: [
          "Alimentação para equipes de produção e staff",
          "Refeições para eventos corporativos",
          "Alinhamento de quantidades e horários por operação",
        ],
        iconName: "CalendarDays",
      },
    ],
    audience: ["Eventos Corporativos", "Equipes de Produção", "Staff & Operação", "Eventos sob Demanda"],
    ctaLabel: "Consultar Alimentação para Eventos",
    ctaContext: "marmitas",
    accentColor: "green",
  },

  // ── SEÇÃO 04: DOCUMENTAÇÃO E ALVARÁ PARA EVENTOS TEMPORÁRIOS ──
  {
    id: "documentacao-alvara",
    number: "04",
    badge: "",
    title: "Documentação e Alvará para Eventos Temporários",
    tagline: "Conformidade técnica, documentação e gestão de licenças para o seu evento acontecer com segurança e dentro das exigências legais.",
    headline: "A burocracia de um evento pode ser tão complexa quanto a própria operação.",
    description: "A Only in BR centraliza a gestão documental e técnica, coordenando os processos necessários junto aos órgãos competentes e acompanhando cada etapa para reduzir riscos de atrasos, notificações e problemas durante a realização do evento. Do planejamento à vistoria, nossa equipe organiza a documentação, laudos e responsabilidades técnicas necessárias para que sua produção tenha clareza, controle e segurança em cada etapa.",
    closingTitle: "Menos burocracia. Mais controle sobre o seu evento.",
    closingText: "Nossa atuação conecta engenharia, documentação e órgãos públicos em um único fluxo de trabalho. Identificamos as exigências aplicáveis ao projeto, organizamos os documentos e acompanhamos os processos necessários para a regularização do evento.",
    highlights: [
      {
        title: "Alvarás & Licenças",
        description: "Cuidamos dos processos necessários para a realização regular do evento.",
        items: [
          "Requerimentos de alvarás junto à Prefeitura e Subprefeituras",
          "Protocolos e documentação para os órgãos competentes",
          "Apoio envolvendo CET, Polícia Militar, COVISA e demais órgãos",
          "Análise de lotação, acessos e rotas de fuga",
          "Organização da documentação de segurança e operação",
          "Apoio documental para contratação de equipes e seguros",
        ],
        iconName: "FileCheck",
      },
      {
        title: "Laudos Técnicos & Responsabilidade Profissional",
        description: "Engenharia aplicada para garantir que a estrutura esteja tecnicamente respaldada.",
        items: [
          "Emissão de ART por profissional legalmente habilitado",
          "Laudos estruturais e de instalações elétricas",
          "Laudos e documentação relacionados a aterramento e geradores",
          "Documentação técnica para estruturas temporárias",
          "Dimensionamento de equipamentos e instalações",
          "Acompanhamento técnico em vistorias",
        ],
        iconName: "Award",
      },
      {
        title: "Segurança Contra Incêndio",
        description: "Preparação técnica para proteger público, equipe e patrimônio.",
        items: [
          "Planejamento de brigada e equipe de emergência",
          "Extintores, sinalização e equipamentos de segurança",
          "Organização de rotas de fuga e saídas de emergência",
          "Documentação e adequações às exigências do Corpo de Bombeiros",
          "Apoio técnico durante processos de vistoria",
        ],
        iconName: "ShieldCheck",
      },
    ],
    audience: ["Empresas", "Produtores Culturais", "Igrejas & Associações", "Espaços de Eventos"],
    ctaLabel: "Regularizar Meu Evento",
    ctaContext: "documentacao",
    accentColor: "blue",
  },

  // ── SEÇÃO 05: DESIGN PARA EVENTOS & MARKETING DE INFLUÊNCIA ──
  {
    id: "design-marketing-influencia",
    number: "05",
    badge: "",
    title: "Marketing para Eventos",
    tagline: "Produzir o evento é uma parte. Fazer o público chegar até ele também exige comunicação.",
    headline: "A Only in BR ajuda a planejar a divulgação e a comunicação do evento, aproximando a proposta do público que se deseja alcançar.",
    description: "Conteúdo, identidade e ações nas redes sociais são organizados de acordo com o formato e os objetivos de cada produção.",
    closingTitle: "Do planejamento à divulgação.",
    closingText: "A comunicação começa com uma mensagem clara e canais adequados. O escopo pode incluir identidade visual, conteúdo, divulgação e cobertura, sem promessas de público ou vendas garantidas.",
    highlights: [
      {
        title: "Identidade Visual & Experiência de Marca",
        description: "Uma identidade coerente ajuda o público a reconhecer a proposta do evento.",
        items: [
          "Identidade visual e peças para redes sociais",
          "Conteúdo e informações para divulgar o evento",
          "Materiais de comunicação alinhados à experiência",
        ],
        iconName: "Palette",
      },
      {
        title: "Marketing de Influência & Cobertura",
        description: "Ações para comunicar o evento antes, durante e depois da realização.",
        items: [
          "Planejamento de divulgação e conteúdo para redes sociais",
          "Ações de comunicação e atração de público conforme o projeto",
          "Possibilidade de parceria e cobertura com @botecagemsp, sob alinhamento",
        ],
        iconName: "Megaphone",
      },
    ],
    audience: ["Festivais & Feiras", "Marcas & Patrocinadores", "Eventos Gastronômicos", "Casas Noturnas & Bares"],
    ctaLabel: "Criar Projeto Criativo e Mídia",
    ctaContext: "marketing",
    accentColor: "green",
  },
];

// Compatibilidade
export type Service = ServiceSection;
export type ServiceItem = ServiceSection;
export const allServices = serviceSections;
export const services = serviceSections;
export const featuredServices = serviceSections.slice(0, 2);
export const generalServices = serviceSections.slice(2);
