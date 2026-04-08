import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  //PORT: process.env.PORT || 4000,
  ENCRYPT_SECRET: process.env.ENCRYPT_SECRET as string,
  ENCRYPT_SHIFT: Number(process.env.ENCRYPT_SHIFT),
};
