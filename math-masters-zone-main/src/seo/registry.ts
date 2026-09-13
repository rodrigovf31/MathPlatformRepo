import { PageSeo } from "./types";
import { PRIVACY_LAST_UPDATED } from "@/content/legal";
import lastmodByYear from "@/content/resources.lastmod.json";

/**
 * Descrições fixas (não geradas a partir da lista de temas): o número e o
 * comprimento dos nomes de tema variam por ano, o que tornava a description
 * gerada instável entre 120-158 caracteres. Verificado (scripts/seo-audit.mjs).
 */
const YEAR_DESCRIPTIONS: Record<10 | 11 | 12, string> = {
  10: "Fichas de exercícios e guias de teoria de Matemática A do 10.º ano: geometria, funções, estatística e sequências. Recursos gratuitos, organizados por tema.",
  11: "Fichas de exercícios e guias de teoria de Matemática A do 11.º ano: trigonometria, sucessões, geometria analítica e probabilidades. Grátis, por tema.",
  12: "Fichas de exercícios e guias de teoria de Matemática A do 12.º ano: exponenciais, limites, derivadas, primitivas e distribuições. Grátis, por tema.",
};

const yearPage = (year: 10 | 11 | 12): PageSeo => {
  /** Real, derivado de max(created_at) dos recursos desse ano (Fase 3). Anos sem recursos ficam sem lastmod — nunca inventado. */
  const lastmod = (lastmodByYear as Record<string, string>)[String(year)];
  return {
    path: `/matematica-a/${year}-ano`,
    title: `${year}.º Ano — Matemática A | MatA`,
    description: YEAR_DESCRIPTIONS[year],
    h1: `${year}.º Ano — Matemática A`,
    robots: "index,follow",
    ogType: "website",
    inSitemap: true,
    ...(lastmod ? { lastmod } : {}),
    breadcrumb: [
      { name: "Início", path: "/" },
      { name: `${year}.º Ano`, path: `/matematica-a/${year}-ano` },
    ],
  };
};

/** Fonte única de verdade para metadata por rota. Consumida pelo Seo.tsx runtime e pelo script de prerender. */
export const pageRegistry: PageSeo[] = [
  {
    path: "/",
    title: "Recursos de Matemática A — Ensino Secundário | MatA",
    description: "Fichas de exercícios e guias de teoria de Matemática A para o 10.º, 11.º e 12.º ano do ensino secundário português. Gratuitos, sem registo.",
    h1: "Recursos de Matemática A",
    robots: "index,follow",
    ogType: "website",
    inSitemap: true,
  },
  yearPage(10),
  yearPage(11),
  yearPage(12),
  {
    path: "/sobre",
    title: "Sobre o MatA | Recursos de Matemática A",
    description: "Conhece o projeto MatA: a missão de dar a estudantes portugueses de Matemática A acesso gratuito a fichas e guias de teoria de qualidade.",
    h1: "Sobre o MatA",
    robots: "index,follow",
    ogType: "website",
    inSitemap: true,
    breadcrumb: [
      { name: "Início", path: "/" },
      { name: "Sobre", path: "/sobre" },
    ],
  },
  {
    path: "/privacidade",
    title: "Política de Privacidade | MatA",
    description: "Como o MatA recolhe, usa e protege a tua informação — incluindo cookies de publicidade do Google AdSense e links de afiliados da Amazon.",
    h1: "Política de Privacidade",
    robots: "index,follow",
    ogType: "website",
    inSitemap: true,
    lastmod: PRIVACY_LAST_UPDATED,
    breadcrumb: [
      { name: "Início", path: "/" },
      { name: "Privacidade", path: "/privacidade" },
    ],
  },
  {
    path: "/afiliados-e-doacoes",
    title: "Apoia o Projeto — Doações e Afiliados | MatA",
    description: "Ajuda o MatA a manter-se gratuito: faz um donativo voluntário via PayPal ou compra através dos nossos links de afiliado da Amazon.",
    h1: "Apoia o Projeto",
    robots: "index,follow",
    ogType: "website",
    inSitemap: true,
    breadcrumb: [
      { name: "Início", path: "/" },
      { name: "Apoia o Projeto", path: "/afiliados-e-doacoes" },
    ],
  },
  {
    path: "/admin",
    title: "Administração | MatA",
    description: "Área reservada de administração de conteúdo do MatA, restrita a utilizadores autenticados. Sem interesse para visitantes do site.",
    h1: "Administração",
    robots: "noindex,nofollow",
    inSitemap: false,
  },
];

export const findPageSeo = (path: string): PageSeo | undefined =>
  pageRegistry.find((p) => p.path === path);
