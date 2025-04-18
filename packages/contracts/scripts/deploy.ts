import hardhat from "hardhat";
import * as fs from "fs";
import * as path from "path";

// Chain IDs for supported networks
const CHAIN_IDS = {
  mainnet: 1,
  sepolia: 11155111,
  base: 8453,
  localhost: 31337,
} as const;

// Contract ABI type
type KudosAbi = {
  anonymous?: boolean;
  inputs: {
    indexed?: boolean;
    internalType: string;
    name: string;
    type: string;
    components?: {
      internalType: string;
      name: string;
      type: string;
      components?: {
        internalType: string;
        name: string;
        type: string;
      }[];
    }[];
  }[];
  name: string;
  outputs?: {
    internalType: string;
    name: string;
    type: string;
    components?: {
      internalType: string;
      name: string;
      type: string;
      components?: {
        internalType: string;
        name: string;
        type: string;
      }[];
    }[];
  }[];
  stateMutability?: string;
  type: string;
}[];

// Deployment type
type Deployment = {
  address: string;
  abi: KudosAbi;
  network: string;
  chainId: number;
};

async function main() {
  const network = hardhat.network.name;
  console.log(`Deploying to network: ${network}`);

  const contract = await hardhat.viem.deployContract("Kudos");
  const address = contract.address;
  console.log("Kudos deployed to:", address);

  // Get the contract's ABI from the artifacts
  const artifactPath = path.join(
    __dirname,
    "../artifacts/contracts/Kudos.sol/Kudos.json"
  );
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  // Save deployment history
  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentHistoryPath = path.join(deploymentsDir, `${network}.json`);
  let deploymentHistory = [];

  // Load existing deployment history if it exists
  if (fs.existsSync(deploymentHistoryPath)) {
    deploymentHistory = JSON.parse(
      fs.readFileSync(deploymentHistoryPath, "utf8")
    );
  }

  // Add new deployment
  const deployment = {
    address,
    timestamp: new Date().toISOString(),
    network,
    chainId: CHAIN_IDS[network as keyof typeof CHAIN_IDS] || 0,
    version: artifact.version || "1.0.0",
  };

  deploymentHistory.push(deployment);

  // Save updated deployment history
  fs.writeFileSync(
    deploymentHistoryPath,
    JSON.stringify(deploymentHistory, null, 2)
  );

  console.log(`Deployment history updated in deployments/${network}.json`);

  // Update the deployments.ts file in shared package
  const deploymentsPath = path.join(
    __dirname,
    "../../shared/src/deployments.ts"
  );

  // Define the base deployments object
  const baseDeployments: Record<number, Deployment> = {
    // Mainnets
    1: {
      address: "0x0000000000000000000000000000000000000000",
      abi: [],
      network: "mainnet",
      chainId: 1,
    },
    8453: {
      address: "0x0000000000000000000000000000000000000000",
      abi: [],
      network: "base",
      chainId: 8453,
    },
    // Testnets
    11155111: {
      address: "0x0000000000000000000000000000000000000000",
      abi: [],
      network: "sepolia",
      chainId: 11155111,
    },
    // Local
    31337: {
      address: "0x0000000000000000000000000000000000000000",
      abi: [],
      network: "localhost",
      chainId: 31337,
    },
  };

  const chainId = CHAIN_IDS[network as keyof typeof CHAIN_IDS];
  if (!chainId) {
    throw new Error(`Network ${network} not supported`);
  }

  // Update the deployment for this network
  baseDeployments[chainId] = {
    address,
    abi: artifact.abi as KudosAbi,
    network,
    chainId,
  };

  // Update the file content
  const deploymentsContent = `// Contract ABI type
type KudosAbi = {
  anonymous?: boolean;
  inputs: {
    indexed?: boolean;
    internalType: string;
    name: string;
    type: string;
    components?: {
      internalType: string;
      name: string;
      type: string;
      components?: {
        internalType: string;
        name: string;
        type: string;
      }[];
    }[];
  }[];
  name: string;
  outputs?: {
    internalType: string;
    name: string;
    type: string;
    components?: {
      internalType: string;
      name: string;
      type: string;
      components?: {
        internalType: string;
        name: string;
        type: string;
      }[];
    }[];
  }[];
  stateMutability?: string;
  type: string;
}[];

// Deployment type
type Deployment = {
  address: string;
  abi: KudosAbi;
  network: string;
  chainId: number;
};

// Network deployments configuration
export const deployments: Record<number, Deployment> = ${JSON.stringify(baseDeployments, null, 2)} as const;

export type ChainId = keyof typeof deployments;`;

  fs.writeFileSync(deploymentsPath, deploymentsContent);
  console.log("Updated deployments.ts with new contract address");

  // If we're on a public network, verify the contract
  if (network !== "localhost" && network !== "hardhat") {
    console.log("Verifying contract on Etherscan...");
    await hardhat.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
