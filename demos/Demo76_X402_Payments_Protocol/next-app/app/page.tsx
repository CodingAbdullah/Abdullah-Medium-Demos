"use client";

import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import x402Abi from "../contracts/X402_Protocol_USDC.json";
import { Status, Toast } from "../utils/types";
import {
  CONTRACT_ADDRESS,
  USDC_ADDRESS,
  BASE_SEPOLIA_CHAIN_ID,
  USDC_APPROVE_ABI,
  PRICE,
  LOADING_STATUSES,
  STATUS_LABELS,
} from "../utils/constants";

// Home page used for the demo of the x402 payments protocol
export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [txHash, setTxHash] = useState("");
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  // Toast messages for contract address copies
  const showToast = (text: string, ok: boolean) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 2500);
  };

  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      showToast("Smart Contract Address Copied", true);
    } 
    catch {
      showToast("Error Copying Smart Contract Address", false);
    }
  };

  const reset = () => {
    setStatus("idle");
    setMessage("");
    setTxHash("");
    setErrorCode(null);
  };

  // Initiate the stablecoin payment process
  const handlePay = async () => {
    reset();

    const ethereum = (
      window as unknown as {
        ethereum?: { request: (a: { method: string; params?: unknown[] }) => Promise<unknown> };
      }
    ).ethereum;

    if (!ethereum) {
      setStatus("error");
      setMessage("No wallet detected. Please install MetaMask.");
      return;
    }

    try {
      // 1. Connect wallet
      setStatus("connecting");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = new BrowserProvider(ethereum as any);
      await provider.send("eth_requestAccounts", []);

      // 2. Switch to Base Sepolia
      setStatus("switching");
      try {
        await provider.send("wallet_switchEthereumChain", [{ chainId: BASE_SEPOLIA_CHAIN_ID }]);
      } 
      catch (switchErr: unknown) {
        const err = switchErr as { code?: number };
        if (err.code === 4902) {
          await provider.send("wallet_addEthereumChain", [
            {
              chainId: BASE_SEPOLIA_CHAIN_ID,
              chainName: "Base Sepolia Testnet",
              nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
              rpcUrls: ["https://sepolia.base.org"],
              blockExplorerUrls: ["https://sepolia.basescan.org"],
            },
          ]);
        } 
        else {
          throw switchErr;
        }
      }

      const signer = await provider.getSigner();

      // 3. Approve the X402Protocol contract to spend 0.05 USDC on the user's behalf
      //    (required because the contract calls usdc.transferFrom internally)
      setStatus("approving");
      const usdc = new Contract(USDC_ADDRESS, USDC_APPROVE_ABI, signer);
      const approveTx = await usdc.approve(CONTRACT_ADDRESS, PRICE);
      await approveTx.wait();

      // 4. Call pay() on the X402Protocol contract
      //    The contract transfers USDC from the user to its receiver and emits PaymentReceived
      setStatus("paying");
      const x402 = new Contract(CONTRACT_ADDRESS, x402Abi, signer);
      const tx = await x402.pay();
      setTxHash(tx.hash);

      // 5. Wait for on-chain confirmation
      setStatus("confirming");
      await tx.wait();

      // 6. Call the protected API — x402 flow: submit tx hash as payment proof
      setStatus("verifying");
      const res = await fetch("/api/resource", {
        headers: { "x-payment-tx-hash": tx.hash },
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
      } 
      else {
        setStatus("error");
        setErrorCode(res.status);
        setMessage(data.error);
      }
    } 
    catch (err: unknown) {
      const e = err as { code?: number; message?: string };
      if (e.code === 4001) {
        setStatus("error");
        setMessage("Transaction rejected by user.");
      } 
      else {
        setStatus("error");
        setMessage(e.message || "An unexpected error occurred.");
      }
    }
  };

  const isLoading = (LOADING_STATUSES as readonly string[]).includes(status);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div className="text-center space-y-1">
          <p className="text-xs font-mono text-blue-400 uppercase tracking-widest">x402 Payment Protocol</p>
          <h1 className="text-2xl font-bold text-white">Pay-per-Request Demo</h1>
          <p className="text-sm text-gray-400">
            Pay <span className="text-white font-semibold">0.05 USDC</span> on Base Sepolia to access the protected resource.
          </p>
        </div>

        {/* Info card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-2 text-xs font-mono text-gray-400">
          <div className="flex justify-between">
            <span>Network</span>
            <span className="text-blue-400">Base Sepolia</span>
          </div>
          <div className="flex justify-between">
            <span>Token</span>
            <span className="text-white">USDC</span>
          </div>
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="text-white">0.05 USDC</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Contract</span>
            <button
              onClick={copyContract}
              title="Click to copy"
              className="text-gray-300 break-all text-left hover:text-white transition-colors cursor-pointer"
            >
              {CONTRACT_ADDRESS}
            </button>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-xs font-mono shadow-lg transition-all
              ${toast.ok ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"}`}
          >
            {toast.text}
          </div>
        )}

        {/* Status / Result area */}
        {status !== "idle" && (
          <div
            className={`rounded-xl border p-4 text-sm font-mono ${
              status === "success"
                ? "bg-green-950 border-green-800 text-green-300"
                : status === "error"
                ? "bg-red-950 border-red-800 text-red-300"
                : "bg-gray-900 border-gray-700 text-gray-300"
            }`}
          >
            {isLoading && (
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span>{STATUS_LABELS[status]}</span>
              </div>
            )}

            {status === "success" && (
              <div className="space-y-1">
                <p className="text-green-400 font-bold text-base">200 OK — Resource Unlocked</p>
                <p className="text-2xl font-bold text-white mt-1">{message}</p>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-1">
                {errorCode && (
                  <p className="text-red-400 font-bold text-base">{errorCode} Payment Required</p>
                )}
                <p>{message}</p>
              </div>
            )}

            {txHash && (
              <p className="mt-2 text-gray-500 break-all">
                tx:{" "}
                <a
                  href={`https://sepolia.basescan.org/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  {txHash}
                </a>
              </p>
            )}
          </div>
        )}

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={isLoading}
          className="w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all
            bg-blue-600 hover:bg-blue-500 text-white
            disabled:opacity-50 disabled:cursor-not-allowed
            active:scale-[0.98]"
        >
          {isLoading ? "Processing..." : "Pay 0.05 USDC & Access Resource"}
        </button>

        {/* x402 protocol note */}
        <p className="text-center text-xs text-gray-600">
          No payment → server returns <span className="text-gray-400">402</span>.
          Valid tx hash → server verifies on-chain and returns the resource.
        </p>
      </div>
    </div>
  );
}
