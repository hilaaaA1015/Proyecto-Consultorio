import { Router } from "express";
import { createPatientController } from "../../controllers/PacienteControllers/registrarpaciente.controller.js";

const router = Router();

router.post("/", createPatientController);

export default router;