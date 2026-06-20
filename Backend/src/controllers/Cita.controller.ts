import { Request, Response } from "express";
import { CitaService } from "../services/Cita.service.js";

export class CitaController {
  static async create(req: Request, res: Response) {
    try {
      const cita = await CitaService.create(req.body, req.body.idUsuario);
      res.status(201).json(cita);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(_req: Request, res: Response) {
    try {
      const citas = await CitaService.getAll();
      res.json(citas);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // =========================
  // CAMBIAR ESTADO
  // =========================
  static async updateEstado(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      const cita = await CitaService.updateEstado(Number(id), estado);

      res.json(cita);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // =========================
  // ELIMINAR CITA
  // =========================
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await CitaService.delete(Number(id));

      res.json({ message: "Cita eliminada" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}