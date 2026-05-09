import { loginService } from "../services/Auth.service";
import { prisma } from "../services/prisma";
import { encryptPassword } from "../utils/encryptPassword";
import jwt from "jsonwebtoken";

//los mock basicamente simulan cosas que se usa en el proceso a testear
jest.mock("../services/prisma", () => ({
  prisma: {
    usuario: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("../utils/encryptPassword", () => ({
  encryptPassword: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("loginService", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Iniciar iniciar sesión correctamente", async () => {

    // Aqui basicamente dice "cuando alguien llame findUnique(), responde esto"
    (prisma.usuario.findUnique as jest.Mock)
      .mockResolvedValue({
        id_usuario: 8,
        nomperfil: "dr.carlos",
        rol: "medico",
        password_hash: "86333a3ba6791871478ff787818655d9",
      });

    // Simular cifrado correcto
    (encryptPassword as jest.Mock)
      .mockReturnValue(
        "86333a3ba6791871478ff787818655d9"
      );

    // Simular JWT
    (jwt.sign as jest.Mock)
      .mockReturnValue("token-falso");

    const resultado = await loginService({
      UsuarioPasiente: "dr.carlos",
      password: "1234",
    });

    expect(resultado).toEqual({
      token: "token-falso",
      user: {
        id_usuario: 8,
        rol: "medico",
        nomperfil: "dr.carlos",
      },
    });

  });

});