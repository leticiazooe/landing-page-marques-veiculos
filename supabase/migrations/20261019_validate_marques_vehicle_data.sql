-- Database-side publishing checks and input bounds. Existing published stock was validated before migration.
alter table public.marques_vehicles
  add constraint marques_publish_real_vehicle check (
    status <> 'published' or (
      is_conceptual = false and nullif(btrim(make),'') is not null
      and nullif(btrim(model),'') is not null
      and price > 0 and length(btrim(image)) > 0
    )
  ),
  add constraint marques_vehicle_text_lengths check (
    length(make) between 1 and 100 and length(model) between 1 and 120
    and length(trim) <= 160 and length(year) <= 24
    and length(km) <= 40 and length(description) <= 5000
    and length(transmission) <= 100 and length(transmission_detail) <= 100
    and length(fuel) <= 100 and length(engine) <= 100
    and length(doors) <= 50 and length(color) <= 80 and length(drive) <= 100
  ),
  add constraint marques_vehicle_array_limits check (
    cardinality(gallery) <= 24 and cardinality(equipment) <= 100
    and cardinality(payment_methods) <= 10
  ),
  add constraint marques_vehicle_https_image check (
    image = '' or image like 'https://%' or left(image,1) = '/'
  );
