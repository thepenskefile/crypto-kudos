import { useReadContract, useWriteContract } from "wagmi";
import { kudosDeployment } from "@repo/shared";

export function useKudos() {
  const { data: kudosReceived, refetch: refetchReceived } = useReadContract({
    address: kudosDeployment.address as `0x${string}`,
    abi: kudosDeployment.abi,
    functionName: "getKudosReceived",
    args: [{ page: 0n, pageSize: 10n }],
  });

  const { data: kudosSent, refetch: refetchSent } = useReadContract({
    address: kudosDeployment.address as `0x${string}`,
    abi: kudosDeployment.abi,
    functionName: "getKudosSent",
    args: [{ page: 0n, pageSize: 10n }],
  });

  const { writeContract } = useWriteContract();

  return {
    kudosReceived: kudosReceived,
    kudosSent: kudosSent,
    sendKudo: async (to: `0x${string}`, message: string) => {
      const result = await writeContract({
        address: kudosDeployment.address as `0x${string}`,
        abi: kudosDeployment.abi,
        functionName: "sendKudo",
        args: [{ to, message }] as const,
      });

      // Refetch both sent and received kudos after sending
      await Promise.all([refetchSent(), refetchReceived()]);

      return result;
    },
  };
}
