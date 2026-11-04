import { useState } from 'react';
import { analyticsConsent, declineAnalytics, enableAnalytics, hasAnalyticsConfiguration } from '../lib/analytics';

/** O aviso só aparece quando uma propriedade GA4 real estiver configurada. */
export function AnalyticsConsent() {
  const [decision, setDecision] = useState(() => analyticsConsent());
  if (!hasAnalyticsConfiguration() || decision) return null;
  return (
    <aside aria-label="Preferências de análise de visitas" className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-[620px] rounded-2xl border border-gold/35 bg-[#151615] p-5 text-ivory shadow-[0_18px_70px_rgba(0,0,0,.48)] sm:bottom-7 sm:p-6">
      <p className="text-[16px] font-semibold">Podemos medir as visitas?</p>
      <p className="mt-1 text-[14px] leading-relaxed text-ivory/70">Com sua permissão, usamos o Google Analytics para entender quais veículos despertam interesse e melhorar o atendimento. Você pode recusar e continuar usando o site normalmente.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => { enableAnalytics(); setDecision('granted'); }} className="min-h-11 rounded-lg bg-gold px-5 text-[14px] font-semibold text-night">Permitir análise</button>
        <button type="button" onClick={() => { declineAnalytics(); setDecision('denied'); }} className="min-h-11 rounded-lg border border-white/25 px-5 text-[14px] font-semibold text-ivory">Não permitir</button>
      </div>
    </aside>
  );
}
