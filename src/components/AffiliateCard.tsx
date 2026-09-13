/**
 * AffiliateCard — Card para produtos recomendados com links de afiliado.
 *
 * TODO: Substituir os links e imagens placeholder pelos links reais de afiliado.
 * Cada produto deve ter um link de afiliado válido e uma imagem real do produto.
 */

import { ExternalLink } from "lucide-react";

interface AffiliateCardProps {
  name: string;
  description: string;
  imageUrl?: string;
  affiliateUrl: string;
}

const AffiliateCard = ({ name, description, imageUrl, affiliateUrl }: AffiliateCardProps) => {
  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group flex flex-col rounded-xl bg-card border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-accent-light flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="text-muted-foreground text-sm">Imagem do produto</div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{name}</h4>
        <p className="text-xs text-muted-foreground mb-3 flex-1">{description}</p>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-warm">
          Ver produto <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
};

export default AffiliateCard;
