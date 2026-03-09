"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import UserDetails from "@/components/userDetails"
import ProjectCard from "@/components/ProjectCard"
import { GrantSubmissionForm } from "@/components/grants/GrantSubmissionForm"

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
            if (data.success) setProjects(data.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [activeCategory, search])

    useEffect(() => {
        fetchProjects(activeCategory, "")
    }, [activeCategory])

    const handleSearch = (e) => {
        if (e.key === "Enter") fetchProjects(activeCategory, search)
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-[#003E52] font-sans selection:bg-[#00AFAA] selection:text-white">

            {/* ── HEADER ────────────────────────────────────────────── */}
            <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[100]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center text-[#003E52]">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="p-2 hover:bg-gray-50 rounded-full transition-colors group" title="Home">
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#00AFAA] rotate-180" />
                        </Link>
                        <nav className="flex items-center gap-8">
                            <Link href="/projects" className="text-sm font-bold text-[#00AFAA] border-b-2 border-[#00AFAA] pb-1 translate-y-0.5">
                                Impact projects
                            </Link>
                            <Link href="/grants" className="text-sm font-bold text-gray-500 hover:text-[#00AFAA] transition-colors">
                                Funding
                            </Link>
                        </nav>
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
            <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">

                {/* Page Hero */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00AFAA]/5 border border-[#00AFAA]/10 mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#00AFAA] animate-ping inline-block" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00AFAA]">Impact Project Discovery</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
                        Explore <span className="text-[#00AFAA]">Impact</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium max-w-xl leading-relaxed">
                        Discover Climate, Education, and Social Impact projects — tip directly with crypto, zero fees, full transparency.
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
                                placeholder="Search projects..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={handleSearch}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-12 py-3 text-sm font-medium focus:outline-none focus:border-[#00AFAA]/50 transition-all shadow-sm"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <button
                            onClick={() => setShowSubmitModal(true)}
                            className="w-full sm:w-auto px-6 py-3 bg-[#00AFAA] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#003E52] transition-all shadow-lg whitespace-nowrap"
                        >
                            + Add Project
                        </button>
                    </div>
                </div>

                {/* Project Grid — uses the shared ProjectCard */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-[2.5rem] h-[480px] animate-pulse border border-gray-100 shadow-sm" />
                        ))}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-32">
                        <p className="text-3xl font-black text-gray-200 mb-4">No projects found</p>
                        <p className="text-gray-400 font-medium">Try a different category or search term.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map(project => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                )}
            </main>

            {/* Submission Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 z-[200] bg-[#003E52]/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white max-w-lg w-full rounded-[2.5rem] p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowSubmitModal(false)}
                            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors font-bold z-10"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-black text-[#003E52] mb-1">Submit Impact Project</h2>
                        <p className="text-sm text-gray-500 font-medium mb-8">
                            Propose a verified community project directly to the blockchain registry.
                        </p>
                        <GrantSubmissionForm
                            onSuccess={() => {
                                setShowSubmitModal(false);
                                fetchProjects();
                            }}
                            onCancel={() => setShowSubmitModal(false)}
                        />
                    </div>
                </div>
            )}
            {/* Footer consistent with grants page */}
            <footer className="border-t border-gray-100 py-20 px-6 md:px-12 lg:px-16 mt-20 bg-white text-[#003E52]">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 ClearFund</p>
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
