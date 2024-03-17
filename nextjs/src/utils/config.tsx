import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { fhenix } from "../lib/fhenixChain";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [baseSepolia, fhenix],
    transports: {
      [baseSepolia.id]: http(`${process.env.BASE_RPC}`),
      [fhenix.id]: http(`https://api.testnet.fhenix.zone:7747`),
    },
    walletConnectProjectId: "ab65de930402d79150d04aa87e96c3ae",
    appName: "mysticDEX",
    appDescription: "Your App Description",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  }),
);
