import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '../data/site';

const intro = { duration: .82, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.055]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const entrance = (delay: number, distance = 22) => reduce
    ? { initial: false as const }
    : { initial: { opacity: 0, y: distance }, animate: { opacity: 1, y: 0 }, transition: { ...intro, delay } };

  return (
    <section ref={section} id="inicio" aria-labelledby="hero-title" className="relative isolate flex min-h-[850px] items-center overflow-hidden bg-night lg:h-[100svh] lg:min-h-[780px] lg:max-h-[1100px]">
      <motion.div aria-hidden="true" className="absolute inset-0 -z-30" style={reduce ? undefined : { scale, y: translate }}>
        {reduce ? (
          <img src="/images/capa-marques.webp" alt="" width={1920} height={1434} fetchPriority="high" className="h-full w-full object-cover object-[60%_center] lg:object-[center_52%]" />
        ) : (
          <video
            className="h-full w-full object-cover object-[60%_center] lg:object-[center_52%]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            disablePictureInPicture
          >
            <source src="/videos/marques-hero.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,7,7,.53)_0%,rgba(5,7,7,.68)_44%,rgba(5,7,7,.96)_100%)] lg:bg-[linear-gradient(90deg,rgba(5,7,7,.98)_0%,rgba(5,7,7,.94)_21%,rgba(5,7,7,.81)_40%,rgba(5,7,7,.34)_69%,rgba(5,7,7,.09)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-night/85 to-transparent" />
      <div className="relative z-10 mx-auto flex w-[calc(100%-56px)] items-center pb-[138px] pt-[186px] sm:w-[calc(100%-80px)] sm:pb-[145px] lg:w-[calc(100%-128px)] lg:pb-[96px] lg:pt-[150px]">
        <div className="max-w-[690px]">
          <motion.div {...entrance(.10, 12)} className="mb-8 text-[12px] font-semibold uppercase tracking-[.22em] text-gold-light sm:mb-10 sm:text-[13px]">
            Ibitinga, São Paulo
          </motion.div>
          <h1 id="hero-title" className="max-w-[690px] font-sans text-[clamp(43px,5.15vw,82px)] font-semibold leading-[1.095] tracking-[-.071em] text-ivory">
            <motion.span className="block" {...entrance(.22, 27)}>O seu próximo</motion.span>
            <motion.span className="block" {...entrance(.34, 27)}>capítulo começa</motion.span>
            <motion.em className="mt-3 block font-display text-[1.17em] font-normal leading-[.99] tracking-[-.04em] text-gold-light" {...entrance(.47, 20)}>na estrada.</motion.em>
          </h1>
          <motion.p {...entrance(.59)} className="mt-9 max-w-[460px] border-l border-gold/65 pl-5 text-[17px] leading-[1.85] text-ivory/85 sm:mt-10 sm:pl-6 sm:text-[18px]">
            Estamos em Ibitinga. Conheça os modelos apresentados e converse com a equipe sobre o carro que você procura.
          </motion.p>
          <motion.div {...entrance(.71, 15)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-11">
            <a href="#veiculos" className="group inline-flex min-h-[60px] items-center justify-between gap-8 rounded-none bg-[linear-gradient(90deg,#bf953f,#fcf6ba,#b38728,#fbf5b7,#aa771c)] bg-[length:200%_200%] px-7 text-[13px] font-bold uppercase tracking-[.08em] text-[#52400c] shadow-[5px_5px_10px_rgba(0,0,0,.14)] transition-[background-position,transform,box-shadow] duration-700 ease-in-out hover:scale-[.97] hover:bg-right hover:shadow-[3px_3px_12px_rgba(0,0,0,.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light motion-reduce:transform-none sm:px-9">
              Conhecer veículos <ArrowRight aria-hidden="true" size={20} className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
            </a>
            <a href={whatsappUrl('Olá! Quero conhecer as opções da Marques Veículos.')} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center gap-3 border-b border-ivory/35 text-[15px] font-medium text-ivory transition-[color,border-color] duration-300 hover:border-gold-light hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
              Conversar com a equipe <ArrowUpRight aria-hidden="true" size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
            </a>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-night/25">
        <div className="mx-auto flex min-h-[74px] w-[min(1400px,calc(100%-44px))] items-center justify-between gap-5 sm:w-[min(1400px,calc(100%-64px))] lg:w-[min(1400px,calc(100%-112px))]">
          <span className="hidden text-[12px] font-semibold uppercase tracking-[.17em] text-ivory/50 sm:block">Marques Veículos · Garagem</span>
          <a href="#veiculos" className="group inline-flex min-h-12 items-center gap-3 text-[12px] font-semibold uppercase tracking-[.16em] text-ivory/80 transition-colors hover:text-gold-light focus-visible:outline-2 focus-visible:outline-gold-light">
            Explore a garagem <ArrowDown aria-hidden="true" size={17} className="transition-transform duration-300 group-hover:translate-y-1 motion-reduce:transform-none" />
          </a>
        </div>
      </div>
    </section>
  );
}
