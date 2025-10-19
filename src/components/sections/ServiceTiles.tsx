import { Link } from "react-router-dom";
import tileDiseno from "@/assets/tile-diseno.jpg";
import tileFabricacion from "@/assets/tile-fabricacion.jpg";
import tileSenaletica from "@/assets/tile-senaletica.jpg";
import tileInstalacion from "@/assets/tile-instalacion.jpg";

const services = [
  {
    label: "Diseño e Interiorismo",
    href: "/servicios/diseno",
    image: tileDiseno,
  },
  {
    label: "Fabricación de Mobiliario",
    href: "/servicios/mobiliario",
    image: tileFabricacion,
  },
  {
    label: "Comunicación Visual y Señalética",
    href: "/servicios/senaletica",
    image: tileSenaletica,
  },
  {
    label: "Instalación y Mantenimiento",
    href: "/servicios/instalacion",
    image: tileInstalacion,
  },
];

export const ServiceTiles = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="group relative overflow-hidden rounded-2xl aspect-square shadow-elegant hover:shadow-xl transition-all duration-300"
            >
              <img
                src={service.image}
                alt={service.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white">{service.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
