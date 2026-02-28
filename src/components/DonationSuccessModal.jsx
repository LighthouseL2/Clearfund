'use client'

import React from 'react'
import Image from 'next/image'

/**
 * Donation Successful modal — matches the design with green checkmark, stars, and "Donate again" button.
 */
export default function DonationSuccessModal({ onClose, onDonateAgain }) {
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[420px] p-8 relative text-center"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'successFadeIn 0.3s ease-out' }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Success icon */}
                <div className="flex flex-col items-center mb-6 mt-2">
                    <div className="w-24 h-24 relative">
                        <Image
                            src="/assets/donate successful_icon.png"
                            alt="Donation Successful"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Text */}
                <h2 className="text-[22px] font-bold text-gray-900 mb-2">
                    Donation Successful
                </h2>
                <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
                    Your donation completed successfully.<br />
                    Thank you
                </p>

                {/* Donate again button */}
                <button
                    onClick={onDonateAgain || onClose}
                    className="w-full max-w-[280px] mx-auto bg-[#95EED8] hover:bg-[#7de0c8] text-gray-900 font-bold text-[15px] py-3 rounded-full transition-colors cursor-pointer"
                >
                    Donate again
                </button>
            </div>

            <style jsx>{`
                @keyframes successFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(16px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    )
}
