"use client"

import React, { useState } from 'react'
import { MoveDown, LogOut } from "lucide-react";
import { usePrivy } from '@privy-io/react-auth';
import Image from 'next/image';
import Link from 'next/link';
import { isAdmin } from '@/lib/admin';



export function shortAddress(address, chars = 4) {
    if (!address) return "";
    // console.log(address.slice(0, chars + 2) + "..." + address.slice(-chars));
    let addressString = String(address.slice(0, chars + 2) + "..." + address.slice(-chars))

    return `${addressString}`;
}

const UserDetails = ({ walletAddress, logout, balance, balanceLoading }) => {
    const [toggle, setToggle] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    // const { user } = usePrivy()

    function handleLogout() {
        setToggle(false)
        logout()
    }

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(walletAddress)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
                setToggle(false)
            }, 1500)
        } catch (error) {
            console.error("failed to copy", error)
        }
    }
    return (
        <div className='flex items-center gap-2'>
            {/* Celo Icon Box — hidden on mobile */}
            <div className='hidden md:flex w-11 h-11 items-center justify-center bg-white shadow-sm rounded-2xl border border-gray-200 p-[3px] shrink-0'>
                <Image src="/round-icons/celo-round-icon.svg" alt="Celo Network" width={38} height={38} className='w-full h-full object-contain' />
            </div>

            {/* Wallet Pill */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-full p-1 pl-1 bg-white relative">

                {/* Address Button */}
                <button
                    className='flex gap-2 rounded-full items-center px-3 py-1.5 md:px-4 md:py-2 bg-[#00AFAA]/10 text-[#003E52] hover:bg-[#00AFAA]/20 transition-colors relative z-10'
                    onClick={() => setToggle(!toggle)}
                >
                    {/* User Icon SVG */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 00-16 0" />
                    </svg>

                    <span className='hidden md:inline text-[14px] font-semibold tracking-wide'>
                        {shortAddress(walletAddress)}
                    </span>

                    {/* Chevron */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {toggle && (
                    <ul className='w-[220px] absolute bg-white shadow-[0px_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 rounded-[2rem] text-left right-0 top-[125%] z-[200] overflow-hidden p-2 animate-in fade-in slide-in-from-top-3 duration-300 selection:bg-transparent'>
                        <li className='w-full'>
                            <Link href="/profile" className='w-full px-5 py-3.5 gap-4 text-[14px] font-bold text-[#003E52]/70 hover:bg-gray-50 rounded-2xl flex items-center transition-all' onClick={() => setToggle(false)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Profile
                            </Link>
                        </li>

                        {isAdmin(walletAddress) && (
                            <li className='w-full mt-1 border-t border-gray-50 pt-1'>
                                <Link href="/admin/projects" className='w-full px-5 py-3.5 gap-4 text-[14px] font-bold text-[#00AFAA] hover:bg-[#00AFAA]/5 rounded-2xl flex items-center transition-all' onClick={() => setToggle(false)}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <line x1="12" y1="8" x2="12" y2="16" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                    Admin Panel
                                </Link>
                            </li>
                        )}

                        <li className='w-full mt-1 border-t border-gray-50 pt-1'>
                            <div className='w-full px-5 py-3.5 gap-4 text-[14px] font-bold text-[#003E52]/70 hover:bg-gray-50 rounded-2xl flex items-center cursor-pointer transition-all' onClick={handleCopy}>
                                {isCopied ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 01-2-2V4a2 0 012-2h9a2 0 012 2v1" />
                                    </svg>
                                )}
                                <span className={isCopied ? "text-[#22c55e]" : ""}>
                                    {isCopied ? "Copied!" : "Copy address"}
                                </span>
                            </div>
                        </li>

                        <li className='w-full mt-1 border-t border-gray-50 pt-1'>
                            <div className='w-full px-5 py-3.5 gap-4 text-[14px] font-bold text-red-500 hover:bg-red-50 rounded-2xl flex items-center cursor-pointer transition-all' onClick={handleLogout}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Disconnect
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default UserDetails