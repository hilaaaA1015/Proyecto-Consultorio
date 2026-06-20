import { Request, Response } from "express";
import { obtenerPacientes, obtenerPacientePorId, actualizarObservacionesPaciente} from "../../services/DoctorServices/ListaPacientes.js";

export const getPacientes = async (req: Request, res: Response) => {
  try {
    const { busqueda, sexo } = req.query;

    const pacientes = await obtenerPacientes({
      busqueda: busqueda as string,
      sexo: sexo as string,
    });

    res.json(pacientes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener pacientes",
    });
  }
};

export const updateObservacionesPaciente = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const { observaciones_generales } = req.body;

    const paciente = await actualizarObservacionesPaciente(
      id,
      observaciones_generales
    );

    res.json(paciente);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al actualizar observaciones",
    });
  }
};

//ver detalles de paciente

export const getPacienteById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const paciente = await obtenerPacientePorId(id);

    if (!paciente) {
      return res.status(404).json({
        message: "Paciente no encontrado",
      });
    }

    res.json({
      ...paciente,

      tipo_sangre:
        paciente.tipo_sangre_paciente_tipo_sangreTotipo_sangre?.tipo ||
        "No registrado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener paciente",
    });
  }
};