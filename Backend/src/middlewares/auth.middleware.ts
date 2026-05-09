import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

interface JwtPayload {
  id_usuario: number;
  rol: string;
}

export const authMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token no proporcionado",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token inválido",
      });
    }

    // 🔐 VERIFICAR TOKEN
    const decoded = jwt.verify(
      token,
      ENV.JWT_SECRET
    ) as JwtPayload;

    // 🔐 GUARDAR USUARIO EN REQUEST
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Token inválido o expirado",
    });

  }
};