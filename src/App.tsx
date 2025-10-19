import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import ServicioInstalacion from "./pages/ServicioInstalacion";
import SimplePage from "./pages/SimplePage";
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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/instalacion" element={<ServicioInstalacion />} />
          <Route
            path="/servicios/diseno"
            element={
              <SimplePage
                title="Diseño e interiorismo"
                subtitle="Imagen de marca llevada al espacio, del concepto al prototipo"
                content="Briefing, moodboards, renders y planos; prototipado y guía para implantación sin sorpresas."
                ctaTitle="¿Quieres un concepto a medida?"
              />
            }
          />
          <Route
            path="/servicios/mobiliario"
            element={
              <SimplePage
                title="Fabricación de mobiliario"
                subtitle="Calidad industrial con acabado fino"
                content="Prototipado, fabricación, acabados y control de calidad. Envío y montaje coordinados."
                ctaTitle="Cuéntanos qué necesitas"
              />
            }
          />
          <Route
            path="/servicios/senaletica"
            element={
              <SimplePage
                title="Comunicación visual y señalética"
                subtitle="Visibilidad, orientación y experiencia"
                content="Fachada e interior; señalización técnica y decorativa; LED y backlight; corpóreas y vinilos."
                ctaTitle="¿Necesitas renovar tu imagen?"
              />
            }
          />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/gracias" element={<Gracias />} />
          {/* Placeholder routes - to be built */}
          <Route
            path="/proyectos"
            element={
              <SimplePage
                title="Proyectos"
                subtitle="Portfolio de trabajos realizados"
                content="Estamos preparando nuestra galería de proyectos. Mientras tanto, contacta con nosotros para ver ejemplos específicos de tu sector."
              />
            }
          />
          <Route
            path="/casos-de-exito"
            element={
              <SimplePage
                title="Casos de éxito"
                subtitle="Historias reales con resultados medibles"
                content="Descubre cómo hemos ayudado a marcas y empresas a transformar sus espacios comerciales."
              />
            }
          />
          <Route
            path="/franquicias"
            element={
              <SimplePage
                title="Franquicias"
                subtitle="Coherencia, repetibilidad y tiempos óptimos"
                content="Especialistas en implantación de imagen para cadenas en expansión. Manual y estándares, repetibilidad y control, plazos y aperturas sincronizadas."
                ctaTitle="¿Tu marca crece?"
              />
            }
          />
          <Route
            path="/sostenibilidad"
            element={
              <SimplePage
                title="Sostenibilidad"
                subtitle="Materiales de alto rendimiento con menor impacto"
                content="Trabajamos con materiales con certificaciones como FSC®, PEFC, Cradle to Cradle, EU Ecolabel y GREENGUARD. Priorizamos soluciones duraderas, reparables y con menor residuo."
                ctaTitle="¿Quieres alternativas sostenibles?"
              />
            }
          />
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
