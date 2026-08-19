/**
 * Dados de contato — Only in BR
 * Opções do select de serviço no formulário de contato.
 */

export const serviceOptions = [
  { value: "corporativo", label: "01. Produção de Eventos Corporativos" },
  { value: "igrejas", label: "02. Produção de Festas e Eventos para Igrejas" },
  { value: "producao", label: "03. Produção Executiva de Eventos" },
  { value: "estrutura", label: "04. Estrutura e Locação de Equipamentos" },
  { value: "documentacao", label: "05. Documentação e Alvará para Evento Temporário" },
  { value: "equipe", label: "06. Equipe e Alimentação de Staff" },
  { value: "design", label: "07. Design para Eventos" },
  { value: "marketing", label: "08. Marketing de Influência (@botecagemsp)" },
  { value: "outro", label: "Outra necessidade personalizada" },
] as const;

export type ServiceOption = (typeof serviceOptions)[number]["value"];
