"use client"

import { useState, useEffect } from "react";
import { Globe, Users, ArrowUpRight, TrendingUp, ShieldCheck } from "lucide-react";

const PlatformStats = () => {
    const [stats, setStats] = useState({
        totalGTipped: 0,
        projectCount: 0,
        tipperCount: 0
    });

    useEffect(() => {
        const fetchStats = () => {
            fetch('/api/stats')
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setStats(data.data);
                    }
                })
                .catch(err => console.error("Error fetching stats:", err));
        };

        fetchStats(); // initial fetch
        const interval = setInterval(fetchStats, 15000); // poll every 15s
        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
        return num.toString();
    };

    const statItems = [
        {
            label: "Impact Projects",
            value: stats.projectCount.toString(),
            suffix: "+",
            icon: <Globe className="w-8 h-8" />,
            color: "text-[#00AFAA]",
            bgColor: "bg-[#00AFAA]/5"
        },
        {
            label: "Platform Fees",
            value: "0",
            suffix: "%",
            icon: <ShieldCheck className="w-8 h-8" />,
            color: "text-[#00AFAA]",
            bgColor: "bg-[#00AFAA]/5"
        },
        {
            label: "Tippers",
            value: stats.tipperCount.toString(),
            suffix: "+",
            icon: <Users className="w-8 h-8" />,
            color: "text-[#00AFAA]",
            bgColor: "bg-[#00AFAA]/5"
        }
    ];


    return (
        <section className="py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003E52]/5 text-[#003E52] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <TrendingUp className="w-3 h-3 text-[#00AFAA]" />
                        Platform Performance
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-[#003E52] tracking-tighter leading-none mb-6">
                        Our <span className="text-[#00AFAA]">Impact</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-gray-400 font-medium text-lg leading-relaxed">
                        Real-time metrics from ClearFund — transparent and verifiable on-chain.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {statItems.map((item, idx) => (
                        <div key={idx} className="group relative">
                            <div className="p-12 bg-white border border-gray-100 rounded-[3.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center">
                                <div className={`w-20 h-20 ${item.bgColor} rounded-3xl flex items-center justify-center ${item.color} mb-8 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <div className="text-6xl font-black text-[#003E52] tracking-tighter mb-4 tabular-nums">
                                    {item.value}<span className="text-[#00AFAA]">{item.suffix}</span>
                                </div>
                                <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                                    {item.label}
                                </div>

                                <div className="absolute top-8 right-8 text-gray-100 group-hover:text-[#00AFAA] transition-colors">
                                    <ArrowUpRight className="w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlatformStats;
