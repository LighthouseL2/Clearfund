"use client"

import { useState, useEffect } from "react"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink, LogOut, Wallet, Activity, Heart, ArrowRight } from "lucide-react"

const FavoritesSection = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        try {
            const favs = JSON.parse(localStorage.getItem('clearfund_favorites') || '[]');
            setFavorites(favs);
        } catch (e) { }
    }, []);

    const removeFavorite = (slug) => {
        try {
            const favs = favorites.filter(f => f.slug !== slug);
            setFavorites(favs);
            localStorage.setItem('clearfund_favorites', JSON.stringify(favs));
        } catch (e) { }
    };

    return (
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mt-8">
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#003E52] flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    Saved Projects
                </h2>
            </div>

            {favorites.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-red-200" />
                    </div>
                    <h3 className="text-lg font-bold text-[#003E52] mb-2 text-center">No saved projects</h3>
                    <p className="text-sm">You haven't saved any projects yet. Click the heart icon on a project to save it here!</p>
                </div>
            ) : (
                <div className="divide-y divide-gray-50">
                    {favorites.map((f, i) => (
                        <div key={i} className="p-6 px-8 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <img src={f.logo || f.banner || '/assets/clearfund_logo.png'} alt={f.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                                <div>
                                    <div className="text-[#111827] font-bold mb-1 line-clamp-1">{f.name}</div>
                                    <div className="text-xs text-gray-400 font-medium capitalize">{f.category?.replace('_', ' ').toLowerCase() || 'Impact'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 justify-between md:justify-end mt-2 md:mt-0">
                                <Link
                                    href={`/projects/${f.slug}`}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors shrink-0"
                                >
                                    View Project
                                </Link>
                                <button
                                    onClick={() => removeFavorite(f.slug)}
                                    className="text-red-500 text-xs font-bold hover:underline shrink-0"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function ProfilePage() {
    const { authenticated, login, logout, ready } = usePrivy()
    const { wallets } = useWallets()
    const address = wallets?.[0]?.address
    const router = useRouter()

    const [tips, setTips] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (ready && authenticated && address) {
            fetchUserTips()
        } else if (ready && !authenticated) {
            // If they just logged out or aren't logged in, redirect to projects
            router.push('/projects')
        }
    }, [ready, authenticated, address, router])

    const fetchUserTips = async () => {
        setLoading(true)
        try {
            // 1. Fetch from API
            let remoteTips = []
            try {
                const resp = await fetch(`/api/tips?donorWallet=${address}&t=${Date.now()}`, { cache: 'no-store' })
                const data = await resp.json()
                if (data.success) {
                    remoteTips = data.data
                }
            } catch (err) {
                console.warn("DB fetch failed, using local fallback", err)
            }

            // 2. Fetch from Local Storage
            let localTips = []
            try {
                localTips = JSON.parse(localStorage.getItem('clearfund_tips') || '[]')
                // Filter by current user address just in case
                localTips = localTips.filter(t => t.donorWallet?.toLowerCase() === address?.toLowerCase())
            } catch (lErr) {
                console.error("Local storage read failed", lErr)
            }

            // 3. Merge and deduplicate by txHash
            const merged = [...remoteTips]
            const seen = new Set(merged.map(t => t.txHash))

            localTips.forEach(t => {
                if (!seen.has(t.txHash)) {
                    merged.push(t)
                    seen.add(t.txHash)
                }
            })

            // Sort by createdAt desc
            merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

            setTips(merged)

        } catch (err) {
            console.error("Failed to merge tips", err)
        } finally {
            setLoading(false)
        }
    }

    if (!ready || loading) {
        return (
            <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#00AFAA] border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-8 text-center text-[#111827]">
                <Wallet className="w-16 h-16 text-gray-300 mb-6" />
                <h1 className="text-3xl font-black mb-4">Connect Your Wallet</h1>
                <p className="text-gray-500 mb-8 max-w-md">You need to connect your wallet to view your profile and tip history.</p>
                <button
                    onClick={login}
                    className="px-8 py-4 bg-[#00AFAA] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#003E52] transition-all shadow-xl active:scale-95 flex items-center gap-3"
                >
                    Connect Wallet <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        )
    }

    // Calculate total G$ and cUSD tipped
    const totals = tips.reduce((acc, d) => {
        const t = d.token || 'G$'
        acc[t] = (acc[t] || 0) + parseFloat(d.amount)
        return acc
    }, {})

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans pb-24">
            <header className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00AFAA] transition-colors font-bold text-sm">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
                <div className="flex items-center gap-4">
                    <span className="hidden md:block font-mono text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                        {address}
                    </span>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-xl font-bold text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                    </button>
                </div>
            </header>

            <main className="max-w-[1000px] mx-auto px-6 lg:px-8 mt-12">
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-2 tracking-tight">Your Impact Profile</h1>
                    <p className="text-gray-500 font-medium">Track your tips and on-chain contributions</p>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Tips</span>
                        <span className="text-3xl font-black text-[#111827]">{tips.length}</span>
                    </div>
                    {tips.length > 0 ? (
                        Object.entries(totals).map(([token, amount]) => (
                            <div key={token} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center border-l-4 border-l-[#00AFAA]">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Tipped</span>
                                <span className="text-3xl font-black text-[#00AFAA]">
                                    ${(amount * 0.0001).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                                    <span className="text-xs text-gray-400 ml-1 font-medium">USD</span>
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm md:col-span-2 flex items-center gap-4 bg-[#00AFAA]/5 text-[#003E52]">
                            <Heart className="w-8 h-8 text-[#00AFAA]" />
                            <div>
                                <div className="text-xs font-black uppercase tracking-widest mb-0.5 opacity-50">Impact Status</div>
                                <div className="font-bold">No tips sent yet. Start backing projects today!</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tip History List */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#003E52] flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#00AFAA]" />
                            Tip History
                        </h2>
                    </div>

                    {tips.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-[#003E52] mb-2 text-center">No tips yet</h3>
                            <p className="text-gray-500 mb-6 text-center">Your impact history is empty. Support a project to see shared transitions here!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {tips.map((d, index) => (
                                <div key={d._id || index} className="p-6 px-8 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="text-[#111827] font-bold mb-1 line-clamp-1">
                                            {d.projectId?.name || d.projectName || "Impact Campaign"}
                                        </div>
                                        <div className="text-sm text-gray-400 font-medium">
                                            {new Date(d.createdAt).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 justify-between md:justify-end">
                                        <div className="text-right">
                                            <div className="text-lg font-black text-[#00AFAA]">
                                                ${(parseFloat(d.amount) * 0.0001).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} USD
                                            </div>
                                        </div>
                                        {d.txHash && (
                                            <a
                                                href={`https://celoscan.io/tx/${d.txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#00AFAA] hover:border-[#00AFAA] transition-all shadow-sm"
                                                title="View transaction"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Saved Favorites Section */}
                <FavoritesSection />

                {/* CTA — Explore Projects */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#003E52] rounded-[2rem] text-white">
                    <div>
                        <div className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">Keep Going</div>
                        <div className="font-bold text-lg">Discover more impact projects to support</div>
                    </div>
                    <Link
                        href="/projects"
                        className="shrink-0 flex items-center gap-2 px-8 py-4 bg-[#00AFAA] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white hover:text-[#003E52] transition-all shadow-xl active:scale-95"
                    >
                        Browse Projects
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>
        </div>
    )
}
