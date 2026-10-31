import { ArrowUp, ArrowUpRight, Instagram, MessageCircle } from 'lucide-react';
import { Reveal } from './Reveal';
import { contact, navLinks, whatsappUrl } from '../data/site';

export function Footer() {
  return (
    <>
      <section id="contato" aria-labelledby="contact-title" className="relative overflow-hidden bg-night-soft px-6 py-24 text-ivory sm:py-32">
        <img
          src="/images/background-contato-marques.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,7,.68)_0%,rgba(5,7,7,.62)_50%,rgba(5,7,7,.78)_100%)]" />
        <div className="relative mx-auto max-w-[1050px] text-center">
          <Reveal>
            <p className="mb-8 text-[13px] font-bold uppercase tracking-[.28em] text-gold">Marques Veículos Garagem</p>
            <h2 id="contact-title" className="font-sans text-[clamp(40px,6.3vw,88px)] font-semibold leading-[1.08] tracking-[-.07em]">Seu próximo passo <em className="block font-display text-[1.21em] font-normal tracking-[-.04em] bg-[linear-gradient(110deg,#98702d_0%,#d6b779_29%,#aa813b_53%,#e5cc93_76%,#866025_100%)] bg-[length:200%_200%] bg-clip-text text-transparent">começa com um olá.</em></h2>
            <p className="mx-auto mt-7 max-w-[560px] text-[18px] leading-[1.8] text-ivory/65">Entre em contato para consultar os veículos disponíveis ou conversar sobre o que procura.</p>
            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-[12px] font-semibold uppercase tracking-[.2em] text-gold-light/85">Atendimento direto pelo WhatsApp</p>
              <a href={whatsappUrl('Olá! Quero falar com a Marques Veículos sobre meu próximo carro.')} target="_blank" rel="noopener noreferrer" className="group relative isolate inline-flex min-h-[64px] max-w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-[#d3b273]/70 bg-[linear-gradient(110deg,#785720,#b58a3d,#d3b273,#97712d,#6a4b19)] bg-[length:200%_200%] px-6 text-[13px] font-bold uppercase tracking-[.08em] text-[#21190d] shadow-[0_12px_36px_rgba(181,138,61,.25)] transition-[background-position,transform,box-shadow] duration-500 ease-in-out hover:-translate-y-1 hover:bg-right hover:shadow-[0_16px_48px_rgba(181,138,61,.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light motion-reduce:transform-none sm:gap-4 sm:px-10 sm:text-[14px]">
                <span aria-hidden="true" className="pointer-events-none absolute -inset-y-8 -left-1/2 w-1/3 rotate-12 bg-white/15 blur-lg transition-transform duration-700 group-hover:translate-x-[440%] motion-reduce:transition-none" />
                <MessageCircle aria-hidden="true" size={21} strokeWidth={1.9} className="relative shrink-0" />
                <span className="relative">Conversar pelo WhatsApp</span>
                <ArrowUpRight aria-hidden="true" size={19} className="relative shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="text-[12px] text-ivory/55">Fale diretamente com a equipe</span>
            </div>
          </Reveal>
        </div>
      </section>
      <footer className="border-t border-white/10 bg-night px-6 py-10 text-ivory sm:py-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="flex flex-col justify-between gap-7 border-b border-white/10 pb-10 lg:flex-row lg:items-center">
            <a href="/#inicio" aria-label="Marques Veículos, início" className="rounded-xl w-[195px] focus-visible:outline-2 focus-visible:outline-gold"><img src="/images/logo-marques.png" alt="Marques Veículos Garagem" width={417} height={167} loading="lazy" /></a>
            <nav aria-label="Links do rodapé" className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {navLinks.map(link => <a key={link.href} href={link.href} className="rounded-xl text-[14px] font-semibold text-ivory/65 transition-colors hover:text-gold-light focus-visible:outline-2 focus-visible:outline-gold">{link.label}</a>)}
              <a href="https://www.instagram.com/marquesveiculos_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Marques Veículos (abre em nova aba)" className="rounded-xl inline-flex items-center gap-2 text-[14px] font-semibold text-ivory/65 transition-colors hover:text-gold-light focus-visible:outline-2 focus-visible:outline-gold">
                <Instagram aria-hidden="true" size={18} strokeWidth={1.8} /> Instagram
              </a>
            </nav>
            <a href="/#inicio" aria-label="Voltar ao início da página" className="rounded-xl flex h-11 w-11 items-center justify-center border border-white/20 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-night focus-visible:outline-2 focus-visible:outline-gold"><ArrowUp aria-hidden="true" size={19} /></a>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-7 text-[13px] leading-relaxed text-ivory/50 sm:flex-row">
            <span>© {new Date().getFullYear()} {contact.company}. {contact.city}.</span>
            <span>Uma nova história começa na estrada.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
