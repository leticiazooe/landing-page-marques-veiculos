-- Execute only in the Supabase project chosen for Marques Veículos.
-- No admin is seeded: add an existing auth user explicitly after setup.
create extension if not exists pgcrypto;

create table if not exists public.marques_admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.marques_admin_users enable row level security;
revoke all on public.marques_admin_users from anon, authenticated;
grant select on public.marques_admin_users to authenticated;
create policy "admin_self_read" on public.marques_admin_users
  for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.marques_is_admin()
returns boolean language sql stable security definer
set search_path = public, pg_temp
as $$
  select exists(
    select 1 from public.marques_admin_users
    where user_id = auth.uid()
  )
$$;
revoke all on function public.marques_is_admin() from public;
grant execute on function public.marques_is_admin() to anon, authenticated;

create table if not exists public.marques_vehicles (
  id uuid primary key default gen_random_uuid(),
  make text not null,
  model text not null,
  trim text not null default '',
  category text not null default 'outro' check (category in ('sedan','suv','hatch','picape','esportivo','outro')),
  year text not null default '',
  km text not null default '',
  transmission text not null default '',
  transmission_detail text not null default '',
  fuel text not null default '',
  engine text not null default '',
  doors text not null default '',
  color text not null default '',
  drive text not null default '',
  price numeric(12,2) not null default 0 check (price >= 0),
  image text not null default '',
  gallery text[] not null default array[]::text[],
  description text not null default '',
  equipment text[] not null default array[]::text[],
  payment_methods text[] not null default array[]::text[],
  is_conceptual boolean not null default false,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published','sold')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_vehicle_requires_photo check (status <> 'published' or (length(trim(image)) > 0 and price > 0))
);
create index if not exists marques_vehicles_public_idx on public.marques_vehicles (status, created_at desc);

create or replace function public.marques_updated_at()
returns trigger language plpgsql set search_path = public, pg_temp
as $$ begin new.updated_at = now(); return new; end; $$;
create trigger marques_vehicles_updated_at before update on public.marques_vehicles
  for each row execute function public.marques_updated_at();

alter table public.marques_vehicles enable row level security;
revoke all on public.marques_vehicles from anon, authenticated;
grant select on public.marques_vehicles to anon, authenticated;
grant insert, update, delete on public.marques_vehicles to authenticated;

create policy "published_vehicles_visible" on public.marques_vehicles
  for select to anon, authenticated using (status = 'published');
create policy "admins_view_all_vehicles" on public.marques_vehicles
  for select to authenticated using (public.marques_is_admin());
create policy "admins_insert_vehicles" on public.marques_vehicles
  for insert to authenticated with check (public.marques_is_admin());
create policy "admins_update_vehicles" on public.marques_vehicles
  for update to authenticated using (public.marques_is_admin()) with check (public.marques_is_admin());
create policy "admins_delete_vehicles" on public.marques_vehicles
  for delete to authenticated using (public.marques_is_admin());

-- Public photos only. Never upload confidential documents to this bucket.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('marques-vehicles', 'marques-vehicles', true, 8388608, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "marques_admin_upload_photo" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'marques-vehicles' and public.marques_is_admin());
create policy "marques_admin_update_photo" on storage.objects
  for update to authenticated
  using (bucket_id = 'marques-vehicles' and public.marques_is_admin())
  with check (bucket_id = 'marques-vehicles' and public.marques_is_admin());
create policy "marques_admin_delete_photo" on storage.objects
  for delete to authenticated
  using (bucket_id = 'marques-vehicles' and public.marques_is_admin());

-- Bootstrap after creating a Supabase Auth account:
-- insert into public.marques_admin_users(user_id) values ('YOUR_AUTH_USER_UUID');
