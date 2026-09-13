import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

/** Re-exportado para scripts/prerender.mjs consumir exatamente o mesmo registo/funções que o runtime (Seo.tsx). */
export { pageRegistry } from "./seo/registry";
export { SITE, absoluteUrl } from "./seo/site";
export { jsonLdForPage } from "./seo/jsonld";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
