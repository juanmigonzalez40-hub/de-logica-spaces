import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipo: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.nombre || !formData.email || !formData.tipo || !formData.mensaje) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo muy pronto",
    });

    navigate("/gracias");
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Solicita presupuesto o agenda una reunión
          </p>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-background rounded-2xl p-8 shadow-elegant">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="nombre">Nombre y apellidos *</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="tipo">Tipo de negocio *</Label>
                  <Input
                    id="tipo"
                    name="tipo"
                    placeholder="Clínica, retail, gimnasio, oficina..."
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="mensaje">Cuéntanos tu proyecto *</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Teléfono</h3>
                <div className="space-y-2">
                  <p>
                    <a
                      href="tel:+34910742187"
                      className="text-accent hover:underline font-semibold"
                    >
                      +34 910 742 187
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:+34675617280"
                      className="text-accent hover:underline font-semibold"
                    >
                      +34 675 61 72 80
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Email</h3>
                <p>
                  <a
                    href="mailto:info@de-logica.com"
                    className="text-accent hover:underline font-semibold"
                  >
                    info@de-logica.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Dirección</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Camino de Hormigueras 124, Nave 4G
                  <br />
                  28031 Madrid
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-elegant">
                <iframe
                  src="https://maps.google.com/?q=Camino%20de%20Hormigueras%20124,%20Nave%204G,%2028031%20Madrid&output=embed"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="De Lógica Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacto;
