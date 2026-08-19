# Hero

## Responsabilidade

Seção de abertura da landing page. Responsável pela primeira impressão da marca.

## Objetivo

Transmitir "A energia que conecta pessoas." e converter o visitante em contato via WhatsApp.

## O que comunica

- Identidade visual da Only in BR
- Headline impactante
- Descrição breve e direta
- CTA principal (WhatsApp) e secundário (scroll para Sobre)

## Estrutura

```
<section>
  ├── Imagem de fundo (Image com animação de zoom + parallax)
  │   └── Gradiente overlay
  └── Conteúdo (motion.div com stagger)
      ├── Label "Only in BR"
      ├── h1 — headline
      ├── p — descrição
      ├── div — CTAs (WhatsApp + Conhecer)
      └── Scroll indicator (ArrowDown animado)
```

## Dependências

- `framer-motion` — animações
- `next/image` — imagem otimizada
- `@/components/shared/whatsapp-cta` — CTA centralizado
- `@/lib/motion` — `heroImageVariants`

## Dados

Conteúdo inline (headline, descrição são estáveis e específicos da seção).
Imagem: `src` via prop/URL externa — Unsplash placeholder.

## Animações

| Elemento | Animação | Detalhes |
|---|---|---|
| Imagem | Zoom out cinematográfico | scale 1.08 → 1, opacity 0.7 → 1, 2.5s |
| Imagem | Parallax no scroll | translateY sutil via `useScroll` + `useTransform` |
| Conteúdo | Stagger de entrada | delay: 0.3s, stagger: 0.18s por filho |
| Label | Fade + slide up | itemVariants |
| h1 | Fade + slide up | itemVariants |
| Descrição | Fade + slide up | itemVariants |
| CTAs | Fade + slide up | itemVariants |
| Scroll indicator | Fade + bounce loop | Separado, delay 1.6s |

## Responsividade

- Mobile: padding ajustado, scroll indicator menor
- Headline: `clamp(3rem, 8vw, 7rem)` — escala fluida
- CTAs: coluna no mobile, linha no `sm+`

## Acessibilidade

- `aria-label` na `<section>`
- `alt` descritivo na imagem
- `aria-label` no link CTA secundário
- Scroll indicator com `aria-hidden="true"`

## Como trocar a imagem

```tsx
// Linha ~78 em hero.tsx
<Image
  src="URL_DA_NOVA_IMAGEM" // ← alterar aqui
  alt="Descrição da nova imagem"
  // resto permanece igual
/>
```

## Como trocar por vídeo

Substituir o bloco `<Image>` por um `<video>` ou componente de vídeo.
A estrutura de overlay e conteúdo não precisa ser alterada.

## Não fazer

- Não adicionar carousel de imagens no Hero (definição do projeto)
- Não criar zoom infinito na imagem
- Não adicionar mais de 2 CTAs
- Não remover o parallax sem substituir por outra solução visual
