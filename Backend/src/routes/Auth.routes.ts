import { Router } from "express";
import { loginController  } from "../controllers/Auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {prisma} from "../services/prisma.js"

const router = Router();

router.post("/login", loginController);

router.get("/perfil", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.user.id;

    // Buscar usuario real en BD
    const user = await prisma.usuario.findUnique({
      where: {
        id_usuario: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    // DEVOLVER LO QUE NECESITA EL FRONTEND
    res.json({
      user: {
        id: user.id_usuario,
        rol: user.rol,
        username: user.nomperfil, // 🔥 CLAVE
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener perfil",
    });
  }
});

export default router;
