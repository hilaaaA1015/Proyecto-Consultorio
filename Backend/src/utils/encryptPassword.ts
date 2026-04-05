import { caesarEncrypt } from "./caesar";
import { feistelEncrypt } from "./feistel";
import { ENV } from "../config/env";

export const encryptPassword = (password: string) => {
  const caesar = caesarEncrypt(password, ENV.ENCRYPT_SHIFT);
  return feistelEncrypt(caesar, ENV.ENCRYPT_SECRET);
};
console.log("SECRET:", ENV.ENCRYPT_SECRET);