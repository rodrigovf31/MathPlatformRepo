#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");

function findIndexHtmlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findIndexHtmlFiles(full));
    } else if (entry === "index.html") {
      results.push(full);
    }
  }
  return results;
}

const files = findIndexHtmlFiles(distDir);
const errors = [];
const titles = new Map();
const descriptions = new Map();

for (const file of files) {
  const html = await readFile(file, "utf-8");
  const rel = path.relative(distDir, file);

  const titleMatches = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)];
  if (titleMatches.length !== 1) {
    errors.push(`${rel}: esperava exatamente 1 <title>, encontrou ${titleMatches.length}`);
  } else {
    const title = titleMatches[0][1].trim();
    if (!title) errors.push(`${rel}: <title> vazio`);
    if (title.length > 60) errors.push(`${rel}: <title> com ${title.length} caracteres (máx. 60): "${title}"`);
    if (!titles.has(title)) titles.set(title, []);
    titles.get(title).push(rel);
  }

  const descMatches = [...html.matchAll(/<meta name="description" content="([\s\S]*?)"\s*\/?>/g)];
  if (descMatches.length !== 1) {
    errors.push(`${rel}: esperava exatamente 1 <meta name="description">, encontrou ${descMatches.length}`);
  } else {
    const desc = descMatches[0][1];
    if (desc.length < 120 || desc.length > 158) {
      errors.push(`${rel}: description com ${desc.length} caracteres (esperado 120-158): "${desc}"`);
    }
    if (!descriptions.has(desc)) descriptions.set(desc, []);
    descriptions.get(desc).push(rel);
  }

  const canonicalMatches = [...html.matchAll(/<link rel="canonical" href="([^"]*)"\s*\/?>/g)];
  if (canonicalMatches.length !== 1) {
    errors.push(`${rel}: esperava exatamente 1 <link rel="canonical">, encontrou ${canonicalMatches.length}`);
  } else {
    const href = canonicalMatches[0][1];
    if (!href.startsWith("http")) {
      errors.push(`${rel}: canonical não é absoluto: "${href}"`);
    } else {
      const expectedPath = rel === "index.html" ? "/" : `/${rel.replace(/\/index\.html$/, "")}`;
      const actualPath = new URL(href).pathname;
      if (actualPath !== expectedPath) {
        errors.push(`${rel}: canonical "${href}" (path "${actualPath}") não corresponde ao caminho do ficheiro "${expectedPath}"`);
      }
    }
  }

  const h1Matches = [...html.matchAll(/<h1[ >]/g)];
  if (h1Matches.length !== 1) {
    errors.push(`${rel}: esperava exatamente 1 <h1>, encontrou ${h1Matches.length}`);
  }

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch (err) {
      errors.push(`${rel}: bloco JSON-LD inválido: ${err.message}`);
    }
  }

  if (html.includes("lovable.dev")) {
    errors.push(`${rel}: contém referência a "lovable.dev"`);
  }

  if (!html.includes('<html lang="pt-PT">')) {
    errors.push(`${rel}: <html> sem lang="pt-PT"`);
  }

  const robotsMatches = [...html.matchAll(/<meta name="robots" content="([^"]*)"\s*\/?>/g)];
  if (robotsMatches.length > 1) {
    const distinctValues = new Set(robotsMatches.map((m) => m[1]));
    if (distinctValues.size > 1) {
      errors.push(`${rel}: diretivas robots conflituosas: ${[...distinctValues].join(" | ")}`);
    }
  }
}

for (const [title, filesWithTitle] of titles) {
  if (filesWithTitle.length > 1) {
    errors.push(`Título duplicado "${title}" em: ${filesWithTitle.join(", ")}`);
  }
}
for (const [desc, filesWithDesc] of descriptions) {
  if (filesWithDesc.length > 1) {
    errors.push(`Description duplicada em: ${filesWithDesc.join(", ")} ("${desc.slice(0, 60)}...")`);
  }
}

const sitemapPath = path.join(distDir, "sitemap.xml");
if (existsSync(sitemapPath)) {
  const sitemapXml = await readFile(sitemapPath, "utf-8");
  const locs = [...sitemapXml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const url = new URL(loc);
    const filePath =
      url.pathname === "/" ? path.join(distDir, "index.html") : path.join(distDir, url.pathname.replace(/^\//, ""), "index.html");
    if (!existsSync(filePath)) {
      errors.push(`sitemap.xml refere "${loc}" mas não existe ${path.relative(distDir, filePath)}`);
    }
  }
} else {
  errors.push("dist/sitemap.xml não existe — corre generate-sitemap.mjs antes do audit.");
}

if (errors.length) {
  console.error(`[seo-audit] ${errors.length} problema(s) encontrado(s):\n`);
  for (const err of errors) console.error(` - ${err}`);
  process.exit(1);
}

console.log(`[seo-audit] ${files.length} páginas validadas, sem problemas.`);
