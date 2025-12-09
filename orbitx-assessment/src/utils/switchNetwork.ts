import { CHAIN_IDS_HEX } from "./constants";
import { type ChainKey } from "./constants";

export async function switchNetwork(chain: ChainKey) {
  if (!(window as any).ethereum) {
    console.warn("No wallet detected");
    return;
  }

  try {
    await (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CHAIN_IDS_HEX[chain] }],
    });
  } catch (err: any) {
    console.error("Switch network error:", err);
  }
}
