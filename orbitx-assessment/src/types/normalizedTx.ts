import { type ChainKey } from "../utils/constants";

export type NormalizedTx = {
  hash: string;
  timestamp: number; // epoch seconds
  type: "sent" | "received";
  amount: number; // final decimal number (not wei)
  tokenSymbol: string;
  usdValue: number | null;

  from: string;
  to: string;

  status: "pending" | "confirmed" | "failed";
  chain: ChainKey;
};
