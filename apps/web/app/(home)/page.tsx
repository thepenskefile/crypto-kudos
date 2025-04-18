"use client";

import { useModalState } from "@repo/ui";
import { useAccount } from "wagmi";
import { NoWalletSection } from "../components/sections/NoWalletSection";
import { SendKudosModal } from "../components/kudos/SendKudosModal";
import { KudosTabs } from "../components/kudos/KudosTabs";
import { ActionBar } from "../components/common/ActionBar";
interface FormElements extends HTMLFormControlsCollection {
  toAddress: HTMLInputElement;
  message: HTMLTextAreaElement;
}
export interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Home() {
  const { isConnected } = useAccount();

  const sendKudosModal = useModalState();

  if (!isConnected) {
    return <NoWalletSection />;
  }

  return (
    <div className="space-y-12">
      <ActionBar sendKudosModal={sendKudosModal} />
      <KudosTabs />
      <SendKudosModal modal={sendKudosModal} />
    </div>
  );
}
