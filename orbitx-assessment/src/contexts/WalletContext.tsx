import { createContext, useState } from "react";
import Web3 from "web3";

export const WalletContext = createContext({
  accounts: [] as string[],
  disconnectFromWallet: async () => {},
  connectToWallet: async () => {},
  chainId: null as bigint | null,
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

  return (
    <WalletContext.Provider
      value={{ accounts, connectToWallet, disconnectFromWallet, chainId }}
    >
      {children}
    </WalletContext.Provider>
  );
};
