# Relatório de Implementação — SEO Técnico MatA (matematicaa.pt)

Data: 2026-09-13. Autor: Claude Code, sob o mandato de SEO técnico do utilizador.

---

## A. Diagnóstico de arquitetura

Stack confirmado por leitura direta do código: Vite 5 + React 18.3 SPA pura (sem SSR), react-router-dom 6.30 client-side, TypeScript strict, Tailwind + shadcn/ui, Supabase (tabela `resources` + bucket `pdfs`), @tanstack/react-query 5, gerado originalmente por Lovable, monetizado por AdSense + afiliados Amazon.

**Descoberta adicional não listada no mandato original**: o repositório GitHub tinha, na sua raiz, uma árvore duplicada e desatualizada de `src/`, `public/` e `supabase/` (sem a tag AdSense, com afiliados ainda em placeholder `"#"`, sem o tratamento de erro já presente em `YearPage.tsx`). Confirmado que só `math-masters-zone-main/` tem `package.json`, `vite.config.ts` e `vercel.json` — é essa a árvore que o Vercel builda. A duplicada foi removida (commit `1423645`).

## B. Problemas de SEO encontrados (evidência real)

Detalhe completo e comandos em [`AUDIT.md`](./AUDIT.md). Resumo:

| # | Problema | Evidência |
|---|---|---|
| B1 | Árvore duplicada na raiz | `ls math-masters-zone-main/package.json` existe; `ls package.json` (raiz) não |
| B2 | CSR total | `curl -s https://matematicaa.pt/ \| grep root` → `<div id="root"></div>` vazio |
| B3 | Zero canonical | grep a `index.html` original: nenhum `<link rel="canonical">` |
| B4 | Metadata global única | `curl /` e `curl /ano/10` deviam o mesmo `<title>`/`<meta description>` byte a byte |
| B5 | `og:image` em `lovable.dev` | grep a `index.html` |
| B6 | Soft 404 | `curl -o /dev/null -w "%{http_code}" /pagina-inexistente` → `200` (por causa do rewrite catch-all) |
| B7 | URLs planas/opacas para temas | `grep toggleTopic YearPage.tsx` — tema só existe como estado de `<button>` |
| B8 | Conteúdo depende de fetch pós-hidratação | `grep useQuery useResources.ts`, sem `initialData` |
| B9 | robots.txt sem `Sitemap:` | `curl /robots.txt` |
| B10 | `/admin` indexável, sem code-split | grep a `App.tsx`, sem `noindex`, import eager |
| B11 | Risco de CLS por AdSense | `AdBanner.tsx` sem `min-height`; homepage com 3 unidades |
| B12 | `<html lang="pt">` | devia ser `pt-PT` |
| B13 | Não-determinismo de render | `grep "new Date()" Privacy.tsx Footer.tsx` |
| **Novo** | `localStorage` no top-level do módulo Supabase | `integrations/supabase/client.ts:13` — rebentaria em qualquer SSR |
| **Novo** | `.env` (chaves Supabase) commitado, sem estar no `.gitignore` | confirmado no histórico do repo remoto |

## C. Ficheiros alterados (lista completa)

41 ficheiros alterados/criados entre o commit `1423645` (limpeza da árvore duplicada) e o fim desta sessão. Lista completa via `git diff --stat 1423645..HEAD -- math-masters-zone-main`; os agrupamentos e o motivo de cada um estão nas mensagens de commit de cada fase (`git log --oneline`, 9 commits, um por fase ou grupo de fases relacionadas). Destaques:

- **Novos**: `src/seo/{site,types,registry,jsonld}.ts`, `src/components/{Seo,Breadcrumbs}.tsx`, `src/entry-server.tsx`, `src/content/legal.ts`, `src/lib/pdf.ts`, `scripts/{fetch-content,prerender,generate-sitemap,seo-audit}.mjs`, `public/og/og-default.png`, `docs/seo/{AUDIT,IMPLEMENTATION-REPORT,SEARCH-CONSOLE}.md`.
- **Reescritos**: `index.html`, `vercel.json`, `vite.config.ts`, `package.json` (scripts), `src/{App,main}.tsx`, `src/pages/{Index,YearPage,About,Privacy,AfiliadosDoacoes,NotFound,Admin}.tsx`, `src/components/layout/{Header,Footer}.tsx`, `src/integrations/supabase/client.ts`, `src/hooks/useResources.ts`, `src/index.css`, `.gitignore`.

## D. Implementação exata

Seguida a ordem do mandato (Fases 0-12), com build + `tsc --noEmit` + testes a correr no fim de cada fase — nenhuma fase avançou com a anterior partida. Decisões vinculativas respeitadas: SSG sobre Vite (não SSR runtime, não Next.js), sem `react-helmet`, sem dynamic rendering.

