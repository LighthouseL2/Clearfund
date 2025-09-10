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
          Your Gateway to Web3
          <br className='hidden sm:block'/>Funding and <span className='text-[#39B54A]'>Opportunities </span>
        </h1>
        <p className="text-[18px] md:text-[20px] lg:w-[60.8rem] mb-14 font-medium font-sans">
            ClearFund Connect builders to funding opportunities
             <br className='hidden lg:block'/>that drive innovation and growth.
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
                className='btn bg-[#39B54A] h-[52px]  hover:scale-105 transition-all
                text-white text-[16px] flex items-center font-sans justify-center
                  font-bold hover:bg-black w-[202.19px] rounded-full'>
                {connected ? "Connect wallet" : "Connect wallet"}
              </button>
            )
          }}
        </ConnectButton.Custom>

    </div>
  )
}

export default HeroSection