const stats = [
  { kpi: "2004 → hoy", label: "Más de 20 años de experiencia" },
  { kpi: "In-house", label: "Producción y control de calidad propios" },
  { kpi: "360°", label: "Llave en mano con un solo interlocutor" },
  { kpi: "Franquicias", label: "Implantación consistente multi-sitio" },
];

export const StatsStrip = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Capacidad y experiencia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-accent mb-2">{stat.kpi}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
