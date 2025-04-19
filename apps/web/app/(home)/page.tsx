"use client";

import { useModalState } from "@repo/ui";
import { useAccount, useChainId } from "wagmi";
import { NoWalletSection } from "../components/sections/NoWalletSection";
import { UnsupportedChainSection } from "../components/sections/UnsupportedChainSection";
import { SendKudosModal } from "../components/kudos/SendKudosModal";
import { KudosTabs } from "../components/kudos/KudosTabs";
import { ActionBar } from "../components/common/ActionBar";
import { getDeploymentByChainId } from "@repo/shared";
import { useMemo } from "react";

interface FormElements extends HTMLFormControlsCollection {
  toAddress: HTMLInputElement;
  message: HTMLTextAreaElement;
}
export interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Home() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const sendKudosModal = useModalState();

  const isChainSupported = useMemo(() => {
    try {
      getDeploymentByChainId(chainId);
      return true;
    } catch {
      return false;
    }
  }, [chainId]);

  if (!isConnected) {
    return <NoWalletSection />;
  }

  if (!isChainSupported) {
    return <UnsupportedChainSection />;
  }

  return (
    <div className="space-y-12">
      <ActionBar sendKudosModal={sendKudosModal} />
      <KudosTabs />
      <SendKudosModal modal={sendKudosModal} />
    </div>
  );
}
