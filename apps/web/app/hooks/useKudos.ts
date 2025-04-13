import { useReadContract, useWriteContract } from "wagmi";
import kudosDeployment from "@repo/shared/contracts/kudos.json";
import type { Kudos } from "@repo/shared/contracts/types/Kudos";

export function useKudos() {
  const { data: kudosReceived } = useReadContract({
    address: kudosDeployment.address as `0x${string}`,
    abi: kudosDeployment.abi,
    functionName: "getKudosReceived",
    args: [{ page: 0, pageSize: 10 }],
  });

  const { data: kudosSent } = useReadContract({
    address: kudosDeployment.address as `0x${string}`,
    abi: kudosDeployment.abi,
    functionName: "getKudosSent",
    args: [{ page: 0, pageSize: 10 }],
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
