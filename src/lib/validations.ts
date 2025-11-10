import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Email inválido' }).max(255, { message: 'Email demasiado largo' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

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
export type ContactFormData = z.infer<typeof contactSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
