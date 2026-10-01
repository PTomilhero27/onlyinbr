# Painel de Gestão Administrativa — Only in BR (`/gestao-onlyinbr-x92k`)

Este documento descreve a arquitetura, estrutura de arquivos, componentes, funções e regras de manutenção do painel administrativo da **Only in BR**.

---

## 1. Visão Geral da Arquitetura

O painel administrativo foi concebido segundo as diretrizes do [`PROJECT.md`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/PROJECT.md):
- **Single Page Application interna**: roda em tela única (`h-screen w-screen overflow-hidden`) com design **Brazilian Liquid Glass**.
- **Responsabilidade única**: a página orquestradora em [`src/app/gestao-onlyinbr-x92k/page.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/app/gestao-onlyinbr-x92k/page.tsx) cuida dos estados e eventos, enquanto cada módulo de visualização e modal fica isolado em seu próprio componente em `src/components/admin/`.
- **Persistência Híbrida Inteligente**: os dados são sincronizados através do [`src/lib/store.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/lib/store.tsx) com o banco de dados oficial do **Supabase** (`projects`, `editions`, `edition_images`), além de cache local via `localStorage`.

---

## 2. Mapa dos Arquivos e Componentes

```
src/
├── app/
│   └── gestao-onlyinbr-x92k/
│       ├── page.tsx               ← Orquestrador principal da rota (estados, autenticação, modais)
│       └── README.md              ← Resumo da rota de gestão
│
└── components/
    └── admin/
        ├── AdminHeader.tsx        ← Barra de navegação superior fixa com abas e logout
        ├── AdminLogin.tsx         ← Tela de login com validação de senha e feedback
        ├── OverviewSection.tsx    ← Hub / Visão Geral com cards rápidos e contadores
        ├── ProjectSection.tsx     ← Gestão de projetos, abas, edições e fotos
        ├── ProjectModal.tsx       ← Modal para cadastrar/editar projeto e foto de capa
        ├── EditionModal.tsx       ← Modal para cadastrar/editar edição de evento
        ├── PhotoUploadModal.tsx   ← Modal para upload múltiplo de fotos com compressão WebP
        ├── FaqSection.tsx         ← Gestão e busca de dúvidas frequentes (FAQ)
        ├── ContactSection.tsx     ← Configuração de WhatsApp, e-mail e simulador
        ├── SecuritySection.tsx    ← Troca de senha administrativa e exportação de backups
        └── utils/
            └── image-compression.tsx ← Utilitários de Canvas WebP e formatação de texto
```

---

## 3. Detalhamento de Cada Componente e Função

### 3.1. Orquestrador Principal — `page.tsx`
- **Arquivo:** [`src/app/gestao-onlyinbr-x92k/page.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/app/gestao-onlyinbr-x92k/page.tsx)
- **O que faz:**
  1. Verifica se o usuário está autenticado (`isAuthenticated`). Se não estiver, exibe `<AdminLogin>`.
  2. Gerencia qual seção está ativa: `"hub"`, `"projects"`, `"faq"`, `"contact"` ou `"security"`.
  3. Controla a abertura e fechamento dos modais (`isAddingProject`, `editingEdition`, `photoModal`).
  4. Dispara as ações do store (`addProject`, `updateProject`, `deleteProject`, `addEdition`, etc.).
  5. Exibe notificações flutuantes (toasts) de sucesso em cada operação.

---

### 3.2. Navegação Superior — `AdminHeader.tsx`
- **Arquivo:** [`src/components/admin/AdminHeader.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/AdminHeader.tsx)
- **Props:**
  - `activeSection`: seção atualmente aberta.
  - `setActiveSection(section)`: função para trocar de seção.
  - `projectsCount`, `faqCount`: contadores exibidos nas abas.
  - `contact`: dados atuais de contato.
  - `setContactForm`: atualizador de formulário.
  - `logout()`: encerra a sessão administrativa.
- **O que faz:** Exibe a marca Only in BR, atalhos para voltar ao site público (`/`), botões com contadores numéricos para cada módulo e botão de saída segura.

