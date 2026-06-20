import { Router } from "express";
import { CitaController } from "../controllers/Cita.controller.js";

const router = Router();

// crear cita
router.post("/citas", CitaController.create);

// obtener citas
router.get("/citas", CitaController.getAll);

// cambiar estado
router.put("/citas/:id/estado", CitaController.updateEstado);

// eliminar cita
router.delete("/citas/:id", CitaController.delete);

export default router;