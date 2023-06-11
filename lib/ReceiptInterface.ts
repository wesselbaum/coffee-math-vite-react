import { RatioConf } from "coffeemathlib/RatioCalculator";

export interface ReceiptInterface {
  name: string;
  id?: string;
  createdAt: number;
  favorite: boolean;
  ratioConf: RatioConf;
}
