export const CHAINS = {
  ethereum: {
    id: 1,
    name: "Ethereum",
    rpc: `https://eth-mainnet.g.alchemy.com/v2/${
      import.meta.env.VITE_ALCHEMY_ETH
    }`,
  },
  polygon: {
    id: 137,
    name: "Polygon",
    rpc: `https://polygon-mainnet.g.alchemy.com/v2/${
      import.meta.env.VITE_ALCHEMY_POLYGON
    }`,
  },
  arbitrum: {
    id: 42161,
    name: "Arbitrum",
    rpc: `https://arb-mainnet.g.alchemy.com/v2/${
      import.meta.env.VITE_ALCHEMY_ARB
    }`,
  },
} as const;

export type ChainKey = keyof typeof CHAINS;
