# PROJECT.md — Only in BR

> Este arquivo é a documentação principal do projeto para agentes de IA e colaboradores.
> Leia este arquivo **antes** de modificar qualquer componente.
> Atualize este arquivo quando houver mudança estrutural relevante.

---

## 1. Contexto da Marca

**Only in BR** (Razão Social: `ONLYINBR Produções Culturais Ltda` · CNPJ `65.112.374/0001-44` · São Paulo, SP)
É uma empresa especializada em produção completa de eventos — estrutura, documentação com ART, equipe e operação técnica.

A ideia central:
> "A energia que conecta pessoas."

**Valores da marca:**
Conexão · Autoria · Execução · Segurança · Escala · Energia · Experiência · Presença · Cultura · Resultado

**Missão:**
Criar experiências que contagiam — com positividade, autoria, conexão genuína, execução técnica de excelência e cultura brasileira.

---

## 2. Público e Escopo de Atendimento

- Empresas e clientes corporativos (convenções, confraternizações, lançamentos, feiras)
- Paróquias, igrejas e comissões de festas (quermesses, arraiás, festas de padroeiras)
- Órgãos públicos e prefeituras (processos, documentação e alvará para eventos temporários)
- Organizadores e agências de entretenimento

---

## 3. Objetivo do Site

Landing page institucional single-page orientada à conversão e autoridade técnica.

**Objetivo principal:** Apresentar a capacidade executiva da Only in BR e converter visitantes em orçamentos comerciais via WhatsApp.

---

## 4. Identidade Visual

### Paleta
 
| Token | Hex | Uso |
|---|---|---|
| `brand-green` | `#196132` | Cor primária da marca (verde bandeira) |
| `brand-green-dark` | `#0F3D1F` | Rodapé, hovers, estados ativos |
| `brand-yellow` | `#F5BD2C` | Destaque, CTAs, acentos vibrantes |
| `brand-blue` | `#010077` | Acentos complementares |
| `brand-pink` | `#E6BCBD` | Complementar |
| `brand-cream` | `#FAF2BE` | Complementar |

### Tipografia

| Função | Fonte | Status |
|---|---|---|
| Headings & Títulos | Cocogoose Pro | Ativa via `public/fontes/` (`--font-heading`) |
| Body & Textos Longos | Inter | Ativa via `next/font/google` (`--font-body`) |
| Display Artístico | Brasilero 2018 | Ativa via `public/fontes/` (`--font-brasilero`) |

### Tema & Estética

O site adota o **tema Brazilian Liquid Glass**:
- **Background Global:** Degradê imersivo e fluido nas cores do Brasil (Verde Floresta `#072312`, Verde Bandeira `#0d381c`, e Azul Noturno `#020c22`, com iluminação quente em Amarelo Ouro `#f5bd2c`).
- **Liquid Glass Opaco & Premium:** Cartões e seções construídos com efeito vidro líquido estruturado e mais opaco (`liquid-glass-opaque`), com reflexos de luz sutis, bordas translúcidas (`border-white/20`) e sombras profundas.
- **Hero:** Logo oficial completa monumental e inclinada à esquerda com animação de pintura (*paint-in*), e títulos de alto impacto à direita com tipografia luminosa.

---

## 5. Estrutura do Site & Catálogo de Serviços

Seções em ordem:
1. **Header:** Sticky, vidro fosco claro, logo oficial verde, CTA WhatsApp
2. **Hero:** Layout com gradientes das cores do Brasil, badge 3D da logo e copy refinado
3. **Sobre:** Manifesto institucional e valores
4. **Serviços (Catálogo Oficial com 8 Soluções):**
   - **Destaque 01:** Produção de Eventos Corporativos (Convenções, lançamentos, ART, NF)
   - **Destaque 02:** Produção de Festas e Eventos para Igrejas (Quermesses, arraiás, barracas, alvará, som)
   - **Serviço 03:** Produção de Eventos (Produção executiva 360°, curadoria, bilheteria, feiras)
   - **Serviço 04:** Estrutura e Locação de Equipamentos (Palco 360°, box truss Q30/Q15, LED, som, gerador)
   - **Serviço 05:** Documentação e Alvará para Evento Temporário (CREA/SP ART, laudos, Bombeiros, CET, COVISA)
   - **Serviço 06:** Equipe e Alimentação de Staff (Bar, segurança, limpeza, brigada, refeições por turno)
   - **Serviço 07:** Design para Eventos (Identidade visual, peças para redes, ingressos, painel LED)
   - **Serviço 08:** Marketing de Influência (Divulgação pela página @botecagemsp, cobertura, ativação)
