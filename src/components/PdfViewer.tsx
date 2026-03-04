import { X, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfViewerProps {
  fileUrl: string;
  title: string;
  onClose: () => void;
}

const PdfViewer = ({ fileUrl, title, onClose }: PdfViewerProps) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-foreground/80 backdrop-blur-sm" role="dialog" aria-label={`Visualizador: ${title}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 bg-card border-b px-4 py-3">
        <h3 className="font-semibold text-sm truncate flex-1">{title}</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Abrir</span>
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={fileUrl} download className="gap-1">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Descarregar</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* PDF iframe */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={fileUrl}
          title={title}
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PdfViewer;
