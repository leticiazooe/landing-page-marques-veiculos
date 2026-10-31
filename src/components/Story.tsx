import { ArrowUpRight, MessageCircle, MapPinned, CarFront } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal } from './Reveal';
import { whatsappUrl } from '../data/site';

const journey = [
  { icon: MessageCircle, title: 'Comece a conversa', detail: 'Fale sobre o que procura e tire suas dúvidas diretamente pelo WhatsApp.' },
  { icon: CarFront, title: 'Conheça as opções', detail: 'Consulte quais veículos estão disponíveis e peça mais informações.' },
  { icon: MapPinned, title: 'Visite a garagem', detail: 'Encontre a Marques Veículos em Ibitinga e conheça o espaço.' },
] as const;

export function Story() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="garagem" aria-labelledby="story-title" className="relative isolate overflow-hidden bg-night py-24 sm:py-28 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute left-[-17vw] top-10 h-[620px] w-[620px] rounded-full bg-gold/[.035] blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[43%] -translate-y-1/2 overflow-hidden select-none">
        <div className="marques-marquee-track flex w-max items-center">
          {[0, 1].map(copy => (
            <div key={copy} className="flex shrink-0 items-center gap-[5vw] whitespace-nowrap pr-[5vw] font-display text-[clamp(180px,29vw,510px)] font-medium italic leading-none tracking-[-.065em] text-gold/[.045]">
              <span>MARQUES VEÍCULOS</span>
              <span>MARQUES VEÍCULOS</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto grid w-[min(1400px,calc(100%-48px))] gap-12 lg:w-[min(1400px,calc(100%-112px))] lg:grid-cols-[1.14fr_.86fr] lg:gap-20">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <Reveal>
            <p className="mb-7 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[.21em] text-gold"><span aria-hidden="true" className="h-px w-8 bg-gold" /> A garagem</p>
            <h2 id="story-title" className="max-w-[690px] font-sans text-[clamp(41px,5.3vw,76px)] font-semibold leading-[1.09] tracking-[-.066em] text-ivory">
              Seu próximo carro começa <em className="block font-display text-[1.2em] font-normal tracking-[-.042em] bg-[linear-gradient(110deg,#98702d_0%,#d6b779_29%,#aa813b_53%,#e5cc93_76%,#866025_100%)] bg-[length:200%_200%] bg-clip-text text-transparent">com uma conversa.</em>
            </h2>
            <p className="mt-8 max-w-[460px] text-[18px] leading-[1.9] text-ivory/65">
              Conte à equipe que tipo de carro você procura. Pergunte sobre os modelos disponíveis e tire suas dúvidas antes de visitar a garagem.
            </p>
            <a href={whatsappUrl('Olá! Gostaria de conversar com a Marques Veículos sobre meu próximo carro.')} target="_blank" rel="noopener noreferrer" className="group mt-9 inline-flex min-h-14 max-w-full items-center justify-center gap-4 rounded-xl border border-gold/65 bg-gold/[.07] px-6 py-3 text-[13px] font-bold uppercase tracking-[.11em] text-gold-light shadow-[0_8px_24px_rgba(0,0,0,.16)] transition-[background-color,border-color,color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-gold-light hover:bg-gold hover:text-night hover:shadow-[0_12px_30px_rgba(213,177,107,.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-reduce:transform-none">
              Iniciar conversa <ArrowUpRight aria-hidden="true" size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
            </a>
          </Reveal>
        </div>
        <div className="border-t border-white/15">
          {journey.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: '0px 0px -55px 0px' }}
                transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-white/15 py-9 sm:py-12"
              >
                <Icon aria-hidden="true" size={22} strokeWidth={1.35} className="mb-7 text-gold" />
                <h3 className="font-display text-[clamp(29px,3.3vw,44px)] leading-none font-medium text-ivory">{item.title}</h3>
                <p className="mt-4 max-w-[370px] text-[16px] leading-[1.8] text-ivory/58">{item.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
