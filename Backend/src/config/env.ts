import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  ENCRYPT_SECRET: process.env.FEISTEL_KEY as string,
  ENCRYPT_SHIFT: Number(process.env.CAESAR_SHIFT),
  JWT_SECRET: process.env.JWT_SECRET as string,
};
