/**
 * Contract addresses configuration
 * Centralized location for all contract addresses
 */

export const CONTRACT_ADDRESSES = {
  // Celo Mainnet registry address with hardcoded fallback to ensure functionality
  ClearFundRegistry:
    process.env.NEXT_PUBLIC_CLEARFUND_REGISTRY_ADDRESS ||
    '0x492D1E598Dd031Cf83a18A802eCD31905dD52BA5',
}

