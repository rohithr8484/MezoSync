# Mezo Sync Smart Contracts

This folder contains the Solidity smart contracts for the Mezo Sync payment platform.

## Contracts

### Payments.sol
Handles MUSD peer-to-peer payments with:
- `sendPayment(recipient, amount, note)` - Send MUSD to any address
- `getPayment(paymentId)` - Get payment details
- `getUserPayments(user)` - Get user's payment history

### Bills.sol  
Handles bill payments (Rent, SaaS, Utilities) with:
- `createBill(payer, amountUSD, amountMUSD, billType, ...)` - Create a bill
- `payBill(billId)` - Pay a bill in MUSD
- `getBill(billId)` - Get bill details
- `markOverdue(billId)` - Mark overdue bills

## Deployment

### Prerequisites
- Node.js 18+
- Hardhat: `npm install --save-dev hardhat`
- Mezo testnet tokens for gas

### Steps

1. **Clone contracts to local folder:**
```bash
mkdir mezo-sync-contracts && cd mezo-sync-contracts
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts
```

2. **Copy contract files to `contracts/` folder**

3. **Create `hardhat.config.ts`:**
```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mezo: {
      url: "https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c",
      chainId: 31612,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
};

export default config;
```

4. **Deploy:**
```bash
PRIVATE_KEY=your_private_key npx hardhat run scripts/deploy.ts --network mezo
```

## Network Info

| Network | Chain ID | RPC URL |
|---------|----------|---------|
| Mezo Mainnet | 31612 | https://rpc-http.mezo.boar.network/... |

## MUSD Token Address
The MUSD token address on Mezo: `0x...` (to be configured after deployment)

## After Deployment

Update the contract addresses in:
- `src/lib/contracts/payments-abi.ts` → `PAYMENTS_CONTRACT_ADDRESSES`
- `src/lib/contracts/bills-abi.ts` → `BILLS_CONTRACT_ADDRESSES`
