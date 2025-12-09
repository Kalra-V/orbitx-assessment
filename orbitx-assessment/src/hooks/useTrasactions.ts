import { useQuery } from "@tanstack/react-query";
import { getLastTransfers } from "../api/alchemy";
import { type ChainKey } from "../utils/constants";
import { normalizeAlchemyTransfer } from "../utils/normalizeAlchemyResponse";
import { usePrices } from "./usePrices";
import { TOKEN_PRICE_MAP } from "../utils/tokenPriceMap";

export function useTransactions(address: string | null, chain: ChainKey) {
  const pricesQuery = usePrices();
  return useQuery({
    queryKey: ["tx-history", address, chain],
    queryFn: async () => {
      if (!address) return [];
      const rawTransfers = await getLastTransfers(address, chain);
      console.log("RAW TRANSFERS: ", rawTransfers);
      const normalizedTransfers = rawTransfers.map((transfer: any) =>
        normalizeAlchemyTransfer(transfer, address, chain)
      );
      console.log("NORMALIZED TRANSFERS: ", normalizedTransfers);

      const prices = pricesQuery.data;
      console.log("PRICES: ", prices);
      return normalizedTransfers.map((tx: any) => {
        const cgId = TOKEN_PRICE_MAP[tx.tokenSymbol];
        if (!cgId || !prices) {
          return { ...tx, usdValue: null };
        }

        const price = prices[cgId]?.usd;
        if (!price) return { ...tx, usdValue: null };

        return {
          ...tx,
          usdValue: Number((tx.amount * price).toFixed(2)),
        };
      });
    },
    enabled: !!address,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    refetchIntervalInBackground: false,
  });
}
