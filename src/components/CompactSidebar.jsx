"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, HandCoins, Menu, X } from 'lucide-react'
import { usePrivy, useWallets } from "@privy-io/react-auth"
import UserDetails from "./userDetails"

const CompactSidebar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const { login, authenticated, logout } = usePrivy()
    const { wallets } = useWallets()
    const address = wallets?.[0]?.address

    const navItems = [
        {
            name: 'Projects',
            href: '/projects',
            icon: <LayoutGrid />,
        },
        {
            name: 'Funding',
            href: '/grants',
            icon: <HandCoins />,
        },
    ]

    return (
        <>
            {/* Mobile Header - Visible only on small screens */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-[160] shadow-sm">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <img src="/assets/favicon.png" alt="ClearFund" className="w-8 h-8 object-contain" />
                    <span className="font-black text-sm uppercase tracking-tighter text-[#003E52]">ClearFund</span>
                </Link>

                <div className="flex items-center gap-3">
                    {!authenticated ? (
                        <button
                            onClick={login}
                            className="px-4 py-2 bg-[#00AFAA] text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#003E52] transition-all shadow-sm"
                        >
                            Connect
                        </button>
                    ) : (
                        <UserDetails walletAddress={address} logout={logout} />
                    )}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-[#003E52] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-[155] pt-24 px-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${isActive
                                        ? 'bg-[#00AFAA]/10 text-[#00AFAA]'
                                        : 'text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className={`${isActive ? 'text-[#00AFAA]' : 'text-gray-400'}`}>
                                        {React.cloneElement(item.icon, { size: 24 })}
                                    </div>
                                    <span className="font-black uppercase tracking-widest text-sm">
                                        {item.name}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Desktop Sidebar - Visible on md+ screens */}
            <aside className="fixed left-0 top-0 h-screen w-20 bg-white border-r border-gray-100 flex flex-col items-center pt-8 pb-8 z-[150] hidden md:flex">
                {/* Logo Icon */}
                <Link href="/" className="mb-12">
                    <img src="/assets/favicon.png" alt="ClearFund" className="w-8 h-8 object-contain" />
                </Link>

                {/* Nav Items */}
                <div className="flex flex-col gap-8 w-full">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center group transition-all ${isActive ? 'text-[#00AFAA]' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <div className="transition-all">
                                    {React.cloneElement(item.icon, { className: "w-7 h-7" })}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-tighter mt-2">
                                    {item.name}
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </aside>
        </>
    )
}

export default CompactSidebar
