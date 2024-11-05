import CryptoJS from "crypto-js";

interface ConfigProps {
  sateliteId: string | undefined;
  encKey: CryptoJS.lib.WordArray;
  encIV: CryptoJS.lib.WordArray;
}

const CONFIG: ConfigProps = {
  sateliteId: process.env.NEXT_PUBLIC_APP_SATELITE_ID,
  encKey: CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_APP_ENC_KEY || "x"),
  encIV: CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_APP_ENV_IV || "x")
};

export default CONFIG;
