import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProjectsRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sector: string;
}

export const ProjectsRegistrationDialog = ({ open, onOpenChange, sector }: ProjectsRegistrationDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    businessType: sector,
    projectDetails: "",
    budget: "",
    timeline: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Combinar presupuesto y timeline en el mensaje junto con los detalles del proyecto
      const messageDetails = [
        formData.projectDetails,
        formData.budget ? `Presupuesto: ${formData.budget}` : null,
        formData.timeline ? `Plazo: ${formData.timeline}` : null
      ].filter(Boolean).join('\n');

      const { error } = await supabase
        .from('project_registrations')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          sector: formData.businessType,
          city: '', // Campo requerido pero no está en el formulario actual
          premises: '', // Campo requerido pero no está en el formulario actual
          message: messageDetails,
        });

      if (error) throw error;

      toast.success("¡Registro completado! Te contactaremos pronto.");
      onOpenChange(false);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        businessType: sector,
        projectDetails: "",
        budget: "",
        timeline: ""
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Hubo un problema al enviar tu solicitud. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Solicitar información de proyectos - {sector}</DialogTitle>
          <DialogDescription>
            Completa el formulario para acceder a nuestros proyectos de {sector.toLowerCase()}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+34 600 000 000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDetails">Detalles del proyecto *</Label>
            <Textarea
              id="projectDetails"
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              required
              placeholder="Describe tu proyecto, necesidades, ubicación..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Presupuesto estimado</Label>
            <Input
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Ej: 10.000-20.000€"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Plazo deseado</Label>
            <Input
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="Ej: 2-3 meses"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
