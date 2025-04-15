interface EmptyKudosCardProps {
  color: "blue" | "yellow" | "coral";
}

const colorMap = {
  blue: {
    border: "border-[var(--color-kudos-blue)]",
    bg: "bg-blue-50/50 dark:bg-blue-900/10",
  },
  yellow: {
    border: "border-[var(--color-kudos-yellow)]",
    bg: "bg-amber-50/50 dark:bg-amber-900/10",
  },
  coral: {
    border: "border-[var(--color-kudos-coral)]",
    bg: "bg-red-50/50 dark:bg-red-900/10",
  },
} as const;

export function EmptyKudosCard({ color }: EmptyKudosCardProps) {
  return (
    <div
      className={`rounded-2xl h-36 ${colorMap[color].bg} backdrop-blur-sm border-2 ${colorMap[color].border}`}
    />
  );
}
