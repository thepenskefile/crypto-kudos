"use client";

import { Button } from "@repo/ui";
import { useTheme } from "next-themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useKudos } from "./hooks/useKudos";

// Custom serializer to handle BigInt values
const serializer = (key: string, value: any) => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { kudosReceived, kudosSent, sendKudo } = useKudos();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Crypto Kudos</h1>
        <div className="flex gap-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Theme toggle
          </Button>
          <ConnectButton />
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-card rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Kudos Received</h2>
          <pre className="bg-muted p-4 rounded overflow-auto">
            {kudosReceived
              ? JSON.stringify(kudosReceived, serializer, 2)
              : "No kudos received yet"}
          </pre>
        </div>

        <div className="bg-card rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Kudos Sent</h2>
          <pre className="bg-muted p-4 rounded overflow-auto">
            {kudosSent
              ? JSON.stringify(kudosSent, serializer, 2)
              : "No kudos sent yet"}
          </pre>
        </div>

        <div className="bg-card rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Send a Kudo</h2>
          <Button
            variant="primary"
            size="md"
            onClick={() =>
              sendKudo(
                "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
                "Hello World"
              )
            }
          >
            Send Test Kudo
          </Button>
        </div>
      </div>
    </div>
  );
}
