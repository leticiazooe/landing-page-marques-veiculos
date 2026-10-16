import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';
import { Reveal } from './Reveal';
import { contact, whatsappUrl } from '../data/site';

export function Visit() {
  return (
    <section id="localizacao" aria-labelledby="visit-title" className="bg-cream py-20 text-ink sm:py-24 lg:py-32">
      <div className="mx-auto grid w-[min(1400px,calc(100%-48px))] gap-12 lg:w-[min(1400px,calc(100%-112px))] lg:grid-cols-[.93fr_1.07fr] lg:gap-20">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.21em] text-gold-dark"><MapPin size={16} aria-hidden="true" /> Onde estamos</p>
          <h2 id="visit-title" className="max-w-[560px] font-sans text-[clamp(40px,5vw,70px)] font-semibold leading-[1.1] tracking-[-.07em]">
            Nossa garagem fica <em className="block font-display text-[1.14em] font-medium tracking-[-.035em] text-gold-dark">em Ibitinga.</em>
          </h2>
          <p className="mt-7 max-w-[450px] text-[15px] leading-[1.9] text-ink/70">Entre em contato, confira os horários e veja como chegar até a Marques Veículos.</p>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex min-h-14 items-center justify-between gap-6 bg-ink px-6 text-xs font-bold uppercase tracking-[.1em] text-ivory transition-colors hover:bg-gold-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark">
            Traçar rota no Maps <ArrowUpRight aria-hidden="true" size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
        <Reveal delay={.1}>
          <div className="border-t border-ink/20">
            <div className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[170px_1fr] sm:gap-6 sm:py-8">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.11em] text-gold-dark"><MapPin size={17} aria-hidden="true" /> Endereço</p>
              <div>
                <p className="max-w-[360px] text-[16px] font-semibold leading-[1.8]">{contact.address}</p>
                <a className="mt-2 inline-flex min-h-11 items-center gap-2 text-xs font-bold text-gold-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-gold-dark" href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">Abrir localização <ArrowUpRight aria-hidden="true" size={15} /></a>
              </div>
            </div>
            <div className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[170px_1fr] sm:gap-6 sm:py-8">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.11em] text-gold-dark"><Clock3 size={17} aria-hidden="true" /> Horário</p>
              <div className="max-w-[360px] space-y-2">
                {contact.schedule.map(entry => (
                  <div key={entry.days} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[13px] leading-relaxed sm:text-[14px]">
                    <span className="text-ink/65">{entry.days}</span><span className="font-semibold tabular-nums">{entry.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[170px_1fr] sm:gap-6 sm:py-8">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.11em] text-gold-dark"><Phone size={17} aria-hidden="true" /> Contato</p>
              <div>
                <a href={`tel:${contact.phoneE164}`} className="text-[clamp(22px,2.5vw,35px)] font-semibold tracking-[-.04em] transition-colors hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-gold-dark">{contact.phoneDisplay}</a>
                <div><a href={whatsappUrl('Olá! Gostaria de falar com a Marques Veículos.')} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-2 text-[12px] font-bold text-gold-dark hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold-dark">Enviar mensagem <ArrowUpRight aria-hidden="true" size={15} /></a></div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
