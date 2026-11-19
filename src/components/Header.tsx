import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navLinks, whatsappUrl } from '../data/site';
import { optimizedImage } from '../lib/images';

const contactLink = whatsappUrl('Olá! Gostaria de conhecer a Marques Veículos e as opções disponíveis.');

export function Header({ solid = false }: { solid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const scrolledNow = window.scrollY > 32;
      setScrolled(previous => previous === scrolledNow ? previous : scrolledNow);
    };
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div aria-hidden="true" className="marques-scroll-progress absolute inset-x-0 top-0 z-50 h-[2px] origin-left bg-gold" />
      <div className={`border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${solid || scrolled || menuOpen ? 'border-gold/15 bg-night/98 shadow-[0_12px_32px_rgba(0,0,0,.20)] backdrop-blur-xl' : 'border-white/10 bg-night/40 backdrop-blur-md'}`}>
        <div className="mx-auto flex h-[86px] w-[min(1400px,calc(100%-48px))] items-center justify-between gap-8 lg:h-[96px] lg:w-[min(1400px,calc(100%-112px))]">
          <a href="/#inicio" aria-label="Marques Veículos, voltar ao início" onClick={() => setMenuOpen(false)} className="z-10 -ml-2 flex w-[176px] shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:w-[194px]">
            <img src={optimizedImage("/images/logo-marques.png", 480, 60)} alt="Marques Veículos Garagem" width={417} height={167} className="h-auto w-full object-contain" decoding="async" onError={event => { if (!event.currentTarget.src.endsWith("/images/logo-marques.png")) event.currentTarget.src = "/images/logo-marques.png"; }} />
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex xl:gap-9">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="rounded-xl group relative py-3 text-[14px] font-semibold tracking-[.035em] text-ivory/90 transition-colors hover:text-gold-light focus-visible: focus-visible:outline-2 focus-visible:outline-gold">
                {link.label}
                <span aria-hidden="true" className="absolute bottom-1 left-0 h-px w-0 bg-gold transition-[width] duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a href={contactLink} target="_blank" rel="noopener noreferrer" className="rounded-xl group hidden min-h-12 items-center gap-4 border border-gold/60 bg-night/20 px-5 text-[13px] font-semibold uppercase tracking-[.08em] text-gold-light transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-night focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:inline-flex">
            Falar com a garagem <ArrowUpRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            ref={menuButton}
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen(value => !value)}
            className="z-20 flex h-12 w-12 items-center justify-center border border-gold/55 text-gold-light transition-colors hover:bg-gold/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden"
          >
            {menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen && (
          <nav
            id="menu-mobile"
            aria-label="Navegação mobile"
            className="marques-mobile-nav absolute inset-x-0 top-[86px] flex max-h-[calc(100svh-86px)] min-h-[calc(100svh-86px)] flex-col overflow-y-auto bg-night px-7 pb-12 pt-12 shadow-2xl lg:hidden"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-5 font-display text-[clamp(38px,9vw,52px)] leading-none text-ivory focus-visible:outline-2 focus-visible:outline-gold"
              >
                {link.label}
              </a>
            ))}
            <a href={contactLink} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="mt-10 flex min-h-14 items-center justify-center gap-4 bg-gold px-6 text-[14px] font-bold uppercase tracking-widest text-night focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory">
              Conversar pelo WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <p className="mt-auto pt-12 text-[14px] uppercase tracking-[.22em] text-sand">Ibitinga · São Paulo</p>
          </nav>
      )}
    </header>
  );
}
