import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { kudosDeployment } from "@repo/shared";
import { useState, useCallback } from "react";

const PAGE_SIZE = 6n; // Show 6 kudos per page to fit the 2x3 grid nicely

export function useKudos() {
  const { isConnected } = useAccount();
  const [receivedPage, setReceivedPage] = useState(0n);
  const [sentPage, setSentPage] = useState(0n);

  const { data: kudosReceived, refetch: refetchKudosReceived } =
    useReadContract({
      address: kudosDeployment.address as `0x${string}`,
      abi: kudosDeployment.abi,
      functionName: "getKudosReceived",
      args: [{ page: receivedPage, pageSize: PAGE_SIZE }],
      query: {
        enabled: isConnected,
      },
    });

  const { data: kudosSent, refetch: refetchKudosSent } = useReadContract({
    address: kudosDeployment.address as `0x${string}`,
    abi: kudosDeployment.abi,
    functionName: "getKudosSent",
    args: [{ page: sentPage, pageSize: PAGE_SIZE }],
    query: {
      enabled: isConnected,
    },
  });

  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess: () => {
        refetchKudosSent();
        refetchKudosReceived();
      },
    },
  });

  const changeReceivedPage = useCallback(async (page: number) => {
    setReceivedPage(BigInt(page));
  }, []);

  const changeSentPage = useCallback(async (page: number) => {
    setSentPage(BigInt(page));
  }, []);

  const sendKudo = useCallback(
    (to: `0x${string}`, message: string) => {
      if (!isConnected) throw new Error("Wallet not connected");

      return writeContract({
        address: kudosDeployment.address as `0x${string}`,
        abi: kudosDeployment.abi,
        functionName: "sendKudo",
        args: [{ to, message }] as const,
      });
    },
    [isConnected, writeContract]
  );

  return {
    kudosReceived: isConnected ? kudosReceived : undefined,
    kudosSent: isConnected ? kudosSent : undefined,
    sendKudo,
    changeReceivedPage,
    changeSentPage,
  };
}
