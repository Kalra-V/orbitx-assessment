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
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <WalletHeader chain={chain} />

      {/* CHAIN SELECTOR */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-3">
          {(["ethereum", "polygon", "arbitrum"] as ChainKey[]).map((c) => (
            <button
              key={c}
              onClick={() => setChain(c)}
              className={
                "px-3 py-1 rounded border " +
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
          className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50 transition"
        >
          Refresh
        </button>
      </div>

      {/* CONNECTED ACCOUNTS */}
      {accounts.length > 0 && (
        <div className="bg-gray-50 p-4 rounded border">
          <h2 className="font-medium mb-2">Connected Accounts</h2>
          <ul className="space-y-1">
            {accounts.map((account) => (
              <li key={account} className="text-sm text-gray-600">
                {account}
              </li>
            ))}
          </ul>
        </div>
      )}

      {accounts.length > 0 ? (
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              <h2 className="font-medium mb-3">Activity</h2>

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
          <div>
            Please connect your wallet first, or use testing data by clicking
            the button below
          </div>
          <button
            className="px-4 py-1.5 text-sm bg-orange-600 text-white shadow hover:bg-orange-700 transition"
            onClick={() => useMockData()}
          >
            Fetch Data for address 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
          </button>
        </>
      )}
      {/* ACTIVITY FEED */}
    </div>
  );
}

export default App;
