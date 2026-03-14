'use client'

import React from 'react'

export default function WalletNotConnectedModal({ isOpen, onClose, onConnect }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-[420px] relative p-10 border border-gray-100"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'modalFadeIn 0.2s ease-out' }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 text-gray-400 hover:text-gray-800 transition-colors flex items-center justify-center"
                >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="flex flex-col items-center text-center mt-2">
                    {/* Warning Icon */}
                    <div className="w-[64px] h-[64px] rounded-full bg-[#00AFAA]/10 flex items-center justify-center mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00AFAA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <circle cx="12" cy="17" r="1" fill="#00AFAA"></circle>
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
                        className="bg-[#00AFAA] hover:bg-black text-white font-bold py-4 px-10 rounded-full text-[15px] transition-all transform active:scale-95 shadow-lg w-fit"
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
