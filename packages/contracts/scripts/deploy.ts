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

async function main() {
  const network = hardhat.network.name;
  let chainId = CHAIN_IDS[network as keyof typeof CHAIN_IDS];

  // Handle localhost/hardhat network
  if (network === "localhost" || network === "hardhat") {
    chainId = 31337;
  }

  if (!chainId) {
    throw new Error("Chain ID not found in network config");
  }
  console.log(`Deploying to network: ${network} (chainId: ${chainId})`);

  const contract = await hardhat.viem.deployContract("Kudos");
  const address = contract.address;
  console.log("Kudos deployed to:", address);

  // Get the contract's ABI from the artifacts
  const artifactPath = path.join(
    __dirname,
    "../artifacts/contracts/Kudos.sol/Kudos.json"
  );
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  // Save the deployment info to the shared directory
  const sharedDir = path.join(__dirname, "../../shared/src");
  if (!fs.existsSync(sharedDir)) {
    fs.mkdirSync(sharedDir, { recursive: true });
  }

  // Save the deployment info
  const deploymentInfo = {
    address,
    abi: artifact.abi,
    network,
    chainId,
  };

  // Create a file for this specific chain ID
  const chainIdFile = path.join(sharedDir, `deployments.${chainId}.ts`);
  const fileContent = `// AUTO-GENERATED ABI FILE
export const deployment${chainId} = ${JSON.stringify(deploymentInfo, null, 2)} as const;
`;

  fs.writeFileSync(chainIdFile, fileContent);

  console.log(`Deployment info saved to shared/src/deployments.${chainId}.ts`);

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
