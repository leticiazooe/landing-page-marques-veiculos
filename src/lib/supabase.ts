import { createClient } from '@supabase/supabase-js';

// Publishable browser configuration only. Never embed service-role or database credentials.
// Deployment environment variables can override the project's public defaults.
const url = import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://pxizyivehrwwgwhjjynv.supabase.co';
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || "sb_publishable_WspwjXZnOg2D7kfos2fDVQ_mBEKd1Wz";

export const catalogConfigured = Boolean(url && anonKey);
export const supabase = catalogConfigured
  ? createClient(url, anonKey, {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
    })
  : null;
