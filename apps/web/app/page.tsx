"use client";

import { Button, Table } from "@repo/ui";
import { useTheme } from "next-themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useKudos } from "./hooks/useKudos";

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
          {kudosReceived && kudosReceived.kudos.length > 0 ? (
            <div>
              <Table
                paginationProps={{
                  currentPage: Number(kudosReceived.currentPage),
                  totalPages: Number(kudosReceived.totalPages),
                  totalItems: Number(kudosReceived.totalItems),
                  setCurrentPage: () => {},
                  isLoading: false,
                }}
              >
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>From</Table.HeadCell>
                    <Table.HeadCell>Message</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {kudosReceived.kudos.map((kudo, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{kudo.from}</Table.Cell>
                      <Table.Cell>{kudo.message}</Table.Cell>
                      <Table.Cell>
                        {new Date(
                          Number(kudo.timestamp) * 1000
                        ).toLocaleDateString()}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          ) : (
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              No kudos received yet
            </p>
          )}
        </div>

        <div className="bg-card rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Kudos Sent</h2>
          {kudosSent && kudosSent.kudos.length > 0 ? (
            <div>
              <Table
                paginationProps={{
                  currentPage: Number(kudosSent.currentPage),
                  totalPages: Number(kudosSent.totalPages),
                  totalItems: Number(kudosSent.totalItems),
                  setCurrentPage: () => {},
                  isLoading: false,
                }}
              >
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>To</Table.HeadCell>
                    <Table.HeadCell>Message</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {kudosSent.kudos.map((kudo, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{kudo.to}</Table.Cell>
                      <Table.Cell>{kudo.message}</Table.Cell>
                      <Table.Cell>
                        {new Date(
                          Number(kudo.timestamp) * 1000
                        ).toLocaleDateString()}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          ) : (
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              No kudos sent yet
            </p>
          )}
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
