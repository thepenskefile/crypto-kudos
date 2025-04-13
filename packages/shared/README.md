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

## Using the Contract in Your Frontend

The contract can be used in your frontend application using the `useKudos` hook:

```typescript
import { useKudos } from './hooks/useKudos';

export default function Home() {
  const { kudosReceived, kudosSent, sendKudo } = useKudos();

  return (
    <div>
      <h1>Your Kudos</h1>

      <h2>Received Kudos</h2>
      {kudosReceived?.kudos.map((kudo, index) => (
        <div key={index}>
          <p>From: {kudo.from}</p>
          <p>Message: {kudo.message}</p>
        </div>
      ))}

      <h2>Sent Kudos</h2>
      {kudosSent?.kudos.map((kudo, index) => (
        <div key={index}>
          <p>To: {kudo.to}</p>
          <p>Message: {kudo.message}</p>
        </div>
      ))}

      <button
        onClick={() => sendKudo('0x...', 'Great job!')}
      >
        Send Kudo
      </button>
    </div>
  );
}
```

## Available Functions

The `useKudos` hook provides the following functions:

### Read Functions

- `kudosReceived`: Get the kudos received by the current user
- `kudosSent`: Get the kudos sent by the current user

### Write Functions

- `sendKudo(to: string, message: string)`: Send a kudo to another user

## Development Workflow

1. Make changes to the smart contract in `packages/contracts/contracts/Kudos/Kudos.sol`
2. Deploy the updated contract:

```bash
cd packages/contracts
npm run deploy
```

3. The frontend will automatically pick up the new contract address and ABI

## Network Configuration

By default, the contract is deployed to the local Hardhat network. To deploy to other networks:

1. Update the network configuration in `packages/contracts/hardhat.config.ts`
2. Deploy to the desired network:

```bash
npm run deploy -- --network <network-name>
```

## Troubleshooting

### Contract Not Found

- Ensure the local Hardhat node is running
- Verify the contract deployment was successful
- Check that `packages/shared/contracts/kudos.json` exists and contains valid data

### Transaction Failures

- Ensure you have enough ETH in your wallet
- Verify the recipient address is valid
- Check that you're connected to the correct network

## Security Considerations

- Never commit private keys or sensitive information
- Always verify contract addresses before interacting with them
- Use test networks for development and testing
- Consider implementing additional security measures for production deployments
