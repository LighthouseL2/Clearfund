import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

const ProjectCard = ({ project }) => {
    const {
        name,
        slug,
        tagline,
        category,
        logo,
        totalRaised = 0,
        fundingGoal,
        donationCount = 0,
        location,
    } = project;

    const categoryLabels = {
        GOODDOLLAR_GRANTEE: 'Grantee',
        GRANT_SEEKER: 'Grant Seeker',
        CLIMATE: 'Climate',
        SOCIAL_IMPACT: 'Social Impact',
        EDUCATION: 'Education',
    };

    return (
        <Link href={`/projects/${slug}`} className="block group/card h-full">
            <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100/50 flex flex-col h-full relative">
                {/* CARD IMAGE SECTION (Landscape-oriented) */}
                <div className="relative w-full aspect-[16/10] overflow-hidden shrink-0">
                    <img
                        src={logo || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80'}
                        alt={name}
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gd-dark-blue/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>

                    {/* CATEGORY TAG */}
                    <div className="absolute top-5 left-5 z-10">
                        <span className="bg-white/95 backdrop-blur-md text-gd-dark-blue text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl border border-white/20">
                            {categoryLabels[category] || 'Impact'}
                        </span>
                    </div>
                </div>

                {/* CARD CONTENT SECTION */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-2xl font-black text-gd-dark-blue tracking-tighter leading-[1.1] group-hover/card:text-gd-teal transition-colors duration-300">
                                {name}
                            </h3>
                            <ArrowRight className="w-6 h-6 text-gray-200 group-hover/card:text-gd-teal group-hover/card:translate-x-1 transition-all duration-500 shrink-0 ml-2" />
                        </div>
                        {location && (
                            <div className="flex items-center gap-1.5 text-gray-400 mb-4 tracking-tight">
                                <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span className="text-xs font-bold">{location}</span>
                            </div>
                        )}
                        <p className="text-gray-400 font-medium text-[14px] line-clamp-4 leading-relaxed tracking-tight group-hover/card:text-gray-600 transition-colors">
                            {tagline}
                        </p>
                    </div>

                    {/* CTA BUTTON (Animated on hover) */}
                    <div className="mt-6 opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500">
                        <div className="w-full py-4 bg-[#00AFAA] text-white font-black rounded-2xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest shadow-lg transform hover:scale-[1.02] active:scale-95">
                            Tip Project
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* STATS */}
                    <div className={`flex items-center pt-6 mt-4 border-t border-gray-100/50 ${totalRaised > 0 ? 'justify-between' : 'justify-end'}`}>
                        {totalRaised > 0 && (
                            <div>
                                <div className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em] mb-1">Total Tips</div>
                                <div className="text-xl font-black text-[#003E52] tabular-nums tracking-tighter">${totalRaised.toLocaleString()}</div>
                            </div>
                        )}
                        <div className="text-right">
                            <div className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em] mb-1">Category</div>
                            <div className="text-[12px] font-black text-[#003E52] tracking-tight">{categoryLabels[category] || 'Impact'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};


export default ProjectCard;

