"use client"


// import imgBanner1 from "../../public/assets/banner.png";
import Image from "next/image";
import { usePrivy, useWallets } from "@privy-io/react-auth";

export default function HeroBanner() {

  const { ready, authenticated, login, logout, user } = usePrivy()

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
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between h-full px-6 lg:px-11 py-8 lg:py-0 gap-6">
        <div className="text-white max-w-2xl">
          <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[32px] lg:text-[48px] leading-normal mb-4 lg:mb-6">
            All Grants. One Dashboard.
          </h1>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[18px] lg:text-[24px] leading-[28px] lg:leading-[35px]">
            Explore active funding opportunities across the Web3 ecosystem
            in one place.
          </p>
        </div>

        {/* Connect Wallet Button */}
        {
          !authenticated ?
            <button 
              onClick={login}
              className="bg-white rounded-[50px] px-6 h-[52px] flex items-center justify-center hover:bg-gray-50 transition-colors whitespace-nowrap flex-shrink-0">
              <span className="font-['Modern_Era:Bold',sans-serif] text-[16px] text-[#39b54a]">
                Connect Wallet
              </span>
            </button> : null
        }



        {/* <div className="flex">

                  {!authenticated ?
                  <button
                      onClick={login}
                      className="font-sans font-black text-[16px] h-[52px] bg-[#39B54A] text-white
                        rounded-full w-[159.16796875px] hover:bg-black"
                      >
                      Connect wallet
                  </button> : <UserDetails walletAddress={address} logout={logout}/>
                }
              </div> */}
      </div>
    </div>
  );
}
