'use client'

import React, { useState, useEffect } from 'react'

/**
 * Share Campaign Modal — ClearFund branded design with custom messaging
 */
export default function ShareCampaignModal({ collective, onClose }) {
    const [copied, setCopied] = useState(false)
    const [donateUrl, setDonateUrl] = useState('')

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setDonateUrl(`${window.location.origin}/donate/${collective?.id}`)
        }
    }, [collective])

    if (!collective) return null

    const shareText = `I'm supporting "${collective.title}" on ClearFund — driving real impact worldwide. Join me and tip to support this cause! 🌍💚`

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(donateUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        } catch {
            const textarea = document.createElement('textarea')
            textarea.value = donateUrl
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    const socialPlatforms = [
        {
            name: 'Twitter',
            bg: 'linear-gradient(135deg, #1DA1F2, #0d8bd9)',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(donateUrl)}`,
            icon: (
                <svg width="18" height="15" viewBox="0 0 24 20" fill="white">
                    <path d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z" />
                </svg>
            ),
        },
        {
            name: 'WhatsApp',
            bg: 'linear-gradient(135deg, #25D366, #128C7E)',
            url: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${donateUrl}`)}`,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
        },
        {
            name: 'Facebook',
            bg: 'linear-gradient(135deg, #1877F2, #0d5fc2)',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(donateUrl)}&quote=${encodeURIComponent(shareText)}`,
            icon: (
                <svg width="10" height="18" viewBox="0 0 10 18" fill="white">
                    <path d="M6.39 18V9.79h2.67l.4-3.19H6.39V4.56c0-.93.26-1.56 1.54-1.56h1.65V.13A21.31 21.31 0 007.25 0C4.89 0 3.3 1.45 3.3 4.11V6.6H.63v3.19H3.3V18h3.09z" />
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            bg: 'linear-gradient(135deg, #0A66C2, #004182)',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(donateUrl)}`,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: 'Reddit',
            bg: 'linear-gradient(135deg, #FF4500, #cc3700)',
            url: `https://www.reddit.com/submit?url=${encodeURIComponent(donateUrl)}&title=${encodeURIComponent(collective.title)}`,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
            ),
        },
        {
            name: 'Telegram',
            bg: 'linear-gradient(135deg, #0088cc, #006699)',
            url: `https://t.me/share/url?url=${encodeURIComponent(donateUrl)}&text=${encodeURIComponent(shareText)}`,
            icon: (
                <svg width="18" height="16" viewBox="0 0 24 20" fill="white">
                    <path d="M23.91 1.73L20.3 19.12c-.27 1.21-.98 1.51-1.99.94l-5.5-4.05-2.65 2.55c-.3.29-.54.54-1.1.54l.39-5.6L19.4 4.5c.45-.4-.1-.62-.7-.22L6.07 12.34.7 10.66c-1.17-.36-1.19-1.17.24-1.73L22.38.06c.97-.36 1.82.22 1.53 1.67z" />
                </svg>
            ),
        },
    ]

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[460px] relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'shareFadeIn 0.3s ease-out' }}
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
                                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                                <polyline points="16 6 12 2 8 6" />
                                <line x1="12" y1="2" x2="12" y2="15" />
                            </svg>
                        </div>
                        <div className="pr-6">
                            <p className="text-[11px] font-bold text-[#39B54A] uppercase tracking-wider mb-0.5">Share Campaign</p>
                            <h2 className="text-[15px] font-bold text-gray-900 leading-snug">{collective.title}</h2>
                        </div>
                    </div>

                    {/* Message card */}
                    <div className="bg-[#F8FFF9] border border-[#E0F2E4] rounded-xl p-4 mb-5">
                        <p className="text-[14px] font-bold text-[#2E7D32] mb-2">
                            🌍 Amplify the Impact
                        </p>
                        <p className="text-[13px] text-gray-600 leading-[1.65]">
                            Every share brings this campaign closer to its goal. When you spread the word,
                            you connect people who care with causes that matter. Share this campaign with
                            your network and help channel GoodDollar tips to those who need it most.
                        </p>
                    </div>

                    {/* Social grid */}
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Share via</p>
                    <div className="grid grid-cols-3 gap-2 mb-5">
                        {socialPlatforms.map((platform) => (
                            <a
                                key={platform.name}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-[12px] font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                                style={{ background: platform.bg }}
                            >
                                {platform.icon}
                                {platform.name}
                            </a>
                        ))}
                    </div>

                    {/* Link box */}
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Campaign Link</p>
                    <div className="flex items-center bg-[#F5F6F8] border border-gray-200 rounded-xl overflow-hidden">
                        <div className="flex-1 px-3.5 py-3 min-w-0 overflow-hidden">
                            <p className="text-[12px] text-gray-500 truncate select-all font-mono">{donateUrl}</p>
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`shrink-0 px-4 py-3 border-l border-gray-200 text-[12px] font-semibold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${copied
                                ? 'bg-[#39B54A] text-white'
                                : 'bg-white text-gray-600 hover:bg-[#EAF9EE] hover:text-[#39B54A]'
                                }`}
                        >
                            {copied ? (
                                <>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes shareFadeIn {
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
