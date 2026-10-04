-- Execute no SQL Editor do Supabase antes de ativar o formulário.
-- O navegador não recebe acesso de leitura ou escrita a estas tabelas.

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text not null,
  service text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.app_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.contact_leads enable row level security;
alter table public.app_settings enable row level security;

revoke all on public.contact_leads from anon, authenticated;
revoke all on public.app_settings from anon, authenticated;
grant all on public.contact_leads to service_role;
grant all on public.app_settings to service_role;