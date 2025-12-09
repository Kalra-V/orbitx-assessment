import { useContext } from "react";
import "./App.css";
import { WalletContext } from "./context/WalletContext";

function App() {
  const { accounts, connectToWallet, disconnectFromWallet } =
    useContext(WalletContext);

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
