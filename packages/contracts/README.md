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

### Network Configuration

By default, the contract is deployed to the local Hardhat network. To deploy to other networks:

1. Update the network configuration in `packages/contracts/hardhat.config.ts`
2. Deploy to the desired network:

```bash
npm run deploy -- --network <network-name>
```

## Project Structure

- `contracts/` - Contains the smart contract source files
- `test/` - Contains test files for the contracts
- `scripts/` - Contains deployment and utility scripts
- `artifacts/` - Contains compiled contract artifacts
- `cache/` - Hardhat cache directory

## Available Scripts

- `npm run compile` - Compile the smart contracts
- `npm run deploy` - Deploy contracts to the local network
- `npm run hardhat:node` - Start a local Hardhat node
- `npm run test` - Run the test suite
- `npm run clean` - Clean build artifacts and dependencies
