import { Roboto_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3Provider } from "../utils/Web3Provider";

const queryClient = new QueryClient();

export const metadata = {
  title: "mysticDEX",
  description: "Private cross-chain swaps.",
};

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

export default function RootLayout({ children }) {
  return (
    <Web3Provider>
        <html lang="en">
          <body
            className={`${openSans.variable} ${robotoMono.variable} font-sans`}
          >
            {children}
          </body>
        </html>
        </Web3Provider>
  );
}
