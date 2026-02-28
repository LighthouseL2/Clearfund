"use client"

import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useGrantSubmission } from '@/hooks/grants/useGrantSubmission'
import { useIPFSUpload } from '@/hooks/ipfs/useIPFSUpload'
import { useGrantLimits } from '@/hooks/grants/useGrantLimits'
import { formatMinDeadlineDate } from '@/lib/services/grant.service'
import { GrantFormFields } from './GrantFormFields'
import { GrantLimitIndicator } from './GrantLimitIndicator'
import { TransactionSuccessModal } from './TransactionSuccessModal'

/**
 * Main form component - orchestrates all pieces
 * Thin component that composes smaller pieces
 * @param {Object} props - Component props
 * @param {Function} [props.onSuccess] - Success callback
 * @param {Function} [props.onCancel] - Cancel callback
 */
export function GrantSubmissionForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    deadline: '',
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { login } = usePrivy()
  const [shouldSubmitAfterLogin, setShouldSubmitAfterLogin] = useState(false)

  useEffect(() => {
    if (isConnected && shouldSubmitAfterLogin) {
      setShouldSubmitAfterLogin(false)
      handleSubmit()
    }
  }, [isConnected, shouldSubmitAfterLogin])

  const { uploadFile, isUploading, uploadedCID, uploadError, reset: resetUpload } = useIPFSUpload()
  const limits = useGrantLimits()
  const {
    submitGrant,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    validationErrors,
    isConnected,
    isSwitching,
    hash,
    receipt
  } = useGrantSubmission()

  // Handle successful transaction confirmation
  useEffect(() => {
    if (isConfirmed && hash) {
      // Show success modal instead of closing immediately
      setShowSuccessModal(true)
    }
  }, [isConfirmed, hash])

  // Handle closing the success modal
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    // Reset form after user closes the modal
    setFormData({ title: '', url: '', deadline: '' })
    resetUpload()
    onSuccess?.()
  }

  const handleFileChange = async (file) => {
    if (!file) return

    try {
      await uploadFile(file)
    } catch (error) {
      console.error('Upload failed:', error)
      // Error is already handled in useIPFSUpload hook
    }
  }

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()

    if (!isConnected) {
      setShouldSubmitAfterLogin(true)
      login()
      return
    }

    // if (!uploadedCID) {
    //   alert('Please upload an image first')
    //   return
    // }

    try {
      await submitGrant(formData, uploadedCID, limits)
      // Network validation and switching is handled automatically in useContractWrite
      // Don't reset here - let useEffect handle it when isConfirmed changes
    } catch (error) {
      console.error('Submission failed:', error)
      // Error is already handled in useGrantSubmission hook
    }
  }

  const minDeadline = formatMinDeadlineDate(limits.minDeadlineDuration)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <GrantFormFields
        formData={formData}
        onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
        errors={validationErrors}
        minDeadline={minDeadline}
      />

      <div className="mb-8">
        <label className="block text-sm font-medium mb-1">Grant Image (Optional)</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border rounded-[5px] p-2 text-sm"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              handleFileChange(file)
            }
          }}
        />
        {isUploading && (
          <p className="text-xs text-gray-500 mt-1">Uploading to IPFS...</p>
        )}
        {uploadedCID && (
          <p className="text-xs text-green-600 mt-1">
            Uploaded: {uploadedCID.substring(0, 20)}...
          </p>
        )}
        {uploadError && (
          <p className="text-red-500 text-xs mt-1">{uploadError}</p>
        )}
        {validationErrors.image && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.image}</p>
        )}
      </div>

      <GrantLimitIndicator
        grantCount={limits.grantCount}
        maxGrants={limits.maxGrants}
      />

      {validationErrors.limits && (
        <p className="text-red-500 text-sm mb-4">{validationErrors.limits}</p>
      )}

      <p className="text-[10px] text-[#000000]/50 mb-8">
        Please note that grant will only be added after verification.
      </p>

      <div className="flex justify-between mb-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-full border border-gray-400 text-gray-600 disabled:opacity-50"
          disabled={isPending || isConfirming || isConfirmed}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-[#39B54A] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending || isConfirming || isUploading || isSwitching}
        >
          {isSwitching ? 'Switching network...' : isPending ? 'Sending transaction...' : isConfirming ? 'Confirming transaction...' : 'Submit'}
        </button>
      </div>

      {error && (
        <div className="text-red-600 text-sm mt-2">
          Error: {error.message || 'Transaction failed'}
        </div>
      )}

      {showSuccessModal && hash && receipt && (
        <TransactionSuccessModal
          hash={hash}
          receipt={receipt}
          onClose={handleCloseSuccessModal}
        />
      )}
    </form>
  )
}

