import { useReadContract, useWriteContract } from "wagmi";
import { kudosDeployment } from "@repo/shared";

export function useKudos() {
  const { data: kudosReceived } = useReadContract({
    address: kudosDeployment.address as `0x${string}`,
    abi: kudosDeployment.abi,
    functionName: "getKudosReceived",
    args: [{ page: 0n, pageSize: 10n }],
  });

  const { data: kudosSent } = useReadContract({
    address: kudosDeployment.address as `0x${string}`,
    abi: kudosDeployment.abi,
    functionName: "getKudosSent",
    args: [{ page: 0n, pageSize: 10n }],
  });

  const { writeContract } = useWriteContract();

  return {
    kudosReceived: kudosReceived,
    kudosSent: kudosSent,
    sendKudo: (to: `0x${string}`, message: string) =>
      writeContract({
        address: kudosDeployment.address as `0x${string}`,
        abi: kudosDeployment.abi,
        functionName: "sendKudo",
        args: [{ to, message }] as const,
      }),
  };
}
