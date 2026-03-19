"use client"

import Image from "next/image";

export default function HeroBanner() {
  return (
    <div className="relative h-[240px] md:h-[300px] w-full overflow-hidden rounded-[2.5rem] mb-16 shadow-xl border border-gray-100 group">
      <Image
        src="/assets/banner_image.png"
        alt="Projects Banner"
        fill
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s] ease-out"
        priority
      />
      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#003E52]/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
      
      {/* Content overlay - Subtle hint of color to match the brand */}
      <div className="relative z-10 flex items-center h-full px-12">
        <div className="w-1.5 h-12 bg-[#00AFAA] rounded-full mr-6 shadow-[0_0_20px_rgba(0,175,170,0.5)]" />
        <div className="md:max-w-xl">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80 mb-2 block">
             Verified Registry
           </span>
           <div className="h-px w-12 bg-[#00AFAA]/50 mt-4" />
        </div>
      </div>
    </div>
  );
}
