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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Transaction Successful!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Transaction Hash */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Hash
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 rounded px-3 py-2 border border-gray-200">
                <p className="text-sm font-mono text-gray-600 break-all">
                  {formatHash(hash)}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(hash, 'hash')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title="Copy transaction hash"
              >
                <Copy className={`w-4 h-4 ${copiedField === 'hash' ? 'text-green-600' : ''}`} />
              </button>
            </div>
            {copiedField === 'hash' && (
              <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>
            )}
          </div>

          {/* Block Number (if available) */}
          {receipt?.blockNumber && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Block Number
              </label>
              <div className="bg-gray-50 rounded px-3 py-2 border border-gray-200">
                <p className="text-sm font-mono text-gray-600">
                  {receipt.blockNumber.toString()}
                </p>
              </div>
            </div>
          )}

          {/* Gas Used (if available) */}
          {receipt?.gasUsed && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gas Used
              </label>
              <div className="bg-gray-50 rounded px-3 py-2 border border-gray-200">
                <p className="text-sm font-mono text-gray-600">
                  {receipt.gasUsed.toString()}
                </p>
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <p className="text-sm font-medium text-green-600">
                {receipt?.status === 1 ? 'Confirmed' : 'Pending'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t bg-gray-50">
          {txUrl && (
            <a
              href={txUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              View on Celoscan
            </a>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Close
          </button>
        </div>

        {/* Disclaimer */}
        <div className="px-6 pb-6 pt-0">
          <p className="text-xs text-gray-500 text-center">
            Your grant submission has been recorded on the blockchain.
            It will be verified and added to our platform after review.
          </p>
        </div>
      </div>
    </div>
  )
}
