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
                    <div className="absolute inset-0 bg-[#95EED8] opacity-20 blur-xl rounded-full scale-150"></div>
                    <div className="relative w-24 h-24 bg-[#95EED8] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(149,238,216,0.4)]">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
                <div className="w-full flex flex-col gap-3">
                    <button
                        onClick={onShare}
                        className="w-full bg-[#39B54A] text-white font-bold py-4 rounded-full hover:bg-black transition-all shadow-lg active:scale-[0.98] cursor-pointer"
                    >
                        Share Campaign
                    </button>
                    <button
                        onClick={onTipAgain || onClose}
                        className="w-full bg-[#EAF9EE] text-[#39B54A] font-bold py-4 rounded-full hover:bg-[#D5F8EE] transition-all active:scale-[0.98] cursor-pointer"
                    >
                        Tip again
                    </button>
                </div>
            </div>
        </div>
    )
}
