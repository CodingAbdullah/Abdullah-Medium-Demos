import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const REQUIRED_AMOUNT = BigInt(50000); // 0.05 USDC (6 decimals)
const RPC_URL = process.env.BASE_SEPOLIA_RPC || "https://sepolia.base.org";

// Matches the PaymentReceived event in X402_Protocol_USDC.sol
const PAYMENT_EVENT_ABI = [
  "event PaymentReceived(address indexed user, uint256 amount)",
];

export async function GET(req: NextRequest) {
  const txHash = req.headers.get("x-payment-tx-hash");

  // No payment header → 402 with requirements
  if (!txHash) {
    return NextResponse.json(
      {
        error: "Payment Required",
        paymentDetails: {
          protocol: "x402",
          network: "base-sepolia",
          chainId: 84532,
          token: "USDC",
          contractAddress: CONTRACT_ADDRESS,
          amount: "0.05",
          amountRaw: "50000",
          decimals: 6,
          steps: ["approve USDC for contract", "call pay()"],
        },
      },
      { status: 402 }
    );
  }

  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!receipt) {
      return NextResponse.json(
        { error: "Transaction not found on Base Sepolia" },
        { status: 402 }
      );
    }

    // Decode PaymentReceived events emitted by the X402Protocol contract
    const iface = new ethers.Interface(PAYMENT_EVENT_ABI);
    let paymentVerified = false;

    for (const log of receipt.logs) {
      if (log.address.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) continue;
      try {
        const parsed = iface.parseLog({
          topics: log.topics as string[],
          data: log.data,
        });
        if (
          parsed?.name === "PaymentReceived" &&
          BigInt(parsed.args.amount) >= REQUIRED_AMOUNT
        ) {
          paymentVerified = true;
          break;
        }
      } catch {
        // log is not a PaymentReceived event — skip
      }
    }

    if (!paymentVerified) {
      return NextResponse.json(
        { error: "Payment verification failed — PaymentReceived event not found or amount insufficient" },
        { status: 402 }
      );
    }

    // Payment confirmed → return the protected resource
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
  } 
  catch {
    return NextResponse.json(
      { error: "Failed to verify transaction on-chain" },
      { status: 402 }
    );
  }
}
