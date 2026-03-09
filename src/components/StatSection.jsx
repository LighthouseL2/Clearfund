'use client';

import React, { useEffect, useState } from 'react';
import { Coins, Heart, Users, Globe } from 'lucide-react';

const StatSection = () => {
    const [stats, setStats] = useState({
        totalGDonated: 0,
        projectCount: 0,
        donorCount: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const resp = await fetch('/api/stats');
                const data = await resp.json();
                if (data.success) {
                    setStats(data.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    const items = [
        {
            label: 'Total G$ Tipped',
            value: stats.totalGDonated.toLocaleString(),
            icon: <Coins className="h-6 w-6 text-gd-teal" />,
            color: 'bg-gd-teal/10',
        },
        {
            label: 'Impact Projects',
            value: stats.projectCount,
            icon: <Globe className="h-6 w-6 text-gd-dark-blue" />,
            color: 'bg-gd-dark-blue/10',
        },
        {
            label: 'Tippers',
            value: stats.donorCount,
            icon: <Heart className="h-6 w-6 text-pink-500 fill-current" />,
            color: 'bg-pink-50',
        },
        {
            label: 'Network Status',
            value: 'Celo Mainnet',
            icon: <Users className="h-6 w-6 text-emerald-500" />,
            color: 'bg-emerald-50',
        },
    ];

    return (
        <section className="py-20 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-10 left-[10%] w-64 h-64 bg-gd-teal/20 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-10 right-[10%] w-64 h-64 bg-gd-dark-blue/20 blur-[100px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 animate-in fade-in duration-1000">
                    {items.map((item, index) => (
                        <div key={index} className="bg-white rounded-[32px] p-6 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2">
                            <div className={`${item.color} p-4 rounded-3xl mb-6 ring-2 ring-white shadow-inner`}>
                                {item.icon}
                            </div>
                            <div className="text-3xl md:text-4xl font-black text-gd-dark-blue mb-1 tabular-nums animate-in slide-in-from-bottom-2">
                                {item.value}
                            </div>
                            <div className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatSection;
