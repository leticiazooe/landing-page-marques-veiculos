import { ArrowUpRight, Clock3, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Reveal } from './Reveal';
import { contact, whatsappUrl } from '../data/site';

const whatsapp = whatsappUrl('Olá! Gostaria de falar com a Marques Veículos.');

export function Visit() {
  return (
    <section id="localizacao" aria-labelledby="visit-title" className="scroll-mt-24 bg-cream py-20 text-ink sm:py-24 lg:py-28">
      <div className="mx-auto grid w-[min(1400px,calc(100%-40px))] gap-10 sm:w-[min(1400px,calc(100%-64px))] lg:w-[min(1400px,calc(100%-112px))] lg:grid-cols-[.92fr_1.08fr] lg:items-start lg:gap-12 xl:gap-16">
        <Reveal>
          <p className="mb-6 text-[13px] font-bold uppercase tracking-[.19em] text-gold-dark">Localização</p>
          <h2 id="visit-title" className="max-w-[580px] text-[clamp(40px,4.4vw,66px)] font-semibold leading-[1.09] tracking-[-.065em]">
            Venha nos fazer <span className="text-gold-dark">uma visita.</span>
          </h2>
          <p className="mb-7 mt-6 max-w-[510px] text-[16px] leading-[1.85] text-ink/65 sm:text-[18px]">Estamos em Ibitinga, SP, prontos para te atender. Confira os horários, entre em contato e veja como chegar até a nossa garagem.</p>
          <div className="space-y-3">
            <div className="flex gap-4 rounded-2xl border border-ink/10 bg-white/50 p-4 sm:p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-dark text-white"><MapPin size={22} aria-hidden="true" /></span>
              <div className="min-w-0">
                <h3 className="text-[16px] font-bold">Endereço</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink/65">{contact.address}</p>
                <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-10 items-center gap-2 text-[13px] font-bold text-gold-dark hover:underline">Abrir localização <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-ink/10 bg-white/50 p-4 sm:p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-dark text-white"><Clock3 size={22} aria-hidden="true" /></span>
              <div className="min-w-0 flex-1">
                <h3 className="mb-2 text-[16px] font-bold">Horários de atendimento</h3>
                <div className="space-y-1.5">
                  {contact.schedule.map(item => (
                    <div key={item.days} className="flex flex-wrap items-baseline justify-between gap-x-4 text-[14px] leading-relaxed sm:text-[15px]">
                      <span className="text-ink/65">{item.days}</span><span className="font-semibold tabular-nums">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-ink/10 bg-white/50 p-4 sm:p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-dark text-white"><Phone size={21} aria-hidden="true" /></span>
              <div>
                <h3 className="text-[16px] font-bold">Telefone / WhatsApp</h3>
                <a href={`tel:${contact.phoneE164}`} className="mt-1 block text-[clamp(20px,2.3vw,28px)] font-semibold leading-snug tracking-[-.03em] hover:text-gold-dark">{contact.phoneDisplay}</a>
                <p className="mt-1 text-[14px] text-ink/60">Fale diretamente com a garagem.</p>
              </div>
            </div>
          </div>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="group mt-4 flex min-h-14 items-center justify-center gap-4 rounded-xl bg-night px-6 text-[13px] font-bold uppercase tracking-[.08em] text-ivory transition-colors hover:bg-gold-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark">
            <MessageCircle size={19} aria-hidden="true" /> Falar no WhatsApp <ArrowUpRight size={17} aria-hidden="true" className="ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
        <Reveal delay={.1} className="space-y-5">
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-night shadow-[0_20px_48px_rgba(11,13,13,.12)]">
            <iframe title="Mapa da Marques Veículos em Ibitinga" src={contact.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[430px]" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-night text-ivory">
            <img src="/images/fachada-marques.webp" alt="Fotografia real da garagem Marques Veículos, com carros estacionados atrás do alambrado na fachada." width={1369} height={608} loading="lazy" className="aspect-[16/8] w-full object-cover object-center" />
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
              <div>
                <p className="text-[17px] font-bold">Marques Veículos Garagem</p>
                <p className="mt-1 text-[13px] text-ivory/60">Venha conhecer nossa garagem em Ibitinga, SP.</p>
              </div>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-gold/65 px-5 text-[12px] font-bold uppercase tracking-[.07em] text-gold-light transition-colors hover:bg-gold hover:text-night">Traçar rota <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
