import { Link } from "react-router-dom";
import logo from "@/assets/logo-de-logica.png";

const footerNav = [
  { label: "Aviso legal", href: "/legal/aviso-legal" },
  { label: "Privacidad", href: "/legal/privacidad" },
  { label: "Cookies", href: "/legal/cookies" },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <img src={logo} alt="De Lógica" className="h-8 w-auto mb-4" />
            <p className="text-sm opacity-90">
              Diseño, interiorismo, fabricación e instalación para espacios comerciales
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-sm opacity-90">
              <p>Camino de Hormigueras 124, Nave 4G</p>
              <p>28031 Madrid</p>
              <p className="mt-4">
                <a href="tel:+34910742187" className="hover:text-accent transition-colors">
                  +34 910 742 187
                </a>
              </p>
              <p>
                <a href="tel:+34675617280" className="hover:text-accent transition-colors">
                  +34 675 61 72 80
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@de-logica.com"
                  className="hover:text-accent transition-colors"
                >
                  info@de-logica.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
            <div className="space-y-2 text-sm">
              <div>
                <Link to="/servicios" className="opacity-90 hover:text-accent transition-colors">
                  Servicios
                </Link>
              </div>
              <div>
                <Link to="/proyectos" className="opacity-90 hover:text-accent transition-colors">
                  Proyectos
                </Link>
              </div>
              <div>
                <Link to="/franquicias" className="opacity-90 hover:text-accent transition-colors">
                  Franquicias
                </Link>
              </div>
              <div>
                <Link to="/contacto" className="opacity-90 hover:text-accent transition-colors">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
          <p>© {new Date().getFullYear()} De Lógica. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            {footerNav.map((item) => (
              <Link key={item.href} to={item.href} className="hover:text-accent transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
