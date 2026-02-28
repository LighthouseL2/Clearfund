'use client'

import React from 'react'
import Image from 'next/image'

/**
 * Donation Successful modal — matches the design with green checkmark, stars, and "Donate again" button.
 */
export default function DonationSuccessModal({ onClose, onDonateAgain }) {
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

                {/* Glow effect container */}
                <div className="relative mb-6 mt-4">
                    <div className="absolute inset-0 bg-[#95EED8] opacity-20 blur-xl rounded-full scale-150"></div>
                    <div className="relative w-24 h-24 bg-[#95EED8] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(149,238,216,0.4)]">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </div>
                </div>

                {/* Text */}
                <h2 className="text-[18px] leading-tight font-bold text-gray-800 text-center mb-10 w-full px-4">
                    Your donation has been processed<br />successfully!
                </h2>

                {/* Button */}
                <button
                    onClick={onDonateAgain || onClose}
                    className="w-full bg-[#95EED8] text-gray-900 font-bold py-4 rounded-full hover:bg-[#D5F8EE] transition-all shadow-lg active:scale-[0.98] cursor-pointer"
                >
                    Donate again
                </button>
            </div>
        </div>
    )
}
