import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Gracias = () => {
  return (
    <main className="pt-24 min-h-screen flex items-center">
      <section className="section-padding w-full">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-accent">✓</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">¡Gracias!</h1>
            <p className="text-xl text-muted-foreground mb-10">
              Hemos recibido tu mensaje. Te responderemos muy pronto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="primary" size="lg">
                <Link to="/">Volver al inicio</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/proyectos">Ver proyectos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Gracias;
