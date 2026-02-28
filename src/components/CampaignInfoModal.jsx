'use client'

import React from 'react'
import { COLLECTIVE_ADDRESSES, CELOSCAN_ADDRESS_URL, DEFAULT_COLLECTIVE_ADDRESS } from '@/lib/contracts/donation'
import Link from 'next/link'
import { shortAddress } from '@/components/userDetails'

/**
 * Campaign Info Modal — redesigned to match the Share modal aesthetic.
 * Shows campaign metadata in a clean, modern layout.
 */
export default function CampaignInfoModal({ collective, onClose }) {
    if (!collective) return null

    const collectiveAddr = COLLECTIVE_ADDRESSES[collective.id] || DEFAULT_COLLECTIVE_ADDRESS

    const rows = [
        { label: 'Status', value: collective.status || 'Active', accent: true },
        { label: 'Launch', value: collective.launchDate || '—' },
        { label: 'Location', value: collective.location || '—' },
        { label: 'Category', value: collective.category || '—' },
        { label: 'Created', value: collective.launchDate || '—' },
        {
            label: 'Address',
            value: (
                <Link href={CELOSCAN_ADDRESS_URL(collectiveAddr)} target="_blank" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    {shortAddress(collectiveAddr)}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </Link>
            )
        },
    ]

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[460px] relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'infoFadeIn 0.3s ease-out' }}
            >
                {/* Top accent */}
                <div className="bg-gradient-to-r from-[#39B54A] via-[#95EED8] to-[#39B54A] h-1" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all z-10"
                >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="p-6">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-[#EAF9EE] flex items-center justify-center shrink-0">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#39B54A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                        </div>
                        <div className="pr-6">
                            <p className="text-[11px] font-bold text-[#39B54A] uppercase tracking-wider mb-0.5">Campaign Info</p>
                            <h2 className="text-[15px] font-bold text-gray-900 leading-snug">{collective.title}</h2>
                        </div>
                    </div>

                    {/* Info rows */}
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Details</p>
                    <div className="border border-gray-100 rounded-xl overflow-hidden mb-2">
                        {rows.map((row, i) => (
                            <div
                                key={row.label}
                                className={`flex items-center justify-between px-5 py-3.5 ${i < rows.length - 1 ? 'border-b border-gray-100' : ''
                                    } ${i % 2 === 0 ? 'bg-[#FAFBFC]' : 'bg-white'}`}
                            >
                                <span className="text-[13px] text-gray-500">{row.label}</span>
                                <span className={`text-[13px] font-semibold ${row.accent ? 'text-[#39B54A]' : 'text-gray-900'
                                    }`}>
                                    {row.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    @keyframes infoFadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(16px) scale(0.96);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                `}</style>
            </div>
        </div>
    )
}
