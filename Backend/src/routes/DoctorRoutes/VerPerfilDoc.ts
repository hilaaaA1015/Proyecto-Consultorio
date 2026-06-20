import { Router } from "express";
import {
  getDoctorProfile,
  updateDoctorProfileController,
} from "../../controllers/DoctorControllers/VerPerfilDoc.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

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