"use client";

import {
  Button,
  PageContent,
  Input,
  Textarea,
  Tab,
  useModalState,
  UseModalState,
  Modal,
} from "@repo/ui";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useKudos } from "./hooks/useKudos";
import { KudosReceived } from "./components/KudosReceived";
import { KudosSent } from "./components/KudosSent";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

interface FormElements extends HTMLFormControlsCollection {
  toAddress: HTMLInputElement;
  message: HTMLTextAreaElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Home() {
  const { sendKudo } = useKudos();
  const { isConnected } = useAccount();

  const sendKudoModal = useModalState();

  function handleSendKudo(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    sendKudo(
      form.elements.toAddress.value as `0x${string}`,
      form.elements.message.value
    );
    sendKudoModal.close();
  }

  return (
    <PageContent>
      {/* Hero Section */}
      <div className="relative">
        <div className="pb-8">
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="self-end mb-4">
              <ThemeSwitcher />
            </div>
            <h1 className="text-6xl font-bold mb-6 text-purple-600 dark:text-purple-400 tracking-tight sm:text-7xl">
              Crypto Kudos
            </h1>
            <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-10 max-w-2xl leading-8">
              Spread positivity and appreciation in the crypto space, one kudo
              at a time ✨
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <ConnectButton />
            </div>
          </div>
        </div>

        {isConnected ? (
          <div className="space-y-12">
            {/* Action Bar */}
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-400/10 dark:to-pink-400/10 rounded-2xl px-8 py-5 border border-purple-100 dark:border-purple-900/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👋</span>
                <span className="text-lg text-purple-600 dark:text-purple-400">
                  Welcome back!
                </span>
              </div>
              <Button variant="primary" size="sm" onClick={sendKudoModal.open}>
                <span className="flex items-center gap-2">
                  <span>💌</span> Send Kudos
                </span>
              </Button>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <Tab.Container defaultValue="received">
                <Tab.List className="flex border-b border-gray-100 dark:border-gray-700">
                  <Tab.Trigger
                    value="received"
                    className="flex-1 text-lg px-6 py-4"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      <span className="text-2xl">🎁</span> Kudos Received
                    </span>
                  </Tab.Trigger>
                  <Tab.Trigger
                    value="sent"
                    className="flex-1 text-lg px-6 py-4"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      <span className="text-2xl">💝</span> Kudos Sent
                    </span>
                  </Tab.Trigger>
                </Tab.List>

                <Tab.Content>
                  <Tab.Panel value="received" className="p-6">
                    <KudosReceived />
                  </Tab.Panel>
                  <Tab.Panel value="sent" className="p-6">
                    <KudosSent />
                  </Tab.Panel>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <span className="text-4xl">🎉</span>
              </div>
              <div>
                <h2 className="text-3xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
                  Welcome to Crypto Kudos!
                </h2>
                <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl">
                  Connect your wallet to start spreading positivity and
                  appreciation in the crypto space! ✨
                </p>
              </div>
              <ConnectButton />
            </div>
          </div>
        )}
      </div>

      <SendKudoModal modal={sendKudoModal} handleSendKudo={handleSendKudo} />
    </PageContent>
  );
}

function SendKudoModal({
  modal,
  handleSendKudo,
}: {
  modal: UseModalState;
  handleSendKudo: (event: React.FormEvent<UsernameFormElement>) => void;
}) {
  return (
    <Modal visible={modal.visible} onClose={modal.close}>
      <Modal.Title>
        <span className="flex items-center gap-2">
          <span>💌</span> Send Kudos
        </span>
      </Modal.Title>
      <Modal.Content>
        <form onSubmit={handleSendKudo} className="space-y-4">
          <Input label="To address" name="toAddress" placeholder="0x..." />
          <Textarea
            label="Message"
            name="message"
            placeholder="Write your appreciation message here..."
          />
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="hover:scale-105 transition-transform"
            >
              Send Kudos
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
}
