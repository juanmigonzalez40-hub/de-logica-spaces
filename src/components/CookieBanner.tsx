import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (accepted: boolean, customPreferences?: typeof preferences) => {
    const finalPreferences = customPreferences || {
      necessary: true,
      analytics: accepted,
      marketing: accepted,
    };
    
    localStorage.setItem("cookieConsent", JSON.stringify(finalPreferences));
    setShowBanner(false);
    
    // Aquí se implementarían las cookies según las preferencias
    if (finalPreferences.analytics) {
      // Activar Google Analytics, etc.
    }
    if (finalPreferences.marketing) {
      // Activar Meta Pixel, etc.
    }
  };

  const handleAcceptAll = () => {
    saveConsent(true);
  };

  const handleRejectAll = () => {
    saveConsent(false);
  };

  const handleSavePreferences = () => {
    saveConsent(false, preferences);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="container-custom py-6">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Uso de cookies</h3>
              <p className="text-sm text-muted-foreground">
                Utilizamos cookies propias y de terceros para mejorar nuestros servicios y
                mostrarle publicidad relacionada con sus preferencias mediante el análisis de
                sus hábitos de navegación. Puede obtener más información en nuestra{" "}
                <Link to="/legal/cookies" className="underline hover:text-primary">
                  Política de Cookies
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:flex-nowrap">
              <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                Configurar
              </Button>
              <Button variant="outline" size="sm" onClick={handleRejectAll}>
                Rechazar
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Aceptar todas
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold">Configuración de cookies</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Cookies necesarias</h4>
                  <p className="text-sm text-muted-foreground">
                    Estas cookies son esenciales para el funcionamiento del sitio web y no
                    pueden desactivarse.
                  </p>
                </div>
                <div className="text-sm font-medium text-muted-foreground">Siempre activas</div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Cookies analíticas</h4>
                  <p className="text-sm text-muted-foreground">
                    Nos permiten analizar el uso del sitio web y mejorar la experiencia del
                    visitante.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="mt-1"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Cookies de marketing</h4>
                  <p className="text-sm text-muted-foreground">
                    Se utilizan para rastrear a los visitantes en las páginas web y mostrar
                    anuncios relevantes.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({ ...preferences, marketing: e.target.checked })
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleRejectAll}>
                Rechazar todas
              </Button>
              <Button onClick={handleSavePreferences}>Guardar preferencias</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
