"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Search, Plus } from "lucide-react"
import Link from "next/link"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import UserDetails from "@/components/userDetails"
import ProjectCard from "@/components/ProjectCard"
import CompactSidebar from "@/components/CompactSidebar"
import { ProjectSubmissionForm } from "@/components/projects/ProjectSubmissionForm"

const CATEGORIES = [
    { id: "ALL", name: "All projects" },
    { id: "CLIMATE", name: "Climate" },
    { id: "SOCIAL_IMPACT", name: "Social Impact" },
    { id: "EDUCATION", name: "Education" },
]

export default function ProjectsPage() {
    const { login, authenticated, logout } = usePrivy()
    const { wallets } = useWallets()
    const address = wallets?.[0]?.address

    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState("ALL")
    const [search, setSearch] = useState("")
    const [showSubmitModal, setShowSubmitModal] = useState(false)

    const fetchProjects = useCallback(async (cat = activeCategory, q = search) => {
        setLoading(true)
        try {
            const resp = await fetch(`/api/giveth?category=${cat}&search=${encodeURIComponent(q)}`)
            const data = await resp.json()
            if (data.success) {
                setProjects(data.data)
            }
        } catch (err) {
            console.error('Fetch Projects error:', err)
        } finally {
            setLoading(false)
        }
    }, [activeCategory, search])

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProjects(activeCategory, search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search, activeCategory, fetchProjects]);

    return (
        <div className="min-h-screen bg-white text-[#003E52] font-sans flex">
            {/* Sidebar */}
            <CompactSidebar />

            {/* Main Content Area */}
            <div className="flex-1 md:ml-20">
                {/* Top Header Bar */}
                <div className="w-full h-20 flex items-center justify-end px-8 md:px-16">
                    {!authenticated ? (
                        <button
                            onClick={login}
                            className="px-10 py-3.5 bg-[#00AFAA] text-white rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-[#003E52] transition-all flex items-center gap-2 shadow-sm"
                        >
                            Connect Wallet <span>→</span>
                        </button>
                    ) : (
                        <UserDetails walletAddress={address} logout={logout} />
                    )}
                </div>

                <div className="max-w-7xl pl-8 md:pl-10 pr-16 pb-20">
                    {/* Page Hero */}
                    <div className="pt-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <h1 className="text-[64px] md:text-[84px] font-black tracking-tighter leading-[0.9] mb-8">
                            Explore <span className="text-[#00AFAA]">Impact</span>
                        </h1>
                        <p className="text-gray-400 text-xl font-medium max-w-2xl leading-relaxed">
                            Discover Climate, Education, and Social Impact projects — tip directly
                            with crypto, zero fees, full transparency.
                        </p>
                    </div>

                    {/* Filter + Search controls */}
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-14 border-b border-gray-100 pb-10">
                        {/* Category tabs */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.1em] transition-all whitespace-nowrap ${activeCategory === cat.id
                                        ? "bg-[#003E52] text-white shadow-lg"
                                        : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Search & Submit Action */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                            <div className="relative w-full sm:w-80">
                                <input
                                    type="text"
                                    placeholder="Search by name or location..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-12 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA]/50 transition-all shadow-sm"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-gray-100 text-gray-400 rounded-full hover:bg-gray-200 transition-colors text-[10px] font-bold"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => setShowSubmitModal(true)}
                                className="w-full sm:w-auto px-6 py-3 bg-[#00AFAA] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#003E52] transition-all shadow-lg whitespace-nowrap"
                            >
                                + Add Project
                            </button>
                        </div>
                    </div>

                    {/* Project Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="bg-gray-50 rounded-[2rem] aspect-[1/1.2] animate-pulse" />
                            ))}
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-32 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                            <p className="text-3xl font-black text-gray-200 mb-4">No projects found</p>
                            <p className="text-gray-400 font-medium">Try a different category or search term.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {projects.map(project => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    )}
                </div>

                {/* RESTORED FOOTER */}
                <footer className="border-t border-gray-100 py-10 px-10 md:px-16 bg-white text-[#003E52] mt-20">
                    <div className="max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-6">
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 ClearFund</p>
                        <div className="flex gap-8">
                            <Link href="https://github.com/LighthouseL2/Clearfund" target="_blank" className="text-[10px] font-black text-gray-400 hover:text-[#00AFAA] transition-colors uppercase tracking-widest">GitHub</Link>
                            <Link href="https://x.com/Clear_Fund" target="_blank" className="text-[10px] font-black text-gray-400 hover:text-[#00AFAA] transition-colors uppercase tracking-widest">Twitter</Link>
                            <Link href="https://t.me/+fU2kPPjZ50MxMTE0" target="_blank" className="text-[10px] font-black text-gray-400 hover:text-[#00AFAA] transition-colors uppercase tracking-widest">Telegram</Link>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Submission Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 z-[200] bg-[#003E52]/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white max-w-4xl w-full rounded-[2.5rem] p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowSubmitModal(false)}
                            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors font-bold z-10"
                        >
                            ×
                        </button>
                        <h2 className="text-3xl font-black text-[#003E52] mb-1">Submit Your Project</h2>
                        <p className="text-sm text-gray-500 font-medium mb-8">
                            Share your project with the community and start receiving tips directly to your wallet.
                        </p>
                        <ProjectSubmissionForm
                            onSuccess={() => {
                                setShowSubmitModal(false);
                                fetchProjects();
                            }}
                            onCancel={() => setShowSubmitModal(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

