import { prisma } from "../prisma.js";
import { encryptPassword } from "../../utils/encryptPassword.js";
// 1. Importamos Prisma para acceder a sus tipos de datos
import { Prisma } from "@prisma/client"; 

export const createPatientService = async (data: any) => {

  const encryptedPassword = encryptPassword(data.password);

  // 2. Le asignamos el tipo Prisma.TransactionClient a tx
  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

    const existingUser = await tx.usuario.findUnique({
      where: {
        nomperfil: data.UsuarioPasiente,
      },
    });
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    // 1. Crear usuario
    const newUser = await tx.usuario.create({
      data: {
        nomperfil: data.UsuarioPasiente,
        password_hash: encryptedPassword,
        rol: "paciente",
      },
    });

    // 2. Buscar tipo de sangre
    let tipoSangreId = null;

    if (data.TipoSangre) {
      const tipo = await tx.tipo_sangre.findFirst({
        where: { tipo: data.TipoSangre },
      });

      tipoSangreId = tipo?.id_tipo_sangre ?? null;
    }

    // 3. Crear paciente
    const paciente = await tx.paciente.create({
      data: {
        id_usuario: newUser.id_usuario,

        nombre: data.PrimerNombre,
        segundo_nombre: data.SegundoNombre,
        primer_apellido: data.Apellido,
        segundo_apellido: data.SegundoApellido,

        nacimiento: data.fechaNacimiento
          ? new Date(data.fechaNacimiento)
          : null,

        sexo: data.sex,
        telefono: data.Telefono,
        correo: data.email,

        tipo_sangre: tipoSangreId,
      },
    });

    return paciente;
  });
};