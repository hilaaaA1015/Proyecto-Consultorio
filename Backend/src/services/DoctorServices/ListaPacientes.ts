import { prisma } from "../prisma.js";

interface FiltrosPacientes {
  busqueda?: string;
  sexo?: string;
}

export const obtenerPacientes = async ({
  busqueda,
  sexo,
}: FiltrosPacientes) => {
  return await prisma.paciente.findMany({
    where: {
      AND: [
        busqueda
          ? {
              OR: [
                {
                  nombre: {
                    contains: busqueda,
                    mode: "insensitive",
                  },
                },
                {
                  primer_apellido: {
                    contains: busqueda,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},

        sexo
          ? {
              sexo: sexo,
            }
          : {},
      ],
    },

    select: {
      id_usuario: true,
      nombre: true,
      segundo_nombre: true,
      primer_apellido: true,
      segundo_apellido: true,
      nacimiento: true,
      telefono: true,
      sexo: true,
    },

    orderBy: {
      nombre: "asc",
    },
  });
};


//codigo de detalles de paciente
export const obtenerPacientePorId = async (id: number) => {
  return await prisma.paciente.findUnique({
    where: {
      id_usuario: id,
    },

    select: {
      id_usuario: true,
      nombre: true,
      segundo_nombre: true,
      primer_apellido: true,
      segundo_apellido: true,
      nacimiento: true,
      sexo: true,
      telefono: true,
      correo: true,

      estatura_cm: true,
      peso_kg: true,
      imc: true,

      presion_arterial: true,
      frecuencia_cardiaca: true,
      frecuencia_respiratoria: true,
      temperatura: true,
      saturacion_oxigeno: true,

      observaciones_generales: true,

      tipo_sangre_paciente_tipo_sangreTotipo_sangre: {
        select: {
          tipo: true,
        },
      },
    },
  });
};

export const actualizarObservacionesPaciente = async (
  id: number,
  observaciones: string
) => {
  return await prisma.paciente.update({
    where: {
      id_usuario: id,
    },

    data: {
      observaciones_generales: observaciones,
    },
  });
};