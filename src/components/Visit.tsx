import { ArrowUpRight, Clock3, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Reveal } from './Reveal';
import { contact, whatsappUrl } from '../data/site';

const whatsapp = whatsappUrl('Olá! Gostaria de falar com a Marques Veículos.');

export function Visit() {
  return (
    <section id="localizacao" aria-labelledby="visit-title" className="scroll-mt-24 bg-cream py-14 text-ink sm:py-16 lg:py-10 xl:py-12">
      <div className="mx-auto grid w-[min(1400px,calc(100%-40px))] gap-7 sm:w-[min(1400px,calc(100%-64px))] lg:w-[min(1400px,calc(100%-112px))] lg:grid-cols-[.94fr_1.06fr] lg:items-start lg:gap-8 xl:gap-10">
        <Reveal>
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[.19em] text-gold-dark">Localização</p>
          <h2 id="visit-title" className="max-w-[580px] text-[clamp(36px,3.2vw,52px)] font-semibold leading-[1.08] tracking-[-.06em]">
            Venha nos fazer <span className="text-gold-dark">uma visita.</span>
          </h2>
          <p className="mb-4 mt-3 max-w-[510px] text-[15px] leading-[1.65] text-ink/65 sm:text-[16px]">
            Estamos em Ibitinga, SP. Confira os horários e venha conhecer nossa garagem.
          </p>

          <div className="space-y-2">
            <div className="flex gap-3 rounded-xl border border-ink/10 bg-white/55 p-3 sm:p-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-dark text-white"><MapPin size={19} aria-hidden="true" /></span>
              <div className="min-w-0">
                <h3 className="text-[15px] font-bold leading-snug">Endereço</h3>
                <p className="mt-1 text-[14px] leading-[1.5] text-ink/65">{contact.address}</p>
                <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 text-[12px] font-bold text-gold-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-gold-dark">
                  Abrir localização <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-ink/10 bg-white/55 p-3 sm:p-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-dark text-white"><Clock3 size={19} aria-hidden="true" /></span>
              <div className="min-w-0 flex-1">
                <h3 className="mb-1 text-[15px] font-bold leading-snug">Horários de atendimento</h3>
                <div className="space-y-0.5">
                  {contact.schedule.map(item => (
                    <div key={item.days} className="flex flex-wrap items-baseline justify-between gap-x-3 text-[13px] leading-[1.5] sm:text-[14px]">
                      <span className="text-ink/65">{item.days}</span>
                      <span className="font-semibold tabular-nums">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-ink/10 bg-white/55 p-3 sm:p-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-dark text-white"><Phone size={19} aria-hidden="true" /></span>
              <div>
                <h3 className="text-[15px] font-bold leading-snug">Telefone / WhatsApp</h3>
                <a href={`tel:${contact.phoneE164}`} className="mt-1 block text-[clamp(20px,2vw,25px)] font-semibold leading-tight tracking-[-.03em] hover:text-gold-dark">{contact.phoneDisplay}</a>
              </div>
            </div>
          </div>

          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="group mt-3 flex min-h-12 items-center justify-center gap-3 rounded-xl bg-night px-5 py-2 text-[12px] font-bold uppercase tracking-[.08em] text-ivory transition-colors hover:bg-gold-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark">
            <MessageCircle size={18} aria-hidden="true" /> Falar no WhatsApp
            <ArrowUpRight size={16} aria-hidden="true" className="ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        <Reveal delay={.1} className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-ink/10 bg-night shadow-[0_12px_32px_rgba(11,13,13,.10)]">
            <iframe title="Mapa da Marques Veículos em Ibitinga" src={contact.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="block h-[250px] w-full border-0 sm:h-[290px] lg:h-[290px]" />
          </div>
          <div className="relative overflow-hidden rounded-xl border border-ink/10 bg-night text-ivory shadow-[0_12px_32px_rgba(11,13,13,.10)]">
            <img
              src="/images/fachada-marques.jpg"
              alt="Fotografia real da garagem Marques Veículos, com carros estacionados atrás do alambrado na fachada."
              width={1369}
              height={608}
              loading="lazy"
              className="h-[230px] w-full object-cover object-center sm:h-[240px] lg:h-[220px]"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 bg-gradient-to-t from-night/95 via-night/75 to-transparent px-4 pb-4 pt-12 sm:px-5">
              <div>
                <p className="text-[15px] font-bold">Marques Veículos Garagem</p>
                <p className="text-[12px] text-ivory/75">Ibitinga, SP</p>
              </div>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-gold/70 bg-night/55 px-4 text-[11px] font-bold uppercase tracking-[.06em] text-gold-light transition-colors hover:bg-gold hover:text-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light">
                Traçar rota <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
