'use client';

import React, { useEffect, useState } from 'react';
import { Heart, ArrowUpRight, Coins } from 'lucide-react';
import Link from 'next/link';

const DonationFeed = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [todayTotal, setTodayTotal] = useState(0);

    const formatTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const resp = await fetch('/api/donations?limit=10');
                const data = await resp.json();
                if (data.success) {
                    setDonations(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecent();
        const interval = setInterval(fetchRecent, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading && donations.length === 0) return (
        <div className="bg-white rounded-[40px] p-12 border border-gray-100 shadow-sm animate-pulse">
            <div className="h-8 w-48 bg-gray-100 mb-8 rounded-full"></div>
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-gray-50 mb-4 rounded-2xl"></div>
            ))}
        </div>
    );

    return (
        <section className="bg-white rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-2xl relative overflow-hidden group/feed">
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gd-teal opacity-[0.03] blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover/feed:opacity-10 transition-opacity duration-1000"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
                <div className="flex flex-col gap-1">
                    <h3 className="text-4xl font-black text-gd-dark-blue tracking-tighter">Live Support</h3>
                    <p className="text-gray-400 text-sm font-medium tracking-tight">Direct impact stream on Celo Mainnet</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-500 rounded-full border border-rose-100 shadow-sm shadow-rose-200/20">
                    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Stream Online</span>
                </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gd-teal scrollbar-track-transparent">
                {donations.length === 0 ? (
                    <div className="py-32 text-center flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                            <Heart className="w-8 h-8" />
                        </div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Awaiting First G$ Transaction</p>
                    </div>
                ) : (
                    donations.map((d, idx) => (
                        <div
                            key={d._id}
                            style={{ animationDelay: `${idx * 100}ms` }}
                            className="flex items-center justify-between p-6 bg-gray-50/40 rounded-[2rem] border border-gray-100/30 hover:bg-white hover:shadow-2xl hover:border-gd-teal/20 transition-all duration-500 group/item animate-in fade-in slide-in-from-right-4"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-white shadow-md border border-gray-50 flex items-center justify-center text-gd-teal group-hover/item:scale-110 transition-transform">
                                    <Heart className="h-7 w-7 fill-current" />
                                </div>
                                <div className="overflow-hidden">
                                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                                        <span className="text-[15px] font-black text-gd-dark-blue font-mono tracking-tighter shrink-0 bg-gray-100/50 px-2 py-0.5 rounded-lg border border-gray-200/50">
                                            {d.anonymous ? "Anonymous" : `${d.donorWallet?.substring(0, 6)}...${d.donorWallet?.substring(38)}`}
                                        </span>
                                        <span className="text-xs font-medium text-gray-400">sent</span>
                                        <span className="text-lg font-black text-gd-teal tabular-nums">{d.amount.toLocaleString()}<span className="text-xs ml-1">G$</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-1 overflow-hidden">
                                        <span className="text-xs font-medium text-gray-400 shrink-0">to</span>
                                        <Link
                                            href={`/projects/${d.projectId?.slug}`}
                                            className="text-xs font-black text-gd-dark-blue hover:text-gd-teal transition-colors truncate underline underline-offset-4 decoration-gd-teal/20 hover:decoration-gd-teal"
                                        >
                                            {d.projectId?.name}
                                        </Link>
                                    </div>
                                    <div className="text-[9px] text-gray-300 font-black uppercase tracking-[0.2em] mt-3 flex items-center gap-2">
                                        <ArrowUpRight className="w-3 h-3" />
                                        {formatTimeAgo(d.createdAt)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Link href="/projects" className="mt-10 block w-full py-4 text-center border-2 border-gd-dark-blue/5 rounded-2xl text-gd-dark-blue font-black hover:bg-gd-dark-blue hover:text-white transition-all text-sm uppercase tracking-widest">
                Support A Project Now
            </Link>
        </section>
    );
};

export default DonationFeed;
