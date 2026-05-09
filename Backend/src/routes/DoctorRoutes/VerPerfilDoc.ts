import { Router } from "express";
import {
  getDoctorProfile,
  updateDoctorProfileController,
} from "../../controllers/DoctorControllers/VerPerfilDoc";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get(
  "/perfil",
  authMiddleware,
  getDoctorProfile
);

router.put(
  "/perfil",
  authMiddleware,
  updateDoctorProfileController
);

export default router;