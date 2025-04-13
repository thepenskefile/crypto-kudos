import { viem } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const contract = await viem.deployContract("Kudos");
  const address = contract.address;
  console.log("Kudos deployed to:", address);

  // Get the contract's ABI from the artifacts
  const artifactPath = path.join(
    __dirname,
    "../artifacts/contracts/Kudos.sol/Kudos.json"
  );
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  // Save the deployment info to the shared directory
  const sharedDir = path.join(__dirname, "../../shared/contracts");
  if (!fs.existsSync(sharedDir)) {
    fs.mkdirSync(sharedDir, { recursive: true });
  }

  // Save the deployment info
  const deploymentInfo = {
    address,
    abi: artifact.abi,
    network: "localhost", // This will be updated based on the network you deploy to
  };

  fs.writeFileSync(
    path.join(sharedDir, "kudos.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to shared/contracts/kudos.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
