import { cn } from "../../utils/cn";

export interface KudosCardProps {
  fromAddress: string;
  toAddress: string;
  message: string;
  emoji?: "🎉" | "🙌" | "💯" | "none";
  color?: "blue" | "yellow" | "coral" | "mint" | "purple" | "cyan";
  className?: string;
}

const colorClasses = {
  blue: "bg-[var(--color-kudos-blue)]",
  yellow: "bg-[var(--color-kudos-yellow)]",
  coral: "bg-[var(--color-kudos-coral)]",
  mint: "bg-[var(--color-kudos-mint)]",
  purple: "bg-[var(--color-kudos-purple)]",
  cyan: "bg-[var(--color-kudos-cyan)]",
};

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function KudosCard({
  fromAddress,
  toAddress,
  message,
  emoji = "none",
  color = "blue",
  className,
}: KudosCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 shadow-lg transition-transform hover:scale-[1.02] dark:text-text-primary-light",
        colorClasses[color],
        className
      )}
    >
      {emoji !== "none" && <div className="text-2xl mb-2">{emoji}</div>}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white" />
        </div>
        <div className="text-sm font-mono opacity-90 truncate">
          {truncateAddress(fromAddress)}
          <div className="text-xs opacity-70">
            → {truncateAddress(toAddress)}
          </div>
        </div>
      </div>
      <div className="font-medium text-lg">{message}</div>
    </div>
  );
}
