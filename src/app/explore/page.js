"use client"

import ExploreHeader from "@/components/ExploreHeader"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ExplorePage() {
    return (
        <div className="min-h-screen bg-[#FAF5ED] font-sans selection:bg-[#005B7C] selection:text-white">
            <ExploreHeader />

            <main className="px-[5%] pt-0 pb-40 max-w-7xl mx-auto">
                {/* CONTENT CARDS */}
                <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
                    {/* REFI PROJECTS SECTION */}
                    <div className="bg-white border-2 border-black rounded-[3rem] p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-12">
                                <span className="bg-[#E7F2F2] text-[#005B7C] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                                    Impact Projects
                                </span>
                            </div>
                            <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
                                ReFi projects
                            </h2>
                            <p className="text-lg font-bold text-gray-500 mb-10 leading-relaxed tracking-tight">
                                Discover regenerative finance initiatives building sustainable public goods on the blockchain.
                            </p>
                        </div>
                        <Link href="/projects">
                            <button className="px-10 py-5 bg-[#005B7C] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-gray-900 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3 w-full justify-center">
                                View Projects
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>

                    {/* GRANTS SECTION */}
                    <div className="bg-white border-2 border-black rounded-[3rem] p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-12">
                                <span className="bg-[#EAF9EE] text-[#39B54A] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                                    Funding
                                </span>
                            </div>
                            <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
                                Active Grants
                            </h2>
                            <p className="text-lg font-bold text-gray-500 mb-10 leading-relaxed tracking-tight">
                                Access grant pools and funding rounds to scale your high-impact public good projects.
                            </p>
                        </div>
                        <Link href="/grants">
                            <button className="px-10 py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-[#005B7C] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3 w-full justify-center">
                                Explore Grants
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
