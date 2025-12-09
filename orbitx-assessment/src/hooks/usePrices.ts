import { useQuery } from "@tanstack/react-query";
import { fetchTokenPrices } from "../api/prices";

export function usePrices() {
  return useQuery({
    queryKey: ["token-prices"],
    queryFn: fetchTokenPrices,
    staleTime: 60_000, // 60 seconds
    refetchInterval: 60_000,
  });
}
