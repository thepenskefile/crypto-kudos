"use client";

import { useModalState } from "@repo/ui";
import { useAccount } from "wagmi";
import { useKudos } from "../hooks/useKudos";
import { NoWalletSection } from "../components/NoWalletSection";
import { SendKudosModal } from "../components/kudos/SendKudosModal";
import { KudosTabs } from "../components/kudos/KudosTabs";
import { ActionBar } from "../components/ActionBar";
interface FormElements extends HTMLFormControlsCollection {
  toAddress: HTMLInputElement;
  message: HTMLTextAreaElement;
}
export interface UsernameFormElement extends HTMLFormElement {
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

  if (!isConnected) {
    return <NoWalletSection />;
  }

  return (
    <div className="space-y-12">
      <ActionBar sendKudosModal={sendKudosModal} />
      <KudosTabs />
      <SendKudosModal
        modal={sendKudosModal}
        handleSendKudos={handleSendKudos}
      />
    </div>
  );
}
