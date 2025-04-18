import {
  useReadContract,
  useWriteContract,
  useAccount,
  UseWriteContractParameters,
  useChainId,
} from "wagmi";
import { deployments } from "@repo/shared";
import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

const DEFAULT_PAGE_SIZE = 6n; // Show 6 kudos per page to fit the 2x3 grid nicely

type KudosPaginationArgs = {
  page: bigint;
  pageSize: bigint;
};

function useKudosReceivedQuery(args: KudosPaginationArgs, enabled: boolean) {
  const { address } = useAccount();
  const chainId = useChainId();
  const deployment = deployments[chainId as keyof typeof deployments];

  return useReadContract({
    address: deployment?.address as `0x${string}`,
    abi: deployment?.abi,
    functionName: "getKudosReceived",
    args: [args],
    account: address,
    query: {
      enabled: enabled && !!address && !!deployment,
    },
  });
}

function useKudosSentQuery(args: KudosPaginationArgs, enabled: boolean) {
  const { address } = useAccount();
  const chainId = useChainId();
  const deployment = deployments[chainId as keyof typeof deployments];

  return useReadContract({
    address: deployment?.address as `0x${string}`,
    abi: deployment?.abi,
    functionName: "getKudosSent",
    args: [args],
    account: address,
    query: {
      enabled: enabled && !!address && !!deployment,
    },
  });
}

export function useKudosReceived() {
  const [page, setPage] = useState(0n);
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const deployment = deployments[chainId as keyof typeof deployments];

  const { data: kudosReceived, ...restQuery } = useKudosReceivedQuery(
    { page, pageSize: DEFAULT_PAGE_SIZE },
    isConnected && !!deployment
  );

  const changePage = useCallback(async (newPage: number) => {
    setPage(BigInt(newPage));
  }, []);

  return {
    kudosReceived,
    ...restQuery,
    page,
    changePage,
  };
}

export function useKudosSent() {
  const [page, setPage] = useState(0n);
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const deployment = deployments[chainId as keyof typeof deployments];

  const { data: kudosSent, ...restQuery } = useKudosSentQuery(
    { page, pageSize: DEFAULT_PAGE_SIZE },
    isConnected && !!deployment
  );

  const changePage = useCallback(async (newPage: number) => {
    setPage(BigInt(newPage));
  }, []);

  return {
    kudosSent,
    ...restQuery,
    page,
    changePage,
  };
}

type UseSendKudoOptions = Omit<
  UseWriteContractParameters,
  "address" | "abi" | "functionName" | "args"
>;

export function useSendKudo(options?: UseSendKudoOptions) {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const deployment = deployments[chainId as keyof typeof deployments];
  const queryClient = useQueryClient();

  // Disabled query to get the query key for invalidation below.
  const { queryKey: kudosReceivedQueryKey } = useKudosReceivedQuery(
    { page: 0n, pageSize: DEFAULT_PAGE_SIZE },
    false
  );

  // Disabled query to get the query key for invalidation below.
  const { queryKey: kudosSentQueryKey } = useKudosSentQuery(
    { page: 0n, pageSize: DEFAULT_PAGE_SIZE },
    false
  );

  const { writeContract, ...restUseWriteContract } = useWriteContract({
    ...options,
    mutation: {
      onSuccess: (...args) => {
        if (options?.mutation?.onSuccess) {
          options.mutation.onSuccess(...args);
        }
        queryClient.invalidateQueries({
          refetchType: "all",
          queryKey: kudosSentQueryKey,
        });

        queryClient.invalidateQueries({
          refetchType: "all",
          queryKey: kudosReceivedQueryKey,
        });
      },
    },
  });

  const sendKudo = useCallback(
    (to: `0x${string}`, message: string) => {
      if (!isConnected) throw new Error("Wallet not connected");
      if (!deployment) throw new Error("Network not supported");

      return writeContract({
        address: deployment.address as `0x${string}`,
        abi: deployment.abi,
        functionName: "sendKudo",
        args: [{ to, message }] as const,
      });
    },
    [isConnected, writeContract, deployment]
  );

  return {
    sendKudo,
    ...restUseWriteContract,
  };
}
