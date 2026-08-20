/**
 * Dados de FAQ atualizados — Only in BR
 * ONLYINBR Produções Culturais Ltda · CNPJ 65.112.374/0001-44
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "o-que-entrega",
    question: "O que a Only in BR entrega para o meu evento?",
    answer:
      "Assumimos a operação completa ou modular: produção executiva 360°, montagem de palcos (inclusive 360°), box truss, som Line Array, painéis de LED, iluminação cênica, geradores silenciados, equipe de staff com logística de alimentação, documentação com alvará e ART no CREA/SP, e divulgação com @botecagemsp.",
  },
  {
    id: "como-contratar",
    question: "Como funciona a contratação e prazos de atendimento?",
    answer:
      "O atendimento é iniciado diretamente pelo WhatsApp. Analisamos o briefing do seu evento, realizamos visita técnica quando necessário e emitimos uma proposta comercial detalhada e transparente. Atendemos eventos planejados e operações emergenciais com agilidade.",
  },
  {
    id: "nota-fiscal-art",
    question: "A Only in BR emite Nota Fiscal e laudos com ART no CREA/SP?",
    answer:
      "Sim. Somos uma empresa formalizada (CNPJ 65.112.374/0001-44). Emitimos contrato formal, Nota Fiscal de serviços e Anotação de Responsabilidade Técnica (ART) no CREA/SP assinada por engenheiros legalmente habilitados para palcos, geradores e instalações elétricas.",
  },
  {
    id: "festas-igrejas",
    question: "Como funciona o atendimento para Igrejas e Quermesses?",
    answer:
      "Estruturamos toda a praça de alimentação com barracas gastronômicas modulares padronizadas, tendas, iluminação, pontos de energia individuais por barraca, geradores, alvará para vias públicas ou pátios, além de equipe de apoio e controle de caixas/fichas.",
  },
  {
    id: "equipe-alimentacao",
    question: "Vocês fornecem equipe (staff) e alimentação de suporte?",
    answer:
      "Sim. Dimensionamos e fornecemos segurança cadastrada, bombeiros civis, limpeza, carregadores e recepcionistas. Cuidamos de toda a logística de alimentação da equipe por turnos (café, almoço, lanche e ceia) com controle rigoroso de ponto e área de apoio.",
  },
  {
    id: "regioes-atendidas",
    question: "Em quais regiões a Only in BR atua?",
    answer:
      "Atendemos com estrutura própria toda a cidade de São Paulo (todas as zonas), Região Metropolitana (ABCD, Osasco, Guarulhos, etc.), Litoral Paulista e cidades do Interior de São Paulo.",
  },
  {
    id: "parceria-botecagem",
    question: "Como funciona a divulgação com a página @botecagemsp?",
    answer:
      "Contamos com parceria exclusiva com a página @botecagemsp para cobertura ao vivo presencial durante o evento, divulgação estratégica de lotes de ingressos e ativação de marcas patrocinadoras para milhares de pessoas em São Paulo.",
  },
];
