import { CTAStrip } from "@/components/sections/CTAStrip";
import casoGimnasio from "@/assets/caso-gimnasio.jpg";
import casoClinicaDental from "@/assets/caso-clinica-dental.jpg";
import casoTiendaModa from "@/assets/caso-tienda-moda.jpg";
import casoRestaurante from "@/assets/caso-restaurante.jpg";
import casoOptica from "@/assets/caso-optica.jpg";
import casoCafeteria from "@/assets/caso-cafeteria.jpg";

const casos = [
  {
    title: "FitLife Gym - Expansión Nacional",
    client: "FitLife Gym",
    sector: "Fitness y Wellness",
    location: "Madrid",
    surface: "850 m²",
    timeline: "3 meses",
    services: ["Diseño integral", "Fabricación de mobiliario", "Instalación completa", "Señalética"],
    image: casoGimnasio,
    description: "Proyecto de equipamiento completo para el centro insignia de la cadena FitLife Gym en Madrid. Diseño moderno e industrial con elementos de branding corporativo integrados en toda la instalación.",
    challenge: "Crear un espacio funcional que albergara múltiples zonas (cardio, musculación, clases dirigidas, spa) manteniendo una identidad de marca coherente y un flujo de usuarios óptimo.",
    solution: "Desarrollamos un concepto de diseño que integra colores corporativos (negro y verde neón) con materiales industriales como acero y hormigón. Zonas claramente diferenciadas con señalética LED y mobiliario custom que optimiza el espacio.",
    results: "+35% incremento de socios en los primeros 6 meses. Reducción del 20% en tiempos de espera de equipamiento gracias a la optimización del layout."
  },
  {
    title: "Clínica Dental Sonrisa - Renovación Premium",
    client: "Clínica Dental Sonrisa",
    sector: "Salud y Estética Dental",
    location: "Barcelona",
    surface: "320 m²",
    timeline: "2 meses",
    services: ["Diseño interior", "Mobiliario sanitario a medida", "Iluminación LED especializada", "Recepción y sala de espera"],
    image: casoClinicaDental,
    description: "Renovación completa de clínica dental premium enfocada en transmitir profesionalidad y confort. Diseño minimalista con materiales nobles que generan confianza en los pacientes.",
    challenge: "Modernizar una clínica de 15 años de antigüedad sin interrumpir la operativa diaria, cumpliendo con todas las normativas sanitarias vigentes.",
    solution: "Ejecución por fases permitiendo mantener el 50% de la clínica operativa en todo momento. Diseño en tonos blancos y madera natural con iluminación LED regulable que reduce la ansiedad de los pacientes.",
    results: "Incremento del 28% en captación de pacientes privados. Valoración media de 4.8/5 estrellas en reseñas mencionando específicamente las instalaciones."
  },
  {
    title: "Urban Style - Flagship Store",
    client: "Urban Style",
    sector: "Retail Moda",
    location: "Valencia",
    surface: "280 m²",
    timeline: "6 semanas",
    services: ["Concept store", "Mobiliario expositivo modular", "Probadores premium", "Sistema de iluminación"],
    image: casoTiendaModa,
    description: "Tienda insignia para marca de moda urbana sostenible. Diseño minimalista que pone el foco en el producto con sistemas de exposición flexibles que permiten cambios de temporada ágiles.",
    challenge: "Crear un espacio que reflejara los valores de sostenibilidad de la marca sin comprometer la estética premium, utilizando materiales eco-friendly.",
    solution: "Mobiliario en madera certificada FSC y sistemas modulares que permiten reconfigurar el espacio. Iluminación LED de bajo consumo con temperatura de color variable según zona de producto.",
    results: "Facturación 40% superior a otras tiendas de la cadena. Reducción del 60% en tiempo de cambio de temporada gracias al mobiliario modular."
  },
  {
    title: "Sabor Mediterráneo - Restaurante Gastronómico",
    client: "Sabor Mediterráneo",
    sector: "Restauración",
    location: "Málaga",
    surface: "420 m²",
    timeline: "2.5 meses",
    services: ["Diseño integral", "Mobiliario interior y terraza", "Cocina profesional", "Iluminación ambiente"],
    image: casoRestaurante,
    description: "Restaurante gastronómico de alta cocina mediterránea. Diseño cálido y elegante que combina elementos tradicionales con toques contemporáneos, creando una experiencia gastronómica completa.",
    challenge: "Integrar una cocina vista de alto rendimiento manteniendo la estética del comedor, optimizando el flujo de trabajo del personal en un espacio limitado.",
    solution: "Cocina profesional con elementos de exhibición y mampara de vidrio. Distribución estratégica de mesas maximizando capacidad sin sacrificar intimidad. Materiales naturales (madera, piedra) con iluminación regulable.",
    results: "Reservas completas los primeros 3 meses. Mención en Guía Repsol destacando \"ambiente sofisticado y acogedor\". Eficiencia operativa mejorada en un 25%."
  },
  {
    title: "Visión Clara - Óptica Premium",
    client: "Visión Clara",
    sector: "Salud Visual y Retail",
    location: "Sevilla",
    surface: "180 m²",
    timeline: "5 semanas",
    services: ["Diseño retail sanitario", "Expositores de gafas", "Zona de graduación", "Sistema de iluminación técnica"],
    image: casoOptica,
    description: "Óptica premium con enfoque en experiencia de cliente. Diseño limpio y tecnológico que transmite profesionalidad, con sistemas de exposición que destacan cada modelo de gafa como una pieza única.",
    challenge: "Combinar el aspecto comercial con la zona clínica de graduación, manteniendo privacidad pero sin crear separación visual completa.",
    solution: "Expositores retroiluminados con LED que realzan cada montura. Zona de graduación con paneles translúcidos que dan privacidad sin cerrar el espacio. Mobiliario modular que permite cambios estacionales.",
    results: "Incremento del 45% en ticket medio gracias a la presentación premium. Reducción del 30% en tiempo de selección de cliente gracias a la organización por estilos."
  },
  {
    title: "Aroma Coffee Lab - Cafetería Especializada",
    client: "Aroma Coffee Lab",
    sector: "Hostelería y Café Especializado",
    location: "Bilbao",
    surface: "150 m²",
    timeline: "4 semanas",
    services: ["Diseño de cafetería", "Barra y back-bar", "Mobiliario de salón", "Zona de tostado vista"],
    image: casoCafeteria,
    description: "Cafetería de tercera ola con tostado propio. Diseño industrial-acogedor que permite ver el proceso de tostado y preparación. Espacio diseñado tanto para consumo rápido como para estancia prolongada.",
    challenge: "Integrar equipamiento profesional de tostado y preparación de café sin que dominara visualmente el espacio, manteniendo ambiente acogedor.",
    solution: "Barra central que actúa como escenario del barista, zona de tostado con panel de vidrio como elemento decorativo. Mezcla de asientos: altos para consumo rápido y mesas bajas con sillones cómodos. Iluminación cálida tipo Edison.",
    results: "Tiempo medio de estancia de 45 minutos (vs 20 minutos promedio sector). Instagram: +300% followers en 3 meses con clientes compartiendo el espacio. ROI recuperado en 14 meses."
  }
];

