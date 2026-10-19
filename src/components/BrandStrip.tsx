import { motion, useReducedMotion } from 'motion/react';
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

// Seleção visual inicial; confirmar as marcas comercializadas antes da publicação definitiva.
// Ícones monocromáticos do pacote Cardog Icons, sem associação de representação oficial.
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
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="brands-title" className="relative isolate overflow-hidden border-y border-white/10 bg-[#111413] py-12 text-ivory sm:py-15">
      <div className="mx-auto w-[min(1400px,calc(100%-48px))] lg:w-[min(1400px,calc(100%-112px))]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8 flex flex-col justify-between gap-3 border-b border-white/10 pb-6 sm:mb-9 sm:flex-row sm:items-end"
        >
          <h2 id="brands-title" className="font-display text-[clamp(27px,3.2vw,40px)] font-medium leading-tight tracking-[-.025em] text-gold-light">
            Marcas em destaque
          </h2>
          <p className="max-w-sm text-[13px] leading-relaxed text-ivory/55">
            Conheça as marcas e consulte a disponibilidade com a nossa equipe.
          </p>
        </motion.div>
        <div className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-7 bg-gradient-to-r from-[#111413] to-transparent xl:hidden" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-7 bg-gradient-to-l from-[#111413] to-transparent xl:hidden" />
          <motion.ul
            aria-label="Seleção de marcas automotivas"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
            className="flex snap-x snap-mandatory items-center gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:grid xl:grid-cols-10 xl:overflow-visible xl:pb-0"
          >
            {brands.map(({ name, Logo }) => (
              <li key={name} className="group flex min-h-29 w-[104px] shrink-0 snap-center flex-col items-center justify-center gap-2.5 px-2 text-center xl:w-auto xl:shrink">
                <Logo size={61} aria-hidden="true" className="h-[61px] w-[61px] opacity-55 transition-[opacity,transform] duration-500 ease-luxe group-hover:scale-[1.055] group-hover:opacity-95 motion-reduce:transform-none" />
                <span className="text-[11px] font-semibold tracking-[.045em] text-ivory/55 transition-colors duration-500 group-hover:text-gold-light">
                  {name}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
        <p className="mt-3 text-center text-[11px] text-ivory/40 xl:hidden">Deslize para conhecer outras marcas</p>
      </div>
    </section>
  );
}
