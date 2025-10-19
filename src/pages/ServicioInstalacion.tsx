import { CTAStrip } from "@/components/sections/CTAStrip";
import instalacionImg1 from "@/assets/servicio-instalacion-1.jpg";
import instalacionImg2 from "@/assets/servicio-instalacion-2.jpg";

const deliverables = [
  "Medición técnica in situ y verificación de planos",
  "Planificación por hitos (Gantt) y coordinación de oficios",
  "Transporte, accesos y manipulación en obra",
  "Instalación de mobiliario, corpóreas, rótulos y gran formato",
  "Conexión y pruebas de iluminación/eléctrica (si aplica)",
  "Acabado fino, limpieza y entrega con checklist",
  "Mantenimiento correctivo y preventivo",
];

const differentials = [
  {
    title: "Equipos propios",
    description: "Control directo de la calidad y los tiempos. Cero intermediarios innecesarios.",
  },
  {
    title: "Plazos garantizados",
    description:
      "Planificación clara, comunicación continua y cierre con checklist de calidad.",
  },
  {
    title: "Un solo interlocutor",
    description:
      "Coordinación integral con diseño, fabricación y proveedores del cliente.",
  },
];

const faqs = [
  {
    q: "¿Incluís obra civil?",
    a: "No ejecutamos obra civil directamente. Coordinamos con colaboradores técnicos para alinear tiempos, accesos y calidad.",
  },
  {
    q: "¿En qué zonas trabajáis?",
    a: "Cobertura nacional (España). También realizamos proyectos internacionales bajo coordinación previa.",
  },
  {
    q: "¿Plazos típicos?",
    a: "Dependen del alcance. Para implantaciones estándar, planificamos por hitos y consensuamos un calendario realista.",
  },
  {
    q: "¿Fuera de horario?",
    a: "Sí. Podemos planificar trabajos nocturnos o en festivo cuando el venue lo exige.",
  },
];

const ServicioInstalacion = () => {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Instalación y mantenimiento
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Montaje profesional, plazos controlados y acabados impecables
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={instalacionImg1}
              alt="Equipo profesional instalando mobiliario comercial"
              className="w-full h-[400px] object-cover rounded-lg shadow-elegant"
            />
            <img
              src={instalacionImg2}
              alt="Proceso de montaje coordinado en espacio comercial"
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
                Implantamos tu proyecto en tienda, clínica, oficina o gimnasio con equipos
                propios de montaje. Cubrimos la cadena completa: recepción de material,
                transporte, coordinación de accesos, instalación, pruebas y limpieza final. Tras
                la apertura, ofrecemos mantenimiento y reposiciones.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Para quién</h2>
              <p className="text-muted-foreground leading-relaxed">
                Marcas, franquicias y empresas que necesitan un partner fiable para ejecutar
                aperturas, reformas o rebrandings con un único interlocutor.
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

      {/* FAQs */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Preguntas frecuentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-6">
                <h3 className="text-xl font-semibold mb-3">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip
        title="¿Listo para instalar?"
        secondaryCTA={{ label: "Agendar reunión", href: "/contacto#agenda" }}
      />
    </main>
  );
};

export default ServicioInstalacion;
