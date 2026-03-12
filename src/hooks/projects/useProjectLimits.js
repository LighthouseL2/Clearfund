"use client"

import { useContractRead } from '@/hooks/web3/useContract'
import { useWallet } from '@/hooks/web3/useWallet'

/**
 * Fetches project limits for current user
 * Updated for V2.3 (Deadline Removed)
 * @returns {Object} Project limit information
 */
export function useProjectLimits() {
  const { address } = useWallet()

  const { data: projectCount } = useContractRead('submitterProjectCount', [address], !!address)
  const { data: maxProjects } = useContractRead('MAX_PROJECTS_PER_SUBMITTER', [], true)
  const { data: lastSubmission } = useContractRead('lastSubmissionTime', [address], !!address)
  const { data: minInterval } = useContractRead('MIN_SUBMISSION_INTERVAL', [], true)

  return {
    grantCount: projectCount ? Number(projectCount) : 0,
    maxGrants: maxProjects ? Number(maxProjects) : 10,
    lastSubmission: lastSubmission ? Number(lastSubmission) : 0,
    minInterval: minInterval ? Number(minInterval) : 3600,
  }
}
