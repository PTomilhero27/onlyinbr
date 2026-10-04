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
    question: "O que a Only in BR oferece para um evento?",
    answer:
      "A Only in BR pode coordenar produção, planejamento, estrutura, equipes, operação, alimentação e comunicação. O escopo é definido conforme o formato, o local e as necessidades de cada projeto.",
  },
  {
    id: "producao-completa",
    question: "Vocês fazem produção completa de eventos?",
    answer:
      "Sim. Podemos integrar produção executiva, cronograma, fornecedores, equipes, estrutura e acompanhamento operacional. Após entender o projeto, definimos com você as etapas e entregas incluídas na proposta.",
  },
  {
    id: "corporativos",
    question: "Vocês trabalham com eventos corporativos?",
    answer:
      "Sim. Atendemos convenções, feiras, lançamentos, confraternizações e eventos institucionais, com soluções dimensionadas para o objetivo e a operação de cada empresa.",
  },
  {
    id: "festas-igrejas",
    question: "Como funciona a produção de eventos para igrejas?",
    answer:
      "Apoiamos quermesses, festas juninas e celebrações de padroeiro com planejamento, estrutura, alimentação, segurança e operação. As necessidades de documentação e equipe são avaliadas conforme o local e o formato da festa.",
  },
  {
    id: "estrutura-eventos",
    question: "Vocês fornecem estrutura para eventos?",
    answer:
      "Podemos planejar e coordenar palcos, tendas, Box Truss, som, iluminação, painéis de LED e energia conforme o projeto técnico e o espaço do evento.",
  },
  {
    id: "staff-alimentacao",
    question: "Vocês fornecem staff e alimentação para eventos?",
    answer:
      "Apoiamos a gestão de equipes e a operação de eventos. Também avaliamos alimentação para equipes e marmitas sob demanda conforme quantidade, turnos, local e disponibilidade para cada projeto.",
  },
  {
    id: "marketing-divulgacao",
    question: "Vocês trabalham com marketing e divulgação de eventos?",
    answer:
      "Sim. O escopo pode incluir identidade visual, conteúdo e divulgação nas redes sociais, além de ações de comunicação e cobertura alinhadas ao evento. Canais, entregas e expectativas são combinados antes da campanha.",
  },
  {
    id: "nota-fiscal-art",
    question: "A Only in BR trabalha com documentação e ART?",
    answer:
      "A empresa apoia a organização da documentação técnica e da responsabilidade técnica aplicável ao evento, incluindo ART no CREA/SP quando prevista no escopo e emitida por profissional legalmente habilitado.",
  },
  {
    id: "regioes-atendidas",
    question: "Em quais regiões a Only in BR atua?",
    answer:
      "Atendemos São Paulo e região. Compartilhe a cidade, o local e a data do evento para avaliarmos a logística e a disponibilidade da equipe.",
  },
  {
    id: "como-contratar",
    question: "Como solicitar um orçamento para produzir meu evento?",
    answer:
      "Fale com a equipe e informe o objetivo, a data, a cidade, o local e o público estimado. Com essas informações, podemos entender as necessidades e orientar os próximos passos da proposta.",
  },
];
