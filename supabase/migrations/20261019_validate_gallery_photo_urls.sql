create or replace function marques_private.is_safe_image_url(value text)
returns boolean language sql immutable strict set search_path = ''
as $$
  select (
    length(value) <= 2048
    and (
      value like 'https://_%'
      or (left(value,1)='/' and left(value,2)<>'/' and position(chr(92) in value)=0)
    )
    and value !~ '[[:cntrl:]]'
  );
$$;
create or replace function marques_private.all_safe_image_urls(values_list text[])
returns boolean language sql immutable strict set search_path = ''
as $$
  select not exists(
    select 1 from unnest(values_list) as item
    where item is null or not marques_private.is_safe_image_url(item)
  );
$$;
revoke all on function marques_private.is_safe_image_url(text) from public, anon, authenticated;
revoke all on function marques_private.all_safe_image_urls(text[]) from public, anon, authenticated;
alter table public.marques_vehicles drop constraint marques_vehicle_https_image;
alter table public.marques_vehicles add constraint marques_safe_images
check (
  (image='' or marques_private.is_safe_image_url(image))
  and marques_private.all_safe_image_urls(gallery)
);
