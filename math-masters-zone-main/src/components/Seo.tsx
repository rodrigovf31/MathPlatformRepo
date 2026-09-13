import { useEffect } from "react";
import { PageSeo } from "@/seo/types";
import { SITE, absoluteUrl } from "@/seo/site";

/**
 * Sincroniza document.head em navegação client-side. Consome o mesmo objeto
 * PageSeo que scripts/prerender.mjs usa para gerar o HTML estático — os
 * valores (em particular o canonical) são portanto sempre idênticos entre o
 * HTML bruto e o DOM pós-hidratação, porque ambos aplicam a mesma função pura
 * (absoluteUrl) ao mesmo dado, nunca escrevem valores independentes.
 * Faz upsert de uma única tag por chave — nunca appendChild cego.
 */
const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const Seo = (seo: PageSeo) => {
  useEffect(() => {
    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", seo.robots ?? "index,follow");
    upsertLink("canonical", absoluteUrl(seo.path));

    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:type", seo.ogType ?? "website");
    upsertMeta("property", "og:url", absoluteUrl(seo.path));
    upsertMeta("property", "og:image", absoluteUrl(seo.ogImage ?? SITE.defaultOgImage));
    upsertMeta("property", "og:locale", SITE.locale);
    upsertMeta("property", "og:site_name", SITE.name);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:image", absoluteUrl(seo.ogImage ?? SITE.defaultOgImage));
  }, [seo.path, seo.title, seo.description, seo.robots, seo.ogType, seo.ogImage]);

  return null;
};

export default Seo;
