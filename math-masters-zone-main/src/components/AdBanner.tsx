/**
 * AdBanner — Componente reutilizável para espaços de publicidade Google AdSense.
 *
 * TODO: Substituir o placeholder pelo script do Google AdSense.
 * Exemplo de integração:
 *   <ins className="adsbygoogle"
 *     style={{ display: "block" }}
 *     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *     data-ad-slot="XXXXXXXXXX"
 *     data-ad-format="auto"
 *     data-full-width-responsive="true" />
 *
 * Após colar o código, remover o div placeholder abaixo.
 */

interface AdBannerProps {
  className?: string;
}

const AdBanner = ({ className = "" }: AdBannerProps) => {
  return (
    <aside className={`w-full ${className}`} aria-label="Publicidade">
      {/* TODO: Substituir este placeholder pelo bloco de anúncio do Google AdSense */}
      <div className="mx-auto max-w-4xl rounded-lg bg-muted/50 border border-border/50 py-8 px-4 text-center">
        <p className="text-xs text-muted-foreground tracking-wide uppercase">Espaço publicitário</p>
      </div>
    </aside>
  );
};

export default AdBanner;
