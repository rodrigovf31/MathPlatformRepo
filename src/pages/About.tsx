import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 section-spacing">
        <article className="container-narrow max-w-3xl">
          <h1 className="text-3xl font-extrabold mb-6 text-primary">Sobre a MatA</h1>

          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              A <strong className="text-foreground">MatA</strong> é uma plataforma gratuita de recursos de estudo para alunos do ensino secundário português que frequentam a disciplina de Matemática A (10º, 11º e 12º anos).
            </p>
            <p>
              O nosso objetivo é simples: fornecer fichas de exercícios e guias de teoria organizados, acessíveis e de qualidade, para que qualquer aluno possa preparar-se para testes e exames de forma eficaz.
            </p>
            <p>
              Todos os recursos são criados e curados por professores e explicadores com experiência no ensino de Matemática A, garantindo que o conteúdo é relevante e alinhado com o programa curricular em vigor.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4">Como funciona?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Escolhe o teu ano (10º, 11º ou 12º).</li>
              <li>Navega pelos temas e encontra o recurso que precisas.</li>
              <li>Consulta diretamente no browser ou descarrega o PDF.</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground pt-4">Precisas de ajuda extra?</h2>
            <p>
              Se as fichas não são suficientes, considera as{" "}
              <a href="https://explicacoesonlinemat.pt" target="_blank" rel="noopener noreferrer" className="text-accent-warm font-medium hover:underline">
                explicações online de Matemática A
              </a>
              {" "}— sessões individuais e personalizadas para te ajudar a superar as tuas dificuldades.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default About;
