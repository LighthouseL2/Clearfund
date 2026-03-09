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
    tagline: '',
    description: '',
    category: 'SOCIAL_IMPACT',
    walletAddress: '',
    url: '',
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { login } = usePrivy()
  const [shouldSubmitAfterLogin, setShouldSubmitAfterLogin] = useState(false)

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

  useEffect(() => {
    if (isConnected && shouldSubmitAfterLogin) {
      setShouldSubmitAfterLogin(false)
      handleSubmit()
    }
  }, [isConnected, shouldSubmitAfterLogin])

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
    setFormData({
      title: '',
      tagline: '',
      description: '',
      category: 'SOCIAL_IMPACT',
      walletAddress: '',
      url: ''
    })
    resetUpload()
    onSuccess?.()
  }

  const handleFileChange = async (file) => {
    if (!file) return

    try {
      await uploadFile(file)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()

    if (!isConnected) {
      setShouldSubmitAfterLogin(true)
      login()
      return
    }

    try {
      // 1. Blockchain Submission
      await submitGrant(formData, uploadedCID, limits)

      // 2. Database Sync (for immediate feed visibility)
      // Since we want it immediate, we'll sync it to the DB as APPROVED
      const dbPayload = {
        name: formData.title,
        tagline: formData.tagline,
        description: formData.description,
        category: formData.category,
        logo: uploadedCID ? `https://ipfs.io/ipfs/${uploadedCID}` : "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
        walletAddress: formData.walletAddress,
        website: formData.url,
        status: 'APPROVED'
      };

      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbPayload)
      });

    } catch (error) {
      console.error('Submission failed:', error)
    }
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <GrantFormFields
        formData={formData}
        onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
        errors={validationErrors}
      />

      <div className="mb-8">
        <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">Project Image (Optional)</label>
        <div className="relative group">
          <input
            type="file"
            accept="image/*"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA] transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:bg-[#00AFAA] file:text-white hover:file:bg-[#003E52]"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                handleFileChange(file)
              }
            }}
          />
        </div>
        {isUploading && (
          <p className="text-xs text-[#00AFAA] mt-2 font-bold animate-pulse">Uploading to IPFS...</p>
        )}
        {uploadedCID && (
          <p className="text-xs text-green-600 mt-2 font-bold">
            ✓ Image verified on IPFS
          </p>
        )}
        {uploadError && (
          <p className="text-red-500 text-xs mt-2">{uploadError}</p>
        )}
      </div>


      <p className="text-[11px] text-gray-400 font-medium mb-8 leading-relaxed">
        Your project will be submitted both to the blockchain and our discovery feed. Ensure all details are accurate.
      </p>

      <div className="flex justify-between items-center gap-4 mt-10">
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all flex-1"
          disabled={isPending || isConfirming}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-[#00AFAA] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#003E52] transition-all shadow-lg flex-1 disabled:opacity-50"
          disabled={isPending || isConfirming || isUploading || isSwitching}
        >
          {isSwitching ? 'Switching...' : isPending ? 'Securing...' : isConfirming ? 'Finalizing...' : 'Submit Project'}
        </button>
      </div>

      {error && (
        <div className="text-red-600 text-[11px] mt-4 font-bold bg-red-50 p-4 rounded-xl border border-red-100">
          Submission failed: {error.message || 'Check your wallet or inputs'}
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
