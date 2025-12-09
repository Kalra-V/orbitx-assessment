import axios from "axios";
import { CHAINS, type ChainKey } from "../utils/constants";

export async function getLastTransfers(address: string, chain: ChainKey) {
  const rpc = CHAINS[chain].rpc;

  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: "0x0",
        toBlock: "latest",
        maxCount: "0xA", // hex for 10
        order: "desc",
        withMetadata: true,
        toAddress: address,
        category: ["external", "erc20"],
      },
    ],
  };

  const res = await axios.post(rpc, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data.result.transfers;
}
