import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container-narrow py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary mb-3">
              <BookOpen className="h-5 w-5" />
              <span>MatA</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Recursos gratuitos de Matemática A para o ensino secundário português.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/ano/10" className="hover:text-primary transition-colors">10º Ano</Link></li>
              <li><Link to="/ano/11" className="hover:text-primary transition-colors">11º Ano</Link></li>
              <li><Link to="/ano/12" className="hover:text-primary transition-colors">12º Ano</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Informação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/sobre" className="hover:text-primary transition-colors">Sobre</Link></li>
              <li><Link to="/privacidade" className="hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li>
                <a href="https://explicacoesonlinemat.pt" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Explicações Online
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MatA. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
