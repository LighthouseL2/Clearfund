"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import UserDetails from "@/components/userDetails"
import ProjectCard from "@/components/ProjectCard"
import ProjectForm from "@/components/ProjectForm"
import Image from "next/image"

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

    const [allProjects, setAllProjects] = useState([])
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [counts, setCounts] = useState({ ALL: 0, CLIMATE: 0, SOCIAL_IMPACT: 0, EDUCATION: 0 })
    const [activeCategory, setActiveCategory] = useState("ALL")
    const [search, setSearch] = useState("")
    const [showSubmitModal, setShowSubmitModal] = useState(false)

    // 1. Fetch EVERYTHING once
    const fetchAll = useCallback(async () => {
        setLoading(true)
        try {
            const resp = await fetch(`/api/giveth`)
            const data = await resp.json()
            if (data.success) {
                const limited = data.data.slice(0, 7) // Project count you met on ground: 7
                setAllProjects(limited)
                setProjects(limited)

                // Calculate accurate local counts
                const raw = limited
                setCounts({
                    ALL: raw.length,
                    CLIMATE: raw.filter(p => p.category === 'CLIMATE').length,
                    SOCIAL_IMPACT: raw.filter(p => p.category === 'SOCIAL_IMPACT').length,
                    EDUCATION: raw.filter(p => p.category === 'EDUCATION').length,
                })
            }
        } catch (err) {
            console.error('Fetch Projects error:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAll()
    }, [fetchAll])

    // 2. Local filtering for responsiveness
    useEffect(() => {
        let filtered = [...allProjects]
        if (activeCategory !== "ALL") {
            filtered = filtered.filter(p => p.category === activeCategory)
        }
        if (search) {
            const q = search.toLowerCase()
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(q) ||
                (p.tagline && p.tagline.toLowerCase().includes(q))
            )
        }
        setProjects(filtered)
    }, [activeCategory, search, allProjects])

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-[#003E52] font-sans selection:bg-[#00AFAA] selection:text-white">

            {/* ── HEADER ────────────────────────────────────────────── */}
            <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[100]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center text-[#003E52]">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/assets/clearfund_logo.png"
                                alt="ClearFund Logo"
                                width={180}
                                height={54}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {!authenticated ? (
                            <button
                                onClick={login}
                                className="px-8 py-3 bg-[#00AFAA] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#003E52] transition-all flex items-center gap-2 shadow-lg"
                            >
                                Connect Wallet <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <UserDetails walletAddress={address} logout={logout} />
                        )}
                    </div>
                </div>
            </header>

            {/* ── MAIN ──────────────────────────────────────────────── */}
            <main className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12">

                {/* Banner Section */}
                <div
                    className="w-full rounded-2xl px-8 py-10 md:px-12 md:py-14 mb-8 flex items-center justify-between overflow-hidden relative"
                    style={{
                        background: 'linear-gradient(135deg, #00BFAF 0%, #00AFAA 50%, #00C9B8 100%)',
                    }}
                >
                    {/* Text Content */}
                    <div className="relative z-10 flex-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                            Explore Impact
                        </h1>
                        <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
                            Discover Climate, Education, and Social Impact projects — tip directly with crypto, zero fees, full transparency.
                        </p>
                    </div>

                    {/* Banner Image */}
                    <div className="hidden md:block absolute right-0 top-0 bottom-0">
                        <img
                            src="/assets/refi_image.png"
                            alt="Registry Banner"
                            className="h-full w-auto object-cover"
                        />
                    </div>
                </div>

                {/* Filter Row with INTEGRATED COUNTS */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-16 border-b border-gray-100 pb-10">
                    <div className="flex items-center gap-2.5 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 no-scrollbar">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3 border ${activeCategory === cat.id
                                    ? "bg-[#003E52] text-white border-[#003E52] shadow-lg"
                                    : "bg-white text-gray-400 hover:bg-gray-50 border-gray-100 hover:border-gray-200"
                                    }`}
                            >
                                <span>{cat.name}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[8px] border ${activeCategory === cat.id
                                    ? "bg-white/10 border-white/20 text-white"
                                    : "bg-gray-50 border-gray-200 text-gray-400"
                                    }`}>
                                    {counts[cat.id] || 0}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                placeholder="Search by name or location..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-12 py-3.5 text-sm font-medium focus:outline-none focus:border-[#00AFAA]/50 shadow-sm"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <button
                            onClick={() => setShowSubmitModal(true)}
                            className="w-full sm:w-auto px-10 py-3.5 bg-[#00AFAA] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#003E52] transition-all shadow-lg"
                        >
                            + Add Project
                        </button>
                    </div>
                </div>

                {/* Project Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-[2.5rem] h-[480px] animate-pulse border border-gray-100 shadow-sm" />
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
            </main>

            {/* Submission Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 z-[200] bg-[#003E52]/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white max-w-5xl w-full rounded-[2.5rem] p-4 lg:p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto">
                        <button
                            onClick={() => setShowSubmitModal(false)}
                            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors font-bold z-[210]"
                        >
                            ×
                        </button>
                        <ProjectForm />
                    </div>
                </div>
            )}

            {/* Footer consistent with grants page */}
            <footer className="border-t border-gray-100 py-8 px-6 md:px-12 lg:px-16 mt-20 bg-white text-[#003E52]">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-6">
                    <div className="flex gap-8">
                        <Link href="https://github.com/LighthouseL2/Clearfund" target="_blank" className="text-[10px] font-black text-gray-400 hover:text-[#00AFAA] transition-colors uppercase tracking-widest">GitHub</Link>
                        <Link href="https://x.com/Clear_Fund" target="_blank" className="text-[10px] font-black text-gray-400 hover:text-[#00AFAA] transition-colors uppercase tracking-widest">Twitter</Link>
                        <Link href="https://t.me/+fU2kPPjZ50MxMTE0" target="_blank" className="text-[10px] font-black text-gray-400 hover:text-[#00AFAA] transition-colors uppercase tracking-widest">Telegram</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
