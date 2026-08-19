# Only in BR — Site Institucional

Site institucional da **Only in BR** — marca autoral de entretenimento e produção de eventos.

> "A energia que conecta pessoas."

---

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **shadcn/ui** (Accordion, Sheet, Input, Textarea)
- **Framer Motion** (animações)
- **Lenis** (scroll suave)
- **Embla Carousel** (disponível)
- **Lucide React** (ícones)
- **pnpm** (gerenciador de pacotes)

---

## Instalação

```bash
# Clonar o repositório
git clone <repo-url> only-in-br
cd only-in-br

# Instalar dependências
pnpm install
```

---

## Comandos

```bash
# Desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Iniciar servidor de produção
pnpm start

# Lint
pnpm lint
```

O servidor de desenvolvimento inicia em [http://localhost:3000](http://localhost:3000).

---

## Estrutura resumida

```
src/
├── app/             → layout, page, globals.css
├── components/      → seções e componentes
│   ├── shared/      → componentes reutilizáveis
│   ├── header/
│   ├── hero/
│   ├── about/
│   ├── service-*/
│   ├── portfolio/
│   ├── faq/
│   ├── contact/
│   └── footer/
├── data/            → conteúdo editável
├── lib/             → whatsapp, motion, utils
└── types/           → tipagens
```

---

## Como configurar o WhatsApp

Editar **somente** o arquivo:

```
src/lib/whatsapp.ts
```

Substituir o valor de `number` pelo número real (formato internacional, sem `+` ou espaços):

```ts
export const WHATSAPP_CONFIG = {
  number: "5511999999999", // ← substituir aqui
  // ...
};
```

Todos os CTAs do site usam esta configuração automaticamente.

---

## Como substituir o logo

O logo atual é um placeholder tipográfico em:

```
src/components/shared/logo.tsx
```

Quando o SVG real estiver disponível:

1. Salvar em `public/images/logos/logo.svg`
2. Atualizar o componente `Logo` para usar `next/image`

---

## Como substituir imagens

Imagens placeholder usam o Unsplash. Para substituir:

1. Salvar a imagem em `public/images/[seção]/nome-da-imagem.jpg`
2. Atualizar o `src` no componente correspondente
3. Atualizar o texto `alt` para descrever a imagem real

Não é necessário alterar a estrutura dos componentes.

---

## Como alterar dados e textos

Todo conteúdo editável fica em `src/data/`:

| Arquivo | Conteúdo |
|---|---|
| `company.ts` | Nome, tagline, missão, valores |
| `navigation.ts` | Links do menu |
| `services.ts` | Títulos, descrições, benefícios dos serviços |
| `portfolio.ts` | Imagens do portfólio, logos de clientes e parceiros |
| `faq.ts` | Perguntas e respostas |
| `social.ts` | Links das redes sociais |
| `contact.ts` | Opções do formulário de contato |

---

## Como adicionar as fontes proprietárias

As fontes Cocogoose Pro e Brasilero 2018 são proprietárias e não estão incluídas.

Para adicionar quando os arquivos estiverem disponíveis:

1. Colocar os arquivos `.woff2` em `public/fonts/`
2. Descomentar o bloco `localFont` em `src/app/layout.tsx`
3. As variáveis CSS `--font-heading-custom` e `--font-body-custom` já estão preparadas no `globals.css`

---

## Acessibilidade

- Navegação por teclado funcional
- `prefers-reduced-motion` respeitado (Lenis + Framer Motion + marquee)
- Alt text em todas as imagens
- Foco visível configurado

---

## Para mais informações

Ver `PROJECT.md` na raiz — documentação completa para contexto de marca, regras de componentes e guia para agentes de IA.
