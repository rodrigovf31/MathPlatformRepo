#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distDir = path.resolve("dist");
const ssrEntry = path.resolve("dist-ssr/entry-server.js");

const { pageRegistry, absoluteUrl } = await import(pathToFileURL(ssrEntry).href);

const isIndexable = (seo) => (seo.robots ?? "index,follow").startsWith("index");

/** Nunca /admin, nunca URLs redirecionadas (/ano/*), nunca variantes com query string. */
const urls = pageRegistry.filter((seo) => seo.inSitemap !== false && isIndexable(seo));

const escapeXml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const filePathFor = (seoPath) =>
  seoPath === "/" ? path.join(distDir, "index.html") : path.join(distDir, seoPath.replace(/^\//, ""), "index.html");

const missing = urls.filter((seo) => !existsSync(filePathFor(seo.path))).map((seo) => seo.path);
if (missing.length) {
  console.error("[sitemap] Estas URLs do sitemap não têm ficheiro correspondente em dist/ — build abortada:", missing);
  process.exit(1);
}

const urlEntries = urls
  .map((seo) => {
    const loc = absoluteUrl(seo.path);
    const lastmod = seo.lastmod ? `\n    <lastmod>${seo.lastmod}</lastmod>` : "";
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod}\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

await writeFile(path.join(distDir, "sitemap.xml"), xml);
console.log(`[sitemap] ${urls.length} URLs escritas em dist/sitemap.xml`);
