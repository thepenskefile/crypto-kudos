"use client";

import { InputHTMLAttributes, useId } from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  validationText?: string;
}

export function Input({
  className,
  label,
  hint,
  validationText,
  ...props
}: InputProps) {
  const uniqueId = useId();
  const inputId = `form-input-${uniqueId}`;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div>
        <input
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl",
            "bg-blue-50/50 dark:bg-gray-900/50",
            "border-2 border-blue-500 dark:border-blue-400",
            "text-gray-900 dark:text-gray-100",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            { "border-red-500 focus:ring-red-200": Boolean(validationText) },
            className
          )}
          {...props}
        />
        {validationText && (
          <p
            id={`${inputId}-error`}
            className={cn("pl-0.5 mt-1.5 text-xs text-red-500")}
          >
            {validationText}
          </p>
        )}
        {hint && (
          <p
            id={`${inputId}-hint`}
            className="text-sm text-gray-400 dark:text-gray-400 pl-0.5"
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
