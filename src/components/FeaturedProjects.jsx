'use client';

import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const resp = await fetch('/api/giveth?featured=true');
                const data = await resp.json();
                if (data.success) {
                    // Show exactly 3 for landing page
                    setProjects(data.data.slice(0, 3));
                }


            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (loading) return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-[450px] bg-gray-50 animate-pulse rounded-[2.5rem]"></div>
                    ))}
                </div>
            </div>
        </section>
    );



    if (projects.length === 0) return null;

    return (
        <section className="py-32 relative overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* SECTION HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div>
                        <div className="flex items-center gap-2 text-[#00AFAA] mb-6">
                            <Star className="h-6 w-6 fill-current animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Featured Projects</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-[#003E52] tracking-tighter leading-none mb-6">
                            Real Impact, <br /><span className="text-[#00AFAA]">On Chain</span>
                        </h2>
                        <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-lg">
                            Curated Regenerative Finance (ReFi) initiatives driving real-world change — open for direct, transparent crypto donations.
                        </p>
                    </div>

                    {/* Desktop "View All" link — top right */}
                    <Link
                        href="/projects"
                        className="hidden md:inline-flex items-center gap-3 px-8 py-4 border-2 border-[#003E52]/10 rounded-2xl text-[#003E52] font-black text-xs uppercase tracking-widest hover:border-[#00AFAA] hover:text-[#00AFAA] transition-all duration-300 group shrink-0"
                    >
                        View all projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* 3-CARD GRID AS REQUESTED */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>



                {/* Mobile "View All" link — below cards */}
                <div className="mt-14 flex justify-center md:hidden">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-3 px-10 py-5 border-2 border-[#003E52]/10 rounded-2xl text-[#003E52] font-black text-xs uppercase tracking-widest hover:border-[#00AFAA] hover:text-[#00AFAA] transition-all duration-300 group"
                    >
                        View all projects
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default FeaturedProjects;
