#!/usr/bin/env node
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distDir = path.resolve("dist");
const ssrEntry = path.resolve("dist-ssr/entry-server.js");

const { render, pageRegistry, SITE, absoluteUrl, jsonLdForPage } = await import(
  pathToFileURL(ssrEntry).href
);

const template = await readFile(path.join(distDir, "index.html"), "utf-8");

/** NotFound (rota "*") não está no pageRegistry — não tem URL própria, mas precisa de dist/404.html real. */
const NOT_FOUND_SEO = {
  path: "/404",
  title: "Página Não Encontrada | MatA",
  description: "A página que procuras não existe ou foi movida. Explora os recursos de Matemática A por ano.",
  robots: "noindex,follow",
  ogType: "website",
};

const routesToRender = [...pageRegistry, NOT_FOUND_SEO];

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const buildHead = (seo) => {
  const canonical = absoluteUrl(seo.path);
  const ogImage = absoluteUrl(seo.ogImage ?? SITE.defaultOgImage);
  const robots = seo.robots ?? "index,follow";
  const jsonLdBlocks = jsonLdForPage(seo);

  const lines = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:type" content="${seo.ogType ?? "website"}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    ...jsonLdBlocks.map((block) => `<script type="application/ld+json">${JSON.stringify(block)}</script>`),
  ];

  return lines.join("\n    ");
};

const outputPathFor = (seoPath) => {
  if (seoPath === "/404") return path.join(distDir, "404.html");
  if (seoPath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, seoPath.replace(/^\//, ""), "index.html");
};

let failed = false;
const writtenPaths = [];

for (const seo of routesToRender) {
  try {
    const appHtml = render(seo.path);
    const headBlock = buildHead(seo);

    let page = template.replace(
      /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/,
      `<!-- SEO:START -->\n    ${headBlock}\n    <!-- SEO:END -->`,
    );
    page = page.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    const outPath = outputPathFor(seo.path);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, page);
    writtenPaths.push(outPath);
    console.log(`[prerender] ${seo.path} -> ${path.relative(distDir, outPath)}`);
  } catch (err) {
    failed = true;
    console.error(`[prerender] FALHOU em ${seo.path}:`, err);
  }
}

if (failed) {
  console.error("[prerender] build abortada — pelo menos uma rota falhou a pré-renderização.");
  process.exit(1);
}

console.log(`[prerender] ${writtenPaths.length} páginas escritas.`);
