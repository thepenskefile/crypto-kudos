import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { kudosDeployment } from "@repo/shared";

export function useKudos() {
  const { isConnected } = useAccount();

  const { data: kudosReceived } = useReadContract({
    address: kudosDeployment.address as `0x${string}`,
    abi: kudosDeployment.abi,
    functionName: "getKudosReceived",
    args: [{ page: 0n, pageSize: 10n }],
    query: {
      enabled: isConnected,
    },
  });

  const { data: kudosSent, refetch: refetchKudosSent } = useReadContract({
    address: kudosDeployment.address as `0x${string}`,
    abi: kudosDeployment.abi,
    functionName: "getKudosSent",
    args: [{ page: 0n, pageSize: 10n }],
    query: {
      enabled: isConnected,
    },
  });

  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess: () => {
        refetchKudosSent();
      },
    },
  });

  return {
    kudosReceived: isConnected ? kudosReceived : undefined,
    kudosSent: isConnected ? kudosSent : undefined,
    sendKudo: (to: `0x${string}`, message: string) => {
      if (!isConnected) throw new Error("Wallet not connected");

      return writeContract({
        address: kudosDeployment.address as `0x${string}`,
        abi: kudosDeployment.abi,
        functionName: "sendKudo",
        args: [{ to, message }] as const,
      });
    },
  };
}
