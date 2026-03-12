"use client"

import { useState } from 'react'
import { CheckCircle, Copy, ExternalLink, X } from 'lucide-react'

/**
 * Transaction Success Modal
 * Displays transaction receipt details with block explorer link and copy functionality
 *
 * @param {Object} props - Component props
 * @param {string} props.hash - Transaction hash
 * @param {Object} props.receipt - Transaction receipt object
 * @param {Function} props.onClose - Callback when modal is closed
 */
export function TransactionSuccessModal({ hash, receipt, onClose }) {
  const [copiedField, setCopiedField] = useState(null)

  // Celo Mainnet block explorer
  const BLOCK_EXPLORER_URL = 'https://celoscan.io'
  const txUrl = hash ? `${BLOCK_EXPLORER_URL}/tx/${hash}` : null

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      // Clear the "copied" state after 2 seconds
      setTimeout(() => setCopiedField(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const formatHash = (hash, chars = 6) => {
    if (!hash) return ''
    return `${hash.slice(0, chars)}...${hash.slice(-chars)}`
  }

  return (
    <div className="fixed inset-0 bg-[#003E52]/40 backdrop-blur-sm flex items-center justify-center z-[300] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] max-w-sm w-full shadow-2xl overflow-hidden text-center p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-[#00AFAA]/10 rounded-full flex items-center justify-center animate-bounce duration-1000">
            <CheckCircle className="w-12 h-12 text-[#00AFAA]" />
          </div>
        </div>

        {/* Messaging */}
        <h2 className="text-2xl font-black text-[#003E52] mb-3">Project submitted successfully</h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-10">
          Your proposal has been recorded on the blockchain. Our team will review it shortly.
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-[#00AFAA] text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-[#003E52] transition-all shadow-lg shadow-[#00AFAA]/20"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
