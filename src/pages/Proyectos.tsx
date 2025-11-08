import { CTAStrip } from "@/components/sections/CTAStrip";
import { EmprendeDialog } from "@/components/EmprendeDialog";
import { ProjectsRegistrationDialog } from "@/components/ProjectsRegistrationDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import heroImage from "@/assets/hero.jpg";
import disenoImg1 from "@/assets/servicio-diseno-1.jpg";
import disenoImg2 from "@/assets/servicio-diseno-2.jpg";
import mobiliarioImg1 from "@/assets/servicio-mobiliario-1.jpg";
import mobiliarioImg2 from "@/assets/servicio-mobiliario-2.jpg";
import instalacionImg1 from "@/assets/servicio-instalacion-1.jpg";
import instalacionImg2 from "@/assets/servicio-instalacion-2.jpg";

const sectors = [
  "Gimnasios y wellness",
  "Clínicas dentales",
  "Clínicas estéticas",
  "Restauración",
  "Hoteles y hospitality",
  "Tiendas y retail",
  "Ópticas y farmacias",
  "Oficinas corporativas"
];

const Proyectos = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSectorClick = (sector: string) => {
    setSelectedSector(sector);
    setDialogOpen(true);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <>
      <EmprendeDialog />
      <ProjectsRegistrationDialog
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        sector={selectedSector}
      />
      
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Proyecto ampliado"
              className="w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
      
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Proyectos</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre algunos de nuestros proyectos más destacados en diseño y fabricación de mobiliario comercial
            </p>
          </div>
        </section>

        {/* Galería de imágenes de proyectos */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[heroImage, disenoImg1, disenoImg2, mobiliarioImg1, mobiliarioImg2, instalacionImg1, instalacionImg2, heroImage, disenoImg1].map((img, index) => (
                <div 
                  key={index} 
                  className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  onClick={() => handleImageClick(img)}
                >
                  <img 
                    src={img} 
                    alt={`Proyecto ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de sectores */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Ver proyectos por sector
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Selecciona tu sector para ver proyectos específicos y recibir información personalizada
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {sectors.map((sector, index) => (
                <button
                  key={index}
                  onClick={() => handleSectorClick(sector)}
                  className="bg-background border-2 border-border rounded-lg p-6 text-center shadow-sm hover:shadow-md hover:border-primary transition-all"
                >
                  <p className="text-sm font-semibold">{sector}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <CTAStrip title="¿Listo para crear tu proyecto?" />
      </main>
    </>
  );
};

export default Proyectos;
