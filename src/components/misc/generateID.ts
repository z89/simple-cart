import { SHA256 } from "crypto-js";

export default function generateID(str: string) {
  return "sku_" + SHA256(str).toString().slice(0, 12);
}
