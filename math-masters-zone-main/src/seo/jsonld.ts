import { SITE, absoluteUrl } from "./site";
import { PageSeo } from "./types";

const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.baseUrl,
});

const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE.legalName,
  url: SITE.baseUrl,
});

const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

/**
 * Só schema que descreve conteúdo visível na página (Fase 8). Sem SearchAction
 * (não há pesquisa no site), sem FAQPage, sem Course, sem AggregateRating —
 * nenhum tem suporte real no conteúdo atual.
 */
export const jsonLdForPage = (seo: PageSeo): object[] => {
  const blocks: object[] = [];
  if (seo.path === "/") {
    blocks.push(websiteJsonLd(), organizationJsonLd());
  }
  if (seo.breadcrumb && seo.breadcrumb.length > 1) {
    blocks.push(breadcrumbJsonLd(seo.breadcrumb));
  }
  return blocks;
};
