import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '../data/site';

const intro = { duration: .9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, 95]);

  return (
    <section ref={section} id="inicio" aria-labelledby="hero-title" className="relative isolate flex min-h-[850px] items-end overflow-hidden bg-night lg:h-[100svh] lg:min-h-[780px] lg:max-h-[1080px] lg:items-center">
      <motion.div aria-hidden="true" className="absolute inset-0 -z-30" style={reduce ? undefined : { scale, y: translate }}>
        <img src="/images/capa-marques.webp" alt="" width={1920} height={1434} fetchPriority="high" className="h-full w-full object-cover object-[52%_center] lg:object-[center_52%]" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(7,9,9,.5)_0%,rgba(7,9,9,.26)_20%,rgba(7,9,9,.60)_52%,rgba(7,9,9,.89)_100%)] lg:bg-[linear-gradient(90deg,rgba(6,8,8,.93)_0%,rgba(6,8,8,.82)_27%,rgba(6,8,8,.38)_58%,rgba(6,8,8,.06)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[28%] bg-gradient-to-t from-night/80 to-transparent" />
      <div className="mx-auto w-[min(1400px,calc(100%-48px))] pb-[138px] pt-[180px] md:pb-[150px] lg:w-[min(1400px,calc(100%-112px))] lg:pb-[65px] lg:pt-[138px]">
        <div className="max-w-[780px]">
          <motion.div initial={{ opacity: 0, y: 17 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: .08 }} className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-gold-light sm:text-[11px]">
            <span aria-hidden="true" className="h-px w-8 bg-gold" /> Ibitinga, São Paulo
          </motion.div>
          <h1 id="hero-title" className="max-w-[760px] text-balance font-sans text-[clamp(48px,7.2vw,98px)] font-semibold leading-[1.08] tracking-[-.073em] text-ivory">
            <motion.span className="block" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: .16 }}>O seu próximo</motion.span>
            <motion.span className="block" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: .29 }}>capítulo começa</motion.span>
            <motion.em className="block font-display text-[1.17em] font-normal leading-[.99] tracking-[-.04em] text-gold-light" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: .41 }}>na estrada.</motion.em>
          </h1>
          <motion.p initial={{ opacity: 0, y: 21 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: .56 }} className="mt-7 max-w-[450px] text-[15px] leading-[1.9] text-ivory/78 md:text-[17px]">
            Estamos em Ibitinga. Conheça os modelos apresentados e converse com a equipe sobre o carro que você procura.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...intro, delay: .7 }} className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10 sm:gap-7">
            <a href="#veiculos" className="group inline-flex min-h-14 items-center justify-between gap-6 bg-gold px-6 text-xs font-bold uppercase tracking-[.1em] text-night transition-all duration-300 hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light sm:px-8">
              Explorar veículos <ArrowRight aria-hidden="true" size={19} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href={whatsappUrl('Olá! Quero conhecer as opções da Marques Veículos.')} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center gap-3 text-[12px] font-semibold text-ivory transition-colors hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
              Falar com a equipe <ArrowUpRight aria-hidden="true" size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-night/15">
        <div className="mx-auto flex min-h-[72px] w-[min(1400px,calc(100%-48px))] items-center justify-between gap-4 lg:w-[min(1400px,calc(100%-112px))]">
          <span className="hidden text-[10px] font-semibold uppercase tracking-[.21em] text-white/65 sm:block">Marques Veículos · Garagem</span>
          <a href="#veiculos" className="group inline-flex min-h-12 items-center gap-4 text-[10px] font-semibold uppercase tracking-[.19em] text-ivory/85 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold">
            Role para descobrir <ArrowDown aria-hidden="true" size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
          </a>
          <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-gold-light">Interior de SP</span>
        </div>
      </div>
    </section>
  );
}
