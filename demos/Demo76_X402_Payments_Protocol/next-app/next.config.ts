import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Next.js from bundling ethers for the server — use Node.js native resolution
  serverExternalPackages: ["ethers"],
};

export default nextConfig;
