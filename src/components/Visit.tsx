import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Clock3, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Reveal } from './Reveal';
import { contact, whatsappUrl } from '../data/site';

const whatsapp = whatsappUrl('Olá! Gostaria de falar com a Marques Veículos.');

export function Visit() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.075, 1]);
  const photoY = useTransform(scrollYProgress, [0, 1], [-18, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.68, 0.34, 0]);
  const highlightOpacity = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [0, 0.55, 0]);
  const highlightY = useTransform(scrollYProgress, [0, 1], [-28, 100]);

  return (
    <section ref={sectionRef} id="localizacao" aria-labelledby="visit-title" className="relative isolate flex min-h-[min(850px,100svh)] scroll-mt-20 items-center overflow-hidden bg-night py-16 text-ivory sm:py-20 lg:py-24">
      {/* Revelação cinematográfica vinculada ao scroll, sem alterar a altura da seção. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 -z-20 bg-[url('/images/imagem-div-localizacao.png')] bg-cover bg-[68%_center] lg:bg-[76%_center]"
        style={reducedMotion ? undefined : { scale: photoScale, y: photoY }}
      />
      {/* Escurecimento lateral com transição aberta para revelar a garagem à direita. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,4,4,.96)_0%,rgba(4,4,4,.87)_19%,rgba(4,4,4,.58)_38%,rgba(4,4,4,.14)_64%,transparent_85%)] max-lg:bg-[linear-gradient(90deg,rgba(4,4,4,.86)_0%,rgba(4,4,4,.52)_45%,rgba(4,4,4,.08)_100%)]" />
      {/* Recorte diagonal tipo /, sutil e sem linhas rígidas. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[64%] bg-[linear-gradient(90deg,rgba(0,0,0,.54),rgba(0,0,0,.18),transparent)] [clip-path:polygon(0_0,85%_0,58%_100%,0_100%)] max-lg:w-[82%] max-sm:w-full max-sm:opacity-55" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[clamp(145px,19vw,265px)] bg-gradient-to-b from-night via-night/65 to-transparent" />
      {!reducedMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-night"
            style={{ opacity: veilOpacity }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[8%] top-0 z-0 h-px bg-[linear-gradient(90deg,transparent,rgba(213,177,107,.7),transparent)] blur-[.5px]"
            style={{ opacity: highlightOpacity, y: highlightY }}
          />
        </>
      )}
      <div className="relative mx-auto w-[min(1440px,calc(100%-32px))] sm:w-[min(1440px,calc(100%-72px))] lg:w-[min(1440px,calc(100%-100px))]">
        <Reveal className="max-w-[510px]">
          <div className="rounded-[26px] border border-gold/30 bg-[#171210]/82 px-6 py-7 shadow-[0_22px_75px_rgba(0,0,0,.4)] backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10 lg:py-9">
            <p className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[.27em] text-gold-light"><MapPin size={20} aria-hidden="true" /> Localização</p>
            <h2 id="visit-title" className="text-[clamp(34px,3.5vw,50px)] font-semibold leading-[1.07] tracking-[-.055em]">Venha nos fazer uma visita.</h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-ivory/85">Somos uma garagem de carros em Ibitinga, SP, com atendimento para quem procura veículos na cidade e região. Confira os horários, consulte os modelos disponíveis e venha conhecer nossa garagem.</p>
            <div className="mt-7 divide-y divide-gold/20">
              <div className="flex gap-4 pb-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold-light"><MapPin size={23} aria-hidden="true" /></span>
                <div className="min-w-0">
                  <h3 className="text-[14px] font-bold uppercase tracking-[.1em] text-gold-light">Endereço</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ivory/90">{contact.address}</p>
                  <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-3 rounded-xl bg-gradient-to-r from-[#f8d18b] to-[#d99b43] px-5 text-[14px] font-bold text-[#17110b] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Abrir localização <ArrowUpRight size={17} aria-hidden="true" /></a>
                </div>
              </div>
              <div className="flex gap-4 py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold-light"><Clock3 size={23} aria-hidden="true" /></span>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 text-[14px] font-bold uppercase tracking-[.1em] text-gold-light">Horários de atendimento</h3>
                  <div className="space-y-1.5">
                    {contact.schedule.map(item => (
                      <div key={item.days} className="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-white/10 pb-1 text-[14px] last:border-b-0"><span className="text-ivory/90">{item.days}</span><span className="font-semibold tabular-nums">{item.hours}</span></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold-light"><Phone size={23} aria-hidden="true" /></span>
                <div className="min-w-0">
                  <h3 className="text-[14px] font-bold uppercase tracking-[.1em] text-gold-light">Telefone / WhatsApp</h3>
                  <a href={`tel:${contact.phoneE164}`} className="mt-1 block text-[clamp(22px,2vw,27px)] font-semibold tracking-[-.03em] hover:text-gold-light">{contact.phoneDisplay}</a>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-3 rounded-xl bg-gradient-to-r from-[#f8d18b] to-[#d99b43] px-5 text-[14px] font-bold text-[#17110b] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"><MessageCircle size={18} aria-hidden="true" /> Falar no WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
