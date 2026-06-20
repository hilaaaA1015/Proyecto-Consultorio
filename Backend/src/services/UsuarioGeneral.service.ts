import { prisma } from "../services/prisma.js";
import { feistelEncrypt } from "../utils/feistel.js";
import { caesarEncrypt } from "../utils/caesar.js";
import { UsuarioGeneralRegisterInput } from "../schemas/UsuarioGeneral.schema.js";
// 1. Importamos Prisma para obtener el tipo correcto
import { Prisma } from "@prisma/client"; 

export class UsuarioGeneralService {
  static async register(data: UsuarioGeneralRegisterInput) {
    // Verificar nombre de usuario repetido
    const userExists = await prisma.usuario.findFirst({
      where: { nombre: data.UsuarioPasiente },
    });
    if (userExists) {
      throw new Error("El nombre de usuario ya existe, elige otro");
    }

    // Verificar correo repetido 
    const correoEnPaciente = await prisma.paciente.findFirst({
      where: { correo: data.email },
    });
    const correoEnDoctor = await prisma.doctor.findFirst({
      where: { correo: data.email } as any,
    });

    if (correoEnPaciente || correoEnDoctor) {
      throw new Error("El correo ya está registrado en otro usuario");
    }

    // Cifrado Feistel
    const key = process.env.FEISTEL_KEY || "dev_key";
    const encryptedPassword = feistelEncrypt(data.password, key);
    
    // Cifrado Cesar
    const caesarShift = Number(process.env.CAESAR_SHIFT ?? "3");
    const finalCipher = caesarEncrypt(encryptedPassword, caesarShift);

    // Transacción: crear usuario + tabla por rol
    // 2. Le asignamos el tipo explicito Prisma.TransactionClient a tx
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Crear usuario base
      const nuevoUsuario = await tx.usuario.create({
        data: {
          nombre: data.UsuarioPasiente,
          contrasena: finalCipher,
          rol:
            data.Roles === "doctor"
              ? "Doctor"
              : data.Roles === "secretaria"
              ? "Secretaria"
              : "Administrador",
        },
      });

      let extra: any = null;

      // Según el rol, crear en la tabla específica
      if (data.Roles === "doctor") {
        // Buscar la especialidad en tabla especialidad
        const esp = data.Especialidad
        ? await tx.especialidad.findFirst({
        where: { nombreespecialidad: data.Especialidad }, 
        })
    :   null;

        // 2. Crear doctor usando id_especialidad
        extra = await tx.doctor.create({
        data: {
        id_usuario: nuevoUsuario.id_usuario,
        nombre: data.PrimerNombre,
        primerapellido: data.Apellido,
        telefono: data.Telefono ?? null,
        nacimiento: data.fechaNacimiento,
        id_especialidad: esp?.id_especialidad ?? null, 
    },
  });
      } else if (data.Roles === "secretaria") {
        extra = await tx.secretaria.create({
          data: {
            id_usuario: nuevoUsuario.id_usuario,
            nombre: data.PrimerNombre,
            primerapellido: data.Apellido,
            telefono: data.Telefono ?? null,
          },
        });
      } else if (data.Roles === "administrador") {
        extra = await tx.administrador.create({
          data: {
            id_usuario: nuevoUsuario.id_usuario,
            nombre: data.PrimerNombre,
            primerapellido: data.Apellido,
          },
        });
      }

      return { usuario: nuevoUsuario, extra };
    });

    return result;
  }
}