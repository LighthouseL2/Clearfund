"use client"

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="relative overflow-hidden bg-[#003E52] rounded-[4rem] p-12 md:p-24 text-center">
                    {/* Background elements */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00AFAA] opacity-10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00AFAA] opacity-5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 text-white rounded-full mb-10 border border-white/10 backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-[#00AFAA] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Join the Movement</span>
                        </div>

                        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-10">
                            Your impact <br className="hidden md:block" />
                            starts <span className="text-[#00AFAA] italic">here.</span>
                        </h2>

                        <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed mb-16 px-4">
                            Whether you're a tipper looking to fund change or a builder with a vision,
                            ClearFund is your home for high-impact project discovery and direct on-chain tipping.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/projects" className="w-full sm:w-auto">
                                <button className="w-full px-12 py-6 bg-[#00AFAA] text-white font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-white hover:text-[#003E52] transition-all transform hover:scale-[1.05] active:scale-95 text-xs uppercase tracking-widest shadow-2xl">
                                    Browse Projects
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>

                            <Link href="/projects" className="w-full sm:w-auto">
                                <button className="w-full px-12 py-6 bg-white/5 text-white border-2 border-white/20 font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-white hover:text-[#003E52] transition-all transform hover:scale-[1.05] active:scale-95 text-xs uppercase tracking-widest backdrop-blur-md">
                                    Tip
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
