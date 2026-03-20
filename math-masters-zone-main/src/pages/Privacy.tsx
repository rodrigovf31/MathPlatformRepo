import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 section-spacing">
        <article className="container-narrow max-w-3xl">
          <h1 className="text-3xl font-extrabold mb-6 text-primary">Política de Privacidade</h1>

          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground text-sm">
            <p><strong className="text-foreground">Última atualização:</strong> {new Date().toLocaleDateString("pt-PT")}</p>

            <h2 className="text-lg font-bold text-foreground pt-2">1. Informação Geral</h2>
            <p>A MatA respeita a privacidade dos seus utilizadores. Esta política explica como recolhemos, usamos e protegemos a informação quando visitas a nossa plataforma.</p>

            <h2 className="text-lg font-bold text-foreground pt-2">2. Dados Recolhidos</h2>
            <p>A MatA não recolhe dados pessoais identificáveis. Não existe sistema de login ou registo de contas. Podemos recolher dados anónimos de utilização através de ferramentas de análise (como o Google Analytics) para melhorar a experiência do utilizador.</p>

            <h2 className="text-lg font-bold text-foreground pt-2">3. Cookies</h2>
            <p>O nosso site pode utilizar cookies para fins de publicidade (Google AdSense) e análise de tráfego. Estes cookies são geridos por terceiros e estão sujeitos às respetivas políticas de privacidade.</p>

            <h2 className="text-lg font-bold text-foreground pt-2">4. Publicidade</h2>
            <p>Utilizamos o Google AdSense para exibir anúncios. O Google pode usar cookies para personalizar os anúncios com base nas visitas anteriores do utilizador a este e a outros sites. Para mais informações, consulta a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Política de Privacidade do Google</a>.</p>

            <h2 className="text-lg font-bold text-foreground pt-2">5. Links de Afiliados</h2>
            <p>Algumas páginas contêm links de afiliados para produtos recomendados. Ao clicar nestes links e efetuar uma compra, podemos receber uma comissão sem custo adicional para o utilizador.</p>

            <h2 className="text-lg font-bold text-foreground pt-2">6. Contacto</h2>
            {/* TODO: Substituir pelo email real */}
            <p>Para questões sobre esta política de privacidade, contacta-nos em: <strong className="text-foreground">contacto@mata.pt</strong></p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
