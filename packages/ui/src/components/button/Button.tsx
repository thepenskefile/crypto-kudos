"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  className,
  disabled = false,
  type = "button",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        {
          // Variants
          "bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus-visible:ring-orange-600":
            variant === "primary",
          "bg-white text-orange-600 hover:bg-orange-50 focus-visible:ring-orange-200 dark:bg-orange-900 dark:text-orange-100 dark:hover:bg-orange-800 dark:focus-visible:ring-orange-800":
            variant === "secondary",
          "border border-orange-500 text-orange-600 hover:bg-orange-50 focus-visible:ring-orange-500 dark:border-orange-400 dark:text-orange-300 dark:hover:bg-orange-900/50 dark:focus-visible:ring-orange-400":
            variant === "outline",

          // Sizes
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4 text-base": size === "md",
          "h-12 px-6 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
