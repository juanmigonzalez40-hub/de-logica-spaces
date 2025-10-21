import { CTAStrip } from "@/components/sections/CTAStrip";
import { EmprendeDialog } from "@/components/EmprendeDialog";

const Franquicias = () => {
  return (
    <>
      <EmprendeDialog />
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Franquicias</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
