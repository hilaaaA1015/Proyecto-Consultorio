// src/controllers/UsuarioGeneral.controller.ts
import { Request, Response } from "express";
import { usuarioGeneralRegisterSchema } from "../schemas/UsuarioGeneral.schema.js";
import { UsuarioGeneralService } from "../services/UsuarioGeneral.service.js";

export class UsuarioGeneralController {
  static async register(req: Request, res: Response) {
    try {
      console.log("Body recibido en /api/users:", req.body);

      const data = usuarioGeneralRegisterSchema.parse(req.body);
      const result = await UsuarioGeneralService.register(data);

      return res.status(201).json({
        ok: true,
        message: "Usuario creado correctamente",
        usuario: result.usuario,
        extra: result.extra,
      });
    } catch (err: any) {
      console.error("ERROR en UsuarioGeneralController.register:", err);

      if (err.name === "ZodError") {
        return res.status(400).json({
          ok: false,
          message: "Datos inválidos",
          errors: err.flatten(),
        });
      }

      return res.status(400).json({
        ok: false,
        message: err.message || "Error al registrar usuario",
      });
    }
  }
}
