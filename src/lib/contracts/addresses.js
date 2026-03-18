/**
 * Contract addresses configuration
 * Centralized location for all contract addresses
 */

export const CONTRACT_ADDRESSES = {
  // Celo Mainnet registry address with hardcoded fallback to ensure functionality
  ClearFundRegistry:
    process.env.NEXT_PUBLIC_CLEARFUND_REGISTRY_ADDRESS ||
    '0x5B4315aF4ded441879bed976C86FbF13480AbD75',
}

