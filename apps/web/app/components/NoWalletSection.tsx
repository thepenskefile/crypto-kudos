import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Card, cn, KudosCard, PageContent } from "@repo/ui";

const DEMO_KUDOS = [
  {
    message: "You went out of your way to help — really appreciate it. ✨",
    color: "blue" as const,
    emoji: "🎉" as const,
  },
  {
    message: "Your attention to detail never goes unnoticed. 🤝",
    color: "yellow" as const,
    emoji: "🙌" as const,
  },
  {
    message: "Just wanted to say, you're doing an awesome job.",
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
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-10 sm:p-14 text-center shadow-2xl flex flex-col items-center gap-10">
        <div className="h-24 w-24 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center ring-8 ring-blue-50/50 dark:ring-blue-900/20">
          <span className="text-5xl">✨</span>
        </div>
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-4xl font-semibold text-blue-600 dark:text-blue-400 font-jakarta">
            Welcome to Crypto Kudos!
          </h2>
          <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark font-jakarta">
            The easiest way to show appreciation in Web3. Send kudos to anyone,
            for anything, and spread positivity throughout the community!
          </p>
        </div>
        <ConnectButton />
      </Card>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top left card */}
        <DemoCardWrapper className="-left-20 -top-10 -rotate-6">
          <KudosCard
            fromAddress="0x6243...8326"
            toAddress="0xabcd...efgh"
            message={DEMO_KUDOS[0].message}
            color={DEMO_KUDOS[0].color}
            emoji={DEMO_KUDOS[0].emoji}
          />
        </DemoCardWrapper>
        {/* Top right card */}
        <DemoCardWrapper className="-right-20 -top-12 rotate-15">
          <KudosCard
            fromAddress="0x9943...3438"
            toAddress="0xabcd...efgh"
            message={DEMO_KUDOS[1].message}
            color={DEMO_KUDOS[1].color}
            emoji={DEMO_KUDOS[1].emoji}
          />
        </DemoCardWrapper>
        {/* Bottom card */}
        <DemoCardWrapper className="-left-20 -bottom-15 rotate-5">
          <KudosCard
            fromAddress="0x2509...4681"
            toAddress="0xabcd...efgh"
            message={DEMO_KUDOS[2].message}
            color={DEMO_KUDOS[2].color}
            emoji={DEMO_KUDOS[2].emoji}
          />
        </DemoCardWrapper>
      </div>
    </PageContent>
  );
}

function DemoCardWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={cn(
        "absolute w-72 transform pointer-events-auto hover:rotate-0 transition-transform duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
