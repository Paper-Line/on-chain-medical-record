import CryptoJS from "crypto-js";

import CONFIG from "@/config";

export const encrypt = (text: string) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(text, CONFIG.encKey, {
      iv: CONFIG.encIV
    }).toString();
    const encoded = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex);
    return encoded;
  } catch (e: unknown) {
    return null;
  }
};

export function decrypt(encrypted: string) {
  try {
    const decoded = CryptoJS.enc.Hex.parse(encrypted).toString(CryptoJS.enc.Base64);
    const decrypted = CryptoJS.AES.decrypt(decoded, CONFIG.encKey, {
      iv: CONFIG.encIV
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e: unknown) {
    return null;
  }
}

export function parser(string: string) {
  try {
    return JSON.parse(string);
  } catch (e: unknown) {
    return null;
  }
}
