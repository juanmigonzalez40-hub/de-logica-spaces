import { CTAStrip } from "@/components/sections/CTAStrip";
import disenoImg1 from "@/assets/servicio-diseno-1.jpg";
import disenoImg2 from "@/assets/servicio-diseno-2.jpg";

const deliverables = [
  "Briefing y análisis de necesidades del negocio",
  "Moodboards y paletas de materiales y colores",
  "Renders 3D fotorrealistas del espacio",
  "Planos técnicos detallados para ejecución",
  "Prototipado de elementos clave",
  "Guía de implantación y especificaciones",
];

const differentials = [
  {
    title: "Diseño funcional",
    description: "Espacios que mejoran la experiencia del cliente y optimizan el flujo de trabajo.",
  },
  {
    title: "Imagen de marca coherente",
    description:
      "Traducción fiel de tu identidad visual al espacio físico.",
  },
  {
    title: "Sin sorpresas",
    description:
      "Renders y prototipos para validar antes de fabricar e instalar.",
  },
];

const ServicioDiseno = () => {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Diseño e interiorismo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Imagen de marca llevada al espacio, del concepto al prototipo
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={disenoImg1}
              alt="Concepto de diseño interior 3D para espacio comercial"
              className="w-full h-[400px] object-cover rounded-lg shadow-elegant"
            />
            <img
              src={disenoImg2}
              alt="Proceso de planificación con planos y muestras de materiales"
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
                Desarrollamos el concepto, diseño y especificaciones técnicas de tu espacio comercial. Desde el briefing inicial hasta los renders 3D y los planos de ejecución, trabajamos para que la imagen de tu marca se traduzca fielmente al espacio físico.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Para quién</h2>
              <p className="text-muted-foreground leading-relaxed">
                Marcas que abren un nuevo local, reforman su imagen o necesitan un concepto replicable para franquicias. También para arquitectos y promotores que buscan un partner especializado en retail, clínicas, fitness y restauración.
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
        title="¿Quieres un concepto a medida?"
        secondaryCTA={{ label: "Agendar reunión", href: "/contacto#agenda" }}
      />
    </main>
  );
};

export default ServicioDiseno;
