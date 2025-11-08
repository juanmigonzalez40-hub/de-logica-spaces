import { CTAStrip } from "@/components/sections/CTAStrip";
import { EmprendeDialog } from "@/components/EmprendeDialog";
import heroFranquicias from "@/assets/hero-franquicias.jpg";
import franquiciaCafeteria from "@/assets/franquicia-cafeteria.jpg";
import franquiciaModa from "@/assets/franquicia-moda.jpg";
import franquiciaRestaurante from "@/assets/franquicia-restaurante.jpg";
import franquiciaGimnasio from "@/assets/franquicia-gimnasio.jpg";
import franquiciaSalon from "@/assets/franquicia-salon.jpg";
import franquiciaFarmacia from "@/assets/franquicia-farmacia.jpg";

const proyectos = [
  {
    title: "Cafetería",
    image: franquiciaCafeteria,
    sector: "Hostelería"
  },
  {
    title: "Retail Moda",
    image: franquiciaModa,
    sector: "Retail"
  },
  {
    title: "Restaurante",
    image: franquiciaRestaurante,
    sector: "Restauración"
  },
  {
    title: "Gimnasio",
    image: franquiciaGimnasio,
    sector: "Fitness"
  },
  {
    title: "Salón de Belleza",
    image: franquiciaSalon,
    sector: "Belleza"
  },
  {
    title: "Farmacia",
    image: franquiciaFarmacia,
    sector: "Salud"
  }
];

const Franquicias = () => {
  return (
    <>
      <EmprendeDialog alwaysShow={true} />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroFranquicias})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="container-custom relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Franquicias</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Soluciones integrales para el equipamiento de tu franquicia
            </p>
          </div>
        </section>

        <section className="section-padding bg-muted">
          <div className="container-custom max-w-3xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed text-center">
                Especializados en el desarrollo completo de franquicias, desde el diseño hasta la instalación.
                Garantizamos coherencia de marca y calidad en cada uno de tus puntos de venta.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Proyectos Realizados</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hemos equipado franquicias en múltiples sectores, garantizando excelencia y coherencia de marca
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectos.map((proyecto, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-muted"
                >
                  <img 
                    src={proyecto.image} 
                    alt={`Proyecto de franquicia - ${proyecto.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-sm font-medium mb-1">{proyecto.sector}</p>
                      <h3 className="text-xl font-bold">{proyecto.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTAStrip title="¿Necesitas equipar tu franquicia?" />
      </main>
    </>
  );
};

export default Franquicias;
