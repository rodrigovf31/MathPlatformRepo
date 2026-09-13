const rawBase = import.meta.env.VITE_SITE_URL;
if (!rawBase) throw new Error("VITE_SITE_URL não definida — obrigatória para canonical/sitemap.");

export const SITE = {
  /** Sem barra final. Fonte única do domínio canónico. */
  baseUrl: rawBase.replace(/\/$/, ""),
  name: "MatA",
  legalName: "MatA",
  locale: "pt_PT",
  lang: "pt-PT",
  defaultOgImage: "/og/og-default.png",
  contactEmail: "contacto@matematicaa.pt",
} as const;

/** Constrói uma URL absoluta canónica. Política: nunca barra final — a raiz fica "https://dominio" sem "/" à direita, consistente com trailingSlash:false no vercel.json. */
export const absoluteUrl = (path: string): string => {
  const clean = path === "/" ? "" : `/${path.replace(/^\/|\/$/g, "")}`;
  return `${SITE.baseUrl}${clean}`;
};
