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
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  // Use a stable public client for estimation
  const { data: receipt, isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError } = useWaitForTransactionReceipt({
    hash,
  })

  const execute = async (functionName, args) => {
    if (!CONTRACT_ADDRESSES.ClearFundRegistry) {
      throw new Error('Contract address not configured')
    }

    try {
      return await executeWithNetworkCheck(async () => {
        // We use createPublicClient directly for gas estimation to be more reliable
        // than the wallet's internal estimation which often fails on Celo
        const { createPublicClient, http } = await import('viem');
        const { celo } = await import('viem/chains');

        const publicClient = createPublicClient({
          chain: celo,
          transport: http("https://1rpc.io/celo")
        });

        console.log(`Estimating gas for ${functionName}...`);
        let gasLimit;
        try {
          const { wallets } = await import('@privy-io/react-auth');
          // This is a bit complex in a hook, but we can try to get the address
          // For now, let's try to estimate without 'account' if possible or use a fallback
          gasLimit = await publicClient.estimateContractGas({
            address: CONTRACT_ADDRESSES.ClearFundRegistry,
            abi: CLEARFUND_REGISTRY_ABI,
            functionName,
            args,
          });
          // Add 30% buffer
          gasLimit = (gasLimit * 130n) / 100n;
        } catch (estimErr) {
          console.warn("Gas estimation failed, using safety fallback:", estimErr);
          gasLimit = 500000n; // Generous fallback for registry operations
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
      console.error(`Contract write error (${functionName}):`, err?.message || err)
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

