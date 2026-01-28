import { Link } from "react-router-dom";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { ArrowLeft, Calendar } from "lucide-react";
import blogMobiliario from "@/assets/blog-mobiliario.jpg";

const ArticuloMobiliario = () => {
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
              Mobiliario Comercial
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              10 enero 2025
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Mobiliario Comercial: Diseñando espacios que venden solos
          </h1>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8">
        <div className="container-custom max-w-4xl">
          <img
            src={blogMobiliario}
            alt="Interior de tienda con mobiliario comercial de diseño"
            className="w-full h-auto rounded-lg shadow-elegant"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container-custom max-w-3xl">
          <article className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed">
              ¿Alguna vez has entrado en una tienda y te has sentido "a gusto" sin saber por qué? O al revés, ¿has entrado en un restaurante y te has querido ir rápido porque el ambiente era frío?
            </p>

            <p>
              El secreto no suele estar en el producto, sino en el diseño del espacio y el mobiliario.
            </p>

            <p>
              <strong>El mobiliario comercial no son solo estanterías para poner cosas o mesas para comer.</strong> Es una herramienta de venta. El diseño de interiores guía al cliente por donde tú quieres que vaya y define cuánto tiempo se queda.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">3 Claves del mobiliario para negocios de alto tráfico</h2>

            <ul className="space-y-4">
              <li>
                <strong>Durabilidad extrema:</strong> En un gimnasio o una franquicia de comida rápida, el mobiliario sufre. En De Lógica diseñamos piezas que aguantan el uso intensivo sin perder la estética.
              </li>
              <li>
                <strong>Optimización del flujo:</strong> Creamos muebles que evitan "cuellos de botella" en tu local, facilitando que los clientes (y tus empleados) se muevan con libertad.
              </li>
              <li>
                <strong>Identidad de marca:</strong> Tu mostrador o tus expositores deben "respirar" los colores y formas de tu logo.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4">Personalización vs. Estándar</h2>

            <p>
              Comprar muebles estándar puede ser más rápido, pero rara vez se adaptan al 100% a los metros de tu local.
            </p>

            <p className="bg-muted p-6 rounded-lg border-l-4 border-accent">
              Nosotros diseñamos y fabricamos a medida para aprovechar cada rincón. Si quieres renovar la imagen de tu local o estás planificando una apertura, contacta con nosotros y diseñemos juntos un espacio inolvidable.
            </p>
          </article>

          {/* CTA inline */}
          <div className="mt-12 p-8 bg-secondary rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">¿Buscas mobiliario a medida?</h3>
            <p className="text-muted-foreground mb-6">
              Fabricamos piezas únicas que optimizan tu espacio y refuerzan tu marca.
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

export default ArticuloMobiliario;
