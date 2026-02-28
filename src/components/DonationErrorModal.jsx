'use client'

import React from 'react'

/**
 * Donation Error modal — matches the design with red X and "Try again" button.
 */
export default function DonationErrorModal({ onClose, onRetry, error }) {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-[32px] shadow-2xl w-full max-w-[420px] p-8 relative flex flex-col items-center animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Error icon overlay */}
                <div className="relative mb-6 mt-4">
                    <div className="absolute inset-0 bg-[#FF2E2E] opacity-20 blur-xl rounded-full scale-150"></div>
                    <div className="relative w-24 h-24 bg-[#FF2E2E] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,46,46,0.4)]">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </div>
                </div>

                {/* Text */}
                <h2 className="text-[24px] font-black text-gray-800 text-center mb-1">Error!</h2>
                <p className="text-[16px] text-gray-500 text-center mb-10 font-medium">
                    Your donation request could not be processed.
                </p>

                {/* Button */}
                <button
                    onClick={onRetry || onClose}
                    className="w-full bg-[#FF2E2E] text-white font-bold py-4 rounded-full hover:bg-[#e62929] transition-all shadow-lg active:scale-[0.98] cursor-pointer"
                >
                    Try again
                </button>

                {error && (
                    <p className="mt-4 text-xs text-red-400 text-center max-w-[300px] line-clamp-2">
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}
