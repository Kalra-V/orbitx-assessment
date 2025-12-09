# OrbitX Assessment - Cross Chain Wallet Dashboard

A multi-chain wallet transaction viewer that displays real-time transaction history with USD valuations across Ethereum, Polygon, and Arbitrum networks.

## My approach for this assessment

First, I integrated the wallet to the initial react app. I like to first bring the actual data to the app before building its UI, so I wrote the Alchemy API for fetching the recent transactions. The assessment also required the values in USD, so I made an API call to CoinGecko since it is totally free to use. Now with all required data with us, I formatted all the data into one clean data structure so the UI rendering can be easier. To be quick with the project, I took the approach of AI-assisted development for styling and designing, since these are the things which take the most time for me.


<img width="1259" height="1014" alt="Screenshot 2025-12-09 at 9 21 12 PM" src="https://github.com/user-attachments/assets/83ecbf0e-c244-474b-8cb4-5f48bdbead2a" />

<img width="1919" height="1015" alt="Screenshot 2025-12-09 at 9 20 50 PM" src="https://github.com/user-attachments/assets/601e2daf-fc16-4ab7-ba2b-a306980a5357" />

## Configuration

### 1. Environment Variables
Create `.env` file in project root:

```env
VITE_ALCHEMY_ETH=your_ethereum_api_key
VITE_ALCHEMY_POLYGON=your_polygon_api_key
VITE_ALCHEMY_ARB=your_arbitrum_api_key
```

**Get Alchemy API keys:** https://www.alchemy.com/ (free tier supports this app)

## Installation & Running

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Architecture & Component Structure

### Core Architecture
```
App (Root)
├── WalletContext (Global State)
├── WalletHeader (Connection & Network UI)
└── ActivityFeed
    └── TxItem (Individual Transactions)
```

### Key Components

**`WalletContext`** - Manages wallet connection state using Web3.js
- Handles MetaMask/wallet provider integration
- Tracks connected accounts and chain ID
- Provides mock data option for testing without wallet

**`WalletHeader`** - Top navigation and wallet controls
- Connect/disconnect wallet
- Network switching with automatic MetaMask prompts
- Visual chain indicators

**`ActivityFeed`** - Transaction list display
- Loading states with skeleton UI
- Error handling
- Empty state messaging

### Data Flow

1. **Wallet Connection** → Web3.js detects `window.ethereum` → retrieves accounts
2. **Transaction Fetching** → Alchemy API (`alchemy_getAssetTransfers`) → last 10 transfers
3. **Price Enrichment** → CoinGecko API → USD values for tokens
4. **Normalization** → Raw Alchemy data → standardized `NormalizedTx` format
5. **Caching** → TanStack Query → 5-minute stale time, background refetch

## Tech Choices

### Core Stack
- **React 19** - Latest features, robust ecosystem
- **TypeScript** - Type safety for blockchain data structures
- **Vite** - Fast dev server, optimized builds

### State & Data Management
- **TanStack Query** - Declarative data fetching with built-in caching, refetch strategies, and loading states. Eliminates manual state management for async operations.
- **React Context** - Lightweight global state for wallet connection (avoids overkill of Redux for simple wallet state)

### Blockchain Integration
- **Web3.js** - Wallet connection and chain detection (preferred for its simpler API for basic wallet operations)
- **Ethers.js** - Included for potential contract interactions (currently unused but ready for future features)
- **Alchemy** - Multi-chain RPC provider with enhanced APIs (`getAssetTransfers` simplifies tx history vs raw eth_getLogs)

### UI/UX
- **Tailwind CSS** - Rapid styling without CSS files, excellent for rapid prototyping
- **date-fns** - Lightweight date formatting (smaller bundle than moment.js)

### 2. Supported Chains
Defined in `src/utils/constants.ts`:
- Ethereum Mainnet (Chain ID: 1)
- Polygon Mainnet (Chain ID: 137)
- Arbitrum One (Chain ID: 42161)

### 3. Wallet Provider
Requires MetaMask or compatible Web3 wallet provider injecting `window.ethereum`.

## Assumptions & Tradeoffs

### Assumptions
1. **Incoming transfers only** - Only shows tokens received (not sent). Uses `toAddress` filter in Alchemy API.
2. **Last 10 transactions** - Hardcoded to `maxCount: 0xA` for performance. No pagination implemented.
3. **MetaMask available** - Assumes browser wallet extension present (no WalletConnect/Coinbase Wallet support).
4. **CoinGecko free tier** - Price fetching limited to mapped tokens, subject to rate limits.

### Tradeoffs
- **Web3.js + Ethers.js** - Both included (adds ~100KB), but Web3.js has simpler wallet APIs while Ethers is better for contracts.
- **Client-side API calls** - Alchemy/CoinGecko called directly from browser. Production should use backend proxy to hide API keys and handle rate limiting.
- **No transaction pagination** - Simpler UX but limits history visibility.
- **Optimistic chain switching** - Assumes user approves MetaMask network switch prompts.

## Known Limitations

1. **No error recovery** - Failed API calls show error state but don't retry automatically (TanStack Query disabled retry for simplicity).
2. **ERC20/ETH only** - Ignores NFTs, internal transactions, contract interactions.
3. **USD prices incomplete** - Tokens without CoinGecko mapping show `null` for USD value.
4. **No transaction details** - Clicking a transaction doesn't show full details/block explorer link.
5. **Rate limiting** - No backoff strategy for CoinGecko API limits.
6. **Network requests visible** - API keys in client code (security risk for production).

## Future Improvements

### High Priority
- [ ] Pagination/infinite scroll for transaction history
- [ ] Support for sent transactions (`fromAddress` filter)
- [ ] Transaction detail modal with Etherscan link

### Enhancements
- [ ] Dark mode
- [ ] Multi-account management

### Technical Debt
- [ ] Better error boundaries and retry logic
- [ ] Unit tests for transaction normalization
