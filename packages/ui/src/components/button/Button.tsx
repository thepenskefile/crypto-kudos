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
        "inline-flex items-center justify-center rounded-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer font-semibold hover:scale-[1.02] shadow-md",
        {
          // Variants
          "bg-accent-primary text-white hover:brightness-105 active:brightness-95 focus-visible:ring-accent-primary dark:bg-accent-primary dark:hover:brightness-105 dark:active:brightness-95 dark:focus-visible:ring-accent-primary":
            variant === "primary",
          "bg-surface-light text-text-primary-light hover:brightness-95 active:brightness-90 focus-visible:ring-accent-secondary dark:bg-surface-dark dark:text-text-primary-dark dark:hover:brightness-125 dark:active:brightness-110 dark:focus-visible:ring-accent-primary":
            variant === "secondary",
          "border border-accent-primary text-text-primary-light hover:bg-accent-secondary/10 active:bg-accent-secondary/20 focus-visible:ring-accent-primary dark:border-accent-primary dark:text-text-primary-dark dark:hover:bg-surface-light/10 dark:active:bg-surface-light/20 dark:focus-visible:ring-accent-primary":
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
      {children}
    </button>
  );
};
