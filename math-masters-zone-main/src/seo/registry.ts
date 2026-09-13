import { PageSeo } from "./types";
import { getTopicsByYear } from "@/data/topics";
import { PRIVACY_LAST_UPDATED } from "@/content/legal";

const yearPage = (year: 10 | 11 | 12): PageSeo => {
  const topicNames = getTopicsByYear(year).map((t) => t.name).join(", ");
  return {
    path: `/matematica-a/${year}-ano`,
    title: `${year}.º Ano — Matemática A | MatA`,
    description: `Fichas de exercícios e guias de teoria de Matemática A do ${year}.º ano: ${topicNames}. Recursos gratuitos, organizados por tema.`,
    h1: `${year}.º Ano — Matemática A`,
    robots: "index,follow",
    ogType: "website",
    inSitemap: true,
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
  },
  {
    path: "/afiliados-e-doacoes",
    title: "Apoia o Projeto — Doações e Afiliados | MatA",
    description: "Ajuda o MatA a manter-se gratuito: faz um donativo voluntário via PayPal ou compra através dos nossos links de afiliado da Amazon.",
    h1: "Apoia o Projeto",
    robots: "index,follow",
    ogType: "website",
    inSitemap: true,
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
