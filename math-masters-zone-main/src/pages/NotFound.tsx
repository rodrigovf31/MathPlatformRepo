import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";

const seo = {
  path: "/404",
  title: "Página Não Encontrada | MatA",
  description: "A página que procuras não existe ou foi movida. Explora os recursos de Matemática A por ano.",
  h1: "Página não encontrada",
  robots: "noindex,follow" as const,
  inSitemap: false,
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: rota não encontrada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Seo {...seo} />
      <Header />
      <main className="flex-1 flex items-center justify-center section-spacing">
        <div className="container-narrow max-w-lg text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-primary">Página não encontrada</h1>
          <p className="text-muted-foreground mb-8">
            A página <code className="text-sm">{location.pathname}</code> não existe ou foi movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="glass-link-inline text-primary hover:text-primary/90 font-medium">
              Voltar à página inicial
            </Link>
            <Link to="/matematica-a/10-ano" className="glass-link-inline text-primary hover:text-primary/90 font-medium">
              Ver recursos do 10º ano
            </Link>
            <Link to="/matematica-a/11-ano" className="glass-link-inline text-primary hover:text-primary/90 font-medium">
              Ver recursos do 11º ano
            </Link>
            <Link to="/matematica-a/12-ano" className="glass-link-inline text-primary hover:text-primary/90 font-medium">
              Ver recursos do 12º ano
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
