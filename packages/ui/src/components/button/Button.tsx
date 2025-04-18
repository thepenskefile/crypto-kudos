"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = ({
  children,
  className,
  disabled = false,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer font-semibold hover:scale-[1.02] shadow-md",
        {
          // Variants
          "bg-blue-500 text-white hover:brightness-105 active:brightness-95 focus-visible:ring-blue-500 dark:bg-blue-400":
            variant === "primary",
          "bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600":
            variant === "secondary",
          "border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500 dark:hover:bg-blue-500/10 dark:active:bg-blue-500/20":
            variant === "outline",

          // Sizes
          "h-10 px-4 text-sm": size === "sm",
          "h-12 px-5 text-base": size === "md",
          "h-14 px-6 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      <div className="relative">
        <div className={cn("transition-opacity", { "opacity-0": isLoading })}>
          {children}
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
      </div>
    </button>
  );
};
