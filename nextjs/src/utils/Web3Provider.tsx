"use client"
import { WagmiProvider, createConfig, http } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [base],
    transports: {
      // RPC URL for each chain
      [base.id]: http(
        `${process.env.BASE_RPC}`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: "ab65de930402d79150d04aa87e96c3ae",

    // Required App Info
    appName: "mysticDEX",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

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