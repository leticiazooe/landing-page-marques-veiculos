import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, CarFront, ChevronDown, Fuel, Gauge, Settings2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { type Vehicle, type VehicleCategory, formatPrice, whatsappUrl } from '../data/site';

const filters: { label: string; value: VehicleCategory | 'todos' }[] = [
  { label: 'Todos os veículos', value: 'todos' },
  { label: 'Sedãs', value: 'sedan' },
  { label: 'SUVs', value: 'suv' },
  { label: 'Hatches', value: 'hatch' },
  { label: 'Picapes', value: 'picape' },
  { label: 'Esportivos', value: 'esportivo' },
  { label: 'Outros', value: 'outro' },
];

type SortOrder = 'padrao' | 'menor-preco' | 'maior-preco' | 'mais-recentes' | 'mais-antigos' | 'menor-km';

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: 'padrao', label: 'Ordem padrão' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'mais-recentes', label: 'Mais recentes' },
  { value: 'mais-antigos', label: 'Mais antigos' },
  { value: 'menor-km', label: 'Menor quilometragem' },
];

const modelYear = (vehicle: Vehicle) => Number(vehicle.year.split('/').at(-1) ?? 0);
const mileage = (vehicle: Vehicle) => Number(vehicle.km.replace(/\D/g, ''));

function compareVehicles(a: Vehicle, b: Vehicle, order: SortOrder): number {
  switch (order) {
    case 'menor-preco': return a.price - b.price;
    case 'maior-preco': return b.price - a.price;
    case 'mais-recentes': return modelYear(b) - modelYear(a);
    case 'mais-antigos': return modelYear(a) - modelYear(b);
    case 'menor-km': return mileage(a) - mileage(b);
    default: return 0;
  }
}

function VehicleCard({ vehicle, onDetails }: { vehicle: Vehicle; onDetails: (id: string) => void }) {
  const message = whatsappUrl(`Olá! Vi o ${vehicle.make} ${vehicle.model} no site da Marques Veículos e gostaria de confirmar a disponibilidade, o preço e as condições de pagamento.`);
  return (
    <motion.article layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }} className="group flex min-w-0 flex-col overflow-hidden bg-white shadow-[0_12px_40px_rgba(22,18,11,0.06)]">
      <button type="button" onClick={() => onDetails(vehicle.id)} aria-label={`Ver detalhes de ${vehicle.make} ${vehicle.model}`} className="relative block aspect-[1.32] w-full overflow-hidden bg-night text-left">
        <img src={vehicle.image} alt={`Imagem ilustrativa do ${vehicle.make} ${vehicle.model}`} className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.045]" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {vehicle.illustrative && <span className="absolute left-5 top-5 bg-night/85 px-3 py-2 text-[13px] font-bold uppercase tracking-[.14em] text-gold-light backdrop-blur-sm">Imagem ilustrativa</span>}
        <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center border border-white/60 bg-black/20 text-white transition-colors group-hover:bg-gold group-hover:text-night"><ArrowUpRight size={19} /></span>
      </button>
      <div className="flex grow flex-col p-5 sm:p-7">
        <p className="text-[13px] font-semibold uppercase tracking-[.17em] text-gold-dark">{vehicle.make} · {vehicle.year}</p>
        <h3 className="mt-2 font-sans text-[clamp(27px,2.5vw,35px)] font-semibold leading-tight tracking-[-.05em] text-ink">{vehicle.model}</h3>
        <p className="mt-1 text-[16px] text-ink/55">{vehicle.trim}</p>
        <div className="mt-5 grid grid-cols-3 gap-2 border-y border-ink/10 py-4 text-[13px] leading-normal text-ink/70">
          <span className="flex flex-col items-start gap-2"><Gauge size={17} className="text-gold-dark" />{vehicle.km}</span>
          <span className="flex flex-col items-start gap-2"><Settings2 size={17} className="text-gold-dark" />{vehicle.transmission}</span>
          <span className="flex flex-col items-start gap-2"><Fuel size={17} className="text-gold-dark" />{vehicle.fuel}</span>
        </div>
        <p className="mt-5 text-[13px] font-semibold uppercase tracking-[.16em] text-ink/55">{vehicle.illustrative ? 'Preço de exemplo' : 'Valor anunciado'}</p>
        <p className="mt-1 text-[31px] font-semibold leading-none tracking-[-.055em] text-ink">{formatPrice(vehicle.price)}</p>
        <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-2">
          <button type="button" onClick={() => onDetails(vehicle.id)} className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink/25 px-3 text-[14px] font-semibold text-ink transition-colors hover:border-gold-dark hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark">Mais detalhes <ArrowRight size={16} /></button>
          <a href={message} target="_blank" rel="noopener noreferrer" className="rounded-xl inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-3 text-[14px] font-semibold text-gold-light transition-colors hover:bg-[#33342f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark">Falar no WhatsApp <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </motion.article>
  );
}

