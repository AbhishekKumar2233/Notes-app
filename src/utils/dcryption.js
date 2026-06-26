import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

export const decryptNote = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);

    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};