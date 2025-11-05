"use client"

import { useState } from 'react'
import { uploadFileToIPFS } from '@/lib/services/ipfs.service'

/**
 * Handles IPFS file upload
 * Single responsibility: manage upload state
 * @returns {Object} Upload state and upload function
 */
export function useIPFSUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [uploadedCID, setUploadedCID] = useState(null)
  
  /**
   * Upload file to IPFS
   * @param {File} file - File to upload
   * @returns {Promise<string>} IPFS CID
   */
  const uploadFile = async (file) => {
    setIsUploading(true)
    setUploadError(null)
    setUploadedCID(null)
    
    try {
      const cid = await uploadFileToIPFS(file)
      setUploadedCID(cid)
      return cid
    } catch (error) {
      const errorMessage = error.message || 'Failed to upload file'
      setUploadError(errorMessage)
      throw error
    } finally {
      setIsUploading(false)
    }
  }
  
  /**
   * Reset upload state
   */
  const reset = () => {
    setIsUploading(false)
    setUploadError(null)
    setUploadedCID(null)
  }
  
  return {
    uploadFile,
    isUploading,
    uploadError,
    uploadedCID,
    reset,
  }
}

