import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';
import { Reveal } from './Reveal';
import { contact, whatsappUrl } from '../data/site';

const whatsapp = whatsappUrl('Olá! Gostaria de falar com a Marques Veículos.');

export function Visit() {
  return (
    <section id="localizacao" aria-labelledby="visit-title" className="relative isolate flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden bg-night py-24 text-ivory sm:py-28 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[url('/images/location-premium-marques.jpg')] bg-cover bg-[65%_center] lg:bg-center" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,6,6,.99)_0%,rgba(5,6,6,.98)_35%,rgba(5,6,6,.86)_48%,rgba(5,6,6,.18)_76%,rgba(5,6,6,.03)_100%)] max-lg:bg-[linear-gradient(90deg,rgba(5,6,6,.96)_0%,rgba(5,6,6,.89)_60%,rgba(5,6,6,.5)_100%)]" />
      <div className="relative mx-auto w-[min(1400px,calc(100%-40px))] sm:w-[min(1400px,calc(100%-72px))] lg:w-[min(1400px,calc(100%-112px))]">
        <Reveal className="max-w-[570px]">
          <p className="mb-5 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[.2em] text-gold-light"><span className="h-px w-10 bg-gold" aria-hidden="true" /> Localização</p>
          <h2 id="visit-title" className="text-[clamp(41px,4.5vw,68px)] font-semibold leading-[1.06] tracking-[-.065em]">Venha nos fazer <span className="block text-gold-light">uma visita.</span></h2>
          <p className="mt-5 max-w-[490px] text-[16px] leading-[1.7] text-ivory/85 sm:text-[18px]">Estamos em Ibitinga, SP. Confira os horários e venha conhecer nossa garagem.</p>
          <div className="mt-8 space-y-6 sm:mt-9 sm:space-y-7">
            <div className="flex gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/80 text-gold-light"><MapPin size={24} aria-hidden="true" /></span>
              <div className="min-w-0 border-l border-gold/45 pl-4">
                <h3 className="text-[17px] font-semibold">Endereço</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-ivory/80">{contact.address}</p>
                <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-9 items-center gap-2 text-[12px] font-bold uppercase tracking-[.04em] text-gold-light underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-gold">Abrir localização <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/80 text-gold-light"><Clock3 size={24} aria-hidden="true" /></span>
              <div className="min-w-0 flex-1 border-l border-gold/45 pl-4">
                <h3 className="mb-2 text-[17px] font-semibold">Horários de atendimento</h3>
                <div className="max-w-[340px] space-y-1">
                  {contact.schedule.map(item => (
                    <div key={item.days} className="flex flex-wrap justify-between gap-x-4 text-[14px] leading-relaxed"><span className="text-ivory/80">{item.days}</span><span className="font-semibold tabular-nums">{item.hours}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/80 text-gold-light"><Phone size={23} aria-hidden="true" /></span>
              <div className="min-w-0 border-l border-gold/45 pl-4">
                <h3 className="text-[17px] font-semibold">Telefone / WhatsApp</h3>
                <a href={`tel:${contact.phoneE164}`} className="mt-1 block text-[clamp(23px,2.3vw,30px)] font-semibold leading-tight tracking-[-.03em] hover:text-gold-light">{contact.phoneDisplay}</a>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-9 items-center gap-2 text-[12px] font-bold uppercase tracking-[.04em] text-gold-light underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-gold">Falar no WhatsApp <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
