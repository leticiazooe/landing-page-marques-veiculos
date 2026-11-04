import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { VehicleDetails } from './components/VehicleDetails';
import { BrandStrip } from './components/BrandStrip';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';
import { type Vehicle } from './data/site';
import { getPublicVehicles } from './lib/catalog';
import { catalogConfigured } from './lib/supabase';
import { AdminPanel } from './components/AdminPanel';
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL, vehicleDescription, vehiclePath, vehicleTitle } from './lib/vehicle-seo';
import { attachConversionTracking, trackConversion } from './lib/analytics';

function readVehicle(): string | null { return new URLSearchParams(window.location.search).get('veiculo'); }

export default function App() {
  const [id, setId] = useState<string | null>(readVehicle);
  const isAdmin = window.location.pathname.replace(/\/$/, '') === '/admin';
  const [catalog, setCatalog] = useState<Vehicle[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(catalogConfigured && !isAdmin);
  const [catalogError, setCatalogError] = useState('');

  useEffect(() => {
    if (isAdmin || !catalogConfigured) return;
    let active = true;
    getPublicVehicles()
      .then(records => { if (active) { setCatalog(records); setCatalogError(''); } })
      .catch(() => { if (active) setCatalogError('Não foi possível carregar os veículos. Tente atualizar a página.'); })
      .finally(() => { if (active) setCatalogLoading(false); });
    return () => { active = false; };
  }, [isAdmin]);

  // Mantém links legados ?veiculo=id, mas usa páginas públicas legíveis e indexáveis.
  const selected = catalog.find(v => v.id === id || vehiclePath(v) === window.location.pathname);
  useEffect(() => {
    const onPop = () => setId(readVehicle());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const navigate = useCallback((next: string | null) => {
    const url = new URL(window.location.href);
    if (next) {
      const vehicle = catalog.find(v => v.id === next);
      if (!vehicle) return;
      url.pathname = vehiclePath(vehicle);
      url.searchParams.delete('veiculo');
      url.hash = '';
      trackConversion('vehicle_detail_open', 'catalog', next);
    } else {
      url.pathname = '/';
      url.searchParams.delete('veiculo');
      url.hash = 'veiculos';
    }
    window.history.pushState({}, '', url);
    setId(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!next) requestAnimationFrame(() => document.getElementById('veiculos')?.scrollIntoView({ behavior: 'instant' }));
  }, [catalog]);
  useEffect(() => attachConversionTracking(), []);
  useEffect(() => {
    if (selected && readVehicle()) {
      window.history.replaceState({}, '', vehiclePath(selected));
    }
    const canonical = selected ? SITE_URL + vehiclePath(selected) : SITE_URL + '/';
    const title = selected ? vehicleTitle(selected) : HOME_TITLE;
    const description = selected ? vehicleDescription(selected) : HOME_DESCRIPTION;
    document.title = title;
    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.content = value;
    };
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) link.href = canonical;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:url"]', canonical);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', selected?.image ? new URL(selected.image, SITE_URL).href : SITE_URL + '/images/og-marques.webp');
  }, [selected]);

  if (isAdmin) return <AdminPanel />;
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-clip bg-night font-sans text-ivory selection:bg-gold selection:text-night">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold focus:p-4 focus:text-night">Ir para o conteúdo</a>
        <Header solid={Boolean(selected)} />
        <main id="conteudo">{selected ? <VehicleDetails key={selected.id} vehicle={selected} onBack={() => navigate(null)} /> : <><Hero /><BrandStrip /><Collection vehicles={catalog} loading={catalogLoading} error={catalogError} onDetails={id => navigate(id)} /><Visit /></>}</main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
