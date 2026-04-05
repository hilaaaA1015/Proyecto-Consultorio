import { Request, Response } from "express";
import { citaCreateSchema } from "../schemas/Cita.schema";
import { CitaService } from "../services/Cita.service";

export class CitaController {
  static async create(req: Request, res: Response) {
    try {
    
      const idUsuario = (req as any).user.id_usuario;

      const data = citaCreateSchema.parse(req.body);

      const cita = await CitaService.create(data, idUsuario);

      return res.status(201).json({
        ok: true,
        message: "Cita creada correctamente",
        cita,
      });
    } catch (err: any) {
      console.error("ERROR en CitaController.create:", err);

      if (err.name === "ZodError") {
        return res.status(400).json({
          ok: false,
          message: "Datos inválidos",
          errors: err.flatten(),
        });
      }

      return res.status(400).json({
        ok: false,
        message: err.message || "Error al crear cita",
      });
    }
  }
}
