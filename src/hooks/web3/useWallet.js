"use client"

import { useAccount } from 'wagmi'
import { useWallets } from '@privy-io/react-auth'

/**
 * Single source of truth for wallet address
 * Combines Wagmi and Privy wallet addresses
 * @returns {{address: string|null, isConnected: boolean}}
 */
export function useWallet() {
  const { address: wagmiAddress } = useAccount()
  const { wallets } = useWallets()
  const privyAddress = wallets[0]?.address
  
  return {
    address: wagmiAddress || privyAddress || null,
    isConnected: !!(wagmiAddress || privyAddress),
  }
}

