-- Audit trail for every vehicle mutation; only admins can read historical records.
create table public.marques_vehicle_audit (
  id bigint generated always as identity primary key,
  vehicle_id uuid not null,
  operation text not null check (operation in ('INSERT','UPDATE','DELETE')),
  actor_id uuid,
  occurred_at timestamptz not null default now(),
  old_row jsonb,
  new_row jsonb
);
create index marques_vehicle_audit_vehicle_time on public.marques_vehicle_audit(vehicle_id, occurred_at desc);
alter table public.marques_vehicle_audit enable row level security;
revoke all on public.marques_vehicle_audit from public, anon, authenticated;
grant select on public.marques_vehicle_audit to authenticated;
create policy "admins_read_vehicle_audit" on public.marques_vehicle_audit
for select to authenticated using ((select marques_private.is_admin()));
create or replace function marques_private.log_vehicle_change()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.marques_vehicle_audit(vehicle_id, operation, actor_id, old_row, new_row)
  values (
    case when TG_OP = 'DELETE' then old.id else new.id end,
    TG_OP, (select auth.uid()),
    case when TG_OP in ('UPDATE','DELETE') then to_jsonb(old) else null end,
    case when TG_OP in ('INSERT','UPDATE') then to_jsonb(new) else null end
  );
  if TG_OP = 'DELETE' then return old; end if;
  return new;
end;
$$;
revoke all on function marques_private.log_vehicle_change() from public, anon, authenticated;
create trigger marques_vehicle_audit_trigger
after insert or update or delete on public.marques_vehicles
for each row execute function marques_private.log_vehicle_change();
