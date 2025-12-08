"use client"

import { useNetworkCheck } from "@/hooks/web3/useNetworkCheck"
import { AlertCircle, Loader } from "lucide-react"

/**
 * Network Alert Component
 * Shows alert if user is not on Celo Mainnet and provides switch button
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.showAlways] - Show even when on correct network (for testing)
 * @returns {JSX.Element|null} Alert component or null if on correct network
 */
export function NetworkAlert({ showAlways = false }) {
  const { isCorrectNetwork, chainName, switchToCelo, isSwitching, celoName } =
    useNetworkCheck()

  // Don't show if on correct network (unless showAlways is true for testing)
  if (isCorrectNetwork && !showAlways) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-50 border-b border-yellow-200 p-3 shadow-sm">
      <div className="max-w-2xl mx-auto flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-semibold text-yellow-900 text-sm">
                Wrong Network
              </h3>
              <p className="text-xs text-yellow-800">
                You are on <strong>{chainName}</strong>. Switch to <strong>{celoName}</strong> to continue.
              </p>
            </div>
            <button
              onClick={switchToCelo}
              disabled={isSwitching}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-600 text-white rounded text-xs font-medium hover:bg-yellow-700 disabled:bg-yellow-400 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              {isSwitching ? (
                <>
                  <Loader className="w-3 h-3 animate-spin" />
                  Switching...
                </>
              ) : (
                `Switch to ${celoName}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
