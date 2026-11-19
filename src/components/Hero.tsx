import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '../data/site';

export function Hero() {
  const background = useRef<HTMLDivElement>(null);
  const [playVideo, setPlayVideo] = useState(false);
  // A fotografia é o LCP. Vídeo cinematográfico só entra após o carregamento
  // e apenas em desktop sem economia de dados ou preferência por menos movimento.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (!media.matches || connection?.saveData || connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') return;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    const schedule = () => {
      // Espera a fase crítica do LCP terminar antes de pedir o vídeo.
      timeout = setTimeout(() => {
        if (typeof window.requestIdleCallback === 'function') {
          idleId = window.requestIdleCallback(() => setPlayVideo(true), { timeout: 4500 });
        } else {
          setPlayVideo(true);
        }
      }, 3400);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      window.removeEventListener('load', schedule);
      if (timeout !== undefined) clearTimeout(timeout);
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
    };
  }, []);
  // Paralaxe apenas no desktop: RAF passivo, sem dependência de animação no bundle crítico.
  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!background.current) return;
      const amount = Math.min(Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0), 1);
      background.current.style.transform = `translate3d(0,${Math.round(amount * 42)}px,0) scale(${1 + amount * 0.045})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night lg:h-[100svh] lg:min-h-[780px] lg:max-h-[1100px]">
      <div ref={background} aria-hidden="true" className="absolute inset-0 -z-30">
        <img
          src="/images/capa-marques.webp"
          alt=""
          width={1920}
          height={1434}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-[60%_center] lg:object-[center_52%]"
        />
        {playVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover object-[60%_center] lg:object-[center_52%]"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/capa-marques.webp"
            aria-hidden="true"
            disablePictureInPicture
          >
            <source src="/videos/marques-hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,7,7,.53)_0%,rgba(5,7,7,.68)_44%,rgba(5,7,7,.96)_100%)] lg:bg-[linear-gradient(90deg,rgba(5,7,7,.98)_0%,rgba(5,7,7,.94)_21%,rgba(5,7,7,.81)_40%,rgba(5,7,7,.34)_69%,rgba(5,7,7,.09)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-night/85 to-transparent" />
      <div className="relative z-10 mx-auto flex w-[calc(100%-40px)] items-center pb-[138px] pt-[186px] sm:w-[calc(100%-64px)] sm:pb-[145px] lg:w-[calc(100%-128px)] lg:pb-[96px] lg:pt-[150px]">
        <div className="max-w-[690px]">
          <div className="marques-hero-enter mb-8 text-[12px] font-semibold uppercase tracking-[.22em] text-gold-light sm:mb-10 sm:text-[13px]">
            Garagem de carros em Ibitinga e região
          </div>
          <h1 id="hero-title" className="max-w-[690px] font-sans text-[clamp(43px,5.15vw,82px)] font-semibold leading-[1.095] tracking-[-.071em] text-ivory">
            <span className="block">O seu próximo</span>
            <span className="block">capítulo começa</span>
            <em className="mt-3 block font-display text-[1.17em] font-normal leading-[.99] tracking-[-.04em] text-gold-light">na estrada.</em>
          </h1>
          <p className="mt-9 max-w-[460px] border-l border-gold/65 pl-5 text-[17px] leading-[1.85] text-ivory/85 sm:mt-10 sm:pl-6 sm:text-[18px]">
            Estamos em Ibitinga. Conheça os modelos apresentados e converse com a equipe sobre o carro que você procura.
          </p>
          <div className="marques-hero-enter marques-hero-cta mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-11">
            <a href="#veiculos" className="group inline-flex min-h-[60px] items-center justify-between gap-8 rounded-xl bg-[linear-gradient(110deg,#785720,#b58a3d,#d3b273,#97712d,#6a4b19)] bg-[length:200%_200%] px-7 text-[13px] font-bold uppercase tracking-[.08em] text-[#20180c] shadow-[0_8px_24px_rgba(0,0,0,.2)] transition-[background-position,transform,box-shadow] duration-700 ease-in-out hover:scale-[.97] hover:bg-right hover:shadow-[3px_3px_12px_rgba(0,0,0,.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light motion-reduce:transform-none sm:px-9">
              Conhecer veículos <ArrowRight aria-hidden="true" size={20} className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
            </a>
            <a href={whatsappUrl('Olá! Quero conhecer as opções da Marques Veículos.')} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center gap-3 rounded-xl border border-gold-light/35 bg-white/[.045] px-5 py-2 text-[15px] font-medium text-ivory transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold-light/75 hover:bg-gold-light/10 hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light motion-reduce:transform-none">
              Conversar com a equipe <ArrowUpRight aria-hidden="true" size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-night/25">
        <div className="mx-auto flex min-h-[74px] w-[min(1400px,calc(100%-44px))] items-center justify-between gap-5 sm:w-[min(1400px,calc(100%-64px))] lg:w-[min(1400px,calc(100%-112px))]">
          <span className="hidden text-[12px] font-semibold uppercase tracking-[.17em] text-ivory/50 sm:block">Marques Veículos · Garagem</span>
          <a href="#veiculos" className="rounded-xl group inline-flex min-h-12 items-center gap-3 text-[12px] font-semibold uppercase tracking-[.16em] text-ivory/80 transition-colors hover:text-gold-light focus-visible:outline-2 focus-visible:outline-gold-light">
            Explore a garagem <ArrowDown aria-hidden="true" size={17} className="transition-transform duration-300 group-hover:translate-y-1 motion-reduce:transform-none" />
          </a>
        </div>
      </div>
    </section>
  );
}
