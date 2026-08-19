/**
 * Dados de FAQ — Only in BR
 *
 * Perguntas e respostas organizadas por serviço.
 * Editar aqui para atualizar o conteúdo do FAQ sem alterar o componente.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: "geral" | "licitacoes" | "producao" | "marmitas";
};

export const faqItems: FaqItem[] = [
  // Geral
  {
    id: "o-que-e-only-in-br",
    question: "O que é a Only in BR?",
    answer:
      "A Only in BR é uma marca autoral de entretenimento e produção de eventos. Atuamos em diferentes escalas e formatos — do show ao audiovisual, do corporativo ao cultural — com foco em criar experiências que conectam pessoas.",
    category: "geral",
  },
  {
    id: "como-contratar",
    question: "Como posso contratar a Only in BR?",
    answer:
      "O caminho mais rápido é pelo WhatsApp. Nossa equipe está disponível para entender sua demanda, apresentar possibilidades e avançar para uma proposta personalizada.",
    category: "geral",
  },
  {
    id: "quais-regioes",
    question: "Em quais regiões a Only in BR atua?",
    answer:
      "Nosso atendimento e capacidade de atuação variam conforme o projeto. Entre em contato para conversarmos sobre a localização e escala do seu evento.",
    category: "geral",
  },
  // Licitações
  {
    id: "licitacoes-como-funciona",
    question: "Como funciona a participação em licitações?",
    answer:
      "A Only in BR pode participar de processos licitatórios voltados à produção de eventos, estrutura, equipamentos e serviços relacionados. Para saber se seu processo se encaixa, entre em contato para conversarmos sobre os detalhes.",
    category: "licitacoes",
  },
  {
    id: "licitacoes-documentos",
    question: "Como obtenho informações para incluir a Only in BR em uma licitação?",
    answer:
      "Entre em contato pelo WhatsApp ou formulário. Podemos conversar sobre os requisitos do seu processo e verificar como podemos nos enquadrar.",
    category: "licitacoes",
  },
  // Produção
  {
    id: "producao-o-que-inclui",
    question: "O que está incluso na produção de eventos?",
    answer:
      "A Only in BR pode assumir o planejamento, a organização, a estrutura física, equipamentos, logística, coordenação de equipes e a execução completa do evento. Cada proposta é pensada de acordo com a necessidade do cliente.",
    category: "producao",
  },
  {
    id: "producao-tipos-eventos",
    question: "Que tipos de eventos a Only in BR produz?",
    answer:
      "Atuamos em diferentes formatos e escalas: eventos corporativos, culturais, shows, eventos públicos e outros. Entre em contato para conversarmos sobre o seu projeto específico.",
    category: "producao",
  },
  // Marmitas
  {
    id: "marmitas-volume",
    question: "Qual o volume mínimo para contratar marmitas para eventos?",
    answer:
      "Atendemos diferentes volumes conforme a demanda. Entre em contato para que possamos entender o porte do seu evento e apresentar uma proposta adequada.",
    category: "marmitas",
  },
  {
    id: "marmitas-logistica",
    question: "Como funciona a entrega das marmitas?",
    answer:
      "A logística é planejada de acordo com o local, horário e volume do evento. Trabalhamos para garantir que a alimentação chegue no tempo certo e nas condições adequadas.",
    category: "marmitas",
  },
  {
    id: "marmitas-cardapio",
    question: "O cardápio é personalizado?",
    answer:
      "Sim. O planejamento do cardápio é feito em conjunto com o cliente, respeitando o perfil do evento, o público e as necessidades específicas da contratação.",
    category: "marmitas",
  },
];
