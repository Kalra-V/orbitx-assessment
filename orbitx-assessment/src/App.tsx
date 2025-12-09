import { useContext, useState } from "react";
import "./App.css";
import { WalletContext } from "./contexts/WalletContext";
import { CHAINS, type ChainKey } from "./utils/constants";
import { useTransactions } from "./hooks/useTrasactions";

// import { MOCK_DATA as transactions } from "./utils/normalizeAlchemyResponse";

import { ActivityFeed } from "./components/ActivityFeed";
import { WalletHeader } from "./components/WalletHeader";

function App() {
  const { accounts, setAccounts, useMockData } = useContext(WalletContext);

  const [chain, setChain] = useState<ChainKey>("ethereum");

  // const { data: transactions, isLoading } = useTransactions(
  //   "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  //   chain
  // );

  console.log("ACCOUNTS: ", accounts);
  const { data: transactions, isLoading, refetch } = useTransactions(accounts[0], chain);

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <WalletHeader chain={chain} />

      {/* CHAIN SELECTOR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {(["ethereum", "polygon", "arbitrum"] as ChainKey[]).map((c) => (
            <button
              key={c}
              onClick={() => setChain(c)}
              className={
                "px-3 py-1 rounded border text-sm sm:text-base whitespace-nowrap " +
                (chain === c
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700")
              }
            >
              {CHAINS[c].name}
            </button>
          ))}
        </div>
        <button
          onClick={() => refetch()}
          className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50 transition text-sm sm:text-base whitespace-nowrap w-full sm:w-auto"
        >
          Refresh
        </button>
      </div>

      {/* CONNECTED ACCOUNTS */}
      {accounts.length > 0 && (
        <div className="bg-gray-50 p-3 sm:p-4 rounded border">
          <h2 className="font-medium mb-2 text-sm sm:text-base">Connected Accounts</h2>
          <ul className="space-y-1">
            {accounts.map((account) => (
              <li key={account} className="text-xs sm:text-sm text-gray-600 break-all">
                {account}
              </li>
            ))}
          </ul>
        </div>
      )}

      {accounts.length > 0 ? (
        isLoading ? (
          <div className="text-sm sm:text-base">Loading...</div>
        ) : (
          <>
            <div>
              <h2 className="font-medium mb-3 text-sm sm:text-base">Activity</h2>

              <ActivityFeed
                txs={transactions} // using your mock for now
                isLoading={false}
                isError={false}
              />
            </div>
          </>
        )
      ) : (
        <>
          <div className="text-sm sm:text-base">
            Please connect your wallet first, or use testing data by clicking
            the button below
          </div>
          <button
            className="px-4 py-1.5 text-sm bg-orange-600 text-white shadow hover:bg-orange-700 transition rounded w-full sm:w-auto"
            onClick={() => useMockData()}
          >
            <span className="hidden sm:inline">Fetch Data for address 0x742d35Cc6634C0532925a3b844Bc454e4438f44e</span>
            <span className="sm:hidden">Fetch Test Data</span>
          </button>
        </>
      )}
      {/* ACTIVITY FEED */}
    </div>
  );
}

export default App;
