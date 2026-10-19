-- Keep SECURITY DEFINER authorization checks out of the exposed public schema.
create schema if not exists marques_private;
revoke all on schema marques_private from public;
grant usage on schema marques_private to authenticated;

create or replace function marques_private.is_admin()
returns boolean language sql stable security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.marques_admin_users
    where user_id = (select auth.uid())
  );
$$;
revoke all on function marques_private.is_admin() from public, anon;
grant execute on function marques_private.is_admin() to authenticated;

alter policy "admins_view_all_vehicles" on public.marques_vehicles
  using ((select marques_private.is_admin()));
alter policy "admins_insert_vehicles" on public.marques_vehicles
  with check ((select marques_private.is_admin()));
alter policy "admins_update_vehicles" on public.marques_vehicles
  using ((select marques_private.is_admin()))
  with check ((select marques_private.is_admin()));
alter policy "admins_delete_vehicles" on public.marques_vehicles
  using ((select marques_private.is_admin()));

drop policy "marques_admin_upload_photo" on storage.objects;
drop policy "marques_admin_update_photo" on storage.objects;
drop policy "marques_admin_delete_photo" on storage.objects;
drop function public.marques_is_admin();

create policy "marques_admin_upload_photo" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'marques-vehicles' and (select marques_private.is_admin()));
create policy "marques_admin_update_photo" on storage.objects
  for update to authenticated
  using (bucket_id = 'marques-vehicles' and (select marques_private.is_admin()))
  with check (bucket_id = 'marques-vehicles' and (select marques_private.is_admin()));
create policy "marques_admin_delete_photo" on storage.objects
  for delete to authenticated
  using (bucket_id = 'marques-vehicles' and (select marques_private.is_admin()));
