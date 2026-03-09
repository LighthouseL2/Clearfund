"use client"

import { MenuIcon, X, ArrowRight, Wallet } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import UserDetails from "./userDetails"

const NavHeader = () => {
  const router = useRouter()
  const { login, authenticated, user, logout } = usePrivy()
  const wallet = user?.wallet?.address


  return (
    <nav className="px-[5%] md:px-8 lg:px-12 flex justify-between items-center h-24 sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/assets/clearfund%20logo.png"
            alt="ClearFund"
            className="h-12 w-auto"
          />
        </Link>
      </div>

      {/* NAV LINKS */}
      <ul className="flex gap-4 md:gap-8 lg:gap-12 items-center ml-auto mr-4 pl-4">
      </ul>

      <div className="flex items-center gap-4">
        {authenticated && wallet ? (
          <UserDetails
            walletAddress={wallet}
            logout={logout}
            balance="0" // Placeholder, balance usually fetched in a hook
          />
        ) : (
          <Link
            href="/projects"
            className="px-10 py-5 bg-[#00AFAA] text-white font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-[#003E52] transition-all transform hover:scale-[1.05] active:scale-95 text-[10px] uppercase tracking-widest shadow-2xl"
          >
            Tip
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>

    </nav>
  )
}

export default NavHeader
