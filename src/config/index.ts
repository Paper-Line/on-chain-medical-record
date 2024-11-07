import CryptoJS from "crypto-js";

interface ConfigProps {
  satelliteId: string | undefined;
  encKey: CryptoJS.lib.WordArray;
  encIV: CryptoJS.lib.WordArray;
}

const CONFIG: ConfigProps = {
  satelliteId: process.env.NEXT_PUBLIC_SATELLITE_ID,
  encKey: CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_APP_ENC_KEY || "x"),
  encIV: CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_APP_ENV_IV || "x")
};

export default CONFIG;
