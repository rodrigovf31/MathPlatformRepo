import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import YearPage from "./pages/YearPage";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import AfiliadosDoacoes from "./pages/AfiliadosDoacoes";
import NotFound from "./pages/NotFound";

/**
 * noindex, sem valor de conteúdo rastreável — só esta rota vale a pena
 * separar em chunk próprio. As restantes ficam eager: com React.lazy o
 * output de renderToString seria só o fallback do Suspense, o que
 * esvaziaria o HTML pré-renderizado das páginas públicas (Fase 4).
 */
const Admin = lazy(() => import("./pages/Admin"));

const queryClient = new QueryClient();

/** Agnóstico do router — o router (BrowserRouter no cliente, StaticRouter no SSR) é injetado por quem monta este componente. */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/matematica-a/10-ano" element={<YearPage year={10} />} />
        <Route path="/matematica-a/11-ano" element={<YearPage year={11} />} />
        <Route path="/matematica-a/12-ano" element={<YearPage year={12} />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/afiliados-e-doacoes" element={<AfiliadosDoacoes />} />
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="sr-only">Administração</h1>
                </div>
              }
            >
              <Admin />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