export function Collection({ onDetails, vehicles, loading = false, error }: { onDetails: (id: string) => void; vehicles: Vehicle[]; loading?: boolean; error?: string }) {
  const [filter, setFilter] = useState<VehicleCategory | 'todos'>('todos');
  const [sortOrder, setSortOrder] = useState<SortOrder>('padrao');
  const visible = vehicles
    .filter(item => filter === 'todos' || item.category === filter)
    .sort((a, b) => compareVehicles(a, b, sortOrder));
  return (
    <section id="veiculos" aria-labelledby="catalog-title" className="bg-cream py-20 text-ink sm:py-24 lg:py-32">
      <div className="mx-auto w-[min(1400px,calc(100%-48px))] lg:w-[min(1400px,calc(100%-112px))]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-16">
          <Reveal className="max-w-[770px]">
            <p className="mb-5 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[.19em] text-gold-dark"><CarFront size={18} /> Vitrine de veículos</p>
            <h2 id="catalog-title" className="font-sans text-[clamp(38px,5vw,70px)] font-semibold leading-[1.12] tracking-[-.065em]">Conheça os <span className="font-display text-[1.14em] font-normal italic tracking-[-.04em] text-gold-dark">modelos.</span></h2>
          </Reveal>
          <Reveal className="max-w-[355px]" delay={.1}><p className="text-[18px] leading-[1.8] text-ink/70">Veja os detalhes de cada modelo e tire suas dúvidas pelo WhatsApp.</p></Reveal>
        </div>
        <div className="mb-7 mt-12 flex flex-col gap-5 border-t border-ink/15 pt-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filtrar veículos por categoria" className="flex flex-wrap gap-x-6 gap-y-1">
            {filters.map(item => <button key={item.value} type="button" onClick={() => setFilter(item.value)} aria-pressed={filter === item.value} className={`relative min-h-11 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark ${filter === item.value ? 'text-ink' : 'text-ink/50 hover:text-ink'}`}>{item.label}{filter === item.value && <motion.span layoutId="vehicle-filter-indicator" className="absolute bottom-0 inset-x-0 h-[2px] bg-gold-dark" />}</button>)}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 sm:justify-end">
            <p aria-live="polite" className="text-[14px] text-ink/55">{visible.length} {visible.length === 1 ? 'modelo' : 'modelos'} na vitrine</p>
            <div className="flex items-center gap-3">
              <label htmlFor="vehicle-sort" className="shrink-0 text-[14px] font-medium text-ink/65">Ordenar por</label>
              <div className="relative">
                <select
                  id="vehicle-sort"
                  value={sortOrder}
                  onChange={event => setSortOrder(event.target.value as SortOrder)}
                  className="min-h-11 min-w-[176px] appearance-none border border-ink/20 bg-transparent py-2 pl-3 pr-9 text-[15px] font-semibold text-ink transition-colors hover:border-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark sm:min-w-[192px]"
                >
                  {sortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <ChevronDown aria-hidden="true" size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold-dark" />
              </div>
            </div>
          </div>
        </div>
        {loading ? <div role="status" aria-live="polite" className="border border-ink/15 bg-white p-8 text-[17px] text-ink/70">Carregando os veículos disponíveis...</div> : error ? <div role="alert" className="border border-[#bd945b] bg-white p-8 text-[17px] text-ink">{error}</div> : visible.length === 0 ? <div className="border border-ink/15 bg-white p-8 text-[17px] text-ink/70">Nenhum veículo nesta categoria no momento. Fale com a equipe pelo WhatsApp para consultar novas opções.</div> : <motion.div layout className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence initial={false}>{visible.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onDetails={onDetails} />)}</AnimatePresence>
        </motion.div>}
      </div>
    </section>
  );
}
