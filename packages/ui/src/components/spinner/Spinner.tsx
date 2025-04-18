import { cn } from "../../utils/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  palette?: "primary" | "secondary" | "neutral";
}

export function Spinner({ size = "md", palette = "neutral" }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <svg
        className={cn("animate-spin", {
          "w-3 h-3": size === "sm",
          "w-4 h-4": size === "md",
          "w-6 h-6": size === "lg",
        })}
        viewBox="0 0 24 24"
      >
        <circle
          className={cn("opacity-25", {
            "fill-primary-100": palette === "primary",
            "fill-secondary-100": palette === "secondary",
            "fill-gray-100": palette === "neutral",
          })}
          cx="12"
          cy="12"
          r="10"
        />
        <path
          className={cn("opacity-75", {
            "fill-primary-500": palette === "primary",
            "fill-secondary-500": palette === "secondary",
            "fill-gray-900": palette === "neutral",
          })}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}
