import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navLinks, whatsappUrl } from '../data/site';

const contactLink = whatsappUrl('Olá! Gostaria de conhecer a Marques Veículos e as opções disponíveis.');

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 95, damping: 25, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
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
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-50 h-[2px] origin-left bg-gold"
        style={{ scaleX: smoothProgress }}
      />
      <div className={`border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${scrolled || menuOpen ? 'border-white/10 bg-night/95 backdrop-blur-xl' : 'border-white/10 bg-night/25 backdrop-blur-sm'}`}>
        <div className="mx-auto flex h-[86px] w-[min(1400px,calc(100%-48px))] items-center justify-between gap-8 lg:h-[104px] lg:w-[min(1400px,calc(100%-112px))]">
          <a href="/#inicio" aria-label="Marques Veículos, voltar ao início" onClick={() => setMenuOpen(false)} className="z-10 -ml-2 flex w-[176px] shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:w-[210px]">
            <img src="/images/logo-marques.png" alt="Marques Veículos Garagem" width={417} height={167} className="h-auto w-full object-contain" />
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="group relative py-3 text-[14px] font-semibold tracking-[.035em] text-ivory/85 transition-colors hover:text-gold-light focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-gold">
                {link.label}
                <span aria-hidden="true" className="absolute bottom-1 left-0 h-px w-0 bg-gold transition-[width] duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a href={contactLink} target="_blank" rel="noopener noreferrer" className="group hidden min-h-11 items-center gap-5 border border-gold/70 px-5 text-[13px] font-bold uppercase tracking-[.13em] text-gold-light transition-colors duration-300 hover:bg-gold hover:text-night focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:inline-flex">
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
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navegação mobile"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[86px] flex max-h-[calc(100svh-86px)] min-h-[calc(100svh-86px)] flex-col overflow-y-auto bg-night px-7 pb-12 pt-12 shadow-2xl lg:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.045, duration: .35 }}
                className="border-b border-white/10 py-5 font-display text-[clamp(38px,9vw,52px)] leading-none text-ivory focus-visible:outline-2 focus-visible:outline-gold"
              >
                {link.label}
              </motion.a>
            ))}
            <a href={contactLink} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="mt-10 flex min-h-14 items-center justify-center gap-4 bg-gold px-6 text-[14px] font-bold uppercase tracking-widest text-night focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory">
              Conversar pelo WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <p className="mt-auto pt-12 text-[14px] uppercase tracking-[.22em] text-sand">Ibitinga · São Paulo</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
