"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAccount, useChainId, useDisconnect } from "wagmi"
import { removeSession } from "./session"




const ProtectedRoute = ({ children }) => {
    // const router = useRouter()
    // const { isConnected } = useAccount()
    // const chainId = useChainId()
    // const { disconnect } = useDisconnect()



    // useEffect(() => {

    //   if(!isConnected) {
    //     router.replace("/")
    //   }

     
      
    // },[isConnected, router])

    // if(!isConnected || chainId !== 42220 || !localStorage.getItem("login")) {
    //   return <p className="h-screen flex items-center justify-center text-4xl">Redirecting to login...</p>
    // }
    
    // console.log(chainId, "chainId");
    // console.log(account, "Account");

    return <>{children}</>
}


export default ProtectedRoute