5. **Portfólio & Marquee:** Galeria de registros e marquee de marcas atendidas
6. **FAQ:** Perguntas frequentes
7. **Contato:** CTA direto de WhatsApp + formulário com seleção dos 8 serviços
8. **Footer:** Dados fiscais completos (ONLYINBR Produções Culturais Ltda · CNPJ 65.112.374/0001-44)

---

## 6. Arquitetura

```
src/
├── app/
│   ├── apple-icon.png    ← Ícone oficial Apple
│   ├── icon.png          ← Favicon/App icon Next.js
│   ├── layout.tsx        ← Metadata SEO, fontes locais (Cocogoose, Brasilero), LenisProvider
│   ├── page.tsx          ← Orquestra as seções da landing page
│   └── globals.css       ← Design system, tokens de cor, temas Liquid Glass
│
├── components/
│   ├── about/            ← Posicionamento editorial, manifesto e pilares
│   ├── contact/          ← WhatsApp CTA + formulário com seleção dos 8 serviços
│   ├── faq/              ← Accordion shadcn com dúvidas frequentes
│   ├── footer/           ← Dados fiscais completos e links
│   ├── header/           ← Liquid Glass, menu responsivo, logo oficial
│   ├── hero/             ← Background Brasil, badge 3D da logo, títulos luminosos
│   ├── portfolio/        ← Galeria de eventos e marquee
│   ├── services/         ← Grid e seções detalhadas dos 8 serviços
│   ├── shared/
│   │   ├── lenis-provider.tsx    ← Scroll suave
│   │   ├── logo.tsx              ← Componente de Logo oficial com suporte a orientações e cores
│   │   ├── whatsapp-cta.tsx      ← Botão CTA de conversão
│   │   └── section-wrapper.tsx   ← Container com animações de reveal
│   └── ui/                       ← Primitivas shadcn/ui (accordion, sheet, input, textarea)
│
├── data/                 ← Conteúdo estruturado desacoplado
│   ├── company.ts        ← Dados fiscais e institucionais
│   ├── contact.ts        ← Configurações de contato
│   ├── faq.ts            ← Dúvidas e respostas
│   ├── navigation.ts     ← Links de navegação
│   ├── portfolio.ts      ← Cases e marcas
│   ├── services.ts       ← Catálogo com os 8 serviços detalhados
│   └── social.ts         ← Redes sociais
│
├── lib/
│   ├── motion.ts         ← Variantes do Framer Motion
│   ├── utils.ts          ← Função cn() e utilitários
│   └── whatsapp.ts       ← Configuração e gerador de links para WhatsApp
│
└── types/
    └── index.ts          ← Definições de tipagem TypeScript
```

---

## 7. Stack e Bibliotecas

| Biblioteca | Versão | Uso |
|---|---|---|
| Next.js | 15.x | Framework, App Router |
| React | 19.x | UI |
| TypeScript | 5.x | Tipagem estática |
| Tailwind CSS | v4 | Estilização utilitária |
| shadcn/ui | latest | Accordion, Sheet, Input, Textarea |
| Framer Motion | 13.x | Animações de interface e reveal |
| Lenis | 1.x | Scroll suave |
| Lucide React | latest | Biblioteca de ícones |
| TanStack Query | 5.x | Server state management, cache e revalidação de dados remotos |
| Ky | 2.x | Cliente HTTP moderno, resiliente e tipado para chamadas REST |
| Zod | 4.x | Validação e tipagem estrita de schemas de dados de projetos e edições |