## E. Novos componentes/utilitários SEO

- **`src/seo/site.ts`** — fonte única do domínio (`VITE_SITE_URL`, falha alto e cedo se ausente) e `absoluteUrl()`.
- **`src/seo/types.ts`** — contrato `PageSeo`.
- **`src/seo/registry.ts`** — metadata por rota, fonte única consumida tanto pelo `Seo.tsx` runtime como pelo `scripts/prerender.mjs` (via re-export em `entry-server.tsx`) — garante que o canonical no HTML bruto e no DOM pós-hidratação são sempre o mesmo valor, porque vêm do mesmo dado.
- **`src/seo/jsonld.ts`** — `WebSite`+`EducationalOrganization` na homepage, `BreadcrumbList` em todas as páginas de nível ≥2.
- **`src/components/Seo.tsx`** — runtime, faz upsert (nunca duplica) de title/description/canonical/robots/OG/Twitter.
- **`src/components/Breadcrumbs.tsx`** — `<a href>` reais via `BreadcrumbLink asChild`.
- **`src/content/legal.ts`** — data de atualização determinística (sem `toLocaleDateString`, sem depender de ICU).
- **`src/lib/pdf.ts`** — reescreve URLs de storage do Supabase para o domínio próprio.

## F. Estratégia de rendering — e porque não Next.js agora

Implementado SSG em build-time sobre o Vite existente: `renderToString` + `StaticRouter` (`src/entry-server.tsx`), `vite build --ssr` gera `dist-ssr/entry-server.js`, `scripts/prerender.mjs` corre `render()` para cada rota do registry e escreve `dist/<path>/index.html`. Nenhuma dependência de runtime nova — `react-dom/server` e `react-router-dom/server` já vinham com os pacotes instalados.

**Porque não Next.js nesta sessão**: o conjunto de páginas é pequeno e estável (8 hoje). Contei os ficheiros afetados por esta migração de SEO (41, sem tocar em toda a árvore `components/ui/`) — uma migração de framework tocaria em todos. O projeto ainda pode estar ligado ao workflow do Lovable (o `lovable-tagger` continua em devDependencies); migrar quebraria essa sincronização sem necessidade. Fica documentado aqui como decisão futura, não executada sem autorização explícita.

## G. Estratégia de metadata

`PageSeo` por rota em `registry.ts`: título com padrão `"[Assunto] — [Contexto] | MatA"`, ≤60 caracteres; description 120-158 caracteres, única por página, descreve o que a página **tem** (nunca o que se deseja que ranqueie). Canonical sempre absoluto, sem barra final (exceto a raiz, que fica sem path — ver nota em `site.ts`). `robots` explícito por página (`/admin` é a única `noindex,nofollow`). OG/Twitter com imagem própria (`og-default.png`, substitui `lovable.dev`).

## H. Estratégia de dados estruturados

Só schema com suporte real no conteúdo visível (Fase 8, tabela do mandato respeitada à risca):

- `WebSite` + `EducationalOrganization` — só na homepage.
- `BreadcrumbList` — todas as páginas de nível ≥2.
- **Não implementado**: `SearchAction` (não há pesquisa no site), `FAQPage` (a Google já sinalizou a descontinuação do rich result; não há FAQ real na página), `Course` (exigiria propriedades que o site não tem — provider, instância de curso), `AggregateRating`/`Review` (proibido — não há avaliações reais), `LearningResource` (condicional à Fase 6 — nenhum tema qualifica ainda, ver secção M).

Injetado no HTML pré-renderizado pelo `scripts/prerender.mjs`, nunca por JS runtime.

## I. Estratégia de sitemap

`scripts/generate-sitemap.mjs` filtra `pageRegistry` por `inSitemap !== false` e `robots` indexável — atualmente 7 URLs (homepage, 3 hubs de ano, sobre, privacidade, afiliados-e-doacoes; `/admin` fica de fora). `lastmod` só quando real: `Privacy.tsx` tem data fixa manual; os hubs de ano herdariam de `resources.lastmod.json` (gerado pela Fase 3, vazio agora porque a tabela `resources` não tem registos). O script falha a build se alguma URL do sitemap não tiver ficheiro correspondente em `dist/`.

## J. Estratégia de robots

`public/robots.txt`: `Allow: /` para todos os agentes + `Sitemap: https://matematicaa.pt/sitemap.xml`. Substituída a versão anterior (que enumerava Googlebot/Bingbot/Twitterbot/facebookexternalhit em separado, sem necessidade, e sem declarar sitemap). **Sem `Disallow: /admin`** — deliberado: isso impediria a Google de sequer ler o `noindex` da própria página, podendo deixá-la aparecer nos resultados sem descrição. `/admin` fica rastreável, com `<meta name="robots" content="noindex,nofollow">`.

