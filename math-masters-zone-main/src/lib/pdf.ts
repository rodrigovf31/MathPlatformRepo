const STORAGE_PREFIX = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/pdfs/`;

/**
 * Reescreve o URL de armazenamento do Supabase para o mesmo domínio do site
 * (proxy configurado em vercel.json: /recursos/:path* -> Supabase Storage).
 * Mantém os sinais de SEO no próprio domínio em vez de os dispersar por
 * *.supabase.co (Fase 11, opção A).
 */
export const toDomainPdfUrl = (supabaseUrl: string): string =>
  supabaseUrl.startsWith(STORAGE_PREFIX) ? `/recursos/${supabaseUrl.slice(STORAGE_PREFIX.length)}` : supabaseUrl;
