import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿En qué consiste vuestro servicio de diseño y fabricación de mobiliario comercial?",
    answer: "Diseñamos y fabricamos mobiliario comercial a medida para tiendas y franquicias. Nos adaptamos a las especificaciones técnicas de tu marca, utilizando materiales duraderos y diseños que optimizan la experiencia de compra en el punto de venta."
  },
  {
    question: "¿Hacéis diseño y fabricación de rótulos para fachadas e interiores?",
    answer: "Sí, somos especialistas en la fabricación de rótulos luminosos, letras corpóreas 3D (con tecnología LED) y señalética integral. Nos encargamos desde el diseño visual hasta la instalación final en fachada o en el interior del local."
  },
  {
    question: "¿Ofrecéis servicios de producción gráfica e impresión en gran formato?",
    answer: "Ofrecemos soluciones completas de producción gráfica para retail. Esto incluye vinilos para escaparates, impresión de gran formato para cartelería, murales decorativos y cualquier elemento de comunicación visual que tu espacio comercial necesite."
  },
  {
    question: "¿Trabajáis con franquicias en toda España?",
    answer: "Sí, operamos a nivel nacional e internacional. Contamos con equipos de instalación propios y experiencia en la apertura simultánea de múltiples locales para franquicias, garantizando la consistencia de la marca y de sus elementos gráficos y mobiliario en cualquier ubicación."
  },
  {
    question: "¿Cuánto tiempo se tarda en fabricar e instalar el equipamiento de un local comercial?",
    answer: "El tiempo varía según la magnitud del proyecto, pero al ser fabricantes directos de mobiliario comercial y rótulos, nuestra metodología 'Llave en Mano' nos permite ser altamente eficientes y controlar los plazos de entrega sin depender de intermediarios."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins text-gray-900">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-600 font-inter max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre nuestros servicios de diseño, fabricación e instalación de espacios comerciales.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-poppins text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 font-inter text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
