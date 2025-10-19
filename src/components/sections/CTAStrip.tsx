import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CTAStripProps {
  title?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

export const CTAStrip = ({
  title = "¿Empezamos tu proyecto?",
  primaryCTA = { label: "Solicitar presupuesto", href: "/contacto" },
  secondaryCTA,
}: CTAStripProps) => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{title}</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="primary" size="lg">
            <Link to={primaryCTA.href}>{primaryCTA.label}</Link>
          </Button>
          {secondaryCTA && (
            <Button asChild variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
              <Link to={secondaryCTA.href}>{secondaryCTA.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
