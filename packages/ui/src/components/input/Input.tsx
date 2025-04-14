"use client";

import { InputHTMLAttributes, useId } from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ className, label, ...props }: InputProps) {
  const uniqueId = useId();
  const inputId = `form-input-${uniqueId}`;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm text-text-secondary-light dark:text-text-secondary-dark"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-2 rounded-lg",
          "bg-orange-50/50 dark:bg-orange-950/10",
          "border border-orange-200 dark:border-orange-900/30",
          "text-text-primary-light dark:text-text-primary-dark placeholder:text-orange-400/50 dark:placeholder:text-orange-500/30",
          "focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/30 focus:border-transparent",
          "transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:border-orange-300 dark:hover:border-orange-800/30",
          className
        )}
        {...props}
      />
    </div>
  );
}