---

## 8. Regras de Componentes

1. Cada componente tem uma **responsabilidade clara e única**
2. Componentes complexos têm pasta própria + arquivo `.md` (opcional para documentação local)
3. Conteúdo editável fica em `src/data/`, não inline nos componentes
4. CTAs de WhatsApp usam **sempre** `<WhatsAppCTA>` de `shared/` ou helpers de `src/lib/whatsapp.ts`
5. A configuração do WhatsApp fica **somente** em `src/lib/whatsapp.ts`
6. Cores são usadas via classes utilitárias da paleta (`text-brand-yellow`, `bg-brand-green`), não hex inline
7. `page.tsx` apenas organiza as seções — zero regras de negócio

---

## 9. Regras de Animação

- Framer Motion é a biblioteca padrão para microinterações e transições
- Lenis gerencia o scroll suave global
- Variantes reutilizáveis estão centralizadas em `src/lib/motion.ts`
- **Sempre respeitar `prefers-reduced-motion`**
- Animações têm propósito e harmonia visual com o conceito Brazilian Liquid Glass

---

## 10. Mobile First

- Desenvolver sempre a partir de 375px
- Breakpoints: `sm` (640px) → `md` (768px) → `lg` (1024px) → `xl` (1280px)
- CTAs de WhatsApp e navegação lateral (Sheet mobile) testados e otimizados para toque

---

## 11. Acessibilidade

- Navegação por teclado funcional
- Foco visível (`:focus-visible` em `globals.css`)
- Atributos `alt` em todas as imagens
- `aria-label` em elementos interativos
- Headings semânticos e hierárquicos
- `prefers-reduced-motion` respeitado em animações e marquee

---

## 12. Performance & SEO

- Server Components por padrão, `use client` apenas onde há interatividade
- `next/image` em todas as renderizações de imagens e logos
- Metadata completo configurado em `src/app/layout.tsx` (Open Graph, Twitter Card, Favicons)
- Fontes locais otimizadas via `next/font/local`

---

## 13. Ativos da Marca & Logos

As variações da identidade visual oficial estão organizadas em `public/logos/PNG/`:
- **Orientação:** `horizontal`, `vertical`, `completo`, `icon`
- **Cores:** `green`, `yellow`, `blue`, `light`, `rose`, `dark`
- **Componente:** `<Logo orientation="horizontal" color="yellow" size="md" />` em `src/components/shared/logo.tsx`

---

## 14. Status e Checklist de Tarefas

### Concluído
- [x] Configuração inicial Next.js 15 App Router + Tailwind CSS v4 + TypeScript
- [x] Configuração tipográfica local com **Cocogoose Pro** e **Brasilero 2018** em `public/fontes/`
- [x] Integração da suíte oficial de logos em `public/logos/PNG/` e componente polimórfico `Logo`
- [x] Favicon, Apple Icon e metadata Open Graph configurados em `layout.tsx`
- [x] Implementação do design system **Brazilian Liquid Glass** em `globals.css`
- [x] Catálogo completo com os 8 serviços estruturado em `src/data/services.ts` e renderizado em `src/components/services/`
- [x] Integração de formulário de contato com seleção de serviços e redirecionamento dinâmico para WhatsApp
- [x] Suporte a scroll suave com Lenis e animações Framer Motion

### Próximos Passos (Produção & Lançamento)
- [ ] Substituir imagens placeholder por fotos em alta resolução de eventos reais
- [ ] Atualizar logos de clientes e parceiros em `src/data/portfolio.ts`
- [ ] Ajustar número oficial de atendimento em `src/lib/whatsapp.ts` quando fornecido
- [ ] Configurar domínio de produção oficial no `metadataBase` do `layout.tsx`
- [ ] (Opcional) Conectar endpoint de API / webhook para salvar leads do formulário além do WhatsApp

