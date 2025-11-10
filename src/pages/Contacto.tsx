import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { contactSchema, ContactFormData } from "@/lib/validations";

const Contacto = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    business_type: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate with Zod
      const validated = contactSchema.parse(formData);

      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: validated.name,
          company: validated.company || null,
          email: validated.email,
          phone: validated.phone,
          business_type: validated.business_type || null,
          message: validated.message,
        });

      if (error) throw error;

      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo muy pronto",
      });

      navigate("/gracias");
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err: any) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: "Error de validación",
          description: "Por favor corrige los errores en el formulario",
          variant: "destructive",
        });
      } else {
        console.error("Error al enviar el formulario:", error);
        toast({
          title: "Error",
          description: "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
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
                  <Label htmlFor="name">Nombre y apellidos *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={errors.company ? "border-destructive" : ""}
                  />
                  {errors.company && <p className="text-sm text-destructive mt-1">{errors.company}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+34 600 000 000"
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="business_type">Tipo de negocio</Label>
                  <Input
                    id="business_type"
                    name="business_type"
                    placeholder="Clínica, retail, gimnasio, oficina..."
                    value={formData.business_type}
                    onChange={handleChange}
                    className={errors.business_type ? "border-destructive" : ""}
                  />
                  {errors.business_type && <p className="text-sm text-destructive mt-1">{errors.business_type}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Cuéntanos tu proyecto *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
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
