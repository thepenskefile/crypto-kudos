# Crypto Kudos Smart Contracts

This package contains the smart contracts for the Crypto Kudos application, built using Hardhat. The main contract is `Kudos.sol`, which implements the core functionality of the Kudos system.

## Prerequisites

- Node.js (v16 or later)
- npm

## Installation

1. Install dependencies:

```bash
npm install
```

## Development

### Compiling Contracts

To compile the smart contracts:

```bash
npm run compile
```

### Running Tests

To run the test suite:

```bash
npm run test
```

### Local Development

1. Start a local Hardhat node:

```bash
npm run hardhat:node
```

2. In a separate terminal, deploy the contracts to the local network:

```bash
npm run deploy
```

The local node will provide you with test accounts and their private keys that you can use for development.

## Deployment Guide

### Environment Setup

1. Create a `.env` file in the `packages/contracts` directory with the following variables:

```env
# Your wallet's private key (without the 0x prefix)
PRIVATE_KEY=your_wallet_private_key

# RPC URLs (get these from Alchemy, Infura, or other providers)
SEPOLIA_RPC_URL=your_sepolia_rpc_url
MAINNET_RPC_URL=your_mainnet_rpc_url
BASE_RPC_URL=your_base_rpc_url

# Block explorer API keys for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key
BASESCAN_API_KEY=your_basescan_api_key
```

### Testnet Deployment (Sepolia)

1. Ensure you have test ETH in your wallet. You can get some from:

   - Sepolia faucet: https://sepoliafaucet.com
   - Alchemy faucet: https://sepoliafaucet.com/
   - Layer0 faucet: https://faucet.quicknode.com/ethereum/sepolia

2. Deploy to Sepolia:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

3. The script will:

   - Deploy the contract
   - Save deployment info to `deployments/sepolia.json`
   - Update the frontend configuration
   - Verify the contract on Etherscan

4. Test the deployment by interacting with your contract on Sepolia

### Manual Contract Verification

If automatic contract verification fails (e.g., due to Etherscan API issues), you can verify manually:

1. For Ethereum networks (mainnet/Sepolia):

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

2. For Base:

```bash
npx hardhat verify --network base DEPLOYED_CONTRACT_ADDRESS
```

Replace `DEPLOYED_CONTRACT_ADDRESS` with your contract's address. You can find this:

- In the deployment output
- In `deployments/<network>.json`
- In `shared/src/kudos.ts`

If you get API rate limit errors, wait a few minutes and try again.

### Mainnet Deployment

1. **IMPORTANT**: Ensure you have:

   - Reviewed and audited the smart contract code
   - Tested thoroughly on testnet
   - Have enough ETH for deployment (check current gas prices)
   - Backed up your deployment keys securely

2. Deploy to mainnet:

```bash
npx hardhat run scripts/deploy.ts --network mainnet
```

3. The script will:

   - Deploy the contract
   - Save deployment info to `deployments/mainnet.json`
   - Update the frontend configuration
   - Verify the contract on Etherscan

4. Verify the deployment:
   - Check the contract on Etherscan
   - Test basic interactions
   - Monitor for any issues

### Base Deployment

1. Ensure you have Base ETH in your wallet

   - You can bridge ETH to Base using the [Base Bridge](https://bridge.base.org)

2. Deploy to Base:

```bash
npx hardhat run scripts/deploy.ts --network base
```

3. The script will:
   - Deploy the contract
   - Save deployment info to `deployments/base.json`
   - Update the frontend configuration
   - Verify the contract on Basescan

### Frontend Deployment Configuration

After deploying to different networks, you need to configure your frontend deployment:

1. Create a deployment configuration file in the shared package:

```bash
cd packages/shared/src
touch deployments.ts
```

2. Add the following content to `deployments.ts`:

```typescript
import { mainnetDeployment } from "./deployments/mainnet.json";
import { sepoliaDeployment } from "./deployments/sepolia.json";
import { baseDeployment } from "./deployments/base.json";

export const deployments = {
  // Mainnets
  1: mainnetDeployment, // Ethereum
  8453: baseDeployment, // Base
  // Testnets
  11155111: sepoliaDeployment, // Sepolia
} as const;

export type ChainId = keyof typeof deployments;
```

3. Configure your Vercel deployment:

   - Go to your project settings in Vercel
   - Under "Environment Variables", add:
     ```
     NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
     ```
   - Deploy your frontend

4. The frontend will now:
   - Load the correct contract address based on the user's connected network
   - Show appropriate network options in the wallet connection UI
   - Handle contract interactions across different networks

### Post-Deployment

1. Commit the new deployment files:

```bash
git add deployments/
git commit -m "Deploy contract to <network>"
```

2. Update your frontend to use the new contract addresses:

```bash
cd ../shared
npm run build
```

3. Test the frontend with the new deployment

### Deployment History

All deployments are tracked in the `deployments/` directory:

- `deployments/sepolia.json` - Sepolia testnet deployments
- `deployments/mainnet.json` - Mainnet deployments
- `deployments/base.json` - Base mainnet deployments

Each deployment record includes:

- Contract address
- Timestamp
- Network
- Contract version

## Project Structure

- `contracts/` - Contains the smart contract source files
- `test/` - Contains test files for the contracts
- `scripts/` - Contains deployment and utility scripts
- `artifacts/` - Contains compiled contract artifacts
- `cache/` - Hardhat cache directory
- `deployments/` - Contains deployment history for each network

## Available Scripts

- `npm run compile` - Compile the smart contracts
- `npm run deploy` - Deploy contracts to the local network
- `npm run hardhat:node` - Start a local Hardhat node
- `npm run test` - Run the test suite
- `npm run clean` - Clean build artifacts and dependencies
