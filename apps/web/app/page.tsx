"use client";

import { Button, Table, PageContent, Input, Textarea } from "@repo/ui";
import { useTheme } from "next-themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useKudos } from "./hooks/useKudos";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

interface FormElements extends HTMLFormControlsCollection {
  toAddress: HTMLInputElement;
  message: HTMLTextAreaElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { kudosReceived, kudosSent, sendKudo } = useKudos();
  const { isConnected } = useAccount();

  function handleSendKudo(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    sendKudo(
      form.elements.toAddress.value as `0x${string}`,
      form.elements.message.value
    );
  }

  return (
    <PageContent>
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-purple-600 dark:text-purple-400">
          Crypto Kudos
        </h1>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-6">
          Spread positivity, one kudo at a time ✨
        </p>
        <div className="flex gap-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:scale-105 transition-transform"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Button>
          {isConnected ? <ConnectButton /> : null}
        </div>
      </div>

      {isConnected ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <span>🎁</span> Kudos Received
            </h2>
            {kudosReceived && kudosReceived.kudos.length > 0 ? (
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
                      <Table.Cell>
                        <span title={kudo.from} className="cursor-help">
                          {truncateAddress(kudo.from)}
                        </span>
                      </Table.Cell>
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
            ) : (
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                No kudos received yet
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <span>💝</span> Kudos Sent
            </h2>
            {kudosSent && kudosSent.kudos.length > 0 ? (
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
                      <Table.Cell>
                        <span title={kudo.to} className="cursor-help">
                          {truncateAddress(kudo.to)}
                        </span>
                      </Table.Cell>
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
            ) : (
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                No kudos sent yet
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <span>💌</span> Send kudos
            </h2>
            <form onSubmit={handleSendKudo} className="space-y-2">
              <Input label="To address" name="toAddress" />
              <Textarea label="Message" name="message" />
              <Button
                variant="primary"
                size="md"
                className="hover:scale-105 transition-transform"
                type="submit"
              >
                Send Kudos
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
            Welcome to Crypto Kudos! 🎉
          </h2>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-6">
            Connect your wallet to start spreading positivity and appreciation
            in the crypto space! ✨
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      )}
    </PageContent>
  );
}
