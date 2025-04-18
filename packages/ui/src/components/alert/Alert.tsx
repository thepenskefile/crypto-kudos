import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export interface AlertProps {
  children: React.ReactNode | React.ReactNode[];
  palette: "primary" | "info" | "secondary" | "success" | "warning" | "danger";
  variant?: "none" | "tint";
  className?: string;
  title?: string;
}

export function Alert({
  children,
  palette,
  variant = "none",
  title,
  className = "",
}: AlertProps) {
  return (
    <div
      role="alert"
      className={twMerge(
        clsx("", [
          variant === "tint" && [
            "border-l-4 p-7",
            {
              "border-accent-primary bg-accent-secondary":
                palette === "primary",
              "border-blue-500 bg-blue-100": palette === "info",
              "border-accent-secondary bg-accent-secondary-hover":
                palette === "secondary",
              "border-green-500 bg-green-100": palette === "success",
              "border-yellow-500 bg-yellow-100": palette === "warning",
              "border-red-500 bg-red-100": palette === "danger",
            },
          ],
          variant === "none" && [
            "border border-l-4 bg-white py-7 pr-7",
            {
              "border-accent-primary": palette === "primary",
              "border-blue-500": palette === "info",
              "border-accent-secondary": palette === "secondary",
              "border-green-500": palette === "success",
              "border-yellow-500": palette === "warning",
              "border-red-500": palette === "danger",
            },
          ],
          className,
        ])
      )}
    >
      <div className="flex flex-row align-top">
        <div className="flex flex-col">
          {title && <div className="mb-2 font-semibold">{title}</div>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
