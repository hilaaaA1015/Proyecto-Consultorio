import { prisma } from "../prisma";

export const getDoctorProfileService = async (id_usuario: number) => {
  const userId = Number(id_usuario);

  const doctor = await prisma.doctor.findUnique({
    where: {
      id_usuario: userId, // Usamos la variable convertida
    },
    include: {
      usuario: true,
    },
  });

  if (!doctor) {
    throw new Error("Doctor no encontrado");
  }
  

  return {
    nomperfil: doctor.usuario.nomperfil,
    nombre: doctor.nombre,
    apellido: doctor.apellido,
    especialidad: doctor.especialidad,
    telefono: doctor.telefono,
    correo: doctor.correo,
  };
};

export const updateDoctorProfileService = async (
  id_usuario: number,
  data: {
    nomperfil: string;
    nombre: string;
    apellido: string;
    especialidad: string;
    telefono: string;
    correo: string;
  }
) => {
  const doctorExiste = await prisma.doctor.findUnique({
    where: {
      id_usuario,
    },
  });

  if (!doctorExiste) {
    throw new Error("Doctor no encontrado");
  }

  await prisma.usuario.update({
    where: {
      id_usuario,
    },
    data: {
      nomperfil: data.nomperfil,
    },
  });

  const doctorActualizado = await prisma.doctor.update({
    where: {
      id_usuario,
    },
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      especialidad: data.especialidad,
      telefono: data.telefono,
      correo: data.correo,
    },
    include: {
      usuario: true,
    },
  });

  return {
    nomperfil: doctorActualizado.usuario.nomperfil,
    nombre: doctorActualizado.nombre,
    apellido: doctorActualizado.apellido,
    especialidad: doctorActualizado.especialidad,
    telefono: doctorActualizado.telefono,
    correo: doctorActualizado.correo,
  };
};