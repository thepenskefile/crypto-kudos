"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig } from "wagmi";
import { sepolia, Chain, base, mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";
import { http } from "wagmi";

const hardhatLocal = {
  id: 31337,
  name: "Hardhat Local",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
} as const satisfies Chain;

const config = createConfig({
  connectors: [injected()],
  chains: [
    sepolia,
    mainnet,
    base,
    ...(typeof window !== "undefined" &&
    window.location.hostname === "localhost"
      ? [hardhatLocal]
      : []),
  ],
  transports: {
    [sepolia.id]: http(),
    [hardhatLocal.id]: http(),
    [mainnet.id]: http(),
    [base.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          appInfo={{
            appName: "Crypto Kudos",
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
