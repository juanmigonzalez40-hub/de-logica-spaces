import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-background/95 backdrop-blur-sm shadow-elegant"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          De Lógica
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
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
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t">
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
