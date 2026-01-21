// ABI for MezoSyncBills.sol contract
export const BILLS_CONTRACT_ABI = [
  {
    inputs: [{ internalType: "address", name: "_musdToken", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "billId", type: "bytes32" },
      { indexed: true, internalType: "address", name: "creator", type: "address" },
      { indexed: true, internalType: "address", name: "payer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amountMUSD", type: "uint256" },
      { indexed: false, internalType: "uint8", name: "billType", type: "uint8" },
      { indexed: false, internalType: "uint256", name: "dueDate", type: "uint256" },
    ],
    name: "BillCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "billId", type: "bytes32" },
      { indexed: true, internalType: "address", name: "payer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amountMUSD", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "paidAt", type: "uint256" },
    ],
    name: "BillPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "billId", type: "bytes32" },
      { indexed: false, internalType: "uint8", name: "oldStatus", type: "uint8" },
      { indexed: false, internalType: "uint8", name: "newStatus", type: "uint8" },
    ],
    name: "BillStatusUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "billCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "bills",
    outputs: [
      { internalType: "bytes32", name: "billId", type: "bytes32" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "address", name: "payer", type: "address" },
      { internalType: "uint256", name: "amountUSD", type: "uint256" },
      { internalType: "uint256", name: "amountMUSD", type: "uint256" },
      { internalType: "uint8", name: "billType", type: "uint8" },
      { internalType: "uint8", name: "status", type: "uint8" },
      { internalType: "string", name: "customerName", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "uint256", name: "dueDate", type: "uint256" },
      { internalType: "uint256", name: "createdAt", type: "uint256" },
      { internalType: "uint256", name: "paidAt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_payer", type: "address" },
      { internalType: "uint256", name: "_amountUSD", type: "uint256" },
      { internalType: "uint256", name: "_amountMUSD", type: "uint256" },
      { internalType: "uint8", name: "_billType", type: "uint8" },
      { internalType: "string", name: "_customerName", type: "string" },
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "uint256", name: "_dueDate", type: "uint256" },
    ],
    name: "createBill",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "creatorBills",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_billId", type: "bytes32" }],
    name: "getBill",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "billId", type: "bytes32" },
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "address", name: "payer", type: "address" },
          { internalType: "uint256", name: "amountUSD", type: "uint256" },
          { internalType: "uint256", name: "amountMUSD", type: "uint256" },
          { internalType: "uint8", name: "billType", type: "uint8" },
          { internalType: "uint8", name: "status", type: "uint8" },
          { internalType: "string", name: "customerName", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "uint256", name: "dueDate", type: "uint256" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
          { internalType: "uint256", name: "paidAt", type: "uint256" },
        ],
        internalType: "struct MezoSyncBills.Bill",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_creator", type: "address" }],
    name: "getCreatorBills",
    outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_payer", type: "address" }],
    name: "getPayerBills",
    outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_billId", type: "bytes32" }],
    name: "markOverdue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "musdToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_billId", type: "bytes32" }],
    name: "payBill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "payerBills",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// Bill type enum matching Solidity
export enum BillType {
  RENT = 0,
  SAAS = 1,
  UTILITIES = 2,
}

// Bill status enum matching Solidity
export enum BillStatus {
  DRAFT = 0,
  PENDING = 1,
  PAID = 2,
  OVERDUE = 3,
}

// Contract addresses for different networks
export const BILLS_CONTRACT_ADDRESSES = {
  // Mezo Mainnet
  31612: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  // Sepolia Testnet (for development)
  11155111: "0x0000000000000000000000000000000000000000" as `0x${string}`,
} as const;
