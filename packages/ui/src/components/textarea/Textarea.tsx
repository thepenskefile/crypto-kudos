"use client";

import { TextareaHTMLAttributes, useId } from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export function Textarea({ className, label, hint, ...props }: TextareaProps) {
  const uniqueId = useId();
  const textareaId = `form-textarea-${uniqueId}`;
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div>
        <textarea
          id={textareaId}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl",
            "bg-blue-50/50 dark:bg-gray-900/50",
            "border-2 border-blue-500 dark:border-blue-400",
            "text-gray-900 dark:text-gray-100",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30",
            "transition-[border-color,box-shadow] duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />

        {hint && (
          <p
            id={`${textareaId}-hint`}
            className="text-sm text-gray-400 dark:text-gray-400 pl-0.5"
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
