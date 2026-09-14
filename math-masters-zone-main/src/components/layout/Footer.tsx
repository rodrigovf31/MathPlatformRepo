import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container-narrow py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="glass-link flex items-center gap-2 font-bold text-lg text-primary mb-3">
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
              <li><Link to="/matematica-a/10-ano" className="glass-link hover:text-primary transition-colors">Fichas e teoria do 10º ano</Link></li>
              <li><Link to="/matematica-a/11-ano" className="glass-link hover:text-primary transition-colors">Fichas e teoria do 11º ano</Link></li>
              <li><Link to="/matematica-a/12-ano" className="glass-link hover:text-primary transition-colors">Fichas e teoria do 12º ano</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Informação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/sobre" className="glass-link hover:text-primary transition-colors">Sobre</Link></li>
              <li><Link to="/privacidade" className="glass-link hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li>
                <a href="https://explicacoesonlinemat.pt" target="_blank" rel="noopener noreferrer" className="glass-link hover:text-primary transition-colors">
                  Explicações Online
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
          © {__BUILD_YEAR__} MatA. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
