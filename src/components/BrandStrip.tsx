// Mantemos os mesmos logotipos automotivos, mas exportados como SVGs estáticos
// em scripts/export-brand-logos.mjs: zero dependência de biblioteca no navegador.
const brands = [
  { name: 'Honda', slug: 'honda' },
  { name: 'Volvo', slug: 'volvo' },
  { name: 'Toyota', slug: 'toyota' },
  { name: 'Volkswagen', slug: 'volkswagen' },
  { name: 'BMW', slug: 'bmw' },
  { name: 'Chevrolet', slug: 'chevrolet' },
  { name: 'Fiat', slug: 'fiat' },
  { name: 'Hyundai', slug: 'hyundai' },
  { name: 'Jeep', slug: 'jeep' },
  { name: 'Audi', slug: 'audi' },
] as const;

export function BrandStrip() {
  return (
    <section aria-label="Marcas automotivas em destaque" className="relative overflow-hidden border-y border-white/10 bg-night py-8 text-ivory sm:py-10">
      <div className="marques-brands-viewport overflow-hidden">
        <div className="marques-brands-track flex w-max items-center">
          {[0, 1].map(copy => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex shrink-0 items-center gap-9 pr-9 sm:gap-14 sm:pr-14"
            >
              {brands.map(({ name, slug }) => (
                <li key={name} className="flex w-[104px] shrink-0 items-center justify-center sm:w-[120px]">
                  <img
                    src={`/images/brands/${slug}.svg`}
                    alt=""
                    width={70}
                    height={70}
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                    className="h-[70px] w-[70px] opacity-45 transition-opacity duration-500 hover:opacity-80 motion-reduce:transition-none sm:h-[78px] sm:w-[78px]"
                  />
                  <span className="sr-only">{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
