import { Link } from "react-router-dom";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { ArrowLeft, Calendar } from "lucide-react";
import blogVerano from "@/assets/caso-tienda-moda.jpg";

const ArticuloVerano = () => {
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
              Retail y Estrategia
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              15 mayo 2026
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Prepara tu local para el verano: Cambios rápidos que impactan en tus ventas
          </h1>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8">
        <div className="container-custom max-w-4xl">
          <img
            src={blogVerano}
            alt="Interior de tienda preparado para la temporada de verano"
            className="w-full h-auto rounded-lg shadow-elegant"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container-custom max-w-3xl">
          <article className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed">
              ¿Has notado cómo cambia tu propio estado de ánimo cuando llega el buen tiempo? Los días son más largos, hace calor y, de forma inconsciente, buscamos espacios que nos transmitan frescura, amplitud y comodidad.
            </p>

            <p>
              Tus clientes sienten exactamente lo mismo.
            </p>

            <p>
              Si cuando alguien entra a tu tienda, restaurante o franquicia la sensación es de agobio, pesadez o falta de aire, su instinto será irse rápido. <strong>El diseño de tu local debe adaptarse a la temporada para invitar al cliente a quedarse.</strong> Y no, no necesitas hacer una reforma integral.
            </p>

            <p>
              Aquí tienes 3 cambios rápidos en el diseño y mobiliario de tu local que tendrán un impacto directo en tus ventas este verano:
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">1. "Abre" el espacio: Menos es más</h2>

            <p>
              En invierno buscamos refugio y espacios acogedores; en verano buscamos aire y libertad.
            </p>
            <ul className="space-y-4">
              <li>
                <strong>El cambio rápido:</strong> Reorganiza tu mobiliario comercial. Elimina expositores masivos del centro de los pasillos, amplía las zonas de paso y evita la saturación visual. Un local que se percibe amplio se percibe instintivamente como un local más fresco.
              </li>
              <li>
                <strong>Tip De Lógica:</strong> Utiliza estanterías modulares ligeras o estructuras metálicas finas que dejen pasar la luz y la vista.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4">2. Señalética y escaparates que griten "Verano"</h2>

            <p>
              El escaparate es tu tarjeta de presentación. Si mantienes los mismos vinilos opacos de diciembre, no llamarás la atención del viandante estival.
            </p>
            <ul className="space-y-4">
              <li>
                <strong>El cambio rápido:</strong> Renueva los vinilos de tu cristalera. Usa gráficas con colores vibrantes, transparencias o motivos estivales. Actualiza los rótulos interiores (cartelería colgante, displays de mostrador) para destacar los productos de temporada.
              </li>
              <li>
                <strong>Tip De Lógica:</strong> Los vinilos removibles de alta calidad son perfectos para campañas estacionales. Se instalan rápido, impactan al instante y se retiran sin dejar rastro en septiembre.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4">3. La psicología de la luz y el color</h2>

            <p>
              Una luz amarilla y muy cálida (típica de ambientes invernales) puede hacer que un espacio se sienta físicamente más caluroso de lo que realmente es.
            </p>
            <ul className="space-y-4">
              <li>
                <strong>El cambio rápido:</strong> Si tu iluminación lo permite, ajusta la temperatura de color a tonos ligeramente más neutros. Además, incorpora elementos gráficos (lonas, cuadros de tela tensada o traseras de estanterías) con colores fríos como azules, blancos o verdes menta para engañar al cerebro y generar sensación térmica de frescor.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4">Renueva tu imagen antes de la ola de calor</h2>

            <p className="bg-muted p-6 rounded-lg border-l-4 border-accent">
              Adaptar tu negocio a la temporada de verano no tiene por qué paralizar tu actividad. A veces, un cambio en la gráfica, una reubicación de los muebles y una nueva señalética son suficientes para revitalizar tus ventas.
            </p>
          </article>

          {/* CTA inline */}
          <div className="mt-12 p-8 bg-secondary rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">¿Quieres darle un lavado de cara a tu local?</h3>
            <p className="text-muted-foreground mb-6">
              Somos especialistas en mobiliario, rótulos e instalaciones exprés.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
            >
              Solicitar presupuesto sin compromiso
            </Link>
          </div>
        </div>
      </section>

      <CTAStrip />
    </main>
  );
};

export default ArticuloVerano;
