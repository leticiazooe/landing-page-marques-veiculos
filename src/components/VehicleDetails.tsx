import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, ChevronRight, CreditCard, Fuel, Gauge, GitBranch, Landmark, MapPin, Settings2, ShieldCheck, Tag, Wallet } from 'lucide-react';
import { formatPrice, paymentMethods, type Vehicle, whatsappUrl } from '../data/site';

const labelClass = 'text-[13px] uppercase tracking-[.15em] font-semibold text-ink/55';
const specs = (v: Vehicle) => [
  { title: 'Ano / modelo', value: v.year, icon: CalendarDays },
  { title: 'Quilometragem', value: v.km, icon: Gauge },
  { title: 'Transmissão', value: v.transmission, icon: Settings2 },
  { title: 'Câmbio', value: v.transmissionDetail, icon: GitBranch },
  { title: 'Combustível', value: v.fuel, icon: Fuel },
  { title: 'Motorização', value: v.engine, icon: ShieldCheck },
  { title: 'Portas', value: v.doors, icon: ChevronRight },
  { title: 'Cor', value: v.color, icon: Tag },
  { title: 'Tração', value: v.drive, icon: GitBranch },
];

export function VehicleDetails({ vehicle, onBack }: { vehicle: Vehicle; onBack: () => void }) {
  const reduced = useReducedMotion();
  useEffect(() => { document.title = `${vehicle.make} ${vehicle.model} | Marques Veículos`; return () => { document.title = 'Marques Veículos — Garagem em Ibitinga'; }; }, [vehicle]);
  const chat = whatsappUrl(vehicle.illustrative
    ? `Olá! Vi a ficha ilustrativa do ${vehicle.make} ${vehicle.model} ${vehicle.trim} (${vehicle.year}) no site da Marques Veículos. Gostaria de confirmar a disponibilidade e o preço.`
    : `Olá! Tenho interesse no ${vehicle.make} ${vehicle.model} ${vehicle.trim} (${vehicle.year}) anunciado no site da Marques Veículos. Gostaria de confirmar a disponibilidade e as condições.`);
  const availablePayments = vehicle.illustrative
    ? paymentMethods
    : paymentMethods.filter(p => vehicle.paymentMethods?.includes(p.title));
  return (
    <article className="min-h-screen bg-cream pb-20 pt-[126px] text-ink lg:pt-[156px]">
      <div className="mx-auto w-[min(1400px,calc(100%-48px))] lg:w-[min(1400px,calc(100%-112px))]">
        <button onClick={onBack} className="rounded-xl mb-7 inline-flex min-h-11 items-center gap-2 text-[16px] font-semibold text-ink/65 hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-gold-dark" type="button"><ArrowLeft size={18} /> Voltar aos veículos</button>
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)] lg:gap-12">
          <motion.div initial={reduced?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="overflow-hidden bg-[#141615]">
            <img src={vehicle.image} alt={`Foto do ${vehicle.make} ${vehicle.model}`} className="aspect-[4/3] w-full object-cover lg:aspect-[1.06]" fetchPriority="high" />
            {(vehicle.gallery?.length ?? 0) > 0 && <div className="grid grid-cols-3 gap-2 bg-night p-2">{vehicle.gallery?.map((url, index) => <a key={index} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar foto ${index + 2} do veículo`}><img src={url} alt={`Detalhe ${index + 2} do veículo`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-opacity hover:opacity-80" /></a>)}</div>}
          </motion.div>
          <div className="flex flex-col justify-center">
            <p className="text-[13px] font-bold uppercase tracking-[.2em] text-gold-dark">Conheça o modelo · {vehicle.make}</p>
            <h1 className="mt-4 font-sans text-[clamp(48px,5.5vw,86px)] font-semibold leading-[1.01] tracking-[-.075em]">{vehicle.model}</h1>
            <p className="mt-4 font-display text-[clamp(26px,3vw,37px)] italic text-gold-dark">{vehicle.trim}</p>
            <p className="mt-6 text-[18px] leading-[1.85] text-ink/65">{vehicle.description}</p>
            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-ink/15 py-6 text-[16px]">
              <div><CalendarDays size={18} className="mb-2 text-gold-dark" /><span className="block text-ink/55">Ano</span><strong>{vehicle.year}</strong></div>
              <div><Gauge size={18} className="mb-2 text-gold-dark" /><span className="block text-ink/55">KM</span><strong>{vehicle.km}</strong></div>
              <div><Settings2 size={18} className="mb-2 text-gold-dark" /><span className="block text-ink/55">Câmbio</span><strong>{vehicle.transmission}</strong></div>
            </div>
            <div className="mt-7"><p className={labelClass}>{vehicle.illustrative ? 'Preço de exemplo' : 'Valor anunciado'}</p><p className="mt-1 text-[clamp(36px,4vw,56px)] font-semibold leading-tight tracking-[-.06em]">{formatPrice(vehicle.price)}</p></div>
            <div className="mt-7 flex flex-wrap gap-3"><a href={chat} target="_blank" rel="noopener noreferrer" className="rounded-xl inline-flex min-h-14 items-center justify-center gap-4 bg-ink px-6 text-[14px] font-bold uppercase tracking-[.07em] text-gold-light transition-colors hover:bg-[#32372e]">Falar no WhatsApp <ArrowUpRight size={18}/></a><a href="#ficha-tecnica" className="rounded-xl inline-flex min-h-14 items-center gap-3 border border-ink/25 px-6 text-[14px] font-semibold text-ink hover:border-gold-dark">Ver ficha completa <ChevronRight size={18}/></a></div>
            <p className="mt-5 text-[14px] leading-relaxed text-ink/55">{vehicle.conceptual ? 'Modelo conceitual, não disponível para venda.' : vehicle.illustrative ? 'Ficha e preço ilustrativos. Confirme os dados com a garagem.' : 'Valores e disponibilidade sujeitos a confirmação com a garagem.'}</p>
          </div>
        </div>
        <div className="mt-19 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,.7fr)] lg:gap-16">
          <section id="ficha-tecnica" className="scroll-mt-32"><h2 className="font-sans text-4xl font-semibold tracking-[-.055em] sm:text-5xl">Ficha técnica</h2><p className="mt-3 text-[16px] text-ink/60">Confira as informações do veículo e tire suas dúvidas com a garagem.</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-5 sm:grid-cols-3">{specs(vehicle).map(({title,value,icon:Icon})=><div key={title} className="border-t border-ink/15 py-5"><Icon size={20} className="mb-4 text-gold-dark"/><dt className={labelClass}>{title}</dt><dd className="mt-2 text-[18px] font-semibold leading-relaxed text-ink">{value}</dd></div>)}</dl>
            <h3 className="mt-10 font-display text-3xl text-ink">Itens e equipamentos</h3><ul className="mt-5 grid gap-3 sm:grid-cols-2">{vehicle.equipment.map(item=><li key={item} className="flex gap-3 text-[16px] text-ink/70"><Check size={17} className="mt-0.5 shrink-0 text-gold-dark" /> {item}</li>)}</ul>
          </section>
          <section className="bg-[#e9e3d7] px-6 py-8 sm:px-9" aria-labelledby="pagamentos-title"><div className="flex items-center gap-3"><Wallet size={25} className="text-gold-dark"/><h2 id="pagamentos-title" className="font-sans text-[26px] font-semibold tracking-[-.035em]">Formas de pagamento</h2></div><p className="mt-3 text-[15px] leading-relaxed text-ink/65">Consulte a garagem para saber quais formas de pagamento estão disponíveis.</p><div className="mt-6 space-y-0">{availablePayments.length ? availablePayments.map(p=>{const Icon=p.title === 'Financiamento' ? Landmark : p.title === 'Veículo na troca' ? Tag : CreditCard;return <div key={p.title} className="border-t border-ink/15 py-5"><Icon size={20} className="mb-2 text-gold-dark"/><h3 className="text-[16px] font-bold">{p.title}</h3><p className="mt-1 text-[15px] leading-relaxed text-ink/65">{p.description}</p></div>}) : <p className="text-[15px] text-ink/70">Condições sob consulta.</p>}</div><a href={chat} target="_blank" rel="noopener noreferrer" className="rounded-xl mt-4 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-gold-dark px-3 text-center text-[14px] font-bold text-white hover:bg-[#755d33]">Consultar condições <ArrowUpRight size={17}/></a><p className="mt-3 text-[13px] leading-relaxed text-ink/55">Taxas, entrada e aprovação de financiamento dependem de análise e confirmação.</p></section>
        </div>
        <div className="mt-17 flex flex-wrap items-center justify-between gap-5 border-t border-ink/15 pt-8 text-[16px] text-ink/60"><span className="inline-flex items-center gap-2"><MapPin size={17} className="text-gold-dark"/> Atendimento em Ibitinga, SP</span><button type="button" onClick={onBack} className="rounded-xl inline-flex min-h-11 items-center gap-3 font-semibold text-gold-dark hover:text-ink"><ArrowLeft size={17}/> Voltar para o catálogo</button></div>
      </div>
    </article>
  );
}
