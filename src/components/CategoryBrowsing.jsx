"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Leaf, Heart, Recycle, Globe,
    Users, GraduationCap, Coins,
    ArrowRight, Sparkles
} from "lucide-react";

const CategoryBrowsing = () => {
    const [counts, setCounts] = useState({});

    useEffect(() => {
        fetch('/api/projects/categories/count')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCounts(data.counts);
                }
            })
            .catch(err => console.error("Error fetching category counts:", err));
    }, []);

    const categories = [
        {
            id: 'GOODDOLLAR_GRANTEE',
            name: 'GoodDollar Grantees',
            icon: <Coins className="w-8 h-8" />,
            color: 'bg-gd-teal',
            glow: 'shadow-gd-teal/20',
            description: 'Projects supported by the GoodDollar ecosystem.'
        },
        {
            id: 'GRANT_SEEKER',
            name: 'Grant Seekers',
            icon: <GraduationCap className="w-8 h-8" />,
            color: 'bg-blue-500',
            glow: 'shadow-blue-500/20',
            description: 'New projects seeking funding to build impact.'
        },
        {
            id: 'REFI',
            name: 'ReFi Projects',
            icon: <Recycle className="w-8 h-8" />,
            color: 'bg-emerald-500',
            glow: 'shadow-emerald-500/20',
            description: 'Regenerative finance solutions for a better world.'
        },
        {
            id: 'GOODCOLLECTIVE',
            name: 'GoodCollective',
            icon: <Users className="w-8 h-8" />,
            color: 'bg-indigo-500',
            glow: 'shadow-indigo-500/20',
            description: 'Direct community funding models.'
        },
        {
            id: 'CLIMATE',
            name: 'Climate Action',
            icon: <Leaf className="w-8 h-8" />,
            color: 'bg-green-500',
            glow: 'shadow-green-500/20',
            description: 'Fighting climate change and restoring biodiversity.'
        },
        {
            id: 'SOCIAL_IMPACT',
            name: 'Social Impact',
            icon: <Heart className="w-8 h-8" />,
            color: 'bg-rose-500',
            glow: 'shadow-rose-500/20',
            description: 'Strengthening communities and social equity.'
        },
        {
            id: 'PUBLIC_GOODS',
            name: 'Public Goods',
            icon: <Globe className="w-8 h-8" />,
            color: 'bg-sky-500',
            glow: 'shadow-sky-500/20',
            description: 'Resources for everyone, built by everyone.'
        },
    ];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gd-dark-blue/5 text-gd-dark-blue text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <Sparkles className="w-3 h-3 text-gd-teal" />
                            Discovery Engine
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-gd-dark-blue tracking-tighter leading-none">
                            Explore by <span className="text-gd-teal underline underline-offset-8 decoration-4">Category</span>
                        </h2>
                    </div>
                    <Link href="/projects" className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gd-dark-blue hover:text-gd-teal transition-all">
                        Browse All Projects
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <Link
                            key={cat.id}
                            href={`/projects?category=${cat.id}`}
                            className="group relative"
                        >
                            <div className={`h-full p-10 bg-white border border-gray-100 rounded-[3rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-start text-left overflow-hidden`}>
                                {/* Background Glow */}
                                <div className={`absolute top-0 right-0 w-32 h-32 ${cat.color} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-10 transition-opacity`}></div>

                                <div className={`p-5 rounded-3xl ${cat.color} text-white mb-8 shadow-lg ${cat.glow} group-hover:scale-110 transition-transform duration-500`}>
                                    {cat.icon}
                                </div>

                                <h3 className="text-2xl font-black text-gd-dark-blue mb-4 leading-tight tracking-tight">
                                    {cat.name}
                                </h3>

                                <div className="inline-block px-4 py-1 rounded-full bg-gray-50 text-gd-teal text-[10px] font-black uppercase tracking-[0.1em] mb-6">
                                    {counts[cat.id] || 0} Active Projects
                                </div>

                                <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8 h-12 line-clamp-2">
                                    {cat.description}
                                </p>

                                <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gd-dark-blue group-hover:text-gd-teal transition-all">
                                    Explore Now
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Submit CTA Card */}
                    <Link href="/projects/submit" className="group lg:col-span-1">
                        <div className="h-full p-10 bg-gd-dark-blue rounded-[3rem] shadow-2xl flex flex-col items-center justify-center text-center text-white hover:bg-gd-teal transition-all duration-500">
                            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8">
                                <Sparkles className="w-10 h-10 text-gd-gold" />
                            </div>
                            <h3 className="text-3xl font-black mb-4 tracking-tight">Start Your Impact</h3>
                            <p className="text-white/70 font-medium text-sm mb-10 leading-relaxed px-4">
                                Got a project that needs funding? Submit it to the ClearFund community today.
                            </p>
                            <div className="px-8 py-4 bg-white text-gd-dark-blue font-black rounded-2xl uppercase tracking-widest text-xs group-hover:scale-105 transition-transform">
                                Get Started
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategoryBrowsing;
