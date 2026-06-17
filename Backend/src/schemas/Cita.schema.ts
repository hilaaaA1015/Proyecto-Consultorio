import { z } from "zod";

// ======================
// VALIDACIÓN ZOD
// ======================
export const citaCreateSchema = z.object({
  motivo: z.string().min(1, "El motivo es obligatorio"),

  fecha: z.union([z.string(), z.date()]).transform((value) => {
    const d = new Date(value);
    if (isNaN(d.getTime())) {
      throw new Error("Fecha inválida");
    }
    return d;
  }),

  horacita: z.string().regex(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    "Hora inválida (HH:mm)"
  ),
});

// ======================
// TYPE PARA TYPESCRIPT
// ======================
export type CitaCreateInput = {
  motivo: string;
  fecha: Date;
  horacita: string;
};