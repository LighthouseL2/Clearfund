/**
 * Contract addresses configuration
 * Centralized location for all contract addresses
 */

export const CONTRACT_ADDRESSES = {
  // Celo Sepolia testnet registry address with hardcoded fallback to ensure functionality
  ClearFundRegistry:
    process.env.NEXT_PUBLIC_CLEARFUND_REGISTRY_ADDRESS ||
    '0xDA79ADdD7a2191b8484D1f02E9138625ACbE9Ea8',
}

