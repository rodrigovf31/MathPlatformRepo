import { Link } from "react-router-dom";
import { BookOpen, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <nav className="container-narrow flex h-16 items-center justify-between" aria-label="Navegação principal">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <BookOpen className="h-6 w-6" />
          <span>MatA</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/ano/10" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">10º Ano</Link>
          <Link to="/ano/11" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">11º Ano</Link>
          <Link to="/ano/12" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">12º Ano</Link>
          <Link to="/sobre" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Sobre</Link>
          <Link to="/afiliados-e-doacoes" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            <Heart className="h-4 w-4 text-accent-warm" />
            Apoiar o Projeto
          </Link>
          <Button asChild variant="warm" size="sm">
            <a href="https://explicacoesonlinemat.pt" target="_blank" rel="noopener noreferrer">
              Explicações Online
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-card px-4 pb-4 pt-2 space-y-2 animate-fade-in-up">
          <Link to="/ano/10" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setMenuOpen(false)}>10º Ano</Link>
          <Link to="/ano/11" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setMenuOpen(false)}>11º Ano</Link>
          <Link to="/ano/12" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setMenuOpen(false)}>12º Ano</Link>
          <Link to="/sobre" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setMenuOpen(false)}>Sobre</Link>
          <Link to="/afiliados-e-doacoes" className="flex items-center gap-1 py-2 text-sm font-medium text-muted-foreground" onClick={() => setMenuOpen(false)}>
            <Heart className="h-4 w-4 text-accent-warm" />
            Apoiar o Projeto
          </Link>
          <a href="https://explicacoesonlinemat.pt" target="_blank" rel="noopener noreferrer" className="block py-2 text-sm font-semibold text-accent-warm">Explicações Online</a>
        </div>
      )}
    </header>
  );
};

export default Header;
