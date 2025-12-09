import { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { CHAINS, CHAIN_IDS_HEX, type ChainKey } from "../utils/constants";
import { switchNetwork } from "../utils/switchNetwork";

export function WalletHeader({ chain }: { chain: ChainKey }) {
  const { accounts, connectToWallet, disconnectFromWallet, chainId } =
    useContext(WalletContext);

  const connected = accounts.length > 0;
  const address = connected ? accounts[0] : null;

  // Detect current wallet network -> convert chainId number → chainKey
  const walletChainKey = Object.entries(CHAINS).find(
    ([, value]) => value.id === Number(chainId)
  )?.[0] as ChainKey | undefined;

  return (
    <header className="flex justify-between items-center p-4 rounded-lg bg-white border shadow-sm">
      {/* Title */}
      <h1 className="text-lg font-semibold">Wallet Dashboard</h1>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Chain badge */}
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm border">
          <span
            className={`w-2 h-2 rounded-full ${
              chain === "ethereum"
                ? "bg-blue-500"
                : chain === "polygon"
                ? "bg-purple-500"
                : "bg-green-500"
            }`}
          />
          {CHAINS[chain].name}
        </div>

        {/* Switch Network Button (only if wallet is NOT already on the selected chain) */}
        {walletChainKey !== chain && connected && (
          <button
            onClick={() => switchNetwork(chain)}
            className="px-3 py-1.5 rounded-full bg-gray-100 border text-gray-700 text-sm hover:bg-gray-200 transition"
          >
            Switch to {CHAINS[chain].name}
          </button>
        )}

        {/* Connect / Disconnect Pill */}
        {!connected ? (
          <button
            onClick={connectToWallet}
            className="px-4 py-1.5 text-sm rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border text-gray-700 text-sm">
            {/* Status dot */}
            <span className="w-2 h-2 bg-green-500 rounded-full" />

            {/* Address */}
            <span>{short(address!)}</span>

            {/* Disconnect */}
            <button
              onClick={disconnectFromWallet}
              className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600 hover:bg-red-200"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function short(addr: string) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}
