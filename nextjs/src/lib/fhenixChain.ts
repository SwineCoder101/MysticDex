import { type Chain } from 'viem'

export const fhenix = {
  id: 42069,
  name: 'Fhenix Frontier',
  nativeCurrency: {
    decimals: 18,
    name: 'Fhenix',
    symbol: 'tFHE',
  },
  rpcUrls: {
    public: { http: ['https://api.testnet.fhenix.zone:7747'] },
    default: { http: ['https://api.testnet.fhenix.zone:7747'] },
  },
  blockExplorers: {
    etherscan: { name: 'Fhenix Explorer', url: 'https://explorer.testnet.fhenix.zone' },
    default: { name: 'Fhenix Explorer', url: 'https://explorer.testnet.fhenix.zone' },
  },
  contracts: {
    multicall3: {
      address: '0x2AA9Ea1513b5B3428674AF84BCe8927b73378193',
    },
  },
} as const satisfies Chain