# Mezo Sync - Simple Financial Services - Send, Receive, Save MUSD and use your MUSD to pay bills directly from your wallet.

Mezo Sync is a Bitcoin-powered financial experience layer that makes saving and payments feel as simple as modern banking while preserving on-chain transparency and user control. Through Smart Savings, users can put their MUSD to work in high-yield savings accounts, earning a 4.5% annual return with no lock-ups and the freedom to withdraw anytime, all while maintaining the stability of a trusted stablecoin.

Mezo Sync enables instant, zero-fee MUSD transfers, allowing users to split and pay bills, pay friends or send MUSD globally in seconds. By combining seamless payments with automated savings growth, Mezo Sync delivers a fast, intuitive, and reliable financial layer built for everyday use—powered by Bitcoin-grade security and efficiency.


- Bitcoin-powered financial experience layer:
A consumer-friendly app that makes saving and payments feel as simple as modern banking while preserving on-chain transparency and user control. 

- Smart Savings with MUSD:
Users can deposit MUSD into high-yield savings accounts earning 4.5% annual returns.

- Send & Request payments:
Enables instant, zero-fee MUSD transfers for everyday use cases such as bill splitting, peer payments, and global transfers.

- Automated savings growth:
Seamlessly combines daily payments with passive savings growth in a single experience.

Bank-like simplicity, on-chain transparency


<img width="800" height="400" alt="github_avatar_400x400" src="https://github.com/user-attachments/assets/bdd2f016-731d-49a3-83ae-33e78df0f470" />
<p align="left"> <img src="https://img.shields.io/badge/Mezo-pink?style=flat-square" /> <img src="https://img.shields.io/badge/Challenge-yellow?style=flat-square" /> <img src="https://img.shields.io/badge/Bitcoin Bank-blue?style=flat-square" /> </p>

## 🚀 Features

### 💰 Smart Savings
Put your MUSD to work with high-yield savings accounts. Watch your balance grow automatically.
- **4.5% Annual Return**
- **Withdraw anytime**
- **MUSD stablecoin**

### 📤 Send & Request
Send MUSD to anyone instantly. Split bills, pay friends, or send MUSD home - all in seconds.
- **Zero fees**
- **Instant delivery**
- **Request payments**

### 🌍 Low fees than traditional finance
Send MUSD without the high fees.
- **Real-time tracking**
- **Lower than banks**

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### Blockchain Integration
- **@mezo-org/passport** - Bitcoin wallet connectivity
- **RainbowKit** - Wallet management
- **Sats Connect** - Bitcoin transaction handling
- **Wagmi + Viem** - Blockchain interaction
- **MUSD Integration** - Stablecoin operations
- **Validation Cloud** - Managed blockchain infrastructure + secure RPC provider for Mezo and other networks.

### State Management & Forms
- **React Query** - Server state management
- **Zod** - Schema validation
- **React Hook Form** - Form handling

### UI Components
- **Lucide Icons** - Beautiful iconography
- **Sonner** - Toast notifications
- **Recharts** - Data visualization
- **Embla Carousel** - Smooth carousel components

## 🛠 Technical Architecture
<img width="1024" height="1536" alt="ChatGPT Image Jan 18, 2026, 05_58_05 PM" src="https://github.com/user-attachments/assets/8bd8674a-a7b3-45b9-8b64-4689e6192bb3" />




## Components

<img width="466" height="818" alt="image" src="https://github.com/user-attachments/assets/af9cdfc5-f303-4bcc-9523-88f75854618e" />


## Env Variables

```bash
VITE_SUPABASE_PROJECT_ID=""

VITE_SUPABASE_PUBLISHABLE_KEY=""

VITE_SUPABASE_URL=""

VITE_WALLETCONNECT_PROJECT_ID="

VITE_VALIDATION_CLOUD_RPC_URL=""

VITE_PYTH_PRICE_SERVICE_URL="""
```




## Solidity contracts

```bash

cd MezoSync

# 1. Install dependencies
npm install
npm install --save-dev @nomicfoundation/hardhat-ethers ethers dotenv

# 2. Create environment file
echo PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE > .env

# 3. Compile contracts
npx hardhat compile

# 4. Deploy to Mezo
npx hardhat run scripts/deploy.ts --network mezo

```

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/rohithr8484/MezoSync.git
cd MezoSync

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173`

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Development build
npm run build:dev

# Preview production build
npm run preview

# Linting
npm run lint
```

## 🧠 Contracts and Addresses

## 1. Pyth Network Oracle

**Pyth Price Service:** https://hermes.pyth.network

**Contract Address:**  
`0x2880aB155794e7179c9eE2e38200202908C17B43`  
*(Mainnet & Testnet)*

**Type:**  
Price Feed Oracle

**Purpose:**  
Provides real-time price feeds for crypto assets.

**Supported Feeds:**

| Asset Pair | Feed Address |
|-------------|--------------|
| **BTC/USD** | `0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43` |
| **MUSD/USD** | `0x0617a9b725011a126a2b9fd53563f4236501f32cf76d877644b943394606c6de` |


---

## 2. Mezo Network Configuration

**Network Name:** Mezo Network  

Connect your wallet to Mezo Testnet (RPC: https://rpc.test.mezo.org, chain ID 31611).

Get BTC + MEZO from faucet ( https://faucet.test.mezo.org/ )

Open Mezo website (testnet) 

Deposit testnet BTC as collateral 

Borrow → Mint MUSD 

MUSD appears in your wallet 

**Block Explorer:**  
[https://explorer.mezo.org](https://explorer.mezo.org)

**Boar RPC Endpoints:**
- **HTTP:** `https://rpc-http.mezo.boar.network/` (via Boar Network)  
- **WSS:** `wss://rpc-ws.mezo.boar.network/` (via Boar Network)



## 3. Validation Cloud
**RPC URL :** https://mainnet.mezo.validationcloud.io/v1/bAhV9XJtsdARW9zbkmH_F0sUiVtbDlLry6plga8Xw1M

## Usage

## 🛡 Built on Trust & Security

Our platform leverages the security and efficiency of:
- **Mezo Network** - For fast, low-cost transactions
- **MUSD Stablecoin** - For price stability and reliability
- **Bitcoin Security** - Through integrated wallet support

## 💡 Core Principles

- **Simplicity** - Manage your MUSD without complexity
- **Accessibility** - Financial services for everyone
- **Transparency** - Clear fees and operations
- **Security** - Built on proven blockchain technology

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests or open issues to help improve Simple Financial Services.

## 📄 License

This project is proprietary. Please contact the maintainers for access and usage information.

---

**Simple Financial Services** - Modern banking, simplified. Built on Mezo and MUSD. 🚀

*Making financial services accessible to everyone through blockchain technology*
