import { FileText, BookOpen, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfCardProps {
  title: string;
  type: "ficha" | "guia";
  fileUrl: string;
  onView: () => void;
}

const PdfCard = ({ title, type, fileUrl, onView }: PdfCardProps) => {
  const isFicha = type === "ficha";

  return (
    <div className="flex items-center gap-4 rounded-lg glass glass-lite glass-interactive p-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isFicha ? "bg-primary/10 text-primary" : "bg-accent-light text-accent-gold"}`}>
        {isFicha ? <FileText className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{title}</h4>
        <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${isFicha ? "bg-primary/10 text-primary" : "bg-accent-light text-accent-gold"}`}>
          {isFicha ? "Ficha de Exercícios" : "Guia de Teoria"}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onView}
          aria-label="Consultar"
          className="gap-1 h-11 w-11 sm:h-9 sm:w-auto sm:px-3"
        >
          <Eye className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Consultar</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-1 h-11 w-11 sm:h-9 sm:w-auto sm:px-3"
        >
          <a href={fileUrl} download target="_blank" rel="noopener noreferrer" aria-label="Descarregar">
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Descarregar</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PdfCard;
