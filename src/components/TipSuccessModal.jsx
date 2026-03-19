'use client'

import React from 'react'
import Image from 'next/image'

/**
 * Tip Successful modal — matches the design with green checkmark, stars, and "Tip again" button.
 */
export default function TipSuccessModal({ onClose, onTipAgain, onShare, amount, tokenSymbol, txHash }) {

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[200] p-4" onClick={onClose}>
            <div
                className="bg-white rounded-[48px] shadow-2xl w-full max-w-[520px] p-12 relative flex flex-col items-center animate-in fade-in zoom-in duration-500"
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
                    <div className="absolute inset-0 bg-[#00AFAA] opacity-20 blur-xl rounded-full scale-150"></div>
                    <div className="relative w-24 h-24 bg-[#00AFAA] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,175,170,0.4)]">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </div>
                </div>

                {/* Text */}
                <div className="text-center mb-8">
                    <h2 className="text-[20px] leading-tight font-bold text-gray-800 mb-2">
                        Tip Successful!
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Your tip of <span className="font-bold text-gray-800">{amount} {tokenSymbol}</span> has been processed successfully.
                    </p>
                </div>


                {/* Buttons */}
                <div className="w-full mt-2">
                    <button
                        onClick={onShare}
                        className="w-full bg-[#00AFAA]/10 text-[#00AFAA] font-bold text-sm uppercase tracking-widest py-4 rounded-full hover:bg-[#00AFAA]/20 transition-colors active:scale-95 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share Campaign
                    </button>
                </div>
            </div>
        </div>
    )
}
