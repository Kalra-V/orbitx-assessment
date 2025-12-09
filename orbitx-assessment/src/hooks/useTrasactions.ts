import { useQuery } from "@tanstack/react-query";
import { getLastTransfers } from "../api/alchemy";
import { type ChainKey } from "../utils/constants";

export function useTransactions(address: string | null, chain: ChainKey) {
  return useQuery({
    queryKey: ["tx-history", address, chain],
    queryFn: () => {
      if (!address) return [];
      return getLastTransfers(address, chain);
    },
    enabled: !!address,
  });
}
