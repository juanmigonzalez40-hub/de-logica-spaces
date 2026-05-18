import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Qué servicios de interiorismo comercial ofrece De Lógica Spaces?",
    answer: "Ofrecemos soluciones 360° para espacios comerciales, abarcando desde el diseño de interiores y la fabricación de mobiliario a medida, hasta la instalación completa y la señalética. Somos especialistas en adaptar la imagen de marca a locales físicos y franquicias."
  },
  {
    question: "¿Trabajáis con franquicias en toda España?",
    answer: "Sí, operamos a nivel nacional e internacional. Contamos con equipos de instalación propios y experiencia en la apertura simultánea de múltiples locales para franquicias, garantizando la consistencia de la marca en cualquier ubicación."
  },
  {
    question: "¿Fabricáis el mobiliario a medida para tiendas?",
    answer: "Sí, disponemos de instalaciones propias donde diseñamos y fabricamos mobiliario comercial adaptado a las necesidades específicas de cada marca, utilizando materiales duraderos y diseños que optimizan la experiencia de compra."
  },
  {
    question: "¿Cuánto tiempo se tarda en montar un local comercial?",
    answer: "El tiempo varía según la magnitud del proyecto, pero nuestra metodología 'Llave en Mano' nos permite ser altamente eficientes. Gestionamos todas las fases (diseño, licencias, fabricación y montaje) para asegurar la apertura en el plazo y presupuesto acordados."
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
