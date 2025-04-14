import React from "react";
import { cn } from "../../utils/cn";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface PageContentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode | React.ReactNode[];
  breakpoint?: Breakpoint;
  isFullWidth?: boolean;
  className?: string;
  wrapperProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

export function PageContent({
  children,
  className,
  breakpoint = "md",
  isFullWidth = false,
  wrapperProps,
}: PageContentProps) {
  return (
    <div {...wrapperProps}>
      <div
        className={cn(
          "mx-auto p-8 md:px-8",
          !isFullWidth && [
            {
              "max-w-screen-sm": breakpoint === "sm",
              "max-w-screen-md": breakpoint === "md",
              "max-w-screen-lg": breakpoint === "lg",
              "max-w-screen-xl": breakpoint === "xl",
              "max-w-screen-2xl": breakpoint === "2xl",
            },
          ],
          isFullWidth && "w-full",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
