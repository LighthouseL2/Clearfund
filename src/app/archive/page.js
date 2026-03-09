"use client";

import { useState } from "react";
import PastGrant from "@/components/PastGrant";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import UserDetails from "@/components/userDetails";
import ModalConnect from "@/components/modalConnect";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function ArchivePage() {
  const { authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const address = wallets[0]?.address;
  const [toggle, setToggle] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 relative">

      {/* Desktop Sidebar (Rendered within the Sidebar component logic usually, 
          but Sidebar2 seems to handle both desktop and mobile if passed correct props) */}

      <main className="flex-1 flex flex-col min-h-screen">
        {/* Wallet Connection Header */}
        <div className="flex justify-end items-center gap-4 bg-white py-3 px-6 shadow-sm">
          {toggle && <ModalConnect setCloseModal={setToggle} />}
          {!authenticated ? (
            <button
              onClick={login}
              className="font-sans font-black text-[16px] h-[52px] bg-[#39B54A] text-white rounded-full w-[160px] hover:bg-black transition-colors"
            >
              Connect wallet
            </button>
          ) : (
            <UserDetails walletAddress={address} logout={logout} />
          )}
        </div>

        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold mb-4">Archive</h1>
                <p className="text-base text-gray-600">
                  Directory of past funding data and their recipients
                </p>
              </div>
            </div>

            <PastGrant />
          </div>
        </div>
      </main>
    </div>
  );
}
