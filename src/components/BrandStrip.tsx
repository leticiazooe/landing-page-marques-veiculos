import {
  AudiIconDark,
  BMWIconDark,
  ChevroletIconDark,
  FiatIconDark,
  HondaIconDark,
  HyundaiIconDark,
  JeepIconDark,
  ToyotaIconDark,
  VolkswagenIconDark,
  VolvoIconDark,
} from '@cardog-icons/react';

// Seleção inicial de marcas para o layout. Confirmar as marcas comercializadas
// antes de apresentar a lista como catálogo definitivo da garagem.
const brands = [
  { name: 'Honda', Logo: HondaIconDark },
  { name: 'Volvo', Logo: VolvoIconDark },
  { name: 'Toyota', Logo: ToyotaIconDark },
  { name: 'Volkswagen', Logo: VolkswagenIconDark },
  { name: 'BMW', Logo: BMWIconDark },
  { name: 'Chevrolet', Logo: ChevroletIconDark },
  { name: 'Fiat', Logo: FiatIconDark },
  { name: 'Hyundai', Logo: HyundaiIconDark },
  { name: 'Jeep', Logo: JeepIconDark },
  { name: 'Audi', Logo: AudiIconDark },
] as const;

export function BrandStrip() {
  return (
    <section
      aria-label="Marcas automotivas em destaque"
      className="relative overflow-hidden border-y border-white/10 bg-night py-8 text-ivory sm:py-10"
    >
      <div className="marques-brands-viewport overflow-hidden">
        <div className="marques-brands-track flex w-max items-center">
          {[0, 1].map(copy => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex shrink-0 items-center gap-9 pr-9 sm:gap-14 sm:pr-14"
            >
              {brands.map(({ name, Logo }) => (
                <li key={name} className="flex w-[104px] shrink-0 items-center justify-center sm:w-[120px]">
                  <Logo
                    width={70}
                    height={70}
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
