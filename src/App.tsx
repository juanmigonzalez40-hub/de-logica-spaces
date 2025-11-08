import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import ServicioInstalacion from "./pages/ServicioInstalacion";
import ServicioDiseno from "./pages/ServicioDiseno";
import ServicioMobiliario from "./pages/ServicioMobiliario";
import ServicioSenaletica from "./pages/ServicioSenaletica";
import SimplePage from "./pages/SimplePage";
import Sostenibilidad from "./pages/Sostenibilidad";
import Proyectos from "./pages/Proyectos";
import Franquicias from "./pages/Franquicias";
import CasosDeExito from "./pages/CasosDeExito";
import Contacto from "./pages/Contacto";
import Gracias from "./pages/Gracias";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/instalacion" element={<ServicioInstalacion />} />
          <Route path="/servicios/diseno" element={<ServicioDiseno />} />
          <Route path="/servicios/mobiliario" element={<ServicioMobiliario />} />
          <Route path="/servicios/senaletica" element={<ServicioSenaletica />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/gracias" element={<Gracias />} />
          {/* Placeholder routes - to be built */}
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/casos-de-exito" element={<CasosDeExito />} />
          <Route path="/franquicias" element={<Franquicias />} />
          <Route path="/sostenibilidad" element={<Sostenibilidad />} />
          <Route
            path="/nosotros"
            element={
              <SimplePage
                title="Nosotros"
                subtitle="Más de 20 años creando espacios que venden"
                content="Equipo multidisciplinar con diseño, producción e instalación propias. Enfoque a resultados, detalle y plazos. Planificación, control de calidad y comunicación clara con dirección, retail, expansión, marketing y arquitectura."
              />
            }
          />
          <Route
            path="/blog"
            element={
              <SimplePage
                title="Blog"
                subtitle="Ideas útiles, sin humo"
                content="Contenido práctico para responsables de marketing, retail y expansión. Próximamente."
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
