# Header

## Responsabilidade

Navegação global fixa no topo da página com estética Liquid Glass.

## Objetivo

Permitir navegação entre seções e oferecer CTA de WhatsApp permanentemente acessível.

## O que comunica

Presença da marca + acesso direto ao contato (WhatsApp).

## Estrutura

```
<header> (fixed, z-50)
  └── div (max-w container)
      ├── Logo (link para #hero)
      ├── nav — desktop (hidden md:flex)
      │   └── links para âncoras
      ├── WhatsAppCTA — desktop (hidden md:flex)
      └── Sheet (mobile menu)
          ├── SheetTrigger (botão Menu/X)
          └── SheetContent
              ├── Logo
              ├── nav — links
              └── WhatsAppCTA
```

## Dependências

- `@/components/ui/sheet` — shadcn/ui via @base-ui/react/dialog
- `@/components/shared/logo`
- `@/components/shared/whatsapp-cta`
- `@/data/navigation`

## Animações / Estados

| Estado | Estilo |
|---|---|
| Início (scrollY ≤ 40) | Transparente, sem blur |
| Após scroll (scrollY > 40) | `glass` (backdrop-blur, bg translúcido, borda sutil, sombra) |

Transição: `duration-500 ease-out` via Tailwind.

## Responsividade

- Mobile: Logo + botão Sheet (menu hambúrguer)
- Desktop (`md+`): Logo + nav horizontal + CTA WhatsApp

## Acessibilidade

- `aria-label` no link da Logo
- `aria-label` no botão do menu mobile
- `aria-label` na nav desktop e mobile
- SheetTitle com `sr-only` para leitores de tela

## Liquid Glass

Classe utilitária `glass` definida em `globals.css`:
```css
background: rgba(10, 10, 10, 0.7);
backdrop-filter: blur(16px) saturate(1.4);
border: 1px solid rgba(255, 255, 255, 0.07);
```

## Não fazer

- Não transformar o Header inteiro em glassmorphism exagerado
- Não adicionar animações de entrada no Header (é fixo, sempre visível)
- Não duplicar a lógica de scroll em outros componentes — usar CSS `sticky` quando possível
