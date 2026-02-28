'use client'

import React from 'react'

export default function WalletNotConnectedModal({ isOpen, onClose, onConnect }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-[#F6FDF7] rounded-xl shadow-2xl w-full max-w-[420px] relative p-10 border-2 border-[#A3E0B5]"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'modalFadeIn 0.2s ease-out' }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center"
                >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="flex flex-col items-center text-center mt-2">
                    {/* Warning Icon */}
                    <div className="w-[60px] h-[60px] rounded-full bg-[#D5F0DC] flex items-center justify-center mb-6">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2BAC4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <circle cx="12" cy="17" r="1" fill="#2BAC4A"></circle>
                        </svg>
                    </div>

                    <h2 className="text-[22px] font-black text-black mb-8">
                        Wallet Not Connected
                    </h2>

                    <button
                        onClick={() => {
                            onClose()
                            onConnect()
                        }}
                        className="bg-[#39B54A] hover:bg-[#2e933c] text-white font-bold py-3 px-8 rounded-full text-[15px] transition-colors w-fit"
                    >
                        Connect wallet
                    </button>
                </div>
                <style jsx>{`
                    @keyframes modalFadeIn {
                        from {
                            opacity: 0;
                            transform: scale(0.95);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                `}</style>
            </div>
        </div>
    )
}
