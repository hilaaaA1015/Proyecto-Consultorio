import { Router } from "express";
import { createPatientController } from "../../controllers/PacienteControllers/registrarpaciente.controller";

const router = Router();

router.post("/", createPatientController);

export default router;