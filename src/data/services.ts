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

export const serviceSections: ServiceSection[] = [
  // ── SEÇÃO 01: PRODUÇÃO DE EVENTOS E GESTÃO DE STAFF ──
  {
    id: "producao-corporativa-staff",
    number: "01",
    badge: "",
    title: "Produção de Eventos e Gestão de Staff",
    tagline: "Grandes eventos exigem mais do que fornecedores. Exigem coordenação, experiência e controle em cada detalhe.",
    headline: "Assumimos a operação de ponta a ponta — do planejamento à execução — integrando fornecedores, equipes, logística, alimentação, recepção e infraestrutura para que sua liderança tenha previsibilidade, segurança e tranquilidade durante todo o projeto.",
    description: "Você define o objetivo. Nós transformamos a estratégia em uma operação que acontece.",
    closingTitle: "Uma operação. Um responsável. Zero improviso.",
    closingText: "Centralizamos a gestão para reduzir a complexidade e eliminar pontos de atrito entre equipes e fornecedores. Tudo para que seu time interno possa se concentrar no que realmente importa: o negócio, os convidados e a experiência que sua marca deseja entregar.",
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
    headline: "Quermesses, festas juninas, arraiás, festas de padroeiro e grandes celebrações comunitárias exigem muito mais do que boa vontade.",
    description: "A Only in BR assume a estrutura e a operação para que a paróquia, os voluntários e a comissão organizadora possam concentrar seus esforços no que realmente importa: acolher a comunidade e fazer a celebração acontecer. Do planejamento à desmontagem, cuidamos da infraestrutura, energia, montagem, equipes de apoio, segurança e documentação necessária para uma operação organizada, segura e preparada para receber grandes públicos.",
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
    headline: "Um grande evento começa por uma infraestrutura que não pode falhar.",
    description: "A Only in BR entrega soluções completas de palco, estruturas, audiovisual, iluminação e energia, dimensionadas de acordo com o espaço, público e necessidade técnica de cada projeto. Do primeiro levantamento à operação durante o evento, nossa equipe cuida da montagem, testes, operação e desmontagem para garantir segurança, estabilidade e qualidade em cada detalhe.",
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
    title: "Design para Eventos & Marketing de Influência",
    tagline: "Transformamos eventos em marcas que despertam interesse, geram desejo e atraem público.",
    headline: "Um evento começa muito antes da abertura dos portões. Começa na primeira imagem, no primeiro vídeo, no primeiro convite e na percepção que o público cria sobre aquela experiência.",
    description: "A Only in BR une direção criativa, identidade visual e estratégia de divulgação para construir uma comunicação consistente em todos os pontos de contato — das redes sociais ao palco, do ingresso à experiência presencial.",
    closingTitle: "Do primeiro impacto ao público presente.",
    closingText: "Criamos uma identidade que faz o evento ser reconhecido e uma estratégia de comunicação pensada para atrair atenção, gerar interesse e fortalecer a presença da marca. Uma estratégia bem construída transforma o evento em conteúdo, relacionamento e ativo de marca.",
    highlights: [
      {
        title: "Identidade Visual & Experiência de Marca",
        description: "Seu evento precisa ser reconhecido antes mesmo de começar.",
        items: [
          "Criação de identidade visual e conceito criativo",
          "Direção visual alinhada ao posicionamento do evento",
          "Artes para redes sociais: feed, stories e campanhas",
          "Materiais impressos: cartazes, flyers, ingressos e credenciais",
          "Conteúdos audiovisuais e motion graphics",
          "Conteúdo para telões, painéis de LED e comunicação local",
          "Padronização visual de todos os pontos de contato",
        ],
        iconName: "Palette",
      },
      {
        title: "Marketing de Influência & Cobertura",
        description: "Levamos o evento para além do espaço físico.",
        items: [
          "Divulgação por canais parceiros e influenciadores",
          "Parceria de mídia exclusiva com a página @botecagemsp",
          "Cobertura presencial e conteúdo em tempo real",
          "Conteúdo para gerar expectativa antes do evento",
          "Ações de divulgação para diferentes fases da venda",
          "Ativação de marcas e patrocinadores",
          "Conteúdo pós-evento para ampliar o alcance",
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
