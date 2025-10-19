import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern commercial interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white py-32">
        <p className="text-sm uppercase tracking-widest mb-4 opacity-90 font-semibold">
          Del concepto a la implantación
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
          Transformamos espacios comerciales en herramientas de venta
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-95 leading-relaxed">
          Diseño, interiorismo, fabricación e instalación con equipos y producción propios.
          Especialistas en franquicias.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="primary" size="lg">
            <Link to="/contacto">Solicita tu propuesta</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
            <Link to="/proyectos">Ver proyectos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
