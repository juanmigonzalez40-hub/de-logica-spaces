import { CTAStrip } from "@/components/sections/CTAStrip";
import mobiliarioImg1 from "@/assets/servicio-mobiliario-1.jpg";
import mobiliarioImg2 from "@/assets/servicio-mobiliario-2.jpg";

const deliverables = [
  "Diseño técnico y planos de fabricación",
  "Prototipado de piezas clave",
  "Fabricación con maquinaria CNC de precisión",
  "Acabados premium: lacados, chapados, laminados",
  "Control de calidad en fábrica",
  "Embalaje, transporte y entrega coordinada",
];

const differentials = [
  {
    title: "Producción propia",
    description: "Taller con equipos CNC y profesionales especializados. Control total de tiempos y calidad.",
  },
  {
    title: "Mobiliario a medida",
    description:
      "Cada proyecto es único. Diseñamos y fabricamos según las necesidades específicas de tu marca.",
  },
  {
    title: "Materiales certificados",
    description:
      "Trabajamos con proveedores de confianza y materiales con certificaciones sostenibles cuando el cliente lo requiere.",
  },
];

const ServicioMobiliario = () => {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fabricación de mobiliario
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mobiliario único que eleva tu marca
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={mobiliarioImg1}
              alt="Taller de fabricación de mobiliario a medida"
              className="w-full h-[400px] object-cover rounded-lg shadow-elegant"
            />
            <img
              src={mobiliarioImg2}
              alt="Mobiliario comercial de alta gama instalado"
              className="w-full h-[400px] object-cover rounded-lg shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* Two Column Intro */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Qué hacemos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Fabricamos mobiliario a medida para espacios comerciales: mostradores de recepción, expositores, estanterías, mesas, bancos de trabajo y cualquier pieza que necesites. Trabajamos madera, metal, acrílico y materiales compuestos con maquinaria CNC de última generación.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Para quién</h2>
              <p className="text-muted-foreground leading-relaxed">
                Retail, clínicas dentales y estéticas, gimnasios, oficinas, restaurantes, panaderías, ópticas y cualquier negocio que necesite mobiliario funcional y con personalidad. También para franquicias que requieren repetibilidad exacta en múltiples ubicaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Entregables habituales</h2>
          <ul className="space-y-4">
            {deliverables.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent font-bold text-xl">✓</span>
                <span className="text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Differentials */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Por qué con De Lógica</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentials.map((item, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip
        title="Cuéntanos qué necesitas"
        secondaryCTA={{ label: "Agendar reunión", href: "/contacto#agenda" }}
      />
    </main>
  );
};

export default ServicioMobiliario;
