import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Shield, 
  Hammer, 
  Sliders, 
  Layers, 
  Factory, 
  Activity, 
  Check, 
  ArrowRight, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Briefcase,
  Sparkles,
  Globe2,
  Award,
  ChevronRight
} from "lucide-react";

// Assets imports
import cnClinicsImg from "@/assets/proyecto-sainclinics.jpg";
import johnnyRocketsImg from "@/assets/proyecto-restaurante.jpg";
import lladroImg from "@/assets/proyecto-lladro.jpg";

export default function ImplantacionComercial() {
  const [heroIndex, setHeroIndex] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    cargo: "",
    email: "",
    telefono: "",
    tipoProyecto: [] as string[],
    numCentros: "1",
    aperturasPrevistas: "No",
    inversionEstimada: "5.000 € - 15.000 €",
    plazoPrevisto: "1-3 meses",
    descripcion: "",
    cif: "", // added default empty CIF to avoid DB schema constraints if required
    ciudad: "", // added default empty ciudad
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const heroImages = [
    {
      url: cnClinicsImg,
      title: "CN Clinics",
      subtitle: "Implantación integral en Alemania"
    },
    {
      url: johnnyRocketsImg,
      title: "Johnny Rockets",
      subtitle: "Fabricación e instalación de imagen de marca"
    },
    {
      url: lladroImg,
      title: "Lladró",
      subtitle: "Renovación premium y detalles de alta calidad"
    }
  ];

  // Carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // SEO Optimization: title and meta description updates
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Implantación Comercial de Espacios y Locales | De Lógica";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    const landingDesc = "Diseñamos, fabricamos e instalamos espacios comerciales con un único interlocutor. Control total de plazos y calidad en España y Portugal.";
    
    if (metaDesc) {
      metaDesc.setAttribute("content", landingDesc);
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute("content", originalDesc);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData((prev) => {
      const updated = checked 
        ? [...prev.tipoProyecto, value]
        : prev.tipoProyecto.filter((t) => t !== value);
      return { ...prev, tipoProyecto: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      toast({
        title: "Política de Privacidad",
        description: "Debes aceptar la política de privacidad para enviar el formulario.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // NOTA: Ya no enviamos formattedNotes al campo `notes`, usamos los campos estructurados en su lugar.
      
      // META CAPI - event_id para deduplicación futura
      const eventId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : 'evt_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();

      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.nombre,
          company: formData.empresa,
          email: formData.email,
          phone: formData.telefono,
          city: formData.ciudad || "No especificada",
          cif: formData.cif || "N/A",
          message: formData.descripcion,
          event_id: eventId,
          source: "Landing A",
          cargo: formData.cargo,
          project_types: formData.tipoProyecto,
          presupuesto_estimado: formData.inversionEstimada,
          num_centros: formData.numCentros,
          aperturas_previstas: formData.aperturasPrevistas,
          plazo_previsto: formData.plazoPrevisto,
        });

      if (error) throw error;

      // Inicializar y empujar evento a la capa de datos de Google Tag Manager (GTM)
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'lead_form_submitted',
        event_id: eventId
      });

      // Mock Notion future integration message in console for future developers
      console.log("Future automation hook: Sending to Notion database...", {
        ...formData,
        submittedAt: new Date().toISOString()
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

      // Send email notification via Supabase Function (optional fallback)
      try {
        await supabase.functions.invoke('send-contact-email', {
          body: {
            name: formData.nombre,
            email: formData.email,
            phone: formData.telefono,
            company: formData.empresa,
            business_type: "Implantación Comercial",
            message: `${formData.descripcion}\n\nDetalles adicionales:\nCargo: ${formData.cargo}\nNº Centros: ${formData.numCentros}\nAperturas previstas: ${formData.aperturasPrevistas}\nPlazo: ${formData.plazoPrevisto}`,
            city: formData.ciudad || "No especificada",
            cif: formData.cif || "N/A",
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
        title: "¡Solicitud Recibida!",
        description: "Tu valoración de proyecto se ha enviado correctamente. Nos pondremos en contacto contigo.",
      });

      navigate("/gracias");
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error al enviar",
        description: "Hubo un problema procesando tu solicitud. Por favor, inténtalo de nuevo o llámanos.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      
      {/* SECCIÓN 1 — HERO */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background carousel */}
        <div className="absolute inset-0 bg-primary z-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === heroIndex ? "opacity-75 scale-100" : "opacity-0 scale-105"
              }`}
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "opacity 1.5s ease-in-out, transform 8s ease-in-out",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent z-10" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-20 text-white w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              Menos proveedores. <br />
              Menos problemas. <br />
              <span className="text-accent">Más control sobre tu proyecto.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed mb-8 max-w-2xl">
              Diseñamos, fabricamos e instalamos espacios comerciales bajo un mismo techo para que tu proyecto avance sin complicaciones innecesarias. Un único interlocutor desde la planificación hasta la entrega final.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild variant="primary" size="lg" className="text-black font-semibold shadow-lg">
                <a href="#formulario">Solicitar valoración de proyecto</a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="border border-white/30 text-white hover:bg-white/10 hover:text-white">
                <a href="#casos">Ver proyectos realizados</a>
              </Button>
            </div>

            {/* Barra de confianza */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/20">
              <div>
                <p className="text-accent text-2xl md:text-3xl font-bold font-sans">+20 años</p>
                <p className="text-white/70 text-xs uppercase tracking-wider mt-1">de experiencia</p>
              </div>
              <div>
                <p className="text-accent text-2xl md:text-3xl font-bold font-sans">+1.000</p>
                <p className="text-white/70 text-xs uppercase tracking-wider mt-1">proyectos ejecutados</p>
              </div>
              <div>
                <p className="text-accent text-2xl md:text-3xl font-bold font-sans">Propia</p>
                <p className="text-white/70 text-xs uppercase tracking-wider mt-1">Producción propia</p>
              </div>
              <div>
                <p className="text-accent text-2xl md:text-3xl font-bold font-sans">Iberia</p>
                <p className="text-white/70 text-xs uppercase tracking-wider mt-1">España y Portugal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — EL PROBLEMA */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">Gestión Ineficiente</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              Coordinar varios proveedores suele generar más incidencias, más trabajo y menos control.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cuando diseño, fabricación, rotulación e instalación dependen de empresas distintas, los problemas de coordinación terminan afectando a los plazos, los costes y el resultado final.
            </p>
            <p className="text-lg font-medium text-foreground mt-4">
              En DE LOGICA centralizamos todo el proceso para que puedas centrarte en tu negocio mientras nosotros coordinamos el proyecto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-12">
            {[
              {
                icon: Shield,
                title: "Un único responsable",
                desc: "Evita el cruce de culpas entre proveedores. Nosotros respondemos por todo."
              },
              {
                icon: Factory,
                title: "Producción propia",
                desc: "Fabricación a medida sin intermediarios, controlando calidad y plazos."
              },
              {
                icon: Activity,
                title: "Menos incidencias",
                desc: "Procesos engranados desde el plano técnico hasta el montaje en local."
              },
              {
                icon: Sliders,
                title: "Mayor control",
                desc: "Seguimiento unificado en tiempo real del estado de cada partida."
              },
              {
                icon: Layers,
                title: "Coordinación integral",
                desc: "Diseño, mobiliario, rótulos e implantación en un solo flujo."
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-background border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-4">
                  <benefit.icon className="h-6 w-6 stroke-[1.75]" />
                </div>
                <h3 className="font-bold text-base mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — AUTORIDAD */}
      <section className="section-padding bg-background border-t">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">Sobre Nosotros</span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Más de 20 años ayudando a empresas a abrir, renovar y transformar sus espacios comerciales.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Trabajamos con cadenas, franquicias y negocios independientes que buscan un proveedor capaz de coordinar diseño, fabricación e instalación con garantías de calidad, coordinación y cumplimiento.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "+1.000 proyectos comerciales ejecutados",
                  "+20 años de experiencia en el sector",
                  "Instaladores y talleres de producción propia",
                  "Presencia e instalación en España y Portugal",
                  "Un único interlocutor en todo el ciclo"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-muted/20 border rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-foreground">Experiencia por sectores</h3>
              <p className="text-sm text-muted-foreground">Especialistas en adaptar la imagen corporativa y el layout operativo a las necesidades concretas de cada espacio comercial:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Clínicas y centros de salud",
                  "Retail y centros comerciales",
                  "Restauración y alimentación",
                  "Hoteles y hospitality",
                  "Farmacias y perfumerías",
                  "Franquicias y cadenas multisede"
                ].map((sector, sIdx) => (
                  <div key={sIdx} className="bg-background border rounded-xl p-4 flex items-center gap-3 shadow-xs">
                    <div className="h-2 w-2 rounded-full bg-accent shrink-0" />
                    <span className="text-sm font-semibold text-foreground">{sector}</span>
                  </div>
                ))}
              </div>

              {/* Client logos placeholder */}
              <div className="pt-6 border-t border-muted">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">Empresas que confían en nosotros</p>
                <div className="grid grid-cols-3 gap-6 items-center justify-center opacity-60">
                  <div className="text-center font-bold text-lg text-muted-foreground tracking-widest uppercase">CN Clinics</div>
                  <div className="text-center font-bold text-lg text-muted-foreground tracking-widest uppercase">Johnny Rockets</div>
                  <div className="text-center font-bold text-lg text-muted-foreground tracking-widest uppercase">Lladró</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4 — CASOS DE ÉXITO */}
      <section id="casos" className="section-padding bg-muted/10 border-t">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">Casos de Éxito</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4">Nuestros proyectos destacados</h2>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0 gap-2">
              <Link to="/proyectos">
                Ver más proyectos <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Caso 1 */}
            <div className="group bg-background border rounded-2xl overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-300">
              <div className="relative h-64 overflow-hidden bg-primary">
                <img
                  src={cnClinicsImg}
                  alt="CN Clinics"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wider">Clinicas</span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-foreground">CN Clinics</h3>
                <p className="text-sm font-semibold text-accent">Implantación de 7 clínicas en Alemania</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Coordinación de mobiliario, imagen corporativa e instalación manteniendo una identidad homogénea y de alta calidad en todos los centros de la cadena.
                </p>
              </div>
            </div>

            {/* Caso 2 */}
            <div className="group bg-background border rounded-2xl overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-300">
              <div className="relative h-64 overflow-hidden bg-primary">
                <img
                  src={johnnyRocketsImg}
                  alt="Johnny Rockets"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wider">Restauración</span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-foreground">Johnny Rockets</h3>
                <p className="text-sm font-semibold text-accent">Implantación integral de franquicia</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Coordinación completa de mobiliario especial, rotulación masiva y elementos de imagen para garantizar una ejecución fiel a los exigentes estándares de la marca.
                </p>
              </div>
            </div>

            {/* Caso 3 */}
            <div className="group bg-background border rounded-2xl overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-300">
              <div className="relative h-64 overflow-hidden bg-primary">
                <img
                  src={lladroImg}
                  alt="Lladró"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wider">Retail Premium</span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-foreground">Lladró</h3>
                <p className="text-sm font-semibold text-accent">Renovación y actualización de imagen</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fabricación e instalación premium respetando los estándares de calidad y detalle extremadamente exigentes propios de esta marca internacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5 — CÓMO TRABAJAMOS */}
      <section className="section-padding bg-background border-t">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">Nuestra Metodología</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Un proceso claro para mantener el control de tu proyecto comercial</h2>
            <p className="text-muted-foreground text-lg">Hacemos fácil lo complejo estructurando cada paso del proyecto bajo el control de un único gestor de cuentas.</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 lg:left-1/2 top-4 bottom-4 w-0.5 bg-muted lg:-translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Analizamos tu proyecto",
                  desc: "Estudiamos la viabilidad técnica, planos y requisitos operativos del espacio comercial para ofrecerte una valoración real de costes y plazos."
                },
                {
                  step: "02",
                  title: "Planificamos y coordinamos",
                  desc: "Definimos el plan de trabajo detallado y asignamos un gestor único de proyecto encargado de coordinar compras, fabricación e instalación."
                },
                {
                  step: "03",
                  title: "Fabricamos e implantamos",
                  desc: "Nuestros propios talleres fabrican el mobiliario y rótulos. Coordinamos los equipos de instalación in-situ para asegurar el encaje idóneo."
                },
                {
                  step: "04",
                  title: "Entregamos listo para funcionar",
                  desc: "Verificamos los acabados de calidad y te hacemos la entrega llave en mano en los plazos fijados, listo para abrir tus puertas."
                }
              ].map((step, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? "lg:flex-row-reverse" : ""} relative`}>
                  
                  {/* Timeline Badge */}
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 hidden md:flex">
                    <div className="h-10 w-10 rounded-full bg-accent border-4 border-background flex items-center justify-center text-black text-xs font-bold font-sans">
                      {step.step}
                    </div>
                  </div>

                  {/* Spacer for desktop layout alignment */}
                  <div className="w-full lg:w-1/2" />

                  {/* Content Card */}
                  <div className="w-full lg:w-[45%] bg-muted/30 border rounded-2xl p-6 md:p-8 ml-10 md:ml-0 shadow-xs hover:border-accent/40 transition-colors">
                    <span className="text-accent text-3xl font-extrabold font-sans block mb-2">{step.step}</span>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6 — CTA INTERMEDIO */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-custom text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto leading-tight">
            ¿Tienes un proyecto de implantación o renovación en marcha?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Cuéntanos qué necesitas y te ayudaremos a valorar la mejor solución para fabricarlo y ejecutarlo con plazos cerrados y garantías de calidad.
          </p>
          <Button asChild variant="primary" size="lg" className="text-black font-semibold mt-4 shadow-lg">
            <a href="#formulario">Solicitar valoración de proyecto</a>
          </Button>
        </div>
      </section>

      {/* SECCIÓN 7 — FORMULARIO */}
      <section id="formulario" className="section-padding bg-muted/20 border-t scroll-mt-20">
        <div className="container-custom max-w-4xl">
          <div className="bg-background border rounded-3xl p-8 md:p-12 shadow-elegant">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">Solicitud</span>
              <h2 className="text-3xl font-bold mt-4 mb-3">TEST DESPLIEGUE 999 - Solicita la valoración de tu proyecto</h2>
              <p className="text-sm text-muted-foreground">Completa los campos detallados para que nuestro equipo técnico prepare una propuesta de viabilidad y costes adaptada.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Información Personal / Empresa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-sm font-semibold">Nombre y apellidos *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej. Juan Pérez"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa" className="text-sm font-semibold">Empresa *</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
                    <Input
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej. Clínicas Dentales Alfa"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo" className="text-sm font-semibold">Cargo o Departamento *</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
                    <Input
                      id="cargo"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej. Director de Expansión / Operaciones"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email Corporativo *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="juan@empresa.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-sm font-semibold">Teléfono de contacto *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                      placeholder="+34 600 000 000"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ciudad" className="text-sm font-semibold">Ciudad / Ubicación del Proyecto</Label>
                  <Input
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    placeholder="Ej. Madrid, Sevilla..."
                  />
                </div>
              </div>

              {/* Tipo de proyecto */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-sm font-semibold block">Tipo de Proyecto (puedes seleccionar varios) *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: "implantacion_integral", label: "Implantación integral (Llave en mano)" },
                    { value: "mobiliario_comercial", label: "Mobiliario comercial a medida" },
                    { value: "rotulation_corporativa", label: "Rotulación y señalética corporativa" },
                    { value: "produccion_grafica", label: "Producción gráfica de gran formato" },
                    { value: "renovacion_restyling", label: "Renovación / Restyling de local" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2.5">
                      <Checkbox
                        id={`proyecto-${option.value}`}
                        checked={formData.tipoProyecto.includes(option.value)}
                        onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
                      />
                      <Label htmlFor={`proyecto-${option.value}`} className="text-sm font-normal cursor-pointer leading-none">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Información Operativa en Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold block">Número de centros implicados *</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1", "2-5", "6-10", "Más de 10"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, numCentros: opt }))}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                          formData.numCentros === opt 
                            ? "bg-primary border-primary text-white" 
                            : "bg-background hover:bg-muted border-input"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold block">¿Prevé aperturas o renovaciones recurrentes? *</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Sí", "No", "En estudio"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, aperturasPrevistas: opt }))}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                          formData.aperturasPrevistas === opt 
                            ? "bg-primary border-primary text-white" 
                            : "bg-background hover:bg-muted border-input"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold block">Inversión estimada para el proyecto *</Label>
                  <select
                    name="inversionEstimada"
                    value={formData.inversionEstimada}
                    onChange={(e) => setFormData(prev => ({ ...prev, inversionEstimada: e.target.value }))}
                    className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option>Menos de 5.000 €</option>
                    <option>5.000 € - 15.000 €</option>
                    <option>15.000 € - 50.000 €</option>
                    <option>Más de 50.000 €</option>
                  </select>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold block">Plazo previsto de inicio *</Label>
                  <select
                    name="plazoPrevisto"
                    value={formData.plazoPrevisto}
                    onChange={(e) => setFormData(prev => ({ ...prev, plazoPrevisto: e.target.value }))}
                    className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option>Inmediato</option>
                    <option>1-3 meses</option>
                    <option>3-6 meses</option>
                    <option>Más de 6 meses</option>
                  </select>
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="descripcion" className="text-sm font-semibold">Descripción breve de los trabajos o necesidades *</Label>
                <Textarea
                  id="descripcion"
                  name="descripcion"
                  rows={4}
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  required
                  placeholder="Explícanos tu local, alcance requerido, si ya cuentas con proyecto ejecutivo, etc..."
                />
              </div>

              {/* Aceptación Privacidad */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-start space-x-2.5">
                  <Checkbox
                    id="privacidad"
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                  />
                  <Label htmlFor="privacidad" className="text-xs text-muted-foreground font-normal leading-tight cursor-pointer">
                    He leído y acepto la{" "}
                    <a href="/legal/privacidad" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline font-semibold">
                      Política de Privacidad
                    </a>{" "}
                    para que traten mis datos con el fin de valorar el proyecto comercial.
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="primary" size="lg" className="w-full text-black font-bold text-base shadow-md" disabled={isSubmitting}>
                {isSubmitting ? "Procesando solicitud..." : "Enviar y solicitar valoración gratuita"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8 — FAQ */}
      <section className="section-padding bg-background border-t">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">Resolución de dudas</span>
            <h2 className="text-3xl font-bold mt-4">Preguntas Frecuentes</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "¿Trabajáis en toda España?",
                a: "Sí, operamos a nivel nacional en toda España y Portugal, coordinando toda la logística, suministro de mobiliario, rotulación e instalación local en cualquier punto de la península o islas."
              },
              {
                q: "¿Podéis ejecutar una implantación completa?",
                a: "Totalmente. Nos encargamos del ciclo completo: fabricación a medida de los elementos del local, gestión de rótulos, adecuación de elementos de imagen corporativa e instalación in-situ coordinada bajo un único responsable de cuentas."
              },
              {
                q: "¿Trabajáis con cadenas y franquicias?",
                a: "Sí, somos partners recurrentes de franquiciadores y directores de expansión que buscan homogeneizar la imagen de su marca y duplicar locales con rapidez y control de costes."
              },
              {
                q: "¿Podéis trabajar sobre proyectos de nuestro arquitecto o interiorista?",
                a: "Por supuesto. Colaboramos directamente con arquitectos de interiores o departamentos de diseño corporativo. Nosotros nos encargamos de adaptar sus planos técnicos a nuestra producción en taller y realizar la implantación respetando fielmente el diseño original."
              },
              {
                q: "¿Realizáis tanto proyectos completos como actuaciones parciales?",
                a: "Sí. Aunque nuestro valor diferencial se maximiza en la gestión integral de llaves en mano, también realizamos actuaciones parciales como renovaciones de mobiliario específico, cambios en rótulos o fachadas, restylings estacionales o campañas gráficas."
              }
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left font-bold text-base hover:text-accent py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SECCIÓN 9 — CIERRE */}
      <section className="section-padding bg-muted/30 border-t">
        <div className="container-custom max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
            Menos proveedores. Menos problemas. <br />
            <span className="text-accent">Más control sobre tu proyecto.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Más de 20 años ayudando a empresas a abrir, renovar y transformar espacios comerciales mediante un único interlocutor y más de 1.000 proyectos ejecutados.
          </p>
          <Button asChild variant="primary" size="lg" className="text-black font-semibold shadow-lg">
            <a href="#formulario">Solicitar valoración de proyecto</a>
          </Button>
        </div>
      </section>

    </div>
  );
}
