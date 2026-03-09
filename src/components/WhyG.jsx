"use client"

import { Heart, ShieldCheck, Zap, Globe } from "lucide-react";

const WhyG = () => {
    const points = [
        {
            title: "100% Direct",
            description: "Tips go directly to project wallets on the Celo blockchain, bypassing middlemen.",
            icon: <Zap className="w-6 h-6" />,
            color: "text-gd-teal",
            bgColor: "bg-gd-teal/10"
        },
        {
            title: "Fully Transparent",
            description: "Every transaction is public, immutable, and verifiable on Celoscan in real-time.",
            icon: <ShieldCheck className="w-6 h-6" />,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            title: "Global Reach",
            description: "GoodDollar connects tippers and impact builders across borders without friction.",
            icon: <Globe className="w-6 h-6" />,
            color: "text-gd-gold",
            bgColor: "bg-gd-gold/10"
        }
    ];

    return (
        <div className="p-12 md:p-16 bg-white rounded-[3.5rem] border border-gray-100 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gd-teal via-blue-500 to-gd-gold"></div>

            <div className="relative z-10">
                <h3 className="text-4xl font-black text-gd-dark-blue mb-6 tracking-tighter">Why G$ Matters</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-12 text-lg">
                    GoodDollar (G$) is a digital currency designed to reduce wealth inequality. By tipping G$, you're participating in a global movement of sustainable philanthropy.
                </p>

                <div className="space-y-8">
                    {points.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-6 group/item">
                            <div className={`w-14 h-14 rounded-2xl ${point.bgColor} flex items-center justify-center ${point.color} flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                                {point.icon}
                            </div>
                            <div>
                                <h4 className="font-black text-gd-dark-blue text-xl mb-1">{point.title}</h4>
                                <p className="text-sm text-gray-500 font-medium leading-normal">{point.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-gd-dark-blue rounded-3xl text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gd-teal/20 to-transparent"></div>
                    <p className="relative z-10 text-white font-black uppercase tracking-[0.2em] text-xs">
                        Join 500,000+ Claimers Worldwide
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhyG;
