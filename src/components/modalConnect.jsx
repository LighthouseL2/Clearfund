"use client"


import React, { useState } from 'react'
import { X } from "lucide-react"
import { usePrivy } from '@privy-io/react-auth'


const ModalConnect = ({setCloseModal}) => {

    const { ready, authenticated, login, logout, user } = usePrivy()

    function handleLogin() {
        login()
    }
    
  return (
    <div className="fixed bg-black/70 h-screen w-full top-0 z-100 left-0 flex items-center justify-center">
            <div className="w-[365px] h-[267px] bg-white relative rounded-md" onBlur={() => setCloseModal(false)}>
                <div className="absolute right-5 top-3">
                    <X size={20} color="black" onClick={()=> setCloseModal(false)}/>
                </div>
                <div className="flex flex-col justify-center items-center space-y-3 mt-7">
                    <span>
                        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="29" cy="29" r="29" fill="#39B54A" fillOpacity="0.2"/>
                        <path d="M29.6446 12.8887L15.4668 37.3776H43.8224L29.6446 12.8887Z" stroke="#39B54A" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M29.6445 32.2222V32.8667M29.6445 21.9111L29.6497 28.3556" stroke="#39B54A" strokeWidth="2" strokeLinecap="round"/>
                        </svg>

                    </span>


                    <h2 className="text-[24px] font-sans font-black mb-5">Wallet not Connected</h2>
                    {/* <p className="text-[14px]">Please connect wallet to continue.</p> */}
                    <button
                        onClick={handleLogin}
                        className="font-sans font-black text-[16px] h-[52px] bg-[#39B54A] text-white
                            rounded-full w-[159.16796875px]"
                        >
                        Connect wallet
                    </button>
                </div>
            </div>
        </div>
  )
}

export default ModalConnect