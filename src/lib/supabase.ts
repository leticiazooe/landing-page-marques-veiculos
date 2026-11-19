import { createClient } from '@supabase/supabase-js';
import { catalogConfigured, publicCatalogUrl, publicCatalogKey } from './public-config';

export { catalogConfigured };

// O SDK completo só é importado nas rotas administrativas, nunca na vitrine.
export const supabase = catalogConfigured
  ? createClient(publicCatalogUrl, publicCatalogKey, {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
    })
  : null;
