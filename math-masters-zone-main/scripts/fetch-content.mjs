#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "[fetch-content] VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY em falta no ambiente. " +
    "A build falha de propósito: publicar com um snapshot vazio publicaria páginas sem conteúdo.",
  );
  process.exit(1);
}

const outDir = path.resolve("src/content");

try {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  const resources = data ?? [];

  /** Última data de alteração real por ano, derivada de max(created_at). Anos sem recursos ficam de fora — nunca inventamos lastmod. */
  const lastmodByYear = {};
  for (const r of resources) {
    const key = String(r.year);
    const created = typeof r.created_at === "string" ? r.created_at.slice(0, 10) : undefined;
    if (created && (!lastmodByYear[key] || created > lastmodByYear[key])) {
      lastmodByYear[key] = created;
    }
  }

  await mkdir(outDir, { recursive: true });
  await writeFile(
    path.join(outDir, "resources.snapshot.json"),
    JSON.stringify(resources, null, 2) + "\n",
  );
  await writeFile(
    path.join(outDir, "resources.lastmod.json"),
    JSON.stringify(lastmodByYear, null, 2) + "\n",
  );

  console.log(`[fetch-content] ${resources.length} recursos escritos em src/content/resources.snapshot.json`);
} catch (err) {
  console.error("[fetch-content] Falha ao consultar o Supabase — build abortada:", err.message ?? err);
  process.exit(1);
}
