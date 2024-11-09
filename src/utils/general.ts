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

export function bigIntToTimestamp(milliseconds: bigint): number {
  // Convert BigInt to a number, handling potential precision loss
  const millisecondsNumber = Number(milliseconds);

  return millisecondsNumber;
}

export function bigIntStampToUniversalStamp(milliseconds: bigint) {
  const bigIntTs = bigIntToTimestamp(milliseconds);

  return bigIntTs / 1_000_000;
}

export function convertMillisecondsToYYYYMMDDHHMM(milliseconds: number) {
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
