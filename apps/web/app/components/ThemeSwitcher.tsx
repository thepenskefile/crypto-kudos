"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative cursor-pointer inline-flex h-8 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
    >
      <div
        className={`absolute left-1 h-6 w-6 rounded-full bg-white dark:bg-gray-900 shadow-sm transform transition-transform duration-200 ease-out flex items-center justify-center ${
          theme === "dark" ? "translate-x-8" : ""
        }`}
      >
        <span className="text-sm">{theme === "dark" ? "🌙" : "☀️"}</span>
      </div>

      <span className="sr-only">
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </span>
    </button>
  );
}
