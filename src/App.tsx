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
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const Servicios = lazy(() => import("./pages/Servicios"));
const ServicioInstalacion = lazy(() => import("./pages/ServicioInstalacion"));
const ServicioDiseno = lazy(() => import("./pages/ServicioDiseno"));
const ServicioMobiliario = lazy(() => import("./pages/ServicioMobiliario"));
const ServicioSenaletica = lazy(() => import("./pages/ServicioSenaletica"));
const Nosotros = lazy(() => import("./pages/Nosotros"));
const Sostenibilidad = lazy(() => import("./pages/Sostenibilidad"));
const Proyectos = lazy(() => import("./pages/Proyectos"));
const Franquicias = lazy(() => import("./pages/Franquicias"));
const CasosDeExito = lazy(() => import("./pages/CasosDeExito"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Gracias = lazy(() => import("./pages/Gracias"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const ImplantacionComercial = lazy(() => import("./pages/ImplantacionComercial"));
const ArticuloRotulos = lazy(() => import("./pages/blog/ArticuloRotulos"));
const ArticuloMobiliario = lazy(() => import("./pages/blog/ArticuloMobiliario"));
const ArticuloFranquicias = lazy(() => import("./pages/blog/ArticuloFranquicias"));
const ArticuloVerano = lazy(() => import("./pages/blog/ArticuloVerano"));
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Contactos = lazy(() => import("./pages/admin/Contactos"));
const ProyectosAdmin = lazy(() => import("./pages/admin/Proyectos"));
const AvisoLegal = lazy(() => import("./pages/legal/AvisoLegal"));
const Privacidad = lazy(() => import("./pages/legal/Privacidad"));
const CookiesPage = lazy(() => import("./pages/legal/Cookies"));
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
          <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>}>
            <Routes>
              {/* Public routes with header and footer */}
              <Route path="/" element={<><Header /><Home /><Footer /></>} />
              <Route path="/implantacion-comercial" element={<><Header /><ImplantacionComercial /><Footer /></>} />
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
          </Suspense>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
