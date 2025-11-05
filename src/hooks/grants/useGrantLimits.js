"use client"

import { useContractRead } from '@/hooks/web3/useContract'
import { useWallet } from '@/hooks/web3/useWallet'

/**
 * Fetches grant limits for current user
 * Single responsibility: get limit data
 * @returns {Object} Grant limit information
 */
export function useGrantLimits() {
  const { address } = useWallet()
  
  const { data: grantCount } = useContractRead('submitterGrantCount', [address], !!address)
  const { data: maxGrants } = useContractRead('MAX_GRANTS_PER_SUBMITTER', [], true)
  const { data: lastSubmission } = useContractRead('lastSubmissionTime', [address], !!address)
  const { data: minInterval } = useContractRead('MIN_SUBMISSION_INTERVAL', [], true)
  const { data: minDeadlineDuration } = useContractRead('MIN_DEADLINE_DURATION', [], true)
  
  return {
    grantCount: grantCount ? Number(grantCount) : 0,
    maxGrants: maxGrants ? Number(maxGrants) : 10,
    lastSubmission: lastSubmission ? Number(lastSubmission) : 0,
    minInterval: minInterval ? Number(minInterval) : 3600,
    minDeadlineDuration: minDeadlineDuration ? Number(minDeadlineDuration) : 604800,
  }
}

