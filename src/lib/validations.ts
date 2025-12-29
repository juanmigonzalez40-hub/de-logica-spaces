import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Email inválido' }).max(255, { message: 'Email demasiado largo' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

// Schema unificado para todos los formularios de contacto/proyectos
export const unifiedFormSchema = z.object({
  company: z.string().trim().min(1, { message: 'El nombre de la empresa es obligatorio' }).max(100, { message: 'El nombre de la empresa es demasiado largo' }),
  contact: z.string().trim().min(1, { message: 'El contacto principal es obligatorio' }).max(100, { message: 'El nombre es demasiado largo' }),
  phone: z.string().trim().min(9, { message: 'Teléfono inválido' }).max(20, { message: 'Teléfono demasiado largo' }),
  email: z.string().trim().email({ message: 'Email inválido' }).max(255, { message: 'Email demasiado largo' }),
  city: z.string().trim().min(1, { message: 'La ciudad es obligatoria' }).max(100, { message: 'El nombre de la ciudad es demasiado largo' }),
  cif: z.string().trim().min(1, { message: 'El CIF es obligatorio' }).max(20, { message: 'CIF demasiado largo' }),
  sectors: z.array(z.string()).min(1, { message: 'Selecciona al menos un sector' }),
  project: z.string().trim().min(10, { message: 'Cuéntanos más sobre tu proyecto (mínimo 10 caracteres)' }).max(1000, { message: 'El mensaje es demasiado largo' }),
  budget: z.array(z.string()).min(1, { message: 'Selecciona un rango de presupuesto' }),
  observations: z.string().trim().max(1000, { message: 'Las observaciones son demasiado largas' }).optional(),
});

// Esquemas antiguos para compatibilidad (deprecated)
export const contactSchema = z.object({
  name: z.string().trim().min(1, { message: 'El nombre es obligatorio' }).max(100, { message: 'El nombre es demasiado largo' }),
  company: z.string().trim().max(100, { message: 'El nombre de la empresa es demasiado largo' }).optional(),
  email: z.string().trim().email({ message: 'Email inválido' }).max(255, { message: 'Email demasiado largo' }),
  phone: z.string().trim().min(9, { message: 'Teléfono inválido' }).max(20, { message: 'Teléfono demasiado largo' }),
  business_type: z.string().trim().max(100, { message: 'Tipo de negocio demasiado largo' }).optional(),
  message: z.string().trim().min(10, { message: 'El mensaje debe tener al menos 10 caracteres' }).max(1000, { message: 'El mensaje es demasiado largo' }),
});

export const projectSchema = z.object({
  name: z.string().trim().min(1, { message: 'El nombre es obligatorio' }).max(100, { message: 'El nombre es demasiado largo' }),
  email: z.string().trim().email({ message: 'Email inválido' }).max(255, { message: 'Email demasiado largo' }),
  phone: z.string().trim().min(9, { message: 'Teléfono inválido' }).max(20, { message: 'Teléfono demasiado largo' }),
  company: z.string().trim().max(100, { message: 'El nombre de la empresa es demasiado largo' }).optional(),
  sector: z.string().min(1, { message: 'El sector es obligatorio' }),
  city: z.string().trim().min(1, { message: 'La ciudad es obligatoria' }).max(100, { message: 'El nombre de la ciudad es demasiado largo' }),
  premises: z.string().min(1, { message: 'Selecciona el tipo de local' }),
  message: z.string().trim().max(1000, { message: 'El mensaje es demasiado largo' }).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type UnifiedFormData = z.infer<typeof unifiedFormSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;

// Opciones para los selectores
export const SECTOR_OPTIONS = [
  { value: 'otros', label: 'Otros (pon en observaciones)' },
  { value: 'constructora', label: 'Constructora' },
  { value: 'arquitectura', label: 'Arquitectura' },
  { value: 'franquicia', label: 'Franquicia' },
  { value: 'horeca', label: 'Horeca' },
  { value: 'retail', label: 'Retail' },
];

export const BUDGET_OPTIONS = [
  { value: '5000-10000', label: 'de 5.000€ - 10.000€' },
  { value: '3000-5000', label: 'de 3.000€ a 5.000€' },
  { value: 'menos-3000', label: 'menos de 3.000€' },
];