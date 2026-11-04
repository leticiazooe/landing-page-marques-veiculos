/**
 * Registro de intenção comercial, sem enviar informações pessoais.
 * dataLayer funciona para inspeção local e futura conexão com GTM/GA4.
 * Sem propriedade de analytics configurada, nenhum dado é enviado para terceiros.
 */
export type ConversionKind = 'whatsapp_click' | 'map_click' | 'phone_click' | 'vehicle_detail_open';
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion(event: ConversionKind, source: string, vehicleId?: string): void {
  if (typeof window === 'undefined') return;
  const payload: Record<string, string> = { event, source };
  if (vehicleId) payload.vehicle_id = vehicleId;
  window.dataLayer ??= [];
  window.dataLayer.push(payload);
  // A conexão a um provedor de analytics deve observar o consentimento aplicável.
  if (window.localStorage.getItem('marques_analytics_consent') === 'granted') {
    window.gtag?.('event', event, { source, ...(vehicleId ? { vehicle_id: vehicleId } : {}) });
  }
}

export function attachConversionTracking(): () => void {
  const handle = (e: MouseEvent) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href') ?? '';
    const section = anchor.closest('section')?.id ?? (location.pathname.startsWith('/veiculos/') ? 'vehicle_detail' : 'site');
    const vehicleId = location.pathname.startsWith('/veiculos/') ? location.pathname.split('/').filter(Boolean).at(-1) : undefined;
    if (href.includes('wa.me/')) trackConversion('whatsapp_click', section, vehicleId);
    else if (href.startsWith('tel:')) trackConversion('phone_click', section, vehicleId);
    else if (href.includes('maps.app.goo.gl/') || href.includes('google.com/maps')) trackConversion('map_click', section, vehicleId);
  };
  document.addEventListener('click', handle, { capture: true });
  return () => document.removeEventListener('click', handle, { capture: true });
}
