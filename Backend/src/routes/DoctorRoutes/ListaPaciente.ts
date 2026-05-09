import { Router } from "express";
import { getPacientes, getPacienteById,  updateObservacionesPaciente} from "../../controllers/DoctorControllers/ListaPacientes";

const router = Router();

router.get("/", getPacientes);
router.get("/:id", getPacienteById);
router.patch("/:id/observaciones", updateObservacionesPaciente);

export default router;