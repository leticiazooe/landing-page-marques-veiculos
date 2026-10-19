-- One SELECT policy per role to avoid multiple permissive rules.
drop policy "published_vehicles_visible" on public.marques_vehicles;
drop policy "admins_view_all_vehicles" on public.marques_vehicles;
create policy "visitors_read_published_vehicles" on public.marques_vehicles
for select to anon using (status='published');
create policy "authenticated_read_authorized_vehicles" on public.marques_vehicles
for select to authenticated using (status='published' or (select marques_private.is_admin()));
