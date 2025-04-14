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
import { useTheme } from "next-themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useKudos } from "./hooks/useKudos";
import { KudosReceived } from "./components/KudosReceived";
import { KudosSent } from "./components/KudosSent";

interface FormElements extends HTMLFormControlsCollection {
  toAddress: HTMLInputElement;
  message: HTMLTextAreaElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Home() {
  const { theme, setTheme } = useTheme();
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
      <div className="flex flex-col items-center mb-12 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-pink-100/30 dark:from-purple-900/30 dark:to-pink-900/30 blur-3xl" />
        </div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
          Crypto Kudos
        </h1>
        <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8 text-center max-w-2xl">
          Spread positivity and appreciation in the crypto space, one kudo at a
          time ✨
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:scale-105 transition-transform"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Button>
          <ConnectButton />
        </div>
      </div>

      {isConnected ? (
        <div className="space-y-8">
          {/* Action Bar */}
          <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <span>👋</span> Welcome back!
            </h2>
            <Button
              variant="primary"
              size="lg"
              onClick={sendKudoModal.open}
              className="hover:scale-105 transition-transform"
            >
              <span className="flex items-center gap-2">
                <span>💌</span> Send Kudos
              </span>
            </Button>
          </div>

          {/* Tabs */}
          <div>
            <Tab.Container defaultValue="received">
              <Tab.List>
                <Tab.Trigger value="received" className="text-lg">
                  <span className="flex items-center gap-2">
                    <span>🎁</span> Kudos Received
                  </span>
                </Tab.Trigger>
                <Tab.Trigger value="sent" className="text-lg">
                  <span className="flex items-center gap-2">
                    <span>💝</span> Kudos Sent
                  </span>
                </Tab.Trigger>
              </Tab.List>

              <Tab.Content>
                <Tab.Panel value="received">
                  <KudosReceived />
                </Tab.Panel>
                <Tab.Panel value="sent">
                  <KudosSent />
                </Tab.Panel>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-pink-100/20 dark:from-purple-900/20 dark:to-pink-900/20" />
          </div>
          <h2 className="text-4xl font-semibold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Welcome to Crypto Kudos! 🎉
          </h2>
          <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl mx-auto">
            Connect your wallet to start spreading positivity and appreciation
            in the crypto space! ✨
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      )}

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
