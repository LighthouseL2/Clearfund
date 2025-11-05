"use client"

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESSES, CLEARFUND_REGISTRY_ABI } from '@/lib/contracts'
import { useNetworkEnforcer } from './useNetworkEnforcer'

/**
 * Generic contract read hook
 * Reusable for any contract function
 * @param {string} functionName - Contract function name
 * @param {Array} args - Function arguments
 * @param {boolean} enabled - Whether to enable the query
 * @returns {Object} Query result
 */
export function useContractRead(functionName, args = [], enabled = true) {
  const { isCorrectNetwork } = useNetworkEnforcer()

  return useReadContract({
    address: CONTRACT_ADDRESSES.ClearFundRegistry,
    abi: CLEARFUND_REGISTRY_ABI,
    functionName,
    args,
    // Only enable if on correct network and contract is configured
    enabled: enabled && isCorrectNetwork && !!CONTRACT_ADDRESSES.ClearFundRegistry,
  })
}

/**
 * Generic contract write hook
 * Handles contract write transactions with receipt waiting
 * Automatically enforces network requirements via useNetworkEnforcer
 * @returns {Object} Write transaction state and execute function
 */
export function useContractWrite() {
  const { executeWithNetworkCheck, isSwitching } = useNetworkEnforcer()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError
  } = useWaitForTransactionReceipt({
    hash,
  })

  /**
   * Execute a contract write function
   * Network validation is handled automatically by executeWithNetworkCheck
   * @param {string} functionName - Contract function name
   * @param {Array} args - Function arguments
   * @returns {Promise<void>}
   * @throws {Error} If contract not configured, network switch fails, or user declines switch
   */
  const execute = async (functionName, args) => {
    if (!CONTRACT_ADDRESSES.ClearFundRegistry) {
      throw new Error('Contract address not configured')
    }

    // executeWithNetworkCheck handles network validation and auto-switching
    await executeWithNetworkCheck(async () => {
      await writeContract({
        address: CONTRACT_ADDRESSES.ClearFundRegistry,
        abi: CLEARFUND_REGISTRY_ABI,
        functionName,
        args,
      })
    })
  }

  return {
    execute,
    hash,
    isPending,
    isConfirming,
    isConfirmed: isConfirmed && !!receipt,
    error: error || receiptError,
    receipt,
    isSwitching,
  }
}

