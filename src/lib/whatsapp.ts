/**
 * Configuração central do WhatsApp — Only in BR
 * ONLYINBR Produções Culturais Ltda
 */

export const WHATSAPP_CONFIG = {
  /** Número no formato internacional, sem + nem espaços */
  number: "5511999999999", // TODO: preencher com o WhatsApp real da Only in BR

  /** Mensagens padrão por contexto de serviço */
  messages: {
    default: "Olá! Gostaria de conversar com a equipe da Only in BR sobre produção de eventos.",
    hero: "Olá! Vim pelo site da Only in BR e gostaria de conhecer mais sobre os serviços de eventos.",
    corporativo:
      "Olá! Gostaria de solicitar um orçamento para Produção de Evento Corporativo com a Only in BR.",
    igrejas:
      "Olá! Gostaria de falar sobre a produção e montagem de Festa/Evento para Igreja com a Only in BR.",
    producao:
      "Olá! Gostaria de conversar sobre Produção Executiva completa para o meu evento com a Only in BR.",
    estrutura:
      "Olá! Gostaria de cotar Estrutura e Locação de Equipamentos (palco, som, luz, LED, gerador) com a Only in BR.",
    documentacao:
      "Olá! Preciso de assessoria em Documentação, Alvará para Evento Temporário e ART com a Only in BR.",
    equipe:
      "Olá! Gostaria de cotar Equipe especializada e Alimentação de Staff para o meu evento com a Only in BR.",
    design:
      "Olá! Gostaria de solicitar serviços de Design e Identidade Visual para o meu evento com a Only in BR.",
    marketing:
      "Olá! Tenho interesse em pacotes de Marketing de Influência e divulgação com a página @botecagemsp.",
    licitacoes:
      "Olá! Gostaria de falar sobre processos e demandas licitatórias com a Only in BR.",
    marmitas:
      "Olá! Gostaria de falar sobre alimentação para eventos com a Only in BR.",
    contact:
      "Olá! Gostaria de entrar em contato com a Only in BR.",
  },
} as const;

export type WhatsAppContext = keyof typeof WHATSAPP_CONFIG.messages | string;

/**
 * Gera a URL do WhatsApp com número e mensagem codificados.
 */
export function getWhatsAppUrl(context: string = "default"): string {
  const messages = WHATSAPP_CONFIG.messages as Record<string, string>;
  const rawMessage = messages[context] ?? messages.default;
  const message = encodeURIComponent(rawMessage);
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${message}`;
}
