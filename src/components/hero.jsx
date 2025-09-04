"use client"


import LoginForm from './LoginForm'
import { useSearchParams, useRouter } from "next/navigation";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from 'wagmi';
import { saveSession } from '@/lib/session';




const HeroSection = ({setModalOpen}) => {


  return (
    <div className="px-[5%]  flex justify-center items-center mx-auto text-center flex-col">
        <h1 className="mt-[103.5px] lg:w-[53.8rem] font-extrabold text-4xl md:text-[64px] mb-10">
          Track Grants. Discover   <br className='hidden sm:block'/>Open <span className='text-[#7CB53E]'>Applications.</span>
        </h1>
        <p className="text-[18px] md:text-[20px] lg:w-[60.8rem] mb-14 font-medium font-sans">
            ClearFund provides clarity and access to Web3 funding by aggregating past
             <br className='hidden lg:block'/>funding data, open and upcoming funding opportunities
             in one place.
        </p>


        <ConnectButton.Custom>
          {({ account, openConnectModal, openAccountModal, mounted }) => {
            const connected = mounted && account

            const handleClick = async () => {
              setModalOpen(true)
              openConnectModal()
              localStorage.setItem("login", "true")
              {/* saveSession() */}
            }

            return (
              <button onClick={handleClick}
                className='btn bg-[#198038] h-[52px]  hover:scale-105 transition-all
                text-white text-[16px] flex items-center font-sans justify-center
                  font-bold hover:bg-black w-[202.19px] rounded-md'>
                {connected ? "Connect wallet" : "Connect wallet"}
              </button>
            )
          }}
        </ConnectButton.Custom>

    </div>
  )
}

export default HeroSection