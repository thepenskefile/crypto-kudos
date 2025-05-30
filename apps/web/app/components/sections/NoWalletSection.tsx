import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Card, cn, PageContent } from "@repo/ui";
import { KudosCard } from "../kudos/KudosCard";

const DEMO_KUDOS = [
  {
    fromAddress: "0xf39F...2266",
    toAddress: "0x7099...79C8",
    message: "You went out of your way to help — really appreciate it. ✨",
    color: "blue" as const,
    emoji: "🎉" as const,
  },
  {
    fromAddress: "0x3C44...93BC",
    toAddress: "0x9965...A4dc",
    message: "Your attention to detail never goes unnoticed. 🤝",
    color: "yellow" as const,
    emoji: "🙌" as const,
  },
  {
    fromAddress: "0x90F7...b906",
    toAddress: "0x15d3...6A65",
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
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 md:p-14 text-center shadow-2xl flex flex-col items-center gap-6 sm:gap-10">
        <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center ring-8 ring-blue-50/50 dark:ring-blue-900/20">
          <span className="text-4xl sm:text-5xl">✨</span>
        </div>
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-600 dark:text-blue-400 font-jakarta">
            Welcome to Crypto Kudos!
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary-light dark:text-text-secondary-dark font-jakarta">
            The easiest way to show appreciation in Web3. Send kudos to anyone,
            for anything, and spread positivity throughout the community!
          </p>
        </div>
        <ConnectButton />
      </Card>

      {/* Demo cards wrapper - hide on small screens */}
      <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
        {/* Top left card */}
        <DemoCardWrapper className="-left-5 -top-10 -rotate-6">
          <KudosCard
            fromAddress={DEMO_KUDOS[0].fromAddress}
            toAddress={DEMO_KUDOS[0].toAddress}
            message={DEMO_KUDOS[0].message}
            color={DEMO_KUDOS[0].color}
            emoji={DEMO_KUDOS[0].emoji}
          />
        </DemoCardWrapper>
        {/* Top right card */}
        <DemoCardWrapper className="-right-5 -top-12 rotate-15">
          <KudosCard
            fromAddress={DEMO_KUDOS[1].fromAddress}
            toAddress={DEMO_KUDOS[1].toAddress}
            message={DEMO_KUDOS[1].message}
            color={DEMO_KUDOS[1].color}
            emoji={DEMO_KUDOS[1].emoji}
          />
        </DemoCardWrapper>
        {/* Bottom card */}
        <DemoCardWrapper className="-left-5 -bottom-15 rotate-5">
          <KudosCard
            fromAddress={DEMO_KUDOS[2].fromAddress}
            toAddress={DEMO_KUDOS[2].toAddress}
            message={DEMO_KUDOS[2].message}
            color={DEMO_KUDOS[2].color}
            emoji={DEMO_KUDOS[2].emoji}
          />
        </DemoCardWrapper>
      </div>

      {/* Mobile demo cards - show only on small screens */}
      <div className="md:hidden mt-20 mb-10">
        <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300 mb-8 font-jakarta">
          Join the movement.{" "}
          <span className="text-blue-600 dark:text-blue-400">
            Spread the appreciation.
          </span>
        </p>
        <div className="flex flex-col items-center gap-6">
          {DEMO_KUDOS.map((kudos, index) => (
            <div
              key={index}
              className={cn(
                "w-full max-w-[280px] transform transition-all duration-300 hover:scale-105 hover:rotate-0",
                index === 0 && "-rotate-3",
                index === 1 && "rotate-2",
                index === 2 && "-rotate-2"
              )}
            >
              <KudosCard
                fromAddress={kudos.fromAddress}
                toAddress={kudos.toAddress}
                message={kudos.message}
                color={kudos.color}
                emoji={kudos.emoji}
              />
            </div>
          ))}
        </div>
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
