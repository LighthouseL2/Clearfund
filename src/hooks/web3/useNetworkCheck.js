"use client"

import { useEffect, useState } from "react"
import { useAccount, useChainId, useSwitchChain } from "wagmi"
import { celo } from "viem/chains"

/**
 * Network Detection and Switching Hook
 * Ensures user is on Celo Mainnet and provides switch functionality
 *
 * @returns {Object} Network state and control functions
 * - isCorrectNetwork: boolean - whether user is on Celo Mainnet
 * - chainId: number - current chain ID
 * - chainName: string - human-readable chain name
 * - switchToCelo: function - prompts wallet to switch to Celo
 * - isSwitching: boolean - loading state during switch
 * - switchError: Error|null - error from switch attempt
 */
export function useNetworkCheck() {
  const chainId = useChainId()
  const { isConnected } = useAccount()
  const { switchChain, isPending: isSwitching, error: switchError } = useSwitchChain()

  const [chainName, setChainName] = useState("Unknown")

  // Check if current chain is Celo Mainnet
  const isCorrectNetwork = chainId === celo.id

  // Get human-readable chain name
  useEffect(() => {
    if (chainId === celo.id) {
      setChainName("Celo Mainnet")
    } else {
      setChainName(`Chain ${chainId}`)
    }
  }, [chainId])

  // Function to switch to Celo Mainnet
  const switchToCelo = async () => {
    if (!isConnected) {
      console.warn("Wallet not connected. Please connect first.")
      return false
    }

    try {
      // Attempt to switch to Celo
      await switchChain({ chainId: celo.id })
      return true
    } catch (error) {
      console.error("Failed to switch to Celo:", error)
      return false
    }
  }

  return {
    isCorrectNetwork,
    chainId,
    chainName,
    switchToCelo,
    isSwitching,
    switchError,
    celoChainId: celo.id,
    celoName: celo.name,
  }
}
