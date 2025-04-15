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
import { NoWalletSection } from "./components/NoWalletSection";

interface FormElements extends HTMLFormControlsCollection {
  toAddress: HTMLInputElement;
  message: HTMLTextAreaElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Home() {
  const { sendKudos } = useKudos();
  const { isConnected } = useAccount();

  const sendKudosModal = useModalState();

  function handleSendKudos(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    sendKudos(
      form.elements.toAddress.value as `0x${string}`,
      form.elements.message.value
    );
    sendKudosModal.close();
  }

  return (
    <PageContent>
      {/* Hero Section */}
      <div className="relative">
        <div className="pb-12">
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="self-end mb-8">
              <ThemeSwitcher />
            </div>
            <h1 className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 tracking-tight sm:text-8xl font-jakarta">
              Crypto Kudos
            </h1>
            <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-12 max-w-2xl leading-relaxed font-jakarta">
              Spread positivity and appreciation in the crypto space, one kudos
              at a time
            </p>
            {isConnected && (
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <ConnectButton />
              </div>
            )}
          </div>
        </div>

        {isConnected ? (
          <div className="space-y-12">
            {/* Action Bar */}
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 border border-gray-100 dark:border-gray-700 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-blue-50 dark:bg-gray-900/50 flex items-center justify-center">
                  <span className="text-2xl">👋</span>
                </div>
                <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                  Welcome back!
                </span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={sendKudosModal.open}
                className="min-w-[140px]"
              >
                <span className="flex items-center gap-2 justify-center">
                  <span>💌</span> Send Kudos
                </span>
              </Button>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-xl">
              <Tab.Container defaultValue="received">
                <Tab.List className="flex gap-2 p-2 bg-blue-100 dark:bg-gray-900/50">
                  <Tab.Trigger
                    value="received"
                    className="flex-1 text-base px-4 py-2 rounded-xl"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      <span className="text-xl">🎁</span>
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Kudos Received
                      </span>
                    </span>
                  </Tab.Trigger>
                  <Tab.Trigger
                    value="sent"
                    className="flex-1 text-base px-4 py-2 rounded-xl"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      <span className="text-xl">💝</span>
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Kudos Sent
                      </span>
                    </span>
                  </Tab.Trigger>
                </Tab.List>

                <Tab.Content>
                  <Tab.Panel value="received" className="p-4">
                    <KudosReceived />
                  </Tab.Panel>
                  <Tab.Panel value="sent" className="p-4">
                    <KudosSent />
                  </Tab.Panel>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        ) : (
          <NoWalletSection />
        )}
      </div>

      <SendKudosModal
        modal={sendKudosModal}
        handleSendKudos={handleSendKudos}
      />
    </PageContent>
  );
}

function SendKudosModal({
  modal,
  handleSendKudos,
}: {
  modal: UseModalState;
  handleSendKudos: (event: React.FormEvent<UsernameFormElement>) => void;
}) {
  return (
    <Modal
      visible={modal.visible}
      onClose={modal.close}
      panelClassName="lg:min-w-[41.75rem] lg:h-[32rem]"
    >
      <Modal.Title className="flex items-center gap-3 pb-6">
        <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-gray-900/50 flex items-center justify-center">
          <span className="text-2xl">💌</span>
        </div>
        <span className="text-2xl font-medium text-blue-600 dark:text-blue-400">
          Send Kudos
        </span>
      </Modal.Title>
      <Modal.Content>
        <form onSubmit={handleSendKudos} className="space-y-6">
          <div className="space-y-2">
            <Input
              label="To address"
              name="toAddress"
              placeholder="0x..."
              className="bg-blue-50/50 dark:bg-gray-900/50 border-0 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Enter the Ethereum address of the person you want to send kudos to
            </div>
          </div>
          <div className="space-y-2">
            <Textarea
              label="Message"
              name="message"
              placeholder="Write your appreciation message here..."
              className="bg-blue-50/50 dark:bg-gray-900/50 border-0 min-h-[120px] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Write a heartfelt message to show your appreciation
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button
              variant="primary"
              size="sm"
              type="submit"
              className="min-w-[160px]"
            >
              <span className="flex items-center gap-2 justify-center">
                <span>💝</span> Send Kudos
              </span>
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
}
