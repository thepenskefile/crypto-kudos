import { ConnectButton } from "@rainbow-me/rainbowkit";
import { KudosCard, PageContent } from "@repo/ui";

const DEMO_KUDOS = [
  {
    message:
      "Thanks for being such a great friend and always having my back! 🤝",
    color: "blue" as const,
    emoji: "🎉" as const,
  },
  {
    message: "Your art brings so much joy to the community. Keep creating! ✨",
    color: "yellow" as const,
    emoji: "🙌" as const,
  },
  {
    message:
      "Thank you for helping me understand crypto. You're an amazing teacher!",
    color: "coral" as const,
    emoji: "💯" as const,
  },
] as const;

export function NoWalletSection() {
  return (
    <PageContent
      className="relative !pt-0"
      wrapperProps={{ className: "pb-20" }}
    >
      {/* Main welcome card */}
      <div className="relative z-0 max-w-2xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-10 sm:p-14 text-center border border-gray-100 dark:border-gray-700 shadow-2xl">
          <div className="flex flex-col items-center gap-10">
            <div className="h-24 w-24 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center ring-8 ring-blue-50/50 dark:ring-blue-900/20">
              <span className="text-5xl">✨</span>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold mb-5 text-blue-600 dark:text-blue-400 font-jakarta">
                Welcome to Crypto Kudos!
              </h2>
              <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark font-jakarta">
                The easiest way to show appreciation in Web3. Send kudos to
                anyone, for anything, and spread positivity throughout the
                community!
              </p>
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Demo Cards Layer */}
      <div className="absolute inset-0 z-10 max-w-7xl mx-auto pointer-events-none">
        {/* Top left card */}
        <div className="absolute -left-20 -top-10 w-72 transform -rotate-6 pointer-events-auto hover:rotate-0 transition-transform duration-300">
          <KudosCard
            fromAddress="0x1234...5678"
            toAddress="0xabcd...efgh"
            message={DEMO_KUDOS[0].message}
            color={DEMO_KUDOS[0].color}
            emoji={DEMO_KUDOS[0].emoji}
          />
        </div>
        {/* Top right card */}
        <div className="absolute -right-4 sm:-right-20 lg:-right-20 -top-12 w-72 transform rotate-15 pointer-events-auto hover:rotate-0 transition-transform duration-300">
          <KudosCard
            fromAddress="0x1234...5678"
            toAddress="0xabcd...efgh"
            message={DEMO_KUDOS[1].message}
            color={DEMO_KUDOS[1].color}
            emoji={DEMO_KUDOS[1].emoji}
          />
        </div>
        {/* Bottom card */}
        <div className="absolute left-10 -translate-x-1/2 -bottom-15 w-72 transform rotate-5 pointer-events-auto hover:rotate-0 transition-transform duration-300">
          <KudosCard
            fromAddress="0x1234...5678"
            toAddress="0xabcd...efgh"
            message={DEMO_KUDOS[2].message}
            color={DEMO_KUDOS[2].color}
            emoji={DEMO_KUDOS[2].emoji}
          />
        </div>
      </div>
    </PageContent>
  );
}
