import { caesarEncrypt } from "./caesar.js";
import { feistelEncrypt } from "./feistel.js";
import { ENV } from "../config/env.js";

export const encryptPassword = (password: string) => {
  const caesar = caesarEncrypt(password, ENV.ENCRYPT_SHIFT);
  return feistelEncrypt(caesar, ENV.ENCRYPT_SECRET);
};
console.log("SECRET:", ENV.ENCRYPT_SECRET);