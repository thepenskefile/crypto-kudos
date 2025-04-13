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
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer font-semibold",
        {
          // Variants
          "bg-accent-primary text-white hover:bg-accent-primary-hover focus-visible:ring-accent-primary dark:bg-accent-primary dark:hover:bg-accent-primary-hover dark:focus-visible:ring-accent-primary":
            variant === "primary",
          "bg-surface-light text-text-primary-light hover:bg-accent-secondary focus-visible:ring-accent-secondary dark:bg-surface-dark dark:text-text-primary-dark dark:hover:bg-surface-light/10 dark:focus-visible:ring-accent-primary":
            variant === "secondary",
          "border border-accent-primary text-text-primary-light hover:bg-accent-secondary focus-visible:ring-accent-primary dark:border-accent-primary dark:text-text-primary-dark dark:hover:bg-surface-light/10 dark:focus-visible:ring-accent-primary":
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
