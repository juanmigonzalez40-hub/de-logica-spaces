import { Link } from "react-router-dom";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { ArrowLeft, Calendar } from "lucide-react";
import blogRotulos from "@/assets/blog-rotulos.jpg";

const ArticuloRotulos = () => {
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
              Rótulos y Fachadas
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              15 enero 2025
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Tu fachada habla: Por qué un buen rótulo atrae más clientes que el mejor producto
          </h1>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8">
        <div className="container-custom max-w-4xl">
          <img
            src={blogRotulos}
            alt="Fachada comercial moderna con rótulo LED iluminado"
            className="w-full h-auto rounded-lg shadow-elegant"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container-custom max-w-3xl">
          <article className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Tienes el local, tienes el producto y tienes la ilusión. Pero si la gente pasa por delante de tu negocio y no mira dos veces, tienes un problema.
            </p>

            <p>
              La realidad del comercio físico es dura: <strong>tienes menos de 3 segundos para captar la atención de un peatón</strong>.
            </p>

            <p>
              En De Lógica hemos visto cómo un cambio de rótulo ha duplicado la entrada de clientes en restaurantes y tiendas. No es magia, es visibilidad estratégica.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">¿Qué hace que un rótulo funcione hoy en día?</h2>

            <p>
              No basta con poner tu nombre en la puerta. Para destacar en una calle saturada necesitas:
            </p>

            <ul className="space-y-4">
              <li>
                <strong>Iluminación LED de calidad:</strong> No solo para que te vean de noche, sino para ahorrar en la factura de la luz frente a los neones antiguos.
              </li>
              <li>
                <strong>Volumetría (Letras corpóreas):</strong> Las letras con relieve (3D) transmiten una imagen de mayor calidad y solidez que un vinilo plano.
              </li>
              <li>
                <strong>Materiales resistentes:</strong> El sol y la lluvia desgastan los materiales baratos. Usar composite, metacrilato o acero asegura que tu imagen no se vea "vieja" en seis meses.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4">La inversión más rentable</h2>

            <p>
              Piénsalo así: <strong>el rótulo es el único vendedor que trabaja para ti las 24 horas del día, los 365 días del año</strong>.
            </p>

            <p className="bg-muted p-6 rounded-lg border-l-4 border-accent">
              ¿Estás abriendo un negocio o sientes que tu fachada pasa desapercibida? Hablemos. En De Lógica podemos diseñar y fabricar la solución exacta que haga que tu cliente se detenga y entre.
            </p>
          </article>

          {/* CTA inline */}
          <div className="mt-12 p-8 bg-secondary rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">¿Necesitas renovar tu fachada?</h3>
            <p className="text-muted-foreground mb-6">
              Te ayudamos a diseñar y fabricar el rótulo perfecto para tu negocio.
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

export default ArticuloRotulos;
