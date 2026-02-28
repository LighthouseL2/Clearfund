"use client"

import { useContractRead } from '@/hooks/web3/useContract'
import { useWallet } from '@/hooks/web3/useWallet'

/**
 * Fetches all grants submitted by the current user
 * @returns {Object} Grants list and loading state
 */
export function useUserGrants() {
    const { address } = useWallet()

    const {
        data: grants,
        isLoading,
        error,
        refetch
    } = useContractRead('getGrantsBySubmitter', [address], !!address)

    return {
        grants: grants || [],
        isLoading,
        error,
        refetch
    }
}
