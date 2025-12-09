import { type NormalizedTx } from "../types/normalizedTx";
import { format } from "date-fns";

export function TxItem({ tx }: { tx: NormalizedTx }) {
  const isSent = tx.type === "sent";

  return (
    <div className="p-4 border-b flex flex-col gap-1">
      {/* Top row: type + status */}
      <div className="flex justify-between items-center">
        <span
          className={
            "font-semibold " + (isSent ? "text-red-500" : "text-green-500")
          }
        >
          {isSent ? "Sent" : "Received"}
        </span>

        <span
          className={
            "text-xs px-2 py-1 rounded " +
            (tx.status === "confirmed"
              ? "bg-green-100 text-green-600"
              : tx.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-600")
          }
        >
          {tx.status}
        </span>
      </div>

      {/* Amount */}
      <div className="text-lg font-medium">
        {tx.amount} {tx.tokenSymbol}
      </div>

      {/* USD value */}
      {tx.usdValue !== null && (
        <div className="text-sm text-gray-500">${tx.usdValue}</div>
      )}

      {/* Timestamp */}
      <div className="text-xs text-gray-400">
        {format(tx.timestamp * 1000, "PPpp")}
      </div>

      {/* Addresses */}
      <div className="text-xs text-gray-400">
        <div>
          <span className="font-medium">From:</span> {short(tx.from)}
        </div>
        <div>
          <span className="font-medium">To:</span> {short(tx.to)}
        </div>
      </div>
    </div>
  );
}

function short(addr: string) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}