## K. Estratégia de links internos

- `Breadcrumbs.tsx` com `<a href>` reais em todas as páginas de nível ≥2.
- `YearPage.tsx`: `<h2>` de cada tema extraído do `<button>` (antes inválido) para `<a href="#slug">` próprio, endereçável mesmo sem URL individual; o botão fica só como controlo de disclosure (`aria-expanded`/`aria-controls`).
- Header/Footer/YearCard atualizados para `/matematica-a/{ano}-ano`.
- Footer: âncoras mais descritivas ("Fichas e teoria do 10º ano" em vez de "10º Ano").
- `NotFound.tsx` traduzido, com links reais para as 3 páginas de ano.
- **Não implementado**: links contextuais dentro de texto entre temas relacionados (ponto 6 da Fase 7) — não há ainda corpo de texto real por tema para linkar a partir dele (ver secção M/Fase 6).

## L. Otimizações de Core Web Vitals (antes/depois)

| Métrica | Antes | Depois |
|---|---|---|
| Bundle JS | 1 chunk, 576,63 kB (gzip 174,48 kB) | `react-vendor` 161,77 kB + app 375,56 kB + `Admin` 46,11 kB (só carrega em `/admin`) + `PdfViewer` 1,29 kB (só após clique) — sem aviso de chunk >500 kB |
| AdSense | Script síncrono no `<head>`, bloqueante | Carregado via `requestIdleCallback` (fallback `setTimeout`), não bloqueia o parse inicial; `preconnect` adicionado |
| Densidade de anúncios (homepage) | 3 unidades, 1 acima de qualquer conteúdo real | 2 unidades, ambas depois do bloco "Escolhe o teu ano" |
| Google Fonts | `@import` render-blocking dentro do CSS (e mal posicionado — gerava aviso do Rollup) | `<link rel="preconnect">` + `<link rel="stylesheet">` no `<head>` |
| Imagens de afiliados | `loading="lazy"` já existia | + `decoding="async"`; CLS já coberto pelo container `aspect-[4/3]` |
| Alvos de toque (PdfCard) | `size="sm"` = 36px, ícone só, sem `aria-label` | 44px em mobile (`h-11 w-11`), `aria-label` explícito |
| Preconnects | Nenhum | `pagead2.googlesyndication.com`, `quwwhngraigrqjwlgywl.supabase.co`, `fonts.googleapis.com`, `fonts.gstatic.com` |

Não medido nesta sessão (requer ambiente de browser real): LCP/INP/CLS de campo. Ver checklist da secção P — PageSpeed Insights com dados de campo é o utilizador que tem de correr pós-deploy.

## M. Recomendações de arquitetura de conteúdo/URL (não executadas — decisão do utilizador)

1. **`/matematica-a` (página pilar da disciplina)** — estava na estrutura-alvo do mandato mas **não foi criada**. Precisa de conteúdo genuinamente distinto da homepage (não um redirect nem uma cópia fina) para não cair na mesma armadilha de "scaled content abuse" que a Fase 6 evita para os temas. Fica como recomendação, não implementação — decide o que essa página diz que a homepage não diz, e eu construo-a.
2. **Páginas de tema individuais** (`/matematica-a/11-ano/trigonometria`, etc.) — **nenhum dos 15 temas passa o portão de qualidade da Fase 6** (≥400 palavras de texto original, ≥1 exemplo resolvido em HTML, distinguível dos restantes). Continuam como secções âncora dentro do hub do ano (`#trigonometria-11`), com `<h2><a href="#trigonometria-11">`. Quando tiveres conteúdo real por tema, aviso e crio as páginas — o `registry.ts` já está estruturado para isso.
3. **Webhook Supabase → Deploy Hook do Vercel** (frescura de conteúdo, Fase 3): não configurado nesta sessão — precisa de um Deploy Hook criado no painel do Vercel (Project Settings → Git → Deploy Hooks) e depois um Database Webhook no Supabase (`resources` → INSERT/DELETE → chama esse URL). Não tenho uma ferramenta que crie Deploy Hooks do Vercel diretamente; és tu que tens de criar o hook e colar o URL no Supabase, ou pedires-me para te guiar passo a passo quando quiseres.

## N. Validação efetuada (output real)

**Build completo, do zero**, `rm -rf dist dist-ssr && npm run build`:
```
[prerender] 9 páginas escritas.
[sitemap] 7 URLs escritas em dist/sitemap.xml
[seo-audit] 8 páginas validadas, sem problemas.
```

**`tsc --noEmit`**: sem erros. **`npm run test`**: 1/1 testes a passar.

