import { CTAStrip } from "@/components/sections/CTAStrip";
import { EmprendeDialog } from "@/components/EmprendeDialog";

const Proyectos = () => {
  return (
    <>
      <EmprendeDialog />
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Proyectos</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre algunos de nuestros proyectos más destacados en diseño y fabricación de mobiliario comercial
            </p>
          </div>
        </section>

        <section className="section-padding bg-muted">
          <div className="container-custom max-w-3xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed text-center">
                En esta sección encontrarás una selección de proyectos que reflejan nuestro compromiso con la excelencia,
                la innovación y la sostenibilidad en cada espacio comercial que creamos.
              </p>
            </div>
          </div>
        </section>

        <CTAStrip title="¿Listo para crear tu proyecto?" />
      </main>
    </>
  );
};

export default Proyectos;
