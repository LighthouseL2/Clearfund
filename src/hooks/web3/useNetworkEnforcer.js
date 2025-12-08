"use client"

import { useCallback } from "react"
import { useNetworkCheck } from "./useNetworkCheck"

/**
 * Network Enforcer Hook
 * Wraps contract execution to enforce network requirements
 * Automatically switches user to correct network before contract interactions
 *
 * Reusable across the entire app for any blockchain interaction
 *
 * @returns {Object} Network enforcement utilities
 * - executeWithNetworkCheck: Wraps async function with network validation and auto-switch
 * - isCorrectNetwork: Current network status
 * - isSwitching: Whether network switch is in progress
 */
export function useNetworkEnforcer() {
  const { isCorrectNetwork, switchToCelo, isSwitching } = useNetworkCheck()

  /**
   * Executes a blockchain operation only after ensuring user is on correct network
   * If not on correct network, automatically prompts wallet to switch
   *
   * @param {Function} asyncFn - The async function to execute (contract call, etc.)
   * @param {Object} options - Configuration options
   * @param {boolean} options.silent - If true, silently fail on network switch failure
   * @returns {Promise<any>} Result of the async function
   * @throws {Error} If network switch fails and silent is false
   */
  const executeWithNetworkCheck = useCallback(
    async (asyncFn, options = {}) => {
      const { silent = false } = options

      // If already on correct network, just execute
      if (isCorrectNetwork) {
        return await asyncFn()
      }

      // Not on correct network - need to switch
      try {
        // Show confirmation dialog to user
        const shouldSwitch = window.confirm(
          'You are not on Celo Mainnet. Your transaction requires you to be on Celo Mainnet. Click OK to switch now, or Cancel to abort the transaction.'
        )

        if (!shouldSwitch) {
          const error = new Error('User declined network switch')
          error.code = 'NETWORK_SWITCH_DECLINED'
          throw error
        }

        // Attempt to switch network
        const switched = await switchToCelo()
        if (!switched) {
          const error = new Error('Failed to switch to Celo Mainnet. Please switch manually in your wallet.')
          error.code = 'NETWORK_SWITCH_FAILED'
          throw error
        }

        // Wait for network switch to propagate
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Execute the function after successful switch
        return await asyncFn()
      } catch (error) {
        if (silent) {
          console.error('Network enforcement error:', error)
          return null
        }
        throw error
      }
    },
    [isCorrectNetwork, switchToCelo]
  )

  return {
    executeWithNetworkCheck,
    isCorrectNetwork,
    isSwitching,
  }
}
