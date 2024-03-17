"use client"
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia, mainnet } from "wagmi/chains";
import { fhenix } from "../lib/fhenixChain";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { config } from "./config";

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider customTheme={{
    "--ck-connectbutton-font-size": "21px",
    "--ck-connectbutton-border-radius": "2px",
    "--ck-connectbutton-background" : "#77f6b5",
    "--ck-connectbutton-color": "#0c1c28",
    "--ck-connectbutton-hover-background": "#77f6b5",
    "--ck-connectbutton-hover-color": "#0c1c28",
    "--ck-connectbutton-active-background": "#77f6b5",
    "--ck-connectbutton-active-color": "#0c1c28",
  }}>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};