import { Request, Response } from "express";
import { loginSchema } from "../schemas/Auth.schema.js";
import { loginService } from "../services/Auth.service.js";

export const loginController = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginService(data);

    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};