import { type NormalizedTx } from "../types/normalizedTx";
import { TxItem } from "./TxItem";

export function ActivityFeed({
  txs,
  isLoading,
  isError,
}: {
  txs: NormalizedTx[];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) return <LoadingFeed />;

  if (isError) {
    return (
      <div className="p-3 sm:p-4 text-red-600 bg-red-50 text-sm sm:text-base rounded">
        Failed to fetch transactions.
      </div>
    );
  }

  if (!txs?.length) {
    return <div className="p-3 sm:p-4 text-gray-500 text-sm sm:text-base rounded border">No transactions found.</div>;
  }

  return (
    <div className="border rounded-md overflow-hidden">
      {txs.map((tx) => (
        <TxItem key={tx.hash} tx={tx} />
      ))}
    </div>
  );
}

function LoadingFeed() {
  return (
    <div className="space-y-2 sm:space-y-4 border rounded-md overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-3 sm:p-4 border-b animate-pulse space-y-2">
          <div className="h-3 bg-gray-300 rounded w-20 sm:w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-28 sm:w-36"></div>
          <div className="h-3 bg-gray-200 rounded w-16 sm:w-20"></div>
        </div>
      ))}
    </div>
  );
}
