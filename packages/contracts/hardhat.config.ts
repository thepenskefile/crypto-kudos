import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  typechain: {
    outDir: "../shared/contracts/types",
    target: "ethers-v6",
  },
};

export default config;
