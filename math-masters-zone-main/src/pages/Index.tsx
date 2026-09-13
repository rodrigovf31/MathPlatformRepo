import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import YearCard from "@/components/YearCard";
import AdBanner from "@/components/AdBanner";
import AffiliateCard from "@/components/AffiliateCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTopicsByYear, yearDescriptions } from "@/data/topics";

/* TODO: Substituir os dados de afiliados pelos links e imagens reais */
const affiliateProducts = [
  { name: "Texas Instruments TI-Nspire CX II-T Calculadora gráfica digital branca", description: "A calculadora mais usada no ensino secundário.", affiliateUrl: "https://link.amazon/B06Qr8oLc", imageUrl: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/718IhG1ypvL._AC_SL1500_.jpg" },
  { name: "Caderno Pautado Oxford A4", description: "Folhas de qualidade para resolver exercícios.", affiliateUrl: "https://link.amazon/B0eQKi8zq", imageUrl: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/718kGM+LhxL._AC_SL1500_.jpg" },
  { name: "Canetas Stabilo Point 88", description: "Pack de cores para esquemas e apontamentos.", affiliateUrl: "https://link.amazon/B0iK1J1s2", imageUrl: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/71xPbkVeHxL._AC_SL1500_.jpg" },
  { name: "Mochila Eastpak Padded", description: "Resistente e confortável para o dia a dia.", affiliateUrl: "https://link.amazon/B0gTFL8nN", imageUrl: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/81fOUr20J+L._AC_SX679_.jpg" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-spacing bg-card border-b">
          <div className="container-narrow text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-primary">
              Recursos de Matemática A
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Fichas de exercícios e guias de teoria para o 10º, 11º e 12º ano. Gratuitos, organizados e prontos a usar.
            </p>
            <Button variant="hero" asChild>
              <Link to="/ano/10" className="gap-2">
                Explorar Recursos <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* AdSense — Posição 1: após hero */}
        <AdBanner className="section-spacing" />

        {/* Acesso Rápido por Ano */}
        <section className="section-spacing" aria-labelledby="anos-title">
          <div className="container-narrow">
            <h2 id="anos-title" className="text-2xl font-bold mb-8 text-center">Escolhe o teu ano</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[10, 11, 12].map(year => (
                <YearCard
                  key={year}
                  year={year}
                  description={yearDescriptions[year]}
                  topicCount={getTopicsByYear(year).length}
                />
              ))}
            </div>
          </div>
        </section>

        {/* AdSense — Posição 2: entre recursos e explicações */}
        <AdBanner className="pb-4" />

        {/* Explicações Online */}
        <section className="section-spacing" aria-labelledby="explicacoes-title">
          <div className="container-narrow">
            <div className="rounded-xl bg-card border border-border p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-warm/10">
                <GraduationCap className="h-8 w-8 text-accent-warm" />
              </div>
              {/*}
              <div className="flex-1 text-center md:text-left">
                <h2 id="explicacoes-title" className="text-xl font-bold mb-2">Precisas de ajuda personalizada?</h2>
                <p className="text-muted-foreground mb-4">
                  As fichas não chegam? Experimenta explicações online de Matemática A — sessões individuais, ao teu ritmo, com acompanhamento dedicado.
                </p>
                <Button variant="warm" asChild>
                  <a href="https://explicacoesonlinemat.pt" target="_blank" rel="noopener noreferrer" className="gap-2">
                    Saber mais <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              */}
            </div>
          </div>
        </section>

        {/* Ferramentas de Estudo Recomendadas (Afiliados) */}
        <section className="section-spacing bg-card border-t" aria-labelledby="ferramentas-title">
          <div className="container-narrow">
            <h2 id="ferramentas-title" className="text-2xl font-bold mb-2 text-center">Ferramentas de Estudo Recomendadas</h2>
            <p className="text-muted-foreground text-center mb-8 text-sm">Material que recomendamos para tirares o máximo partido do teu estudo.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {affiliateProducts.map((p, i) => (
                <AffiliateCard key={i} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* AdSense — Posição 3: antes do footer */}
        <AdBanner className="section-spacing" />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
