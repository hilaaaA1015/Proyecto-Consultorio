import { prisma } from "../services/prisma";
import { encryptPassword } from "../utils/encryptPassword";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const loginService = async (data: any) => {

  // Buscar usuario
  const user = await prisma.usuario.findUnique({
    where: {
      nomperfil: data.UsuarioPasiente,
    },
  });
  if (!user) {
    throw new Error("Usuario no existe");
  }

  // cifrar password ingresada
  const encrypted = encryptPassword(data.password);

  // Comparar
  if (encrypted !== user.password_hash) {
    throw new Error("Contraseña incorrecta");
  }

  // Generar JWT
  const token = jwt.sign(
    {
      id_usuario: user.id_usuario,
      rol: user.rol,
    },
    ENV.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return {
    token,
    user: {
      id_usuario: user.id_usuario,
      rol: user.rol,
      nomperfil: user.nomperfil,
    },
  };
};