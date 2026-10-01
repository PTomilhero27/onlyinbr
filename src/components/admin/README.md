# Admin Panel — Only in BR

## Visão geral

Esta tela de administração centraliza a gestão dos dados principais do site: projetos, edições, FAQ, WhatsApp e segurança. A estrutura foi organizada para manter a lógica de negócio separada da apresentação visual.

## Padrão de organização

Os blocos principais são divididos em componentes dedicados dentro de `src/components/admin/`:

- `AdminLogin.tsx` — tela de autenticação do painel
- `AdminHeader.tsx` — navegação superior e controle de seções
- `OverviewSection.tsx` — visão geral em cards do dashboard
- `FaqSection.tsx` — gerenciamento de perguntas frequentes
- `ContactSection.tsx` — configuração do WhatsApp e preview da conversa
- `SecuritySection.tsx` — alteração de senha e exportação de backup

A página principal em `src/app/gestao-onlyinbr-x92k/page.tsx` funciona como orquestradora: mantém o estado global, dispara ações da store e renderiza os blocos de acordo com a seção ativa.

## Fluxo da tela

1. O usuário entra na área restrita com uma senha administrativa.
2. O painel inicia em `hub` e mostra os cards de gestão geral.
3. A navegação permite alternar entre:
   - projetos
   - FAQ
   - WhatsApp
   - segurança
4. Cada operação usa `useSiteStore` para persistir os dados do painel localmente.

## Boas práticas

- cada componente tem responsabilidade única
- lógica de dados fica na store, não dentro do visual
- a tela principal não concentra toda a regra de UI
- a organização facilita manutenção, criação de novos módulos e documentação futura

## Arquivos relacionados

- `src/app/gestao-onlyinbr-x92k/page.tsx` — orquestração geral da tela
- `src/lib/store.tsx` — estado e persistência do painel
- `src/data/portfolio.ts` — dados de projetos e edições
- `src/data/faq.ts` — conteúdo da FAQ
- `src/data/contact.ts` — dados de contato e WhatsApp
