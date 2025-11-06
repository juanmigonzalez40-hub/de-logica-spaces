import { CTAStrip } from "@/components/sections/CTAStrip";
import { EmprendeDialog } from "@/components/EmprendeDialog";
import heroFranquicias from "@/assets/hero-franquicias.jpg";

const Franquicias = () => {
  return (
    <>
      <EmprendeDialog />
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

        <CTAStrip title="¿Necesitas equipar tu franquicia?" />
      </main>
    </>
  );
};

export default Franquicias;
