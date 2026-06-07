import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { unifiedFormSchema, UnifiedFormData, SECTOR_OPTIONS, BUDGET_OPTIONS } from "@/lib/validations";

interface UnifiedContactFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
  showInDialog?: boolean;
}

const PROJECT_TYPE_OPTIONS = [
  { value: "implantacion_integral", label: "Implantación integral (Llave en mano)" },
  { value: "mobiliario_comercial", label: "Mobiliario comercial a medida" },
  { value: "rotulacion_corporativa", label: "Rotulación y señalética corporativa" },
  { value: "produccion_grafica", label: "Producción gráfica de gran formato" },
  { value: "renovacion_restyling", label: "Renovación / Restyling de local" },
];

const CENTERS_OPTIONS = ["1", "2-5", "6-10", "Más de 10"];
const OPENINGS_OPTIONS = ["Sí", "No", "En estudio"];
const INVESTMENT_OPTIONS = ["Menos de 5.000 €", "5.000 € - 15.000 €", "15.000 € - 50.000 €", "Más de 50.000 €"];
const TIMELINE_OPTIONS = ["Inmediato", "1-3 meses", "3-6 meses", "Más de 6 meses"];

export const UnifiedContactForm = ({ 
  onSuccess, 
  redirectTo = "/gracias",
  showInDialog = false 
}: UnifiedContactFormProps) => {
  const [formData, setFormData] = useState<UnifiedFormData>({
    company: "",
    contact: "",
    phone: "",
    email: "",
    city: "",
    cif: "",
    cargo: "",
    sectors: [],
    project_types: [],
    project: "",
    budget: [],
    num_centros: "1",
    aperturas_previstas: "No",
    presupuesto_estimado: "5.000 € - 15.000 €",
    plazo_previsto: "1-3 meses",
    observations: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UnifiedFormData, string>>>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validated = unifiedFormSchema.parse(formData);

      // META CAPI - event_id para deduplicación futura
      const eventId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : 'evt_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();

      console.log("DEBUG_FORM_DATA", JSON.stringify(validated, null, 2));

      const insertPayload = {
          name: validated.contact,
          company: validated.company,
          email: validated.email,
          phone: validated.phone,
          city: validated.city,
          cif: validated.cif,
          cargo: validated.cargo,
          sectors: validated.sectors,
          project_types: validated.project_types,
          business_type: validated.sectors.join(', '),
          message: validated.project,
          budget: validated.budget,
          num_centros: validated.num_centros,
          aperturas_previstas: validated.aperturas_previstas,
          presupuesto_estimado: validated.presupuesto_estimado,
          plazo_previsto: validated.plazo_previsto,
          notes: validated.observations || null,
          event_id: eventId,
          source: "Web Principal",
        };

      console.log("DEBUG_DB_INSERT", JSON.stringify(insertPayload, null, 2));

      const { error } = await supabase
        .from('contact_submissions')
        .insert(insertPayload);

      if (error) throw error;

      // Inicializar y empujar evento a la capa de datos de Google Tag Manager (GTM)
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'lead_form_submitted',
        event_id: eventId
      });

      // Obtener las cookies Meta
      const fbp = document.cookie
        .split('; ')
        .find(row => row.startsWith('_fbp='))
        ?.split('=')[1];

      const fbc = document.cookie
        .split('; ')
        .find(row => row.startsWith('_fbc='))
        ?.split('=')[1];

      // Send email notification
      try {
        await supabase.functions.invoke('send-contact-email', {
          body: {
            name: validated.contact,
            email: validated.email,
            phone: validated.phone,
            company: validated.company,
            business_type: validated.sectors.join(', '),
            message: `${validated.project}\n\nPresupuesto: ${validated.budget.join(', ')}\n\nObservaciones: ${validated.observations || 'N/A'}`,
            city: validated.city,
            cif: validated.cif,
            event_id: eventId,
            fbp: fbp,
            fbc: fbc,
            userAgent: navigator.userAgent,
            sourceUrl: window.location.href,
          }
        });
      } catch (emailError) {
        console.error("Error al enviar notificación por email:", emailError);
      }

      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo muy pronto",
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate(redirectTo);
      }
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Partial<Record<keyof UnifiedFormData, string>> = {};
        error.errors.forEach((err: any) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof UnifiedFormData] = err.message;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof UnifiedFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSectorChange = (value: string, checked: boolean) => {
    const newSectors = checked 
      ? [...formData.sectors, value]
      : formData.sectors.filter(s => s !== value);
    setFormData({ ...formData, sectors: newSectors });
    if (errors.sectors) {
      setErrors(prev => ({ ...prev, sectors: undefined }));
    }
  };

  const handleProjectTypeChange = (value: string, checked: boolean) => {
    const newProjectTypes = checked
      ? [...formData.project_types, value]
      : formData.project_types.filter(type => type !== value);
    setFormData({ ...formData, project_types: newProjectTypes });
    if (errors.project_types) {
      setErrors(prev => ({ ...prev, project_types: undefined }));
    }
  };

  const handleBudgetChange = (value: string, checked: boolean) => {
    const newBudget = checked 
      ? [...formData.budget, value]
      : formData.budget.filter(b => b !== value);
    setFormData({ ...formData, budget: newBudget });
    if (errors.budget) {
      setErrors(prev => ({ ...prev, budget: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nombre de la empresa */}
      <div className="space-y-2">
        <Label htmlFor="company">Nombre de la empresa *</Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={errors.company ? "border-destructive" : ""}
        />
        {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
      </div>

      {/* Contacto principal */}
      <div className="space-y-2">
        <Label htmlFor="contact">Contacto principal *</Label>
        <Input
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className={errors.contact ? "border-destructive" : ""}
        />
        {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
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
        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      {/* Ciudad */}
      <div className="space-y-2">
        <Label htmlFor="city">Ciudad *</Label>
        <Input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={errors.city ? "border-destructive" : ""}
        />
        {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
      </div>

      {/* CIF */}
      <div className="space-y-2">
        <Label htmlFor="cif">CIF *</Label>
        <Input
          id="cif"
          name="cif"
          value={formData.cif}
          onChange={handleChange}
          className={errors.cif ? "border-destructive" : ""}
        />
        {errors.cif && <p className="text-sm text-destructive">{errors.cif}</p>}
      </div>

      {/* Cargo */}
      <div className="space-y-2">
        <Label htmlFor="cargo">Cargo o departamento *</Label>
        <Input
          id="cargo"
          name="cargo"
          value={formData.cargo}
          onChange={handleChange}
          placeholder="Ej. Director de expansión"
          className={errors.cargo ? "border-destructive" : ""}
        />
        {errors.cargo && <p className="text-sm text-destructive">{errors.cargo}</p>}
      </div>

      {/* Sector */}
      <div className="space-y-3">
        <Label>Sector al que pertenece *</Label>
        <p className="text-sm text-muted-foreground">(Puedes seleccionar varias opciones)</p>
        <div className="space-y-2">
          {SECTOR_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`sector-${option.value}`}
                checked={formData.sectors.includes(option.value)}
                onCheckedChange={(checked) => handleSectorChange(option.value, checked as boolean)}
              />
              <Label htmlFor={`sector-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.sectors && <p className="text-sm text-destructive">{errors.sectors}</p>}
      </div>

      {/* Tipo de proyecto */}
      <div className="space-y-3">
        <Label>Tipo de proyecto *</Label>
        <p className="text-sm text-muted-foreground">(Puedes seleccionar varias opciones)</p>
        <div className="space-y-2">
          {PROJECT_TYPE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`project-type-${option.value}`}
                checked={formData.project_types.includes(option.value)}
                onCheckedChange={(checked) => handleProjectTypeChange(option.value, checked as boolean)}
              />
              <Label htmlFor={`project-type-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.project_types && <p className="text-sm text-destructive">{errors.project_types}</p>}
      </div>

      {/* Datos operativos */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="num_centros">Número de centros implicados *</Label>
          <select
            id="num_centros"
            name="num_centros"
            value={formData.num_centros}
            onChange={(e) => setFormData({ ...formData, num_centros: e.target.value })}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {CENTERS_OPTIONS.map((option) => <option key={option}>{option}</option>)}
          </select>
          {errors.num_centros && <p className="text-sm text-destructive">{errors.num_centros}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="aperturas_previstas">Aperturas previstas *</Label>
          <select
            id="aperturas_previstas"
            name="aperturas_previstas"
            value={formData.aperturas_previstas}
            onChange={(e) => setFormData({ ...formData, aperturas_previstas: e.target.value })}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {OPENINGS_OPTIONS.map((option) => <option key={option}>{option}</option>)}
          </select>
          {errors.aperturas_previstas && <p className="text-sm text-destructive">{errors.aperturas_previstas}</p>}
        </div>


        <div className="space-y-2">
          <Label htmlFor="plazo_previsto">Plazo previsto *</Label>
          <select
            id="plazo_previsto"
            name="plazo_previsto"
            value={formData.plazo_previsto}
            onChange={(e) => setFormData({ ...formData, plazo_previsto: e.target.value })}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {TIMELINE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
          </select>
          {errors.plazo_previsto && <p className="text-sm text-destructive">{errors.plazo_previsto}</p>}
        </div>
      </div>

      {/* Observaciones */}
      <div className="space-y-2">
        <Label htmlFor="observations">Observaciones</Label>
        <Textarea
          id="observations"
          name="observations"
          rows={3}
          value={formData.observations}
          onChange={handleChange}
          className={errors.observations ? "border-destructive" : ""}
        />
        {errors.observations && <p className="text-sm text-destructive">{errors.observations}</p>}
      </div>

      {/* Interesado en / Proyecto */}
      <div className="space-y-2">
        <Label htmlFor="project">Interesado en (Cuéntanos tu proyecto) *</Label>
        <Textarea
          id="project"
          name="project"
          rows={4}
          value={formData.project}
          onChange={handleChange}
          className={errors.project ? "border-destructive" : ""}
        />
        {errors.project && <p className="text-sm text-destructive">{errors.project}</p>}
      </div>

      {/* Presupuesto */}
      <div className="space-y-3">
        <Label>Presupuesto Aproximado *</Label>
        <p className="text-sm text-muted-foreground">(Puedes seleccionar varias opciones)</p>
        <div className="space-y-2">
          {BUDGET_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`budget-${option.value}`}
                checked={formData.budget.includes(option.value)}
                onCheckedChange={(checked) => handleBudgetChange(option.value, checked as boolean)}
              />
              <Label htmlFor={`budget-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>

      {/* Privacy checkbox */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="privacy-accepted"
          checked={privacyAccepted}
          onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
        />
        <Label htmlFor="privacy-accepted" className="font-normal cursor-pointer text-sm leading-snug">
          He leído la{" "}
          <a href="/legal/privacidad" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline">
            Política de Privacidad
          </a>
        </Label>
      </div>

      {/* Legal info block */}
      <div className="text-xs text-muted-foreground space-y-1 border-t pt-4">
        <p className="font-semibold">Información básica de protección de datos</p>
        <p><strong>Responsable:</strong> De Lógica Soluciones de Marketing S.L. (B83916833).</p>
        <p><strong>Finalidad:</strong> atender tu solicitud y contactarte por email o teléfono para gestionarla (presupuesto/reunión).</p>
        <p><strong>Derechos:</strong> puedes ejercer tus derechos y obtener más información en la{" "}
          <a href="/legal/privacidad" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline">
            Política de Privacidad
          </a>.
        </p>
        <p><strong>Más info:</strong>{" "}
          <a href="/legal/privacidad" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline">
            Política de Privacidad
          </a>.
        </p>
      </div>
    </form>
  );
};