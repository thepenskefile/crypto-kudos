import { deployment31337 } from "./deployments.31337";
import { deployment11155111 } from "./deployments.11155111";

type ChainId = number; // Add more chain IDs as needed
type Deployment = typeof deployment31337 | typeof deployment11155111;

const deployments: Record<ChainId, Deployment> = {
  31337: deployment31337,
  11155111: deployment11155111,
} as const;

export function getDeploymentByChainId(chainId: ChainId) {
  const deployment = deployments[chainId];

  if (!deployment) {
    throw new Error(`No deployment found for chainId ${chainId}`);
  }

  return deployment;
}
