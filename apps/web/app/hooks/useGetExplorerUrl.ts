import { useCallback, useMemo } from "react";
import { useChainId, useChains } from "wagmi";

export function useGetExplorerUrl() {
  const chainId = useChainId();
  const chains = useChains();

  const chain = useMemo(
    () => chains.find((chain) => chain.id === chainId),
    [chains, chainId]
  );

  const getExplorerUrl = useCallback(
    (txHash: string) => {
      if (!chain) {
        return `https://etherscan.io/tx/${txHash}`;
      }

      return `${chain.blockExplorers?.default?.url}/tx/${txHash}`;
    },
    [chain]
  );

  return { getExplorerUrl };
}
