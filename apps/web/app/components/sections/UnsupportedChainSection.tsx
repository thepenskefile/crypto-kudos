import { getDeploymentByChainId } from "@repo/shared";
import { PageContent } from "@repo/ui";
import { useChains } from "wagmi";

export function UnsupportedChainSection() {
  const chains = useChains();
  const supportedChains = chains.filter((chain) => {
    try {
      getDeploymentByChainId(chain.id);
      return true;
    } catch {
      return false;
    }
  });

  return (
    <PageContent>
      <h1 className="text-2xl font-bold text-center">Unsupported Network</h1>
      <p className="text-center text-gray-600">
        Please switch to one of the following networks:
      </p>
      <ul className="list-disc list-inside text-center">
        {supportedChains.map((chain) => (
          <li key={chain.id} className="text-gray-600">
            {chain.name}
          </li>
        ))}
      </ul>
    </PageContent>
  );
}
