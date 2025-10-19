import { Puzzle, Factory, BadgeCheck, Timer } from "lucide-react";

const values = [
  {
    icon: Puzzle,
    title: "Soluciones 360°",
    description:
      "Un solo partner: diseño + interiorismo + mobiliario + comunicación visual + instalación.",
  },
  {
    icon: Factory,
    title: "Producción propia",
    description: "Control total en calidad, costes y plazos con maquinaria y equipos propios.",
  },
  {
    icon: BadgeCheck,
    title: "Franquicias",
    description: "Implantación fiel y repetible en múltiples ubicaciones.",
  },
  {
    icon: Timer,
    title: "Plazos garantizados",
    description: "Planificación por hitos y coordinación de oficios para llegar a tiempo.",
  },
];

export const ValueGrid = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Por qué De Lógica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
