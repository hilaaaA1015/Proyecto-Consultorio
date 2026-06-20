import { Request, Response } from "express";
import { createPatientSchema } from "../../schemas/PacienteSchemas/registrarpaciente.schema.js";
import { createPatientService } from "../../services/PacienteServices/registrarpaciente.service.js";

export const createPatientController = async (req: Request, res: Response) => {
  try {
    const validatedData = createPatientSchema.parse(req.body);

    const patient = await createPatientService(validatedData);

    return res.status(201).json({
      message: "Paciente creado correctamente",
      data: patient,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      message: error.message || "Error al crear paciente",
    });
  }
};