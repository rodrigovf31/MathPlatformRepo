import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import YearPage from "./pages/YearPage";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Admin from "./pages/Admin";
import AfiliadosDoacoes from "./pages/AfiliadosDoacoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ano/:year" element={<YearPage />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/afiliados-e-doacoes" element={<AfiliadosDoacoes />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
