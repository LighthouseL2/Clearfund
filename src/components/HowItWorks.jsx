"use client"

import { BarChart3, ArrowRight, Zap, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";

const HowItWorks = () => {
    const steps = [
        {
            title: "Discover",
            description: "Explore a curated feed of high-impact projects vetted by the ClearFund community. From climate action to social equity, find what resonates with you.",
            icon: <Globe className="w-10 h-10" />,
            color: "text-[#00AFAA]",
            bgColor: "bg-[#00AFAA]/5",
            accent: "from-[#00AFAA] to-teal-400"
        },
        {
            title: "Track Impact",
            description: "Watch your contribution work in real time. On-chain transparency means you see exactly how every dollar moves and what it builds.",
            icon: <BarChart3 className="w-10 h-10" />,
            color: "text-[#00AFAA]",
            bgColor: "bg-[#00AFAA]/5",
            accent: "from-[#00AFAA] to-teal-400"
        }
    ];

    return (
        <section className="py-32 bg-gray-50/30 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003E52]/5 text-[#003E52] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <ShieldCheck className="w-3 h-3 text-[#00AFAA]" />
                        Transparent Philanthropy
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-[#003E52] tracking-tighter mb-8 px-4">
                        Impact in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AFAA] to-blue-600">Three Steps</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-gray-500 font-medium text-lg leading-relaxed px-4">
                        We've removed the barriers to giving. Direct, transparent, and accessible tipping for everyone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[28%] left-[15%] right-[15%] h-0.5 bg-gray-100 -z-10"></div>

                    {steps.map((step, idx) => (
                        <div key={idx} className="group flex flex-col items-center text-center px-6">
                            <div className="relative mb-10">
                                <div className={`w-28 h-28 ${step.bgColor} rounded-full flex items-center justify-center ${step.color} border-2 border-white shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                                    {step.icon}
                                </div>
                                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#003E52] rounded-full border-4 border-white flex items-center justify-center text-white font-black text-sm">
                                    {idx + 1}
                                </div>
                            </div>

                            <h3 className="text-3xl font-black text-[#003E52] mb-6 tracking-tight group-hover:text-[#00AFAA] transition-colors">
                                {step.title}
                            </h3>

                            <p className="text-gray-500 font-medium leading-relaxed mb-8 text-sm">
                                {step.description}
                            </p>

                            <div className={`h-1 w-12 bg-gradient-to-r ${step.accent} rounded-full opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500`}></div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-24 text-center">
                    <Link href="/projects" className="inline-flex items-center gap-4 px-12 py-6 bg-[#00AFAA] text-white font-black rounded-3xl hover:bg-[#003E52] transition-all shadow-2xl transform hover:-translate-y-2 uppercase tracking-widest text-xs">
                        Start Exploring Projects
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
