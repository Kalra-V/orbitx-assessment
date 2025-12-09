import { ethers } from "ethers";
import { type NormalizedTx } from "../types/normalizedTx";
import { type ChainKey } from "../utils/constants";

export function normalizeAlchemyTransfer(
  raw: any,
  userAddress: string,
  chain: ChainKey
): NormalizedTx {
  const isSent = raw.from?.toLowerCase() === userAddress.toLowerCase();

  // --- TIMESTAMP ---
  const timestamp = raw.metadata?.blockTimestamp
    ? Math.floor(new Date(raw.metadata.blockTimestamp).getTime() / 1000)
    : Date.now() / 1000;

  // --- TOKEN SYMBOL ---
  const tokenSymbol = raw.asset || getNativeSymbol(chain);

  // --- AMOUNT ---
  let amount = 0;

  // NATIVE TRANSFER (your provided example)
  if (raw.category === "external") {
    if (typeof raw.value === "number") {
      // Best-case: Alchemy gives us decimal ETH
      amount = raw.value;
    } else if (raw.rawContract?.value) {
      // Fallback: convert from wei
      amount = Number(
        ethers.formatUnits(
          raw.rawContract.value,
          raw.rawContract.decimal ? Number(raw.rawContract.decimal) : 18
        )
      );
    }
  }

  // ERC20 TRANSFER
  else if (raw.category === "erc20") {
    const decimals =
      raw.erc20Token?.decimals ??
      (raw.rawContract?.decimal ? Number(raw.rawContract.decimal) : 18);

    amount = Number(
      ethers.formatUnits(raw.rawContract?.value ?? "0", decimals)
    );
  }

  // --- STATUS ---
  const status = raw.blockNum ? "confirmed" : "pending";

  return {
    hash: raw.hash,
    timestamp,
    type: isSent ? "sent" : "received",
    amount,
    tokenSymbol,
    usdValue: null,
    from: raw.from,
    to: raw.to,
    status,
    chain,
  };
}

function getNativeSymbol(chain: ChainKey) {
  if (chain === "ethereum") return "ETH";
  if (chain === "polygon") return "MATIC";
  if (chain === "arbitrum") return "ARB";
  return "NATIVE";
}

export const MOCK_DATA: NormalizedTx[] = [
  {
    hash: "0x1871139f2e30adc1e43ca3cc4eb9d95117087f0d822d7cf060fe1bc703a729cb",
    timestamp: 1765237295,
    type: "received",
    amount: 0.00519999,
    tokenSymbol: "ETH",
    usdValue: null,
    from: "0x21a31ee1afc51d94c2efccaa2092ad1028285549",
    to: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    status: "confirmed",
    chain: "ethereum",
  },
  {
    hash: "0xbbf9073056e1cdf688adeae9153ab6bff5e8ec064d3c0268cbaa43797ba8a301",
    timestamp: 1765229915,
    type: "received",
    amount: 0.00466436,
    tokenSymbol: "ETH",
    usdValue: null,
    from: "0x39f6a6c85d39d5abad8a398310c52e7c374f2ba3",
    to: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    status: "confirmed",
    chain: "ethereum",
  },
  {
    hash: "0xade66ca2c7a3a12a597931e2616551bd77e7200ba0c02573d2022dc37d3ce79c",
    timestamp: 1764935183,
    type: "received",
    amount: 100,
    tokenSymbol: "EUR",
    usdValue: null,
    from: "0x15c5ed3032f8365f3dc9362316b772d506ab4f74",
    to: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    status: "confirmed",
    chain: "ethereum",
  },
  {
    hash: "0x9e8b5ded9600bfd3be40adcdb5fa73235487b19a5824a2dbb42661df8dce19a8",
    timestamp: 1764851675,
    type: "received",
    amount: 0.00468025,
    tokenSymbol: "ETH",
    usdValue: null,
    from: "0xeba88149813bec1cccccfdb0dacefaaa5de94cb1",
    to: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    status: "confirmed",
    chain: "ethereum",
  },
  {
    hash: "0x88f123e232566c5bdfe7fdf58d9d5369c27dcf880673dfe1ad2d0432332de90b",
    timestamp: 1764798503,
    type: "received",
    amount: 355000000000,
    tokenSymbol: "BrainETH",
    usdValue: null,
    from: "0xd4a4bde6c1a425395d7e1c2c13e132f56c510f4e",
    to: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    status: "confirmed",
    chain: "ethereum",
  },
  {
    hash: "0x97de63750fb04fae9618d1cdfd59b944f7bbf126548b4dfe72fcc7d360a2d67d",
    timestamp: 1764767735,
    type: "received",
    amount: 413338.76799,
    tokenSymbol: "USDf",
    usdValue: null,
    from: "0x77134cbc06cb00b66f4c7e623d5fdbf6777635ec",
    to: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    status: "confirmed",
    chain: "ethereum",
  },
  {
    hash: "0x6f6e2c99cd4c9749362c9c85a229af6b04ef5ca343453614d374932e7c327803",
    timestamp: 1764669119,
    type: "received",
    amount: 1.01,
    tokenSymbol: "ETH",
    usdValue: null,
    from: "0xd7e3cfed2c27ef71970e8d62627ff2dcf952503e",
    to: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    status: "confirmed",
    chain: "ethereum",
  },
  {
    hash: "0xf793cd3a6f460656173cc7929fdecfcdb5e1cbfccd17f385f8b42453c9410536",
    timestamp: 1764665351,
    type: "received",
    amount: 0.025,
    tokenSymbol: "GRG",
    usdValue: null,
    from: "0x8290d0a3b6d55e9aaf05a59fb3a18a71c309dd61",
    to: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    status: "confirmed",
    chain: "ethereum",
  },
  {
    hash: "0x71b20dcdca23907e53b67c7c0a8f7f1c8d81a69c7b0d55cf074dbfded9b20090",
    timestamp: 1764595835,
    type: "received",
    amount: 16906.95947,
    tokenSymbol: "WBT",
    usdValue: null,
    from: "0x77134cbc06cb00b66f4c7e623d5fdbf6777635ec",
    to: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    status: "confirmed",
    chain: "ethereum",
  },
  {
    hash: "0x73b415f8a8fea52e4b8b4ef1607b1521ab6aac055d3c25dcc38fed5fc180499f",
    timestamp: 1764537995,
    type: "received",
    amount: 0.0001,
    tokenSymbol: "TUSD",
    usdValue: null,
    from: "0x59d7bc5f5334df4cb8e2def380fd337ba897174f",
    to: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    status: "confirmed",
    chain: "ethereum",
  },
];