const CasosDeExito = () => {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-muted to-background">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Casos de Éxito</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proyectos reales que demuestran nuestra experiencia en transformar espacios comerciales 
            en herramientas de éxito para nuestros clientes
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-24">
            {casos.map((caso, index) => (
              <article 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div 
                  className={`relative overflow-hidden rounded-lg shadow-elegant ${
                    index % 2 === 1 ? 'lg:col-start-2' : ''
                  }`}
                >
                  <img 
                    src={caso.image} 
                    alt={caso.title}
                    className="w-full aspect-[16/10] object-cover"
                  />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {caso.sector}
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{caso.title}</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <p className="text-muted-foreground">Cliente</p>
                      <p className="font-semibold">{caso.client}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ubicación</p>
                      <p className="font-semibold">{caso.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Superficie</p>
                      <p className="font-semibold">{caso.surface}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Plazo</p>
                      <p className="font-semibold">{caso.timeline}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {caso.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="font-semibold mb-2">El Desafío</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{caso.challenge}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">La Solución</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{caso.solution}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Resultados</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{caso.results}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Servicios prestados:</p>
                    <div className="flex flex-wrap gap-2">
                      {caso.services.map((service, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-muted px-3 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip title="¿Quieres ser nuestro próximo caso de éxito?" />
    </main>
  );
};

export default CasosDeExito;