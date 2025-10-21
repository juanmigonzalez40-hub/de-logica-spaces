import { CTAStrip } from "@/components/sections/CTAStrip";
import certFSC from "@/assets/cert-fsc.png";
import certPEFC from "@/assets/cert-pefc.png";
import certC2C from "@/assets/cert-c2c.png";
import certEUEcolabel from "@/assets/cert-eu-ecolabel.png";
import certGreenguard from "@/assets/cert-greenguard.png";

const certifications = [
  {
    name: "FSC®",
    image: certFSC,
    description: "Garantiza que la madera y productos derivados provienen de bosques gestionados de forma responsable, respetando criterios ambientales, sociales y económicos.",
  },
  {
    name: "PEFC",
    image: certPEFC,
    description: "Certifica la gestión forestal sostenible y la trazabilidad de productos de madera, promoviendo el equilibrio entre aspectos ecológicos, sociales y económicos.",
  },
  {
    name: "Cradle to Cradle",
    image: certC2C,
    description: "Evalúa productos según salud de materiales, reutilización, energías renovables, gestión del agua y equidad social. Diseño pensado para la economía circular.",
  },
  {
    name: "EU Ecolabel",
    image: certEUEcolabel,
    description: "Etiqueta ecológica oficial de la UE que identifica productos y servicios con menor impacto ambiental durante todo su ciclo de vida.",
  },
  {
    name: "GREENGUARD",
    image: certGreenguard,
    description: "Certifica bajas emisiones químicas de productos para espacios interiores, garantizando aire más limpio y saludable.",
  },
];

const Sostenibilidad = () => {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sostenibilidad</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Materiales de alto rendimiento con menor impacto
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed text-center mb-12">
              Priorizamos soluciones duraderas, reparables y con menor residuo. Trabajamos con materiales certificados que garantizan un impacto ambiental reducido y promueven prácticas sostenibles en toda la cadena de valor.
            </p>
          </div>

          {/* Certifications Grid */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Certificaciones con las que trabajamos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {certifications.map((cert, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 mb-4 flex items-center justify-center bg-white rounded-lg p-3 shadow-sm">
                    <img
                      src={cert.image}
                      alt={`${cert.name} certification logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-sm mb-2">{cert.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTAStrip title="¿Quieres alternativas sostenibles?" />
    </main>
  );
};

export default Sostenibilidad;
