import { ArrowUpRight, MessageCircle, MapPinned, CarFront } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal } from './Reveal';
import { whatsappUrl } from '../data/site';

const journey = [
  { number: '01', icon: MessageCircle, title: 'Comece a conversa', detail: 'Fale sobre o que procura e tire suas dúvidas diretamente pelo WhatsApp.' },
  { number: '02', icon: CarFront, title: 'Conheça as opções', detail: 'Consulte quais veículos estão disponíveis e peça mais informações.' },
  { number: '03', icon: MapPinned, title: 'Visite a garagem', detail: 'Encontre a Marques Veículos em Ibitinga e conheça o espaço.' },
] as const;

export function Story() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="garagem" aria-labelledby="story-title" className="relative isolate overflow-hidden bg-night py-24 sm:py-28 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute left-[-17vw] top-10 h-[620px] w-[620px] rounded-full bg-gold/[.035] blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[43%] -translate-y-1/2 overflow-hidden select-none">
        <motion.div
          className="flex w-max items-center"
          initial={false}
          animate={reduceMotion ? { x: '0%' } : { x: ['0%', '-50%'] }}
          transition={reduceMotion ? undefined : { duration: 42, ease: 'linear', repeat: Infinity }}
        >
          {[0, 1].map(copy => (
            <div key={copy} className="flex shrink-0 items-center gap-[6vw] whitespace-nowrap pr-[6vw] font-display text-[clamp(125px,22vw,360px)] font-medium italic leading-none tracking-[-.065em] text-gold/[.16]">
              <span>MARQUES VEÍCULOS</span>
              <span>MARQUES VEÍCULOS</span>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="relative mx-auto grid w-[min(1400px,calc(100%-48px))] gap-12 lg:w-[min(1400px,calc(100%-112px))] lg:grid-cols-[1.14fr_.86fr] lg:gap-20">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <Reveal>
            <p className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.21em] text-gold"><span aria-hidden="true" className="h-px w-8 bg-gold" /> A garagem</p>
            <h2 id="story-title" className="max-w-[690px] font-sans text-[clamp(41px,5.3vw,76px)] font-semibold leading-[1.09] tracking-[-.066em] text-ivory">
              Seu próximo carro começa <em className="block font-display text-[1.2em] font-normal tracking-[-.042em] text-gold-light">com uma conversa.</em>
            </h2>
            <p className="mt-8 max-w-[460px] text-[16px] leading-[1.9] text-ivory/65">
              Conte à equipe que tipo de carro você procura. Pergunte sobre os modelos disponíveis e tire suas dúvidas antes de visitar a garagem.
            </p>
            <a href={whatsappUrl('Olá! Gostaria de conversar com a Marques Veículos sobre meu próximo carro.')} target="_blank" rel="noopener noreferrer" className="group mt-9 inline-flex min-h-12 items-center gap-3 border-b border-gold/60 pb-1 text-[11px] font-bold uppercase tracking-[.13em] text-gold-light transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
              Iniciar conversa <ArrowUpRight aria-hidden="true" size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
        <div className="border-t border-white/15">
          {journey.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.number} delay={index * .065}>
                <div className="grid grid-cols-[38px_1fr] gap-4 border-b border-white/15 py-9 sm:grid-cols-[56px_1fr] sm:gap-6 sm:py-12">
                  <span className="pt-1 text-[11px] font-semibold tracking-[.13em] text-gold-dark">{item.number}</span>
                  <div>
                    <Icon aria-hidden="true" size={22} strokeWidth={1.35} className="mb-7 text-gold" />
                    <h3 className="font-display text-[clamp(29px,3.3vw,44px)] leading-none font-medium text-ivory">{item.title}</h3>
                    <p className="mt-4 max-w-[370px] text-[14px] leading-[1.8] text-ivory/58">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
