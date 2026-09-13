# Auditoria técnica de SEO — MatA (matematicaa.pt)

Data: 2026-09-13
Baseline contra a qual a Fase 12 (Validação) será comparada.

## 1. Inventário de rotas (`src/App.tsx`)

| Rota | Componente | Classificação |
|---|---|---|
| `/` | `Index.tsx` | Indexável |
| `/ano/:year` (10\|11\|12) | `YearPage.tsx` | Indexável — será redirecionada 301 na Fase 5 |
| `/sobre` | `About.tsx` | Indexável |
| `/privacidade` | `Privacy.tsx` | Indexável |
| `/afiliados-e-doacoes` | `AfiliadosDoacoes.tsx` | Indexável |
| `/admin` | `Admin.tsx` | **noindex** — gated por Supabase Auth, sem code-splitting atual |
| `*` (catch-all) | `NotFound.tsx` | Excluída do sitemap — devolve HTTP 200 (soft 404), ver secção 4 |

Os 15 temas de `src/data/topics.ts` **não têm URL própria** — existem apenas como estado de um `<button onClick={toggleTopic}>` dentro de `YearPage.tsx`. Não rastreáveis, não indexáveis, não partilháveis.

## 2. Bundle (produção, `npm run build`, 2026-09-13)

```
dist/index.html                   1.34 kB │ gzip:   0.63 kB
dist/assets/index-CMWNQvKw.css   64.78 kB │ gzip:  11.09 kB
dist/assets/index-ikOrsRoC.js   576.63 kB │ gzip: 174.48 kB
```

Aviso do Rollup: chunk único de 576.63 kB acima do limite recomendado de 500 kB — sem `manualChunks`, sem `React.lazy`.

## 3. Dependências pesadas — uso real por páginas públicas

| Dependência | Importada por página/componente público? | Situação |
|---|---|---|
| `recharts` | Não — só por `src/components/ui/chart.tsx`, que **não é importado em nenhum lado** | Código morto, já excluído do bundle por tree-shaking |
| `embla-carousel-react` | Não — só por `src/components/ui/carousel.tsx`, **não importado** | Código morto |
| `react-day-picker` | Não — só por `src/components/ui/calendar.tsx`, **não importado** | Código morto |

Confirmado via `grep -rl` a `src/pages` e `src/components` (excluindo os próprios wrappers `ui/*`): zero ocorrências. O peso do bundle atual não vem destas três — vem da ausência de code-splitting (Fase 10).

## 4. Prova de CSR total e soft 404 (HTML bruto, produção)

Domínio confirmado ativo e a servir o build atual (mesmos hashes de asset do build local):

```bash
$ curl -s https://matematicaa.pt/
...
<title>MatA — Recursos de Matemática A | Ensino Secundário</title>
...
<body>
  <div id="root"></div>
</body>
```

```bash
$ curl -s https://matematicaa.pt/ano/10 | head -20
# HTML idêntico byte a byte ao de "/" — mesmo <title>, mesma <meta description>,
# <div id="root"></div> vazio. Confirma B2 e B4.
```

```bash
$ curl -s -o /dev/null -w "HTTP %{http_code}\n" https://matematicaa.pt/pagina-que-nao-existe-xyz
HTTP 200
$ curl -s -o /dev/null -w "HTTP %{http_code}\n" https://matematicaa.pt/sitemap.xml   # nem existe ainda
HTTP 200
```

Confirma B6 (soft 404): o rewrite catch-all (`vercel.json` → `/(.*) → /index.html`) devolve HTTP 200 para **qualquer** caminho, incluindo os que não existem.

```bash
$ curl -s https://matematicaa.pt/robots.txt
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /
User-agent: Twitterbot
Allow: /
User-agent: facebookexternalhit
Allow: /
User-agent: *
Allow: /
```
Sem diretiva `Sitemap:`. Confirma B9.

## 5. Outros bloqueadores confirmados por leitura direta do código

- **B1** — Árvore duplicada na raiz do repo, já removida nesta sessão (commit `1423645`).
- **B5** — `og:image` aponta para `https://lovable.dev/opengraph-image-p98pqg.png` (`index.html`).
- **B12** — `<html lang="pt">` em vez de `pt-PT` (`index.html`).
- **B13** — `Privacy.tsx:13` usa `new Date().toLocaleDateString("pt-PT")`; `Footer.tsx:46` usa `new Date().getFullYear()` diretamente no JSX de render. Ambos quebram SSR (valor diferente entre o momento do build e o momento do pedido/hidratação).
- **Risco adicional de SSR não listado nos factos originais**: `src/integrations/supabase/client.ts:13` cria o cliente Supabase com `storage: localStorage` **no top-level do módulo**. `localStorage` não existe em Node — qualquer render SSR que importe (transitivamente) este ficheiro rebenta. Corrigido na Fase 1 (ver `IMPLEMENTATION-REPORT.md`).
- **B11** — `AdBanner.tsx` sem `min-height` reservado; homepage com 3 instâncias; script AdSense síncrono no `<head>`.
- **B6** — `NotFound.tsx` em inglês ("Oops! Page not found", "Return to Home"), HTTP 200.

Este ficheiro não é alterado depois desta fase — é o baseline "antes". As mudanças reais e a comparação "depois" ficam em `IMPLEMENTATION-REPORT.md`.
