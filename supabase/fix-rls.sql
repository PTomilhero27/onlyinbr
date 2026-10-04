-- ============================================================
-- ONLY IN BR — Correção de Políticas RLS do Supabase
-- Execute este script no SQL Editor do seu projeto Supabase:
-- https://supabase.com/dashboard/project/tiwpfudhrsvhvjkorlip/sql
-- ============================================================

-- 1. Garante que as tabelas existam
create extension if not exists "uuid-ossp";

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

-- 2. Habilita RLS
alter table public.projects enable row level security;
alter table public.editions enable row level security;
alter table public.edition_images enable row level security;

-- 3. Remove políticas antigas se existirem
drop policy if exists "Projetos são visíveis publicamente" on public.projects;
drop policy if exists "Admins podem inserir projetos" on public.projects;
drop policy if exists "Admins podem atualizar projetos" on public.projects;
drop policy if exists "Admins podem deletar projetos" on public.projects;
drop policy if exists "Permitir leitura de projetos" on public.projects;
drop policy if exists "Permitir inserção de projetos" on public.projects;
drop policy if exists "Permitir atualização de projetos" on public.projects;
drop policy if exists "Permitir deleção de projetos" on public.projects;
drop policy if exists "Acesso completo aos projetos" on public.projects;

drop policy if exists "Edições são visíveis publicamente" on public.editions;
drop policy if exists "Admins podem inserir edições" on public.editions;
drop policy if exists "Admins podem atualizar edições" on public.editions;
drop policy if exists "Admins podem deletar edições" on public.editions;
drop policy if exists "Permitir leitura de edições" on public.editions;
drop policy if exists "Permitir inserção de edições" on public.editions;
drop policy if exists "Permitir atualização de edições" on public.editions;
drop policy if exists "Permitir deleção de edições" on public.editions;
drop policy if exists "Acesso completo às edições" on public.editions;

drop policy if exists "Imagens são visíveis publicamente" on public.edition_images;
drop policy if exists "Admins podem inserir imagens" on public.edition_images;
drop policy if exists "Admins podem atualizar imagens" on public.edition_images;
drop policy if exists "Admins podem deletar imagens" on public.edition_images;
drop policy if exists "Permitir leitura de imagens" on public.edition_images;
drop policy if exists "Permitir inserção de imagens" on public.edition_images;
drop policy if exists "Permitir atualização de imagens" on public.edition_images;
drop policy if exists "Permitir deleção de imagens" on public.edition_images;
drop policy if exists "Acesso completo às imagens" on public.edition_images;

-- 4. Cria políticas abertas para leitura, inserção, atualização e deleção pelo painel Only in BR
create policy "Acesso completo aos projetos" on public.projects
  for all using (true) with check (true);

create policy "Acesso completo às edições" on public.editions
  for all using (true) with check (true);

create policy "Acesso completo às imagens" on public.edition_images
  for all using (true) with check (true);

-- 5. Bucket de Storage (caso queira fotos no Supabase Storage)
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Imagens do portfólio são públicas" on storage.objects;
create policy "Imagens do portfólio são públicas" on storage.objects
  for select using (bucket_id = 'portfolio-images');

drop policy if exists "Permitir upload no portfolio-images" on storage.objects;
create policy "Permitir upload no portfolio-images" on storage.objects
  for insert with check (bucket_id = 'portfolio-images');

drop policy if exists "Permitir update no portfolio-images" on storage.objects;
create policy "Permitir update no portfolio-images" on storage.objects
  for update using (bucket_id = 'portfolio-images');

drop policy if exists "Permitir delete no portfolio-images" on storage.objects;
create policy "Permitir delete no portfolio-images" on storage.objects
  for delete using (bucket_id = 'portfolio-images');