**Render SSR testado diretamente** (não só "o build não rebentou"), via `node -e` a importar `dist-ssr/entry-server.js` e chamar `render()` para cada rota — todas devolveram HTML com o conteúdo esperado; `/admin` corretamente só o fallback do Suspense (intencional, noindex).

**Inspeção manual do HTML pré-renderizado**, `dist/matematica-a/11-ano/index.html`: `<title>`, `<meta description>`, `<link rel="canonical" href="https://matematicaa.pt/matematica-a/11-ano">`, OG completo, `BreadcrumbList` JSON-LD válido, `<h1>`/`<h2>` dos 5 temas, tudo presente no HTML bruto (zero dependência de JS para o conteúdo aparecer).

**Servido como ficheiros estáticos reais** (não `vite preview`, que tem fallback de SPA embutido e dava falsos positivos/negativos — usei `python3 -m http.server` sobre `dist/`, que replica o comportamento do Vercel sem rewrite):
```
$ curl -s http://localhost:4175/matematica-a/11-ano/ | grep -o "<title>.*</title>"
<title>11.º Ano — Matemática A | MatA</title>
$ curl -s http://localhost:4175/admin/ | grep -o '<meta name="robots"[^>]*>'
<meta name="robots" content="noindex,nofollow" />
$ curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:4175/pagina-que-nao-existe
HTTP 404
```

**Produção atual** (antes desta sessão, prova do estado B2/B4/B6/B9):
```
$ curl -s https://matematicaa.pt/ano/10 | head -20   # idêntico byte a byte a "/"
$ curl -s -o /dev/null -w "HTTP %{http_code}\n" https://matematicaa.pt/pagina-inexistente
HTTP 200
$ curl -s https://matematicaa.pt/robots.txt   # sem Sitemap:
```
Este código ainda não foi feito push (ver secção O) — a comparação "depois" em produção fica para depois do deploy, no checklist da secção P.

## O. Riscos remanescentes

1. **Nada disto está em produção ainda.** Todo o trabalho está em 9 commits locais no branch `main`, não enviados para o GitHub/Vercel. Ver razão no ponto 2.
2. **`VITE_SITE_URL` tem de ser adicionada nas Environment Variables do projeto Vercel antes do próximo push** — `site.ts` falha a build de propósito se estiver ausente. Um build falhado no Vercel não deita a produção atual abaixo (mantém a última versão publicada com sucesso), mas o deploy com as correções de SEO fica bloqueado até a variável existir.
3. **`.env` continua commitado no repositório** (chaves `VITE_SUPABASE_*`, não secretas — são publishable/anon, protegidas por RLS). Não o removi do tracking porque isso quebraria a build no Vercel *a menos que* essas mesmas variáveis já estejam configuradas lá independentemente do ficheiro — não tenho forma de o confirmar sem acesso ao painel. Ação recomendada: confirma no Vercel que `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` já lá estão como Environment Variables; só depois disso faz sentido tirar o `.env` do git.
4. **Tabela `resources` vazia em produção** (0 registos, confirmado pela própria execução do `fetch-content.mjs`) — os hubs de ano ficam sem `lastmod` e sem conteúdo de fichas até haver uploads reais via `/admin`.
5. **Proxy de PDFs (`/recursos/*`) não testado com ficheiros reais** — não há nenhum recurso na tabela para validar o rewrite do Vercel contra o Supabase Storage.
6. **Sem ambiente de browser real nesta sessão** — LCP/INP/CLS de campo não medidos; a validação de CWV ficou ao nível de código (bundle size, ausência de render-blocking, preconnects), não de métricas reais de utilizador.
7. **Migração de framework (Next.js) não avaliada em profundidade** — decisão documentada como "não agora" (secção F), não como "nunca".

## P. Checklist pós-deploy (Search Console e verificação)

Ver [`SEARCH-CONSOLE.md`](./SEARCH-CONSOLE.md) para o processo completo. Resumo do que falta, por ordem:

1. Confirmar `VITE_SITE_URL=https://matematicaa.pt` nas Environment Variables do Vercel.
2. `git push` (autorização explícita necessária — não foi dada ainda para este conjunto de commits).
3. Confirmar o deploy do Vercel termina com sucesso (o `seo-audit.mjs` corre como parte da build — se falhar, o deploy não avança).
4. Correr os `curl` da secção N contra `https://matematicaa.pt` (produção real desta vez).
5. Search Console: criar propriedade, submeter sitemap, inspecionar as 7 URLs indexáveis, pedir indexação (A1-A2 do `SEARCH-CONSOLE.md`).
6. Rich Results Test na homepage e num hub de ano.
7. PageSpeed Insights — dados de campo, não só o score de laboratório.
8. Configurar o Deploy Hook + Database Webhook do ponto M.3, quando quiseres frescura automática de conteúdo.
