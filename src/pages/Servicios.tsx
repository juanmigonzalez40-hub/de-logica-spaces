import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { CTAStrip } from "@/components/sections/CTAStrip";
import tileDiseno from "@/assets/tile-diseno.jpg";
import tileFabricacion from "@/assets/tile-fabricacion.jpg";
import tileSenaletica from "@/assets/tile-senaletica.jpg";
import tileInstalacion from "@/assets/tile-instalacion.jpg";

const services = [
  {
    title: "Diseño e Interiorismo",
    description:
      "Concepto, 3D, experiencia del cliente y selección de materiales. Imagen de marca aplicada al espacio.",
    href: "/servicios/diseno",
    image: tileDiseno,
  },
  {
    title: "Fabricación de Mobiliario",
    description: "Mobiliario a medida para clínicas, retail, oficinas, restauración y gimnasios.",
    href: "/servicios/mobiliario",
    image: tileFabricacion,
  },
  {
    title: "Comunicación Visual y Señalética",
    description:
      "Rótulos, letras corpóreas, pantallas, vinilos e impresión de gran formato.",
    href: "/servicios/senaletica",
    image: tileSenaletica,
  },
  {
    title: "Instalación y Mantenimiento",
    description:
      "Equipos propios de montaje, planificación por hitos y servicio postventa.",
    href: "/servicios/instalacion",
    image: tileInstalacion,
  },
];

const Servicios = () => {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Servicios</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Del concepto a la implantación con un solo partner
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.href}
                className="bg-background rounded-2xl overflow-hidden shadow-elegant hover:shadow-xl transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <span className="text-accent font-semibold group-hover:underline">
                    Ver más →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Note */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <div className="bg-muted rounded-2xl p-8 flex gap-6">
            <Building2 className="w-8 h-8 text-accent flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-3">Coordinación con obra civil</h3>
              <p className="text-muted-foreground leading-relaxed">
                Si el proyecto requiere obra civil, De Lógica no la ejecuta directamente.
                Trabajamos con una red consolidada de colaboradores técnicos y empresas
                especializadas para alinear interiorismo, fabricación e instalación.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTAStrip
        title="¿Qué necesitas ahora?"
        secondaryCTA={{ label: "Agendar reunión", href: "/contacto#agenda" }}
      />
    </main>
  );
};

export default Servicios;
