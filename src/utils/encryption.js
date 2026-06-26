import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

export const encryptNote = (note) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(note),
    SECRET_KEY
  ).toString();
};