import { createContext, useState } from "react";
import Web3 from "web3";

export const WalletContext = createContext({
  accounts: [] as string[],
  setAccounts: (accounts: string[]) => {},
  disconnectFromWallet: async () => {},
  connectToWallet: async () => {},
  chainId: null as bigint | null,
  useMockData: () => {},
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [chainId, setChainId] = useState<bigint | null>(null);

  const connectToWallet = async () => {
    console.log("CLCIKED");
    if ((window as any).ethereum) {
      console.log("Wallet found");
      const web3 = new Web3((window as any).ethereum);
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const chainId = await web3.eth.getChainId();
      console.log("CHAIN ID: ", chainId);
      setChainId(chainId);
    }
  };

  const disconnectFromWallet = async () => {
    console.log("DISCONNECTED");
    if ((window as any).ethereum) {
      setAccounts([]);
      setChainId(null);
    }
  };

  const useMockData = () => {
    console.log("CLICKED");
    setAccounts(["0x742d35Cc6634C0532925a3b844Bc454e4438f44e"]);
  };

  return (
    <WalletContext.Provider
      value={{
        accounts,
        setAccounts: () => setAccounts([]),
        connectToWallet,
        disconnectFromWallet,
        chainId,
        useMockData,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
