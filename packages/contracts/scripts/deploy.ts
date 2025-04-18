import hardhat from "hardhat";
import * as fs from "fs";
import * as path from "path";

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
  };

  const fileContent = `// AUTO-GENERATED ABI FILE
export const kudosDeployment = ${JSON.stringify(deploymentInfo, null, 2)} as const;
`;

  fs.writeFileSync(path.join(sharedDir, "kudos.ts"), fileContent);

  console.log("Deployment info saved to shared/src/kudos.ts");

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
