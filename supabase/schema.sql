-- ============================================================
-- ONLY IN BR — Supabase Database & Storage Schema
-- Banco de Imagens e Gerenciamento de Projetos e Edições
-- ============================================================

-- 1. EXTENSÕES
create extension if not exists "uuid-ossp";

-- 2. TABELA DE PROJETOS (Projetos Principais: Feiras Gastronômicas, Sambaravá, Sambê, Madagema Convida)
create table if not exists public.projects (
  id text primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  category_label text not null,
  tagline text,
  description text,
  cover_image text not null,
  featured_edition text,
  total_editions integer default 1,
  total_audience text,
  highlight_tag text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TABELA DE EDIÇÕES (Cada projeto possui 1 ou mais edições)
create table if not exists public.editions (
  id text primary key,
  project_id text references public.projects(id) on delete cascade not null,
  edition_number text not null,
  year text not null,
  title text not null,
  date text not null,
  location text not null,
  audience text,
  description text,
  cover_image text not null,
  highlights text[] default '{}',
  scope text[] default '{}',
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. TABELA DE IMAGENS DAS EDIÇÕES (Galeria de fotos de cada edição)
create table if not exists public.edition_images (
  id text primary key default gen_random_uuid()::text,
  edition_id text references public.editions(id) on delete cascade not null,
  url text not null,
  alt text not null,
  caption text,
  sort_order integer default 0,
  is_cover boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. POLÍTICAS DE SEGURANÇA (Row Level Security - RLS)
alter table public.projects enable row level security;
alter table public.editions enable row level security;
alter table public.edition_images enable row level security;

-- Leitura pública para todos os visitantes do site
create policy "Projetos são visíveis publicamente" on public.projects
  for select using (true);

create policy "Edições são visíveis publicamente" on public.editions
  for select using (true);

create policy "Imagens são visíveis publicamente" on public.edition_images
  for select using (true);

-- Modificações restritas a administradores autenticados
create policy "Admins podem inserir projetos" on public.projects
  for insert with check (auth.role() = 'authenticated');

create policy "Admins podem atualizar projetos" on public.projects
  for update using (auth.role() = 'authenticated');

create policy "Admins podem deletar projetos" on public.projects
  for delete using (auth.role() = 'authenticated');

create policy "Admins podem inserir edições" on public.editions
  for insert with check (auth.role() = 'authenticated');

create policy "Admins podem atualizar edições" on public.editions
  for update using (auth.role() = 'authenticated');

create policy "Admins podem deletar edições" on public.editions
  for delete using (auth.role() = 'authenticated');

create policy "Admins podem inserir imagens" on public.edition_images
  for insert with check (auth.role() = 'authenticated');

create policy "Admins podem atualizar imagens" on public.edition_images
  for update using (auth.role() = 'authenticated');

create policy "Admins podem deletar imagens" on public.edition_images
  for delete using (auth.role() = 'authenticated');

-- ============================================================
-- 6. CONFIGURAÇÃO DO STORAGE BUCKET (Supabase Storage)
-- ============================================================
-- Para criar o bucket no Supabase Studio:
-- 1. Vá em Storage > Create new bucket
-- 2. Nome: "portfolio-images"
-- 3. Marque como "Public bucket"
-- 4. As fotos das edições podem ser salvas organizadas em pastas:
--    ex: feiras-gastronomicas/ed-4/foto-01.jpg
--        sambara/ed-5/palco-360.jpg
--        sambe/ed-3/arena.jpg
--        madagema-convida/ed-3/show.jpg
