"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import UserDetails from "@/components/userDetails"
import { Menu, Search, Filter, ArrowRight, Heart, Users, MapPin } from "lucide-react"
import { collectives } from "@/lib/collectivesData"

const CollectiveImpactPage = () => {
    const { authenticated, login, logout } = usePrivy()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { wallets } = useWallets()
    const router = useRouter()
    const address = wallets?.[0]?.address

    const handleTip = (id) => {
        router.push(`/donate/${id}`)
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-[#39B54A] selection:text-white flex flex-col">

            <div className="flex-1">
                {/* Header (Relay Inspired) */}
                <header className="bg-white border-b border-gray-100 flex justify-between items-center py-4 px-8 sticky top-0 z-50">
                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search collectives..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm w-80 focus:ring-2 focus:ring-[#00AFAA]/20 focus:border-[#00AFAA] transition-all"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {!authenticated ? (
                            <button
                                onClick={login}
                                className="px-6 py-2.5 bg-[#00AFAA] text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-sm"
                            >
                                Connect Wallet
                            </button>
                        ) : (
                            <UserDetails walletAddress={address} logout={logout} />
                        )}
                    </div>
                </header>

                <main className="max-w-[1240px] mx-auto px-8 py-12">
                    {/* HERO TITLE */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Collective Impact</h1>
                        <p className="text-gray-500 font-medium">Pool your resources with the community to drive scalable change.</p>
                    </div>

                    {/* CAMPAIGN GRID (Relay Inspired) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {collectives.map((collective) => {
                            // Mock progress data for Relay impact
                            const raised = Math.floor(Math.random() * 50000) + 10000;
                            const goal = 75000;
                            const progress = Math.min((raised / goal) * 100, 100);
                            const contributors = Math.floor(Math.random() * 200) + 50;

                            return (
                                <div key={collective.id} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                                    {/* Cover Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={collective.image || "/donate-images/happy.png"}
                                            alt={collective.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="bg-white/95 backdrop-blur-sm text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm text-[#00AFAA]">
                                                {collective.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
                                            <MapPin size={12} className="text-[#00AFAA]" />
                                            {collective.location}
                                        </div>

                                        <h2 className="text-2xl font-black mb-4 leading-[1.1] group-hover:text-[#00AFAA] transition-colors line-clamp-2 min-h-[56px]">
                                            {collective.title}
                                        </h2>

                                        {/* PROGRESS SECTION (Relay Key Feature) */}
                                        <div className="mt-auto pt-6 border-t border-gray-50">
                                            <div className="flex justify-between items-end mb-3">
                                                <div>
                                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tipped</span>
                                                    <span className="text-xl font-black text-[#111827]">${raised.toLocaleString()} <span className="text-gray-300 font-bold ml-1">/ ${goal.toLocaleString()}</span></span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-[#00AFAA] font-black text-lg">{Math.round(progress)}%</span>
                                                </div>
                                            </div>

                                            {/* Bar */}
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
                                                <div
                                                    className="h-full bg-[#00AFAA] rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,175,170,0.3)]"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex -space-x-2">
                                                        {[1, 2, 3].map(i => (
                                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                                                <img src={`https://i.pravatar.cc/100?u=${collective.id + i}`} alt="avatar" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-500">+{contributors} contributors</span>
                                                </div>

                                                <button
                                                    onClick={() => handleTip(collective.id)}
                                                    className="p-3 bg-gray-900 text-white rounded-xl hover:bg-[#00AFAA] transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                                                >
                                                    <ArrowRight size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CollectiveImpactPage