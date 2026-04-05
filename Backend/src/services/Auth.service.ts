import { prisma } from "../services/prisma";
import { encryptPassword } from "../utils/encryptPassword";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const loginService = async (data: any) => {

  // 🔍 1. Buscar usuario
  const user = await prisma.usuario.findUnique({
    where: {
      nomperfil: data.UsuarioPasiente,
    },
  });

  if (!user) {
    throw new Error("Usuario no existe");
  }

  // 🔐 2. Cifrar password ingresada
  const encrypted = encryptPassword(data.password);

  // ⚖️ 3. Comparar
  if (encrypted !== user.password_hash) {
    throw new Error("Contraseña incorrecta");
  }

  // 🎟️ 4. Generar JWT
  const token = jwt.sign(
    {
      id: user.id_usuario,
      rol: user.rol,
    },
    ENV.ENCRYPT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return {
    token,
    user: {
      id: user.id_usuario,
      rol: user.rol,
      username: user.nomperfil,
    },
  };
};