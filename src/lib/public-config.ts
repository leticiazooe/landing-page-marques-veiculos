/**
 * Configuração de leitura pública do catálogo, compartilhada sem carregar o SDK do Supabase.
 * Esta chave é publishable (nunca use service_role no frontend).
 */
export const publicCatalogUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://pxizyivehrwwgwhjjynv.supabase.co';
export const publicCatalogKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || 'sb_publishable_WspwjXZnOg2D7kfos2fDVQ_mBEKd1Wz';
export const catalogConfigured = Boolean(publicCatalogUrl && publicCatalogKey);
