/**
 * Mensuração de intenção comercial sem dados pessoais.
 * O GA4 só é carregado e recebe eventos após consentimento explícito.
 */
export type ConversionKind = 'whatsapp_click' | 'map_click' | 'phone_click' | 'vehicle_detail_open';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim();
const consentKey = 'marques_analytics_consent';
let initialized = false;

export function hasAnalyticsConfiguration(): boolean {
  return Boolean(measurementId && /^G-[A-Z0-9]+$/.test(measurementId));
}

export function analyticsConsent(): string | null {
  return typeof window === 'undefined' ? null : window.localStorage.getItem(consentKey);
}

export function enableAnalytics(): void {
  if (typeof window === 'undefined' || !hasAnalyticsConfiguration()) return;
  window.localStorage.setItem(consentKey, 'granted');
  if (initialized) return;
  initialized = true;
  // Começa uma fila limpa para que cliques anteriores ao consentimento não sejam transmitidos.
  window.dataLayer = [];
  window.gtag = (...args: unknown[]) => { window.dataLayer?.push(args); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true });
  const script = document.createElement('script');
  script.async = true;
  script.dataset.marquesGa = 'true';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId!)}`;
  document.head.appendChild(script);
}

export function declineAnalytics(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(consentKey, 'denied');
}

export function trackConversion(event: ConversionKind, source: string, vehicleId?: string): void {
  if (typeof window === 'undefined' || !hasAnalyticsConfiguration() || analyticsConsent() !== 'granted') return;
  if (!initialized) enableAnalytics();
  window.gtag?.('event', event, { source, ...(vehicleId ? { vehicle_id: vehicleId } : {}) });
}

export function attachConversionTracking(): () => void {
  const handle = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href') ?? '';
    const source = anchor.closest('section')?.id ?? (location.pathname.startsWith('/veiculos/') ? 'vehicle_detail' : 'site');
    const vehicleId = anchor.closest('[data-vehicle-id]')?.getAttribute('data-vehicle-id') ?? undefined;
    if (href.includes('wa.me/')) trackConversion('whatsapp_click', source, vehicleId);
    else if (href.startsWith('tel:')) trackConversion('phone_click', source, vehicleId);
    else if (href.includes('maps.app.goo.gl/') || href.includes('google.com/maps')) trackConversion('map_click', source, vehicleId);
  };
  document.addEventListener('click', handle, { capture: true });
  return () => document.removeEventListener('click', handle, { capture: true });
}
