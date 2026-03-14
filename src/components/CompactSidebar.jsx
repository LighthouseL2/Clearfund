"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, HandCoins } from 'lucide-react'

const CompactSidebar = () => {
    const pathname = usePathname()

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
        <aside className="fixed left-0 top-0 h-screen w-20 bg-white border-r border-gray-100 flex flex-col items-center py-8 z-[150] hidden md:flex">
            {/* Logo Icon */}
            <Link href="/" className="mb-8">
                <img src="/assets/favicon.png" alt="ClearFund" className="w-5 h-5 object-contain" />
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
    )
}

export default CompactSidebar
