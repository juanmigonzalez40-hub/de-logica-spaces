import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-de-logica.png";

const navigation = [
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Casos de éxito", href: "/casos-de-exito" },
  { label: "Franquicias", href: "/franquicias" },
  { label: "Sostenibilidad", href: "/sostenibilidad" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColorClass = isScrolled || !isHome ? "text-foreground" : "text-white";
  const buttonColorClass = isScrolled || !isHome ? "" : "text-white border-white/30 hover:bg-white/10";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-background/95 backdrop-blur-sm shadow-elegant"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="De Lógica" className="h-16 md:h-20 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 xl:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-xs xl:text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors ${textColorClass}`}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="primary" size="sm">
            <Link to="/contacto">Contacto</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${textColorClass}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container-custom py-4 flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="primary" size="sm" className="w-full">
              <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)}>
                Contacto
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
