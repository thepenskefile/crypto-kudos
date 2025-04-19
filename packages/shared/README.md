# Contract Integration Guide

This package contains shared contract artifacts and types for the Kudos smart contract. It serves as a bridge between the smart contract and the frontend application.

## Setup

1. Install dependencies in the root directory:

```bash
npm install
```

2. Start a local Hardhat node:

```bash
cd packages/contracts
npx hardhat node
```

3. Deploy the contract:

```bash
npm run deploy
```

This will:

- Deploy the Kudos contract to the local network
- Save the contract address and ABI to `packages/shared/contracts/kudos.json`

## Troubleshooting

### Contract Not Found

- Ensure the local Hardhat node is running
- Verify the contract deployment was successful
- Check that `packages/shared/contracts/kudos.json` exists and contains valid data

### Transaction Failures

- Ensure you have enough ETH in your wallet
- Verify the recipient address is valid
- Check that you're connected to the correct network
