'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const NewHero = () => {
    return (
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-white py-20">
            {/* Background ambient blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00AFAA]/[0.07] rounded-full blur-[130px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00AFAA]/[0.05] rounded-full blur-[130px] animate-pulse delay-700"></div>
                <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] bg-[#00AFAA]/[0.04] rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* BADGE */}
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#00AFAA]/5 border border-[#00AFAA]/10 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AFAA] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00AFAA]"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00AFAA]">Tip Real-world Impact Projects</span>
                </div>

                {/* HEADLINE */}
                <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black text-[#003E52] tracking-tighter leading-[0.9] mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Tip Real <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AFAA] via-[#00AFAA] to-teal-400">Impact</span>
                </h1>

                {/* SUBTEXT */}
                <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-500 font-medium leading-tight mb-16 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                    Discover, support, and track <span className="text-[#00AFAA] font-black">ReFi projects</span> — <br className="hidden md:block" />
                    with direct crypto tipping and full on-chain transparency.
                </p>

                {/* CTA BUTTONS */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
                    <Link href="/projects" className="group relative w-full sm:w-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00AFAA] to-teal-300 rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                        <button className="relative w-full sm:w-[280px] px-10 py-6 bg-[#00AFAA] text-white font-black rounded-3xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-[0.2em] shadow-xl">
                            Start Tipping
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </Link>

                    <Link href="/projects" className="w-full sm:w-auto">
                        <button className="w-full sm:w-[280px] px-10 py-6 bg-white text-[#003E52] border-2 border-gray-100 font-black rounded-3xl flex items-center justify-center gap-3 hover:border-[#00AFAA] hover:text-[#00AFAA] transition-all transform hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-[0.2em]">
                            Explore More
                        </button>
                    </Link>
                </div>

                {/* ECOSYSTEM LOGOS — Real organisations from the project */}
                <div className="pt-16 border-t border-gray-100 flex flex-col items-center animate-in fade-in duration-1000 delay-1000">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-12">
                        Trusted ecosystem partners
                    </span>
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                        {[
                            { src: '/gooddollar.png', alt: 'GoodDollar' },
                            { src: '/celo.png', alt: 'Celo' },
                            { src: '/giveth.png', alt: 'Giveth' },
                            { src: '/gitcoin.png', alt: 'Gitcoin' },
                        ].map((logo) => (
                            <img
                                key={logo.alt}
                                src={logo.src}
                                alt={logo.alt}
                                className="h-8 md:h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewHero;
