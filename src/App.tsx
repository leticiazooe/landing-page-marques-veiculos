import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { VehicleDetails } from './components/VehicleDetails';
import { Story } from './components/Story';
import { BrandStrip } from './components/BrandStrip';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';
import { vehicles } from './data/site';

function readVehicle(): string | null { return new URLSearchParams(window.location.search).get('veiculo'); }

export default function App() {
  const [id, setId] = useState<string | null>(readVehicle);
  const selected = vehicles.find(v => v.id === id);
  useEffect(() => {
    const onPop = () => setId(readVehicle());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const navigate = useCallback((next: string | null) => {
    const url = new URL(window.location.href);
    if (next) { url.searchParams.set('veiculo', next); url.hash = ''; }
    else { url.searchParams.delete('veiculo'); url.hash = 'veiculos'; }
    window.history.pushState({}, '', url);
    setId(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!next) requestAnimationFrame(() => document.getElementById('veiculos')?.scrollIntoView({ behavior: 'instant' }));
  }, []);
  useEffect(() => { if (!selected) document.title = 'Marques Veículos — Garagem em Ibitinga'; }, [selected]);
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-clip bg-night font-sans text-ivory selection:bg-gold selection:text-night">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold focus:p-4 focus:text-night">Ir para o conteúdo</a>
        <Header solid={Boolean(selected)} />
        <main id="conteudo">{selected ? <VehicleDetails key={selected.id} vehicle={selected} onBack={() => navigate(null)} /> : <><Hero /><BrandStrip /><Collection onDetails={id => navigate(id)} /><Story /><Visit /></>}</main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
