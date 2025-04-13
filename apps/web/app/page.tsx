"use client";

import { Button } from "@repo/ui";
import { useTheme } from "next-themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useKudos } from "./hooks/useKudos";
export default function Home() {
  const { theme, setTheme } = useTheme();
  const { kudosReceived, kudosSent, sendKudo } = useKudos();
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
      <div>
        <h2>Kudos Received</h2>
        <pre>{JSON.stringify(kudosReceived, null, 2)}</pre>
      </div>
      <div>
        <h2>Kudos Sent</h2>
        <pre>{JSON.stringify(kudosSent, null, 2)}</pre>
      </div>
      <Button
        variant="primary"
        size="md"
        onClick={() =>
          sendKudo("0x0000000000000000000000000000000000000000", "Hello World")
        }
      >
        Send Kudo
      </Button>
    </div>
  );
}
