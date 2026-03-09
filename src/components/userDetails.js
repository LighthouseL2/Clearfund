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
        <div className='flex items-center gap-4'>
            {/* Celo Icon Box */}
            <div className='w-11 h-11 flex items-center justify-center bg-white shadow-sm rounded-2xl border border-gray-200 p-[3px] shrink-0'>
                <Image src="/round-icons/celo-round-icon.svg" alt="Celo Network" width={38} height={38} className='w-full h-full object-contain' />
            </div>

            {/* Wallet Pill */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-full p-1 pl-1 bg-white relative">

                {/* Address Button */}
                <button
                    className='flex gap-2 rounded-full items-center px-4 py-2 bg-[#00AFAA]/10 text-[#003E52] hover:bg-[#00AFAA]/20 transition-colors relative z-10'
                    onClick={() => setToggle(!toggle)}
                >
                    {/* User Icon SVG */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 00-16 0" />
                    </svg>

                    <span className='text-[14px] font-semibold tracking-wide'>
                        {shortAddress(walletAddress)}
                    </span>

                    {/* Chevron */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {toggle && (
                    <ul className='w-[160px] absolute bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.08)] border border-gray-100 rounded-xl text-left right-0 top-[110%] z-30 overflow-hidden'>
                        <li className='w-full border-b border-gray-100'>
                            <Link href="/profile" className='w-full px-4 py-3.5 gap-2.5 text-[14px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center transition-colors' onClick={() => setToggle(false)}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Profile
                            </Link>
                        </li>
                        {isAdmin(walletAddress) && (
                            <li className='w-full border-b border-gray-100'>
                                <Link href="/admin/projects" className='w-full px-4 py-3.5 gap-2.5 text-[14px] font-semibold text-gd-teal hover:bg-gd-teal/5 flex items-center transition-colors' onClick={() => setToggle(false)}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <path d="M12 8v8" />
                                        <path d="M8 12h8" />
                                    </svg>
                                    Admin Panel
                                </Link>
                            </li>
                        )}
                        <li className='w-full px-4 py-3.5 gap-2.5 text-[14px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer transition-colors border-b border-gray-100' onClick={handleCopy}>
                            {isCopied ? (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#39b54a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 0 012-2h9a2 0 012 2v1" />
                                </svg>
                            )}
                            <span className={isCopied ? "text-[#39b54a]" : ""}>
                                {isCopied ? "Copied!" : "Copy address"}
                            </span>
                        </li>
                        <li className='w-full px-4 py-3.5 gap-2.5 text-[14px] font-semibold text-red-600 hover:bg-red-50 flex items-center cursor-pointer transition-colors' onClick={handleLogout}>
                            <LogOut size={16} />
                            Disconnect
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default UserDetails