import { Request, Response } from "express";
import {
  getDoctorProfileService,
  updateDoctorProfileService,
} from "../../services/DoctorServices/VerPerfilDoc.js";
import { updateDoctorSchema } from "../../schemas/DoctorSchemas/VerPerfilDoc.js";

export const getDoctorProfile = async (req: any, res: Response) => {
  try {
    const id_usuario = req.user.id_usuario;

    // Validación de seguridad
    if (!id_usuario) {
      return res.status(401).json({
        message: "No se pudo identificar al usuario desde el token"
      });
    }

    const perfil = await getDoctorProfileService(id_usuario);

    // Respuesta al frontend
    return res.json(perfil);

  } catch (error: any) {
    console.error("Error en el controlador de perfil:", error);
    return res.status(500).json({
      message: error.message || "Error interno del servidor"
    });
  }
};

export const updateDoctorProfileController = async (
  req: any,
  res: Response
) => {
  try {
    const id_usuario = req.user.id_usuario;

    const validatedData = updateDoctorSchema.parse(req.body);

    const doctorActualizado = await updateDoctorProfileService(
      id_usuario,
      validatedData
    );

    res.status(200).json({
      message: "Perfil actualizado correctamente",
      doctor: doctorActualizado,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};