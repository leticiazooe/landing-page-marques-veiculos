import { ArrowUp, ArrowUpRight, Instagram } from 'lucide-react';
import { Reveal } from './Reveal';
import { contact, navLinks, whatsappUrl } from '../data/site';

export function Footer() {
  return (
    <>
      <section id="contato" aria-labelledby="contact-title" className="relative overflow-hidden bg-night-soft px-6 py-24 text-ivory sm:py-32">
        <div aria-hidden="true" className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_50%_120%,rgba(164,126,69,.18),transparent_65%)]" />
        <div className="relative mx-auto max-w-[1050px] text-center">
          <Reveal>
            <p className="mb-8 text-[13px] font-bold uppercase tracking-[.28em] text-gold">Marques Veículos Garagem</p>
            <h2 id="contact-title" className="font-sans text-[clamp(40px,6.3vw,88px)] font-semibold leading-[1.08] tracking-[-.07em]">Seu próximo passo <em className="block font-display text-[1.21em] font-normal tracking-[-.04em] bg-[linear-gradient(110deg,#98702d_0%,#d6b779_29%,#aa813b_53%,#e5cc93_76%,#866025_100%)] bg-[length:200%_200%] bg-clip-text text-transparent">começa com um olá.</em></h2>
            <p className="mx-auto mt-7 max-w-[560px] text-[18px] leading-[1.8] text-ivory/65">Entre em contato para consultar os veículos disponíveis ou conversar sobre o que procura.</p>
            <a href={whatsappUrl('Olá! Quero falar com a Marques Veículos sobre meu próximo carro.')} target="_blank" rel="noopener noreferrer" className="group mt-10 inline-flex min-h-14 items-center justify-between gap-7 rounded-xl border border-[#c2a065]/60 bg-[linear-gradient(110deg,#785720,#b58a3d,#d3b273,#97712d,#6a4b19)] bg-[length:200%_200%] px-7 text-[14px] font-bold uppercase tracking-[.10em] text-[#21190d] shadow-[0_10px_30px_rgba(0,0,0,.2)] transition-[background-position,transform,box-shadow] duration-700 ease-in-out hover:scale-[.98] hover:bg-right hover:shadow-[0_14px_34px_rgba(0,0,0,.28)] motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light sm:px-10">
              Conversar pelo WhatsApp <ArrowUpRight aria-hidden="true" size={20} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
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
