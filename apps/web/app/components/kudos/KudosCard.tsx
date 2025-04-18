import { cn, getColorFromAddress } from "@repo/ui";

export interface KudosCardProps {
  fromAddress: string;
  toAddress: string;
  message: string;
  emoji?: "🎉" | "🙌" | "💯";
  color?: "blue" | "yellow" | "coral" | "mint" | "purple" | "cyan";
  className?: string;
  explorerUrl?: string;
  onClick?: () => void;
}

export const KUDOS_CARD_COLOR_CLASSES = {
  blue: "bg-[var(--color-kudos-blue)]",
  yellow: "bg-[var(--color-kudos-yellow)]",
  coral: "bg-[var(--color-kudos-coral)]",
  mint: "bg-[var(--color-kudos-mint)]",
  purple: "bg-[var(--color-kudos-purple)]",
  cyan: "bg-[var(--color-kudos-cyan)]",
} as const;

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function KudosCard({
  fromAddress,
  toAddress,
  message,
  emoji,
  color = "blue",
  className,
  onClick,
}: KudosCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 shadow-lg transition-transform hover:scale-[1.02] dark:text-gray-800",
        { "cursor-pointer": Boolean(onClick) },
        KUDOS_CARD_COLOR_CLASSES[color],
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {emoji && <div className="text-2xl mb-2">{emoji}</div>}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex -space-x-2">
          <div
            className="w-8 h-8 rounded-full border-2 border-white shadow-[inset_0_0_8px_rgba(0,0,0,0.1)] relative z-10"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${getColorFromAddress(fromAddress)}, ${getColorFromAddress(fromAddress)})`,
            }}
          />
          <div
            className="w-8 h-8 rounded-full border-2 border-white shadow-[inset_0_0_8px_rgba(0,0,0,0.1)]"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${getColorFromAddress(toAddress)}, ${getColorFromAddress(toAddress)})`,
            }}
          />
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