---

### 3.3. Autenticação — `AdminLogin.tsx`
- **Arquivo:** [`src/components/admin/AdminLogin.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/AdminLogin.tsx)
- **Props:**
  - `passwordInput`, `setPasswordInput`: controle do campo de senha.
  - `showPassword`, `setShowPassword`: alternar visualização de texto/oculto.
  - `loginError`: booleano indicando erro para disparar animação de tremor/destaque vermelho.
  - `handleLoginSubmit(event)`: submissão do formulário de login.
- **O que faz:** Protege o acesso ao painel. Senha padrão inicial configurada no store (`onlyinbr2025`), alterável na aba de Segurança.

---

### 3.4. Visão Geral (Hub) — `OverviewSection.tsx`
- **Arquivo:** [`src/components/admin/OverviewSection.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/OverviewSection.tsx)
- **Props:**
  - `projects`, `faq`, `contact`: dados gerais para prévia e métricas.
  - `totalEditionsCount`: somatório de edições de todos os projetos.
  - `setActiveSection`: navegação rápida direta a partir dos cards do hub.
- **O que faz:** Dashboard inicial que resume o status do site (quantos projetos ativos, quantas edições, status do WhatsApp) e permite pular diretamente para qualquer tarefa.

---

### 3.5. Gestão de Projetos e Edições — `ProjectSection.tsx`
- **Arquivo:** [`src/components/admin/ProjectSection.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/ProjectSection.tsx)
- **Props e Ações:**
  - `projects`: lista de projetos.
  - `selectedProjectId`: projeto ativo no momento.
  - `setSelectedProjectId(id)`: seleciona o projeto a ser visualizado nas abas.
  - `onOpenNewProject`: abre o modal de criação.
  - `onOpenEditProject(project)`: abre o modal com dados pré-preenchidos.
  - `onDeleteProject(id)`: remove o projeto selecionado.
  - `onToggleProjectVisibility(id)`: alterna entre *Publicado* e *Rascunho*.
  - `onOpenNewEdition(projectId)`: abre o modal de nova edição para este projeto.
  - `onOpenEditEdition(projectId, edition)`: edita a edição selecionada.
  - `onDeleteEdition(projectId, editionId)`: remove a edição.
  - `onToggleEditionVisibility(projectId, editionId)`: alterna visibilidade da edição.
  - `onOpenPhotoModal(projectId, editionId)`: abre o modal de envio de fotos.
  - `onDeletePhoto(projectId, editionId, photoId)`: exclui uma foto específica da galeria.
- **O que faz:** É o coração do gerenciador de conteúdo. Exibe abas horizontais com indicadores visuais de rascunho/publicado, a capa do evento, seus metadados técnicos e o acordeom/lista com todas as edições e suas respectivas fotos em miniatura.

---

### 3.6. Modal de Projeto — `ProjectModal.tsx`
- **Arquivo:** [`src/components/admin/ProjectModal.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/ProjectModal.tsx)
- **Campos configuráveis:**
  - `Nome do projeto`: ex: *Sambê Festival*, *Feiras Gastronômicas*.
  - `Categoria`: rótulo descritivo (ex: *Gastronomia & Cultura*, *Samba & Pagode*).
  - `Tagline`: resumo em uma frase com alto impacto comercial.
  - `Descrição`: texto descritivo longo do projeto.
  - `Público total` e `Destaque Técnico` (ex: *ART CREA/SP*, *Palco 360°*).
  - `Visibilidade`: botão de alternância entre *Publicado* e *Rascunho*.
  - `Capa do Projeto`: upload com compressão automática WebP no navegador via Canvas ou link URL direto, com prévia em tempo real.

---

