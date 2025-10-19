const sectors = [
  "Clínicas dentales",
  "Clínicas estéticas",
  "Gimnasios y wellness",
  "Hoteles y hospitality",
  "Tiendas y retail",
  "Restauración",
  "Carnicerías y alimentación",
  "Panaderías y pastelerías",
  "Ópticas y farmacias",
  "Oficinas y sedes corporativas",
  "Tecnología y telecom",
  "Educación y academias",
];

export const SectorsGrid = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Trabajamos para todo tipo de negocios
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Diseñamos y fabricamos para empresas de cualquier tamaño
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-sm font-medium">{sector}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
