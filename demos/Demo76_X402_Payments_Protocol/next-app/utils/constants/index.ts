export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
export const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS!;

// Base Sepolia chain id in hex (84532)
export const BASE_SEPOLIA_CHAIN_ID = "0x14a34";

// Minimal USDC ABI — only approve() needed to allow the contract to call transferFrom
export const USDC_APPROVE_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
];

// 0.05 USDC in raw units (6 decimals)
export const PRICE = BigInt(50000);

// Statuses that indicate an in-progress operation
export const LOADING_STATUSES = [
  "connecting",
  "switching",
  "approving",
  "paying",
  "confirming",
  "verifying",
] as const;

// Human-readable label for each loading status
export const STATUS_LABELS: Record<string, string> = {
  connecting: "Connecting wallet...",
  switching: "Switching to Base Sepolia...",
  approving: "Approve USDC spending in your wallet...",
  paying: "Confirm the pay() transaction in your wallet...",
  confirming: "Waiting for on-chain confirmation...",
  verifying: "Verifying payment with server...",
};