### 3.7. Modal de Edição — `EditionModal.tsx`
- **Arquivo:** [`src/components/admin/EditionModal.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/EditionModal.tsx)
- **Campos configuráveis:**
  - `Edição`: número/nome da edição (ex: *1ª Edição*, *5ª Edição*).
  - `Ano`: ex: *2024*, *2025*.
  - `Título`: título completo da edição (ex: *Feira Gastronômica — Edição Villa-Lobos*).
  - `Data` e `Local`: detalhes temporais e geográficos do evento.
  - `Público`: número de visitantes ou participantes.
  - `Descrição`: narrativa da produção e infraestrutura montada.
  - `Destaques`: tags técnicas separadas por vírgula.
  - `Capa da Edição`: upload com compressão WebP ou URL.

---

### 3.8. Modal de Fotos — `PhotoUploadModal.tsx`
- **Arquivo:** [`src/components/admin/PhotoUploadModal.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/PhotoUploadModal.tsx)
- **Recursos:**
  - **Drag-and-drop nativo**: arraste múltiplos arquivos de imagem direto do computador.
  - **Compressão WebP automática**: processa as fotos em memória com Canvas antes de salvar, evitando uploads pesados e mantendo carregamento instantâneo.
  - **Grid de prévias**: permite conferir e remover qualquer foto antes de confirmar.
  - **URL direta e Legenda opcional**: suporte a links externos e descrições personalizadas.

---

### 3.9. FAQ — `FaqSection.tsx`
- **Arquivo:** [`src/components/admin/FaqSection.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/FaqSection.tsx)
- **O que faz:**
  - Busca em tempo real de dúvidas cadastradas.
  - Formulário para adicionar nova pergunta/resposta.
  - Edição in-place e exclusão de itens.

---

### 3.10. Contato & WhatsApp — `ContactSection.tsx`
- **Arquivo:** [`src/components/admin/ContactSection.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/ContactSection.tsx)
- **O que faz:**
  - Configura o número internacional do WhatsApp oficial.
  - Configura o telefone visual, e-mail institucional e mensagem de saudação padrão.
  - **Simulador Interativo**: testa a URL gerada e permite disparar o link real para validar o atendimento.

---

### 3.11. Segurança & Backups — `SecuritySection.tsx`
- **Arquivo:** [`src/components/admin/SecuritySection.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/SecuritySection.tsx)
- **O que faz:**
  - Alteração da senha de acesso ao painel com confirmação e validação de tamanho mínimo.
  - **Exportação JSON**: download imediato de arquivo `.json` com o snapshot completo de todos os dados (projetos, edições, fotos, FAQ e contatos).
  - **Reset com segurança**: opção para restaurar os dados originais.

---

### 3.12. Utilitários — `utils/image-compression.tsx`
- **Arquivo:** [`src/components/admin/utils/image-compression.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/utils/image-compression.tsx)
- **Funções:**
  - `compressFileToDataUrl(file, maxDimension, quality)`: redimensiona e comprime qualquer imagem via Canvas HTML5 para `image/webp` (qualidade 0.82, limite 1200px), retornando uma Promise com o Data URL.
  - `renderEditionLabel(editionNumber, className)`: divide expressões como "5ª Edição" para aplicar estilos especiais no número e no símbolo ordinal.

---

## 4. Guia Rápido para Mudanças Futuras

### Adicionar um novo campo ao Projeto:
1. Abra [`src/data/portfolio.ts`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/data/portfolio.ts) e adicione o campo no tipo `PortfolioProject`.
2. Abra [`src/components/admin/ProjectModal.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/ProjectModal.tsx) e adicione o input correspondente no formulário.
3. Se o campo precisar ser persistido no Supabase, adicione a coluna correspondente na tabela `projects` do banco.

### Adicionar uma nova seção no painel:
1. Adicione a chave no tipo `AdminSection` em `page.tsx` e `AdminHeader.tsx`.
2. Adicione o botão de navegação correspondente em [`src/components/admin/AdminHeader.tsx`](file:///c:/Users/ptomi/Desktop/Programacao/only-in-br/src/components/admin/AdminHeader.tsx).
3. Crie o componente `src/components/admin/MinhaNovaSecao.tsx`.
4. Renderize `{activeSection === "minha-secao" && <MinhaNovaSecao />}` em `page.tsx`.
