import { useContext, useState } from "react";
import "./App.css";
import { WalletContext } from "./contexts/WalletContext";
import { CHAINS, type ChainKey } from "./utils/constants";
import { useTransactions } from "./hooks/useTrasactions";

function App() {
  const { accounts, connectToWallet, disconnectFromWallet } =
    useContext(WalletContext);

  const [chain, setChain] = useState<ChainKey>("ethereum");

  const { data: transactions, isLoading } = useTransactions(accounts[0], chain);

  console.log("TRANSACTIONS: ", transactions);

  console.log("ACCOUNTS: ", accounts);

  return (
    <>
      {!accounts.length ? (
        <button className="connect-wallet-button" onClick={connectToWallet}>
          Connect to Wallet
        </button>
      ) : (
        <button onClick={disconnectFromWallet}>Disconnect from Wallet</button>
      )}
      {accounts.length > 0 && (
        <div>
          <h2>Connected Accounts</h2>
          <ul>
            {accounts.map((account) => (
              <li key={account}>{account}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
