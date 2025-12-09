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
      <div className="p-4 text-red-600 bg-red-50">
        Failed to fetch transactions.
      </div>
    );
  }

  if (!txs?.length) {
    return <div className="p-4 text-gray-500">No transactions found.</div>;
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
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border-b animate-pulse space-y-2">
          <div className="h-3 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-36"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
}
