// src/routes/UsuarioGeneral.routes.ts
import { Router } from "express";
import { UsuarioGeneralController } from "../controllers/UsuarioGeneral.controller.js";

export const usuarioGeneralRouter = Router();

usuarioGeneralRouter.post("/", UsuarioGeneralController.register);
