import { deployment31337 } from "./deployments.31337";
import { deployment11155111 } from "./deployments.11155111";
import { deployment8453 } from "./deployments.8453";
import { deployment1 } from "./deployments.1";

type ChainId = number;
type Deployment =
  | typeof deployment31337
  | typeof deployment11155111
  | typeof deployment8453
  | typeof deployment1;

const deployments: Record<ChainId, Deployment> = {
  31337: deployment31337,
  11155111: deployment11155111,
  8453: deployment8453,
  1: deployment1,
} as const;

export function getDeploymentByChainId(chainId: ChainId) {
  const deployment = deployments[chainId];

  if (!deployment) {
    throw new Error(`No deployment found for chainId ${chainId}`);
  }

  return deployment;
}
