import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, CarFront } from 'lucide-react';
import { Reveal } from './Reveal';
import { collections, type VehicleCategory, type VehicleCollection, whatsappUrl } from '../data/site';

type Filter = VehicleCategory | 'todos';
const filters: { label: string; value: Filter }[] = [
  { label: 'Todos os estilos', value: 'todos' },
  { label: 'SUVs', value: 'suv' },
  { label: 'Sedãs', value: 'sedan' },
  { label: 'Esportivos', value: 'esportivo' },
];

function CategoryCard({ collection, featured }: { collection: VehicleCollection; featured: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: .985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: .985 }}
      transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative isolate overflow-hidden bg-night-soft ${featured ? 'min-h-[510px] md:row-span-2 md:min-h-0' : 'min-h-[290px] md:min-h-0'}`}
    >
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={imageFailed ? '/images/capa-marques.webp' : collection.image}
          alt={`Fotografia ilustrativa da categoria ${collection.name}`}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className={`h-full w-full object-cover transition-transform duration-[1100ms] ease-luxe group-hover:scale-[1.065] ${imageFailed ? 'opacity-70 saturate-75' : 'opacity-80'}`}
          style={{ objectPosition: collection.position }}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/20 to-black/15" />
      <div className="flex h-full min-h-[inherit] flex-col justify-between p-7 sm:p-9">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.21em] text-gold-light">
            <span className="h-px w-6 bg-gold" /> {collection.descriptor}
          </span>
          <span className="rounded-full border border-white/35 p-2 text-ivory transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-night">
            <ArrowUpRight aria-hidden="true" size={17} />
          </span>
        </div>
        <div>
          <h3 className="font-display text-[clamp(52px,6vw,84px)] leading-[.95] font-medium tracking-[-.035em] text-white">{collection.name}</h3>
          <p className="mt-3 max-w-[315px] text-sm leading-relaxed text-white/80">{collection.subtitle}</p>
          <a href={whatsappUrl(`Olá! Gostaria de consultar a disponibilidade de ${collection.name} na Marques Veículos.`)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-3 border-b border-gold/65 pb-1 text-[11px] font-bold uppercase tracking-[.12em] text-gold-light transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
            Consultar opções <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Collection() {
  const [filter, setFilter] = useState<Filter>('todos');
  const visible = collections.filter(item => filter === 'todos' || item.id === filter);
  const all = filter === 'todos';

  return (
    <section id="veiculos" aria-labelledby="catalog-title" className="bg-cream py-20 text-ink sm:py-24 lg:py-32">
      <div className="mx-auto w-[min(1400px,calc(100%-48px))] lg:w-[min(1400px,calc(100%-112px))]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-16">
          <Reveal className="max-w-[800px]">
            <p className="mb-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.21em] text-gold-dark"><CarFront aria-hidden="true" size={17} /> Explore possibilidades</p>
            <h2 id="catalog-title" className="font-sans text-[clamp(38px,5vw,70px)] font-semibold leading-[1.12] tracking-[-.065em] text-ink">
              Cada caminho merece <span className="font-display text-[1.16em] font-medium italic tracking-[-.04em] text-gold-dark">o carro certo.</span>
            </h2>
          </Reveal>
          <Reveal className="max-w-[365px]" delay={.1}>
            <p className="text-[15px] leading-[1.85] text-ink/70">Explore estilos de veículos e converse com a garagem para saber quais modelos estão disponíveis no momento.</p>
          </Reveal>
        </div>
        <div className="mb-6 mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-ink/15 pt-5 lg:mt-16">
          <div role="group" aria-label="Filtrar categorias de veículos" className="flex flex-wrap gap-x-6 gap-y-2">
            {filters.map(item => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                aria-pressed={filter === item.value}
                className={`relative min-h-11 px-0 text-[12px] font-bold tracking-[.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark ${filter === item.value ? 'text-ink' : 'text-ink/45 hover:text-ink/85'}`}
              >
                {item.label}
                {filter === item.value && <motion.span layoutId="catalog-indicator" className="absolute bottom-0 inset-x-0 h-[2px] bg-gold-dark" transition={{ type: 'spring', stiffness: 300, damping: 28 }} />}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-[11px] font-medium tracking-[.02em] text-ink/50">{all ? '3 categorias para explorar' : '1 categoria para explorar'}</p>
        </div>
        <motion.div layout className={`grid gap-4 md:grid-cols-2 ${all ? 'md:auto-rows-[280px]' : 'md:auto-rows-[460px]'}`}>
          <AnimatePresence initial={false}>
            {visible.map((item, index) => (
              <CategoryCard key={item.id} collection={item} featured={all && index === 0} />
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="mt-6 flex flex-col justify-between gap-5 border-t border-ink/15 pt-6 text-[12px] text-ink/55 sm:flex-row sm:items-start">
          <p className="max-w-[690px] leading-relaxed">* Categorias e fotografias ilustrativas. Esta seção não representa estoque disponível, preços ou condições comerciais.</p>
          <a href={whatsappUrl('Olá! Gostaria de saber quais veículos estão disponíveis na garagem.')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center gap-3 font-bold uppercase tracking-[.12em] text-gold-dark hover:text-ink focus-visible:outline-2 focus-visible:outline-gold-dark">
            Consultar disponibilidade <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
