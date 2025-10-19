import { CTAStrip } from "@/components/sections/CTAStrip";
import senaleticaImg1 from "@/assets/servicio-senaletica-1.jpg";
import senaleticaImg2 from "@/assets/servicio-senaletica-2.jpg";

const deliverables = [
  "Diseño de identidad visual para el espacio",
  "Rótulos de fachada iluminados y no iluminados",
  "Letras corpóreas 3D con LED y backlight",
  "Señalización interior: direccional, informativa, decorativa",
  "Vinilos de escaparate y decorativos para paredes",
  "Impresión de gran formato y montaje",
];

const differentials = [
  {
    title: "Fabricación e instalación",
    description: "No subcontratamos. Producimos e instalamos con equipos propios para máximo control.",
  },
  {
    title: "Tecnología LED",
    description:
      "Iluminación eficiente, duradera y con alto impacto visual para rótulos y corpóreas.",
  },
  {
    title: "Proyectos integrales",
    description:
      "Desde el logo en fachada hasta la señalética interior: coordinación completa en un solo proveedor.",
  },
];

const ServicioSenaletica = () => {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Comunicación visual y señalética
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visibilidad, orientación y experiencia
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={senaleticaImg1}
              alt="Rótulo comercial iluminado en fachada"
              className="w-full h-[400px] object-cover rounded-lg shadow-elegant"
            />
            <img
              src={senaleticaImg2}
              alt="Sistema de señalética interior elegante"
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
                Diseñamos, fabricamos e instalamos todo tipo de elementos de comunicación visual: rótulos de fachada, letras corpóreas con iluminación LED, señalización interior, vinilos decorativos y de escaparate, e impresión de gran formato. Todo lo necesario para que tu marca destaque y tus clientes se orienten fácilmente.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Para quién</h2>
              <p className="text-muted-foreground leading-relaxed">
                Negocios que abren, renuevan imagen o necesitan mejorar la visibilidad: retail, clínicas, gimnasios, restaurantes, oficinas, hoteles. También franquicias que requieren identidad visual consistente en todas sus ubicaciones.
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
        title="¿Necesitas renovar tu imagen?"
        secondaryCTA={{ label: "Agendar reunión", href: "/contacto#agenda" }}
      />
    </main>
  );
};

export default ServicioSenaletica;
