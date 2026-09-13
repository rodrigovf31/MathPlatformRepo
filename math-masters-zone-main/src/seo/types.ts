export interface PageSeo {
  /** Path canónico, começado por "/". Sem query, sem barra final. */
  path: string;
  title: string;
  description: string;
  h1: string;
  robots?: "index,follow" | "noindex,follow" | "noindex,nofollow";
  ogType?: "website" | "article";
  ogImage?: string;
  /** Se false, não entra no sitemap. */
  inSitemap?: boolean;
  /** Data ISO real da última alteração de conteúdo. Nunca inventada. */
  lastmod?: string;
  breadcrumb?: { name: string; path: string }[];
}
