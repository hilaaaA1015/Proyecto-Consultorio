import { z } from "zod";

export const updateDoctorSchema = z.object({
  nomperfil: z.string().min(3),
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  especialidad: z.string().min(2),
  telefono: z.string().min(8),
  correo: z.string().email(),
});

export type UpdateDoctorInput = z.infer<typeof updateDoctorSchema>;