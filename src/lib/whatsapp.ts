/**
 * Configuração central do WhatsApp — Only in BR
 * ONLYINBR Produções Culturais Ltda
 */

export const WHATSAPP_CONFIG = {
  /** Número no formato internacional, sem + nem espaços. Inicia vazio. */
  number: "" as string,

  /** Mensagens padrão por contexto de serviço */
  messages: {
    default: "Olá! Gostaria de conversar com a equipe da Only in BR sobre produção de eventos.",
    hero: "Olá! Vim pelo site da Only in BR e gostaria de conhecer mais sobre os serviços de eventos.",
    portfolio: "Olá! Gostaria de conversar sobre os projetos e edições de eventos da Only in BR.",
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

export type WhatsAppUrlOptions = {
  context?: WhatsAppContext;
  customMessage?: string;
  source?: string;
  service?: string;
};

/**
 * Gera a URL do WhatsApp com número e mensagem codificados.
 * Se nenhum número for configurado, retorna '#contato' para levar ao formulário.
 */
export function getWhatsAppUrl(optionsOrContext: WhatsAppContext | WhatsAppUrlOptions = "default"): string {
  if (!WHATSAPP_CONFIG.number || WHATSAPP_CONFIG.number.trim().length === 0) {
    return "#contato";
  }

  let rawMessage: string = WHATSAPP_CONFIG.messages.default;

  if (typeof optionsOrContext === "string") {
    const messages = WHATSAPP_CONFIG.messages as Record<string, string>;
    rawMessage = messages[optionsOrContext] ?? WHATSAPP_CONFIG.messages.default;
  } else if (typeof optionsOrContext === "object" && optionsOrContext !== null) {
    if (optionsOrContext.customMessage) {
      rawMessage = optionsOrContext.customMessage;
    } else if (optionsOrContext.context) {
      const messages = WHATSAPP_CONFIG.messages as Record<string, string>;
      rawMessage = messages[optionsOrContext.context] ?? WHATSAPP_CONFIG.messages.default;
    }
  }

  const message = encodeURIComponent(rawMessage);
  return `https://wa.me/${WHATSAPP_CONFIG.number.replace(/\D/g, "")}?text=${message}`;
}

/** Alias para compatibilidade */
export const getWhatsAppLink = getWhatsAppUrl;
