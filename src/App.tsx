import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminLayout } from "@/components/AdminLayout";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import ServicioInstalacion from "./pages/ServicioInstalacion";
import ServicioDiseno from "./pages/ServicioDiseno";
import ServicioMobiliario from "./pages/ServicioMobiliario";
import ServicioSenaletica from "./pages/ServicioSenaletica";
import Nosotros from "./pages/Nosotros";
import Sostenibilidad from "./pages/Sostenibilidad";
import Proyectos from "./pages/Proyectos";
import Franquicias from "./pages/Franquicias";
import CasosDeExito from "./pages/CasosDeExito";
import Contacto from "./pages/Contacto";
import Gracias from "./pages/Gracias";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import ArticuloRotulos from "./pages/blog/ArticuloRotulos";
import ArticuloMobiliario from "./pages/blog/ArticuloMobiliario";
import ArticuloFranquicias from "./pages/blog/ArticuloFranquicias";
import ArticuloVerano from "./pages/blog/ArticuloVerano";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Contactos from "./pages/admin/Contactos";
import ProyectosAdmin from "./pages/admin/Proyectos";
import AvisoLegal from "./pages/legal/AvisoLegal";
import Privacidad from "./pages/legal/Privacidad";
import CookiesPage from "./pages/legal/Cookies";
import { CookieBanner } from "@/components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <CookieBanner />
          <Routes>
            {/* Public routes with header and footer */}
            <Route path="/" element={<><Header /><Home /><Footer /></>} />
            <Route path="/servicios" element={<><Header /><Servicios /><Footer /></>} />
            <Route path="/servicios/instalacion" element={<><Header /><ServicioInstalacion /><Footer /></>} />
            <Route path="/servicios/diseno" element={<><Header /><ServicioDiseno /><Footer /></>} />
            <Route path="/servicios/mobiliario" element={<><Header /><ServicioMobiliario /><Footer /></>} />
            <Route path="/servicios/senaletica" element={<><Header /><ServicioSenaletica /><Footer /></>} />
            <Route path="/contacto" element={<><Header /><Contacto /><Footer /></>} />
            <Route path="/gracias" element={<><Header /><Gracias /><Footer /></>} />
            <Route path="/proyectos" element={<><Header /><Proyectos /><Footer /></>} />
            <Route path="/casos-de-exito" element={<><Header /><CasosDeExito /><Footer /></>} />
            <Route path="/franquicias" element={<><Header /><Franquicias /><Footer /></>} />
            <Route path="/sostenibilidad" element={<><Header /><Sostenibilidad /><Footer /></>} />
            <Route path="/nosotros" element={<><Header /><Nosotros /><Footer /></>} />
            <Route path="/blog" element={<><Header /><Blog /><Footer /></>} />
            <Route path="/blog/rotulos-fachadas" element={<><Header /><ArticuloRotulos /><Footer /></>} />
            <Route path="/blog/mobiliario-comercial" element={<><Header /><ArticuloMobiliario /><Footer /></>} />
            <Route path="/blog/franquicias-branding" element={<><Header /><ArticuloFranquicias /><Footer /></>} />
            <Route path="/blog/prepara-local-verano" element={<><Header /><ArticuloVerano /><Footer /></>} />
            
            {/* Legal routes */}
            <Route path="/legal/aviso-legal" element={<><Header /><AvisoLegal /><Footer /></>} />
            <Route path="/legal/privacidad" element={<><Header /><Privacidad /><Footer /></>} />
            <Route path="/legal/cookies" element={<><Header /><CookiesPage /><Footer /></>} />
            
            {/* Admin routes - no header/footer */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="contactos" element={<Contactos />} />
              <Route path="proyectos" element={<ProyectosAdmin />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
