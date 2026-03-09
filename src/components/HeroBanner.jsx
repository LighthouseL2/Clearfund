"use client"


// import imgBanner1 from "../../public/assets/banner.png";
import Image from "next/image";

export default function HeroBanner() {

  return (
    <div className="relative h-[323px] w-full overflow-hidden">
      {/* <img 
        src={imgBanner1} 
        alt="Banner" 
        className="absolute inset-0 w-full h-full object-cover"
      /> */}
      <Image
        src={"/assets/banner.png"}
        alt="Banner"
        fill
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between h-full px-6 lg:px-11 py-8 lg:py-0 w-full gap-6">
        <div className="text-white max-w-2xl">
          <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[32px] lg:text-[48px] leading-normal mb-4 lg:mb-6">
            All Funding. One Dashboard.
          </h1>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[18px] lg:text-[24px] leading-[28px] lg:leading-[35px]">
            Explore active funding opportunities across the Web3 ecosystem
            in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
