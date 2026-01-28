import { Link } from "react-router-dom";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { ArrowLeft, Calendar } from "lucide-react";
import blogFranquicias from "@/assets/blog-franquicias.jpg";

const ArticuloFranquicias = () => {
  return (
    <main className="pt-24">
      {/* Back link */}
      <section className="py-6 border-b">
        <div className="container-custom">
          <Link
            to="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="section-padding pb-8">
        <div className="container-custom max-w-3xl">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <span className="bg-accent/10 text-accent px-3 py-1 rounded text-xs font-medium">
              Franquicias y Branding
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              5 enero 2025
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Franquicias: El reto de mantener la misma imagen en 50 locales diferentes
          </h1>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8">
        <div className="container-custom max-w-4xl">
          <img
            src={blogFranquicias}
            alt="Locales de franquicia con imagen de marca consistente"
            className="w-full h-auto rounded-lg shadow-elegant"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container-custom max-w-3xl">
          <article className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Si gestionas una franquicia, conoces el dolor de cabeza: abres un local en Madrid, otro en Valencia y otro en el norte, y de repente, los tonos del color corporativo no coinciden o los muebles son ligeramente distintos.
            </p>

            <p>
              <strong>La consistencia de marca es lo que genera confianza en el consumidor.</strong> Si un cliente entra en tu franquicia, debe sentir lo mismo esté donde esté.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">La solución: Un único proveedor integral</h2>

            <p>
              Para evitar el caos de gestionar cinco proveedores distintos (uno para los vinilos, otro para el rótulo, otro para las mesas...), la clave es centralizar la producción gráfica y el mobiliario.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">¿Qué ganan las franquicias al trabajar con De Lógica?</h2>

            <ul className="space-y-4">
              <li>
                <strong>Control total del color y acabados:</strong> Al fabricar nosotros tanto la gráfica como el mobiliario, aseguramos que el "Rojo de tu Marca" sea idéntico en el vinilo de la pared y en el lacado del mostrador.
              </li>
              <li>
                <strong>Velocidad de apertura:</strong> Coordinamos la fabricación para cumplir con los plazos de inauguración.
              </li>
              <li>
                <strong>Soluciones "Llave en mano":</strong> Desde el diseño técnico hasta la instalación final.
              </li>
            </ul>

            <p className="bg-muted p-6 rounded-lg border-l-4 border-accent">
              Tanto si tienes 2 locales como si planeas abrir 20 este año, necesitas un socio que entienda de producción industrial y plazos. Pídenos presupuesto sin compromiso y estandariza la calidad de tu marca con De Lógica.
            </p>
          </article>

          {/* CTA inline */}
          <div className="mt-12 p-8 bg-secondary rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">¿Gestionas una franquicia?</h3>
            <p className="text-muted-foreground mb-6">
              Centraliza la producción y garantiza la consistencia de tu marca en todos tus locales.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
            >
              Solicitar presupuesto
            </Link>
          </div>
        </div>
      </section>

      <CTAStrip />
    </main>
  );
};

export default ArticuloFranquicias;
