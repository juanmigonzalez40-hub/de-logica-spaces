import { StatsStrip } from "@/components/sections/StatsStrip";
import { CTAStrip } from "@/components/sections/CTAStrip";
import heroNosotros from "@/assets/hero-nosotros.jpg";
import casoBeatae from "@/assets/caso-beatae-1.png";
import servicioDiseno from "@/assets/servicio-diseno-1.jpg";
import servicioMobiliario from "@/assets/servicio-mobiliario-1.jpg";
import servicioInstalacion from "@/assets/servicio-instalacion-1.jpg";
const Nosotros = () => {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={heroNosotros}
          alt="Equipo De Lógica trabajando en proyectos de interiorismo comercial"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Nosotros</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Más de 20 años creando espacios que venden
          </p>
        </div>
      </section>

      {/* Value Proposition - 2 columns */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                No somos una agencia. <br />
                <span className="text-accent">Fabricamos espacios.</span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  Diseñamos, producimos e instalamos con equipos propios. Sin intermediarios, 
                  sin sorpresas. Un único interlocutor de principio a fin.
                </p>
                <p>
                  Trabajamos con dirección de retail, expansión y marketing de marcas que 
                  entienden que el espacio físico es su mejor escaparate.
                </p>
                <p className="font-medium text-foreground">
                  Nos miden por resultados: aperturas a tiempo, costes controlados, 
                  espacios que funcionan.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={casoBeatae}
                alt="Proyecto Beatae - Bakery & Café"
                className="w-full h-[400px] object-cover rounded-lg shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <StatsStrip />

      {/* How We Work - 3 columns */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Todo bajo el mismo techo
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Control total del proceso para garantizar calidad, plazos y presupuesto.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={servicioDiseno}
                  alt="Diseño de interiores comerciales"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Diseño</h3>
              <p className="text-muted-foreground">
                Concepto, renders y documentación técnica. Alineamos estética con 
                objetivos comerciales y normativa.
              </p>
            </div>
            <div className="group">
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={servicioMobiliario}
                  alt="Fabricación de mobiliario"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Producción</h3>
              <p className="text-muted-foreground">
                Talleres propios para mobiliario, carpintería y señalética. 
                Control de calidad en cada pieza.
              </p>
            </div>
            <div className="group">
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={servicioInstalacion}
                  alt="Instalación llave en mano"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Instalación</h3>
              <p className="text-muted-foreground">
                Equipos propios de montaje en toda España y Portugal. 
                Entrega llave en mano, sin excusas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTAStrip 
        title="¿Hablamos de tu próximo proyecto?"
        primaryCTA={{ label: "Contactar", href: "/contacto" }}
        secondaryCTA={{ label: "Ver proyectos", href: "/proyectos" }}
      />
    </main>
  );
};

export default Nosotros;
