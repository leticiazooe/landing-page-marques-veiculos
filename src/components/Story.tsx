import { ArrowUpRight, CarFront } from 'lucide-react';
import { Reveal } from './Reveal';

export function Story() {
  return (
    <section id="garagem" aria-labelledby="story-title" className="relative isolate overflow-hidden bg-night py-16 text-ivory sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(160,113,57,.08),transparent_65%)]" aria-hidden="true" />
      <div className="relative mx-auto grid w-[min(1400px,calc(100%-40px))] items-center gap-9 sm:w-[min(1400px,calc(100%-64px))] lg:w-[min(1400px,calc(100%-112px))] lg:grid-cols-[.92fr_1.08fr] lg:gap-12 xl:gap-16">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[.2em] text-gold-light">
            <span className="h-px w-8 bg-gold" aria-hidden="true" /> A garagem
          </p>
          <h2 id="story-title" className="max-w-[600px] text-[clamp(40px,4.5vw,68px)] font-semibold leading-[1.1] tracking-[-.065em]">
            A garagem, <em className="block font-display text-[1.17em] font-normal italic tracking-[-.035em] text-gold-light">de perto.</em>
          </h2>
          <p className="mt-6 max-w-[465px] text-[16px] leading-[1.85] text-ivory/75 sm:text-[18px]">
            Conheça nossas opções, converse com a equipe e venha nos visitar em Ibitinga.
          </p>
          <a href="#veiculos" className="group mt-8 inline-flex min-h-14 items-center justify-center gap-4 rounded-xl border border-gold/70 bg-gold/[.08] px-6 py-3 text-[12px] font-bold uppercase tracking-[.1em] text-gold-light transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-night focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-reduce:transform-none">
            <CarFront size={19} aria-hidden="true" /> Ver veículos disponíveis
            <ArrowUpRight size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
          </a>
        </Reveal>
        <Reveal delay={.1}>
          <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-night-soft shadow-[0_20px_70px_rgba(0,0,0,.2)]">
            <img
              src="/images/garagem-editorial-marques.jpg"
              alt="Cena ilustrativa de um showroom automotivo premium com veículo escuro e iluminação dourada."
              width={844}
              height={830}
              loading="lazy"
              decoding="async"
              className="aspect-[5/4] w-full object-cover object-center sm:aspect-[6/4] lg:aspect-[5/4]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/30 via-transparent to-transparent" />
          </div>
          <p className="mt-3 text-right text-[12px] text-ivory/45">Imagem ilustrativa</p>
        </Reveal>
      </div>
    </section>
  );
}
