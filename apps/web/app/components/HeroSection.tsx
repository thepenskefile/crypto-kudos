import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function HeroSection() {
  const { isConnected } = useAccount();
  return (
    <div className="pb-12">
      <div className="flex-1 flex flex-col items-center text-center">
        <div className="self-end mb-8">
          <ThemeSwitcher />
        </div>
        <h1 className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 tracking-tight sm:text-8xl font-jakarta">
          Crypto Kudos
        </h1>
        <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-12 max-w-2xl leading-relaxed font-jakarta">
          Spread positivity and appreciation in the crypto space, one kudos at a
          time
        </p>
        {isConnected && (
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
}
