# Search Console — passos para o utilizador executar

Esta secção não pode ser feita por mim — precisa da tua conta Google e acesso ao DNS/Vercel. Segue por ordem, depois do deploy com `VITE_SITE_URL` configurada no Vercel.

## A1 — Criar a propriedade

1. Vai a [search.google.com/search-console](https://search.google.com/search-console).
2. Cria uma propriedade de **Domínio**: `matematicaa.pt`. Isto cobre `http`, `https` e `www` automaticamente — mais fácil do que gerir variantes separadas.
3. Verificação por registo **TXT no DNS**: o Search Console dá-te um valor tipo `google-site-verification=...`. Adiciona-o como registo TXT no painel do teu fornecedor de domínio (onde compraste `matematicaa.pt`).
4. Se não tiveres acesso ao DNS (ex.: domínio gerido por outra pessoa), usa em alternativa uma propriedade de **Prefixo de URL** (`https://matematicaa.pt`) com verificação por ficheiro HTML ou tag `<meta>` — mais lento a propagar mas não depende do DNS.

## A2 — Submissão

1. **Sitemaps** (menu lateral) → submete `sitemap.xml` (resulta em `https://matematicaa.pt/sitemap.xml`). Confirma que o estado passa a "Êxito" e reparte quantos URLs foram descobertos — deve mostrar 7 (homepage, 3 hubs de ano, sobre, privacidade, afiliados-e-doacoes).
2. **Inspeção de URL** (barra de pesquisa no topo) → cola cada uma destas URLs, uma de cada vez, e clica "Testar URL publicado":
   - `https://matematicaa.pt/`
   - `https://matematicaa.pt/matematica-a/10-ano`
   - `https://matematicaa.pt/matematica-a/11-ano`
   - `https://matematicaa.pt/matematica-a/12-ano`
   - `https://matematicaa.pt/sobre`
   - `https://matematicaa.pt/privacidade`
   - `https://matematicaa.pt/afiliados-e-doacoes`
3. Para cada uma, confirma que o "HTML obtido" mostra conteúdo real (não uma `<div id="root">` vazia) — se estiver vazio, o deploy não tem o `VITE_SITE_URL`/prerender ativo, não avances para o pedido de indexação.
4. Só depois de confirmares o HTML: clica "Pedir indexação". **É um pedido, não uma ordem** — não há forma de garantir nem apressar a indexação, e submeter repetidamente a mesma URL não ajuda.

## A3 — O que NÃO fazer

- **Não uses a Indexing API da Google** para tentar acelerar a indexação destas páginas — essa API está documentada oficialmente só para `JobPosting` e `BroadcastEvent`. Usá-la aqui seria uso indevido.
- **Não compres** serviços de "indexação instantânea" ou submissão a "500 motores de busca" — não fazem nada de real, muitos são spam.
- **Não adiciones `llms.txt`** à espera de ajudar no ranking da Pesquisa Google — não é um sinal que a Google usa.
- **Não fragmentes conteúdo artificialmente** a pensar em "AI Overviews" — a base é sempre a mesma: rastreabilidade, indexabilidade, conteúdo útil, ligação interna, dados estruturados válidos. Não há atalho.
- O **IndexNow** (se quiseres configurar) serve o Bing/Yandex via [Bing Webmaster Tools](https://www.bing.com/webmasters) — é legítimo mas separado da Google, não confundir os dois.

## A4 — Monitorização (primeiras 8 semanas)

| Relatório | O que procurar |
|---|---|
| Indexação de páginas | Razões de exclusão. "Detetada — atualmente não indexada" é sinal de valor percebido baixo pela Google, não um erro técnico do teu lado. |
| Sitemaps | URLs descobertas vs. indexadas — se ficar preso em "descobertas" durante semanas, revê o conteúdo dessa página. |
| Desempenho | Olha primeiro para impressões e consultas de pesquisa — a posição média é a métrica mais ruidosa e menos fiável no curto prazo. |
| Core Web Vitals | Usa sempre os dados de campo (CrUX, mundo real), não só o score de laboratório do PageSpeed Insights. |
| Ações manuais / Problemas de segurança | Tem de estar sempre vazio — se aparecer algo aqui, é prioridade máxima. |
| Estatísticas de rastreio | Verifica se há picos de 404 ou 5xx logo a seguir ao deploy dos redirects `/ano/N`. |

**Nota sobre métricas**: os cliques do Search Console e as sessões de qualquer ferramenta de analytics (Google Analytics, Vercel Analytics, etc.) usam metodologias de contagem diferentes — nunca os compares diretamente como se fossem a mesma medida.

**Nota sobre causalidade**: este site tem sazonalidade forte (períodos de testes e exames nacionais). Não atribuas uma subida ou descida de posição a uma alteração técnica sem primeiro considerar: atualizações de algoritmo da Google, a própria sazonalidade, mudanças de conteúdo, e variação de procura. Regista a data de cada deploy — ajuda a correlacionar mais tarde.

## Verificação técnica rápida (a correr tu mesmo, ou pedir-me para correr depois do deploy)

```bash
curl -s https://matematicaa.pt/matematica-a/11-ano | grep -i "trigonometria"
curl -s https://matematicaa.pt/matematica-a/11-ano | grep -i canonical
curl -I https://matematicaa.pt/pagina-que-nao-existe   # espera HTTP 404
curl -I https://matematicaa.pt/ano/11                   # espera HTTP 308/301 -> /matematica-a/11-ano
curl -I https://matematicaa.pt/robots.txt https://matematicaa.pt/sitemap.xml
```

Depois disto, corre também:
- [Rich Results Test](https://search.google.com/test/rich-results) para `https://matematicaa.pt/matematica-a/11-ano` — confirma que o `BreadcrumbList` é reconhecido sem erros.
- [PageSpeed Insights](https://pagespeed.web.dev/) para a homepage — usa os dados de campo (a secção "Discover what your real users are experiencing"), não só o score de laboratório.
