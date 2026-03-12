"use client"

import { useContractRead } from '@/hooks/web3/useContract'
import { useWallet } from '@/hooks/web3/useWallet'

/**
 * Fetches all projects submitted by the current user
 * Updated for V2.3 (Project terminology)
 * @returns {Object} Projects list and loading state
 */
export function useUserProjects() {
    const { address } = useWallet()

    const {
        data: projects,
        isLoading,
        error,
        refetch
    } = useContractRead('getProjectsBySubmitter', [address], !!address)

    return {
        projects: projects || [],
        isLoading,
        error,
        refetch
    }
}
