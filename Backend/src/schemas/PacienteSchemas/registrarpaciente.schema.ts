import { z } from "zod";

export const createPatientSchema = z.object({
  PrimerNombre: z.string().min(1),
  SegundoNombre: z.string().optional(),
  Apellido: z.string().min(1),
  SegundoApellido: z.string().optional(),
  fechaNacimiento: z.string().datetime().nullable(),
  sex: z.enum(["M", "F"]).nullable(),
  Telefono: z.string().optional(),
  TipoSangre: z.string().optional(),
  email: z.string().email(),
  UsuarioPasiente: z.string().min(3),
  password: z.string().min(6),
});