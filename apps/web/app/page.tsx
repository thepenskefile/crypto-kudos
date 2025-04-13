"use client";

import { Button, Table, Pagination } from "@repo/ui";
import { useTheme } from "next-themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useKudos } from "./hooks/useKudos";
import type { Kudos } from "@repo/shared/contracts/types/Kudos";

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

  const receivedKudos = kudosReceived as
    | Kudos.PaginatedKudosStructOutput
    | undefined;
  const sentKudos = kudosSent as Kudos.PaginatedKudosStructOutput | undefined;

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
          {receivedKudos && receivedKudos.kudos.length > 0 ? (
            <div>
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>From</Table.HeadCell>
                    <Table.HeadCell>Message</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {receivedKudos.kudos.map((kudo, index) => (
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
              <Pagination
                paginationData={receivedKudos}
                currentPage={1}
                currentLimit={10}
                setCurrentPage={() => {}}
                setCurrentLimit={() => {}}
                isLoading={false}
              />
            </div>
          ) : (
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              No kudos received yet
            </p>
          )}
        </div>

        <div className="bg-card rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Kudos Sent</h2>
          {sentKudos && sentKudos.kudos.length > 0 ? (
            <div>
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>To</Table.HeadCell>
                    <Table.HeadCell>Message</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {sentKudos.kudos.map((kudo, index) => (
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
              <Pagination
                paginationData={sentKudos}
                currentPage={1}
                currentLimit={10}
                setCurrentPage={() => {}}
                setCurrentLimit={() => {}}
                isLoading={false}
              />
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
