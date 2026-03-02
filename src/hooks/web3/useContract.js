"use client"

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { CONTRACT_ADDRESSES, CLEARFUND_REGISTRY_ABI } from '@/lib/contracts'
import { useNetworkEnforcer } from './useNetworkEnforcer'
import { celo } from 'viem/chains'

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
  const { address: userAddress } = useAccount()
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  // Wait for transaction to be mined
  const { data: receipt, isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError } = useWaitForTransactionReceipt({
    hash,
  })

  /**
   * Execute a contract write function
   * @param {string} functionName - Contract function to call
   * @param {Array} args - Arguments to pass to the function
   * @returns {Promise<`0x${string}`>} Transaction hash
   */
  const execute = async (functionName, args) => {
    if (!CONTRACT_ADDRESSES.ClearFundRegistry) {
      throw new Error('Contract address not configured')
    }

    try {
      return await executeWithNetworkCheck(async () => {
        const { createPublicClient, http } = await import('viem');

        // Robust RPC URLs for Celo
        const publicClient = createPublicClient({
          chain: celo,
          transport: http("https://1rpc.io/celo")
        });

        console.log(`Estimating gas for ${functionName}...`);
        let gasLimit;
        try {
          // Explicitly pass account for more accurate estimation
          gasLimit = await publicClient.estimateContractGas({
            address: CONTRACT_ADDRESSES.ClearFundRegistry,
            abi: CLEARFUND_REGISTRY_ABI,
            functionName,
            args,
            account: userAddress,
          });
          // Add 30% buffer
          gasLimit = (gasLimit * 130n) / 100n;
        } catch (estimErr) {
          console.warn("Gas estimation failed, using safety fallback:", estimErr);
          // Standard fallbacks for Registry operations
          if (functionName === 'submitGrant') {
            gasLimit = 600000n;
          } else {
            gasLimit = 400000n;
          }
        }

        const txHash = await writeContractAsync({
          address: CONTRACT_ADDRESSES.ClearFundRegistry,
          abi: CLEARFUND_REGISTRY_ABI,
          functionName,
          args,
          gas: gasLimit,
        })
        return txHash;
      })
    } catch (err) {
      console.error(`Contract write error (${functionName}):`, err?.shortMessage || err?.message || err)
      throw err
    }
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

