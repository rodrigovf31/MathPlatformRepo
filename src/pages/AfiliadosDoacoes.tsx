import { Link } from "react-router-dom";
import { HeartHandshake, ShoppingBag, Heart, ImageIcon, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdBanner from "@/components/AdBanner";

/* TODO: Substituir pelos links e dados reais de cada produto afiliado Amazon */
const affiliateProducts = [
  { name: "Calculadora Científica", description: "Essencial para exercícios e exames." },
  { name: "Caderno A4 Quadriculado", description: "Ideal para resolver exercícios de Matemática." },
  { name: "Canetas de Cor Fineliners", description: "Perfeitas para esquemas e apontamentos." },
  { name: "Compasso de Precisão", description: "Indispensável para geometria." },
  { name: "Régua e Esquadro 30cm", description: "Para construções geométricas rigorosas." },
  { name: "Manual de Fórmulas", description: "Referência rápida de fórmulas matemáticas." },
  { name: "Borracha e Afia de Qualidade", description: "Para um trabalho limpo e organizado." },
  { name: "Marcadores Fluorescentes", description: "Destaca o que é mais importante nos resumos." },
  { name: "Mochila Escolar Resistente", description: "Confortável para o dia a dia." },
  { name: "Livro de Exercícios Extra", description: "Prática adicional para preparação de exames." },
];

const AfiliadosDoacoes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-spacing bg-card border-b">
          <div className="container-narrow max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-primary">
              Apoia o Projeto
            </h1>
            <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed text-left sm:text-center">
              <p>
                Esta plataforma nasceu com um objetivo simples: dar a todos os estudantes de Matemática A
                acesso a material de estudo de qualidade — fichas de exercícios, guias de teoria, tudo
                organizado por ano e tema. <strong className="text-foreground">Sem registo, sem pagamento, sem barreiras.</strong>
              </p>
              <p>
                Manter este projeto exige tempo, dedicação e investimento pessoal. Se os recursos que
                encontras aqui te têm sido úteis, há duas formas simples de ajudar o projeto a continuar
                a crescer — e nenhuma delas é obrigatória.
              </p>
              <p>
                Podes fazer um donativo voluntário ou utilizar os links de afiliados abaixo para compras
                que já irias fazer. Em ambos os casos, estarás a contribuir diretamente para que mais
                conteúdo gratuito chegue a mais estudantes.{" "}
                <strong className="text-foreground">Os recursos continuarão sempre gratuitos,
                independentemente de qualquer contribuição.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Secção de Doações PayPal */}
        <section className="section-spacing" aria-labelledby="doacoes-title">
          <div className="container-narrow flex justify-center">
            <div className="w-full max-w-[600px] rounded-xl bg-card border border-primary/30 p-8 sm:p-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <HeartHandshake className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h2 id="doacoes-title" className="text-2xl font-bold mb-4 text-primary">
                Doações Voluntárias
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Qualquer valor faz a diferença. Os donativos ajudam a cobrir os custos de manutenção
                da plataforma e permitem criar mais conteúdo de qualidade para os estudantes.
                São completamente voluntários — contribui apenas se quiseres e puderes.
              </p>

              {/* TODO: Substituir pelo link real do botão PayPal Donate */}
              <Button asChild size="lg" className="mb-6">
                <a
                  href="https://www.paypal.com/donate/?hosted_button_id=PLACEHOLDER"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Fazer Donativo via PayPal
                </a>
              </Button>

              {/* Disclaimer legal de doações — NÃO remover nem esconder */}
              <div className="text-xs text-muted-foreground leading-relaxed space-y-1 text-left border-t pt-4 mt-2">
                <p>• Os donativos são voluntários e não concedem acesso a conteúdo adicional nem qualquer tipo de vantagem.</p>
                <p>• Os donativos não são reembolsáveis, salvo em situações excecionais.</p>
                <p>• Este site não é uma instituição de caridade registada — os donativos não são dedutíveis fiscalmente.</p>
                <p>• Os fundos recebidos são utilizados exclusivamente para manutenção, alojamento e desenvolvimento da plataforma.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense — entre doações e afiliados, com 32px+ de separação */}
        <AdBanner className="py-8" />

        {/* Secção de Afiliados Amazon */}
        <section className="section-spacing" aria-labelledby="afiliados-title">
          <div className="container-narrow">
            <div className="flex items-center justify-center gap-3 mb-3">
              <ShoppingBag className="h-6 w-6 text-accent-gold" />
              <h2 id="afiliados-title" className="text-2xl font-bold">
                Ferramentas de Estudo Recomendadas
              </h2>
            </div>
            <p className="text-muted-foreground text-center mb-2 max-w-2xl mx-auto">
              Estes são materiais que consideramos úteis para qualquer estudante de Matemática A.
              Os links abaixo são links de afiliado da Amazon — se comprares através deles, a plataforma
              recebe uma pequena comissão <strong className="text-foreground">sem qualquer custo adicional para ti</strong>.
            </p>
            <p className="text-xs text-muted-foreground text-center mb-8">
              <Info className="inline h-3 w-3 mr-1 -mt-0.5" />
              Os links nesta secção são links de afiliado. Consulta o disclaimer abaixo para mais informações.
            </p>

            {/* Grid de 10 produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {affiliateProducts.map((product, i) => (
                <div
                  key={i}
                  className="group flex flex-col rounded-xl bg-card border border-border overflow-hidden shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Imagem placeholder */}
                  <div className="aspect-square bg-muted flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
                    <span className="text-xs text-muted-foreground/60">Imagem do Produto</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 flex-1">
                      {product.description}
                    </p>
                    {/* TODO: Substituir pelo link de afiliado real da Amazon */}
                    <Button asChild variant="warm" size="sm" className="w-full">
                      <a
                        href="https://www.amazon.com/dp/PLACEHOLDER?tag=SEU-TAG-AFILIADO"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        Ver na Amazon
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer Amazon Associates — NÃO remover, esconder ou truncar */}
            <div className="mt-8 rounded-lg border border-border bg-background p-5 text-xs text-muted-foreground leading-relaxed">
              <p>
                <strong>Divulgação de Afiliado:</strong> Como Associado da Amazon, este site obtém rendimentos
                a partir de compras qualificadas. Os links acima são links de afiliado — se comprares através
                deles, a Amazon paga-nos uma pequena comissão sem qualquer custo adicional para ti. Apenas
                recomendamos produtos que consideramos genuinamente úteis para estudantes. Os preços e a
                disponibilidade dos produtos são definidos pela Amazon e podem ser alterados sem aviso prévio.
                Este site não é patrocinado, endossado, administrado ou associado à Amazon.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer geral da página — antes do footer */}
        <section className="border-t bg-muted/30 py-8">
          <div className="container-narrow max-w-3xl mx-auto text-xs text-muted-foreground leading-relaxed space-y-3 text-center">
            <p>
              Este site apresenta conteúdo publicitário (através do Google AdSense) e links de afiliados
              como forma de financiar o projeto e manter todos os recursos educativos gratuitos. O conteúdo
              educativo é produzido de forma independente e não é influenciado por quaisquer relações comerciais.
            </p>
            <p>
              Para mais informações sobre como os teus dados são tratados, consulta a nossa{" "}
              <Link to="/privacidade" className="text-primary underline hover:text-primary/80 transition-colors">
                Política de Privacidade
              </Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AfiliadosDoacoes;
