"use client"

import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useProjectSubmission } from '@/hooks/projects/useProjectSubmission'
import { useIPFSUpload } from '@/hooks/ipfs/useIPFSUpload'
import { useProjectLimits } from '@/hooks/projects/useProjectLimits'
import { ProjectFormFields } from './ProjectFormFields'
import { TransactionSuccessModal } from './TransactionSuccessModal'

/**
 * Main form component for project submission
 * Updated for V2.2 (Compulsory Banner + Logo + optional Milestones)
 * Renamed from GrantSubmissionForm
 */
export function ProjectSubmissionForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'CLIMATE',
    walletAddress: '',
    url: '',
    location: '',
    twitter: '',
    github: '',
    karmaLink: '',
    impactDescription: '',
    milestones: '',
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { login } = usePrivy()
  const [shouldSubmitAfterLogin, setShouldSubmitAfterLogin] = useState(false)

  // Separate upload hooks
  const logoUpload = useIPFSUpload();
  const bannerUpload = useIPFSUpload();

  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const limits = useProjectLimits()
  const {
    submitProject,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    validationErrors,
    isConnected,
    isSwitching,
    hash,
    receipt
  } = useProjectSubmission()

  useEffect(() => {
    if (isConnected && shouldSubmitAfterLogin) {
      setShouldSubmitAfterLogin(false)
      handleSubmit()
    }
  }, [isConnected, shouldSubmitAfterLogin])

  useEffect(() => {
    if (isConfirmed && hash) {
      setShowSuccessModal(true)
    }
  }, [isConfirmed, hash])

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    setFormData({
      title: '',
      description: '',
      category: 'CLIMATE',
      walletAddress: '',
      url: '',
      location: '',
      twitter: '',
      github: '',
      karmaLink: '',
      impactDescription: '',
      milestones: '',
    })
    setLogoFile(null);
    setBannerFile(null);
    logoUpload.reset();
    bannerUpload.reset();
    onSuccess?.()
  }

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()

    if (!isConnected) {
      setShouldSubmitAfterLogin(true)
      login()
      return
    }

    if (!bannerFile) {
      alert("Project Banner Image is compulsory.");
      return;
    }

    try {
      // 1. Upload assets to IPFS
      let logoCID = "QmZ8P8P1f8P1f8P1f8P1f8P1f8P1f8P1f8P1f8P1f8P1f8"; // Default placeholder CID
      if (logoFile) {
        logoCID = await logoUpload.uploadFile(logoFile);
      }
      const bannerCID = await bannerUpload.uploadFile(bannerFile);

      // 2. Blockchain Submission (V2.2/2.3)
      await submitProject(formData, [logoCID, bannerCID], limits)

      // 3. Database Sync
      const dbPayload = {
        name: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        website: formData.url,
        twitter: formData.twitter,
        github: formData.github,
        karmaLink: formData.karmaLink,
        milestones: formData.milestones,
        impactDescription: formData.impactDescription,
        logo: `https://ipfs.io/ipfs/${logoCID}`,
        banner: `https://ipfs.io/ipfs/${bannerCID}`,
        walletAddress: formData.walletAddress,
        status: 'PENDING'
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

  const isUploading = logoUpload.isUploading || bannerUpload.isUploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ProjectFormFields
        formData={formData}
        onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
        errors={validationErrors}
      />

      {/* Asset Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div>
          <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">Project Logo (Optional)</label>
          <input
            type="file"
            accept="image/*"
            className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-[#00AFAA] file:text-white ${logoFile ? 'border-[#00AFAA] bg-[#00AFAA]/5' : ''}`}
            onChange={(e) => setLogoFile(e.target.files?.[0])}
          />
          {logoUpload.isUploading && <p className="text-[10px] text-[#00AFAA] mt-1 font-bold animate-pulse">Uploading Logo...</p>}
        </div>

        <div>
          <label className="block text-sm font-black text-[#003E52] uppercase tracking-widest mb-2">Banner Image *</label>
          <input
            type="file"
            accept="image/*"
            className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-[#00AFAA] file:text-white ${bannerFile ? 'border-[#003E52] bg-[#003E52]/5' : ''}`}
            onChange={(e) => setBannerFile(e.target.files?.[0])}
          />
          {bannerUpload.isUploading && <p className="text-[10px] text-[#003E52] mt-1 font-bold animate-pulse">Uploading Banner...</p>}
        </div>
      </div>

      <p className="text-[11px] text-gray-400 font-medium mb-8 leading-relaxed">
        Your project will be submitted both to the blockchain and our discovery feed.
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
          {isSwitching ? 'Switching...' : isUploading ? 'Uploading...' : isPending ? 'Securing...' : isConfirming ? 'Finalizing...' : 'Submit ReFi Project'}
        </button>
      </div>

      {(error || logoUpload.uploadError || bannerUpload.uploadError) && (
        <div className="text-red-600 text-[11px] mt-4 font-bold bg-red-50 p-4 rounded-xl border border-red-100">
          Submission failed: {error?.message || logoUpload.uploadError || bannerUpload.uploadError || 'Check your inputs'}
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
