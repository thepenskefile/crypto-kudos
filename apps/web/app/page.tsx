"use client";

import { Button } from "@repo/ui";
import { useTheme } from "next-themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <Button
        variant="primary"
        size="md"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Theme toggle
      </Button>
      <ConnectButton />
    </div>
  );
}
