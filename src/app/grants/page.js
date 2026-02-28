"use client";

import { useState } from 'react';
import Sidebar from '../../components/SideBar2';
import HeroBanner from '../../components/HeroBanner';
import AirtableEmbed from '../../components/AirtableEmbed';
import { Form } from '../../components/Form';
import { usePrivy, useWallets } from "@privy-io/react-auth";
import UserDetails from "../../components/userDetails";
import ModalConnect from "../../components/modalConnect";
import Image from "next/image";

export default function GrantsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const address = wallets[0]?.address;
  const [toggle, setToggle] = useState(false);

  // Get Airtable embed URL from environment variable
  const AIRTABLE_EMBED_URL = process.env.NEXT_PUBLIC_AIRTABLE_GRANTS_EMBED_URL;

  return (
    <div className="bg-white min-h-screen relative">
      {/* Sidebar */}
      <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:ml-64 w-full lg:w-auto flex-1">

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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded-lg shadow-md"
        >
          <svg className="w-6 h-6 text-[#39b54a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Form Modal */}
        {isHidden && <Form setIsHidden={setIsHidden} />}

        <div className={isHidden ? "opacity-60" : undefined}>
          <HeroBanner />

          {/* Main Section */}
          <div className="bg-[#f5f7fa] min-h-[calc(100vh-323px)]">
            <div className="max-w-[1191px] mx-auto px-4 sm:px-6 lg:px-9 py-8 lg:py-12">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="font-['Inter:Bold',sans-serif] font-bold text-[24px] sm:text-[32px] text-black">
                  Explore
                </h2>
                <button onClick={() => setIsHidden(!isHidden)}
                  className="bg-[#00cd5d] hover:bg-[#00b851] transition-colors rounded-[50px] h-[44px] px-6 flex items-center justify-center whitespace-nowrap">
                  <span className="font-['Modern_Era:Bold',sans-serif] text-[14px] text-white">
                    Add new grant
                  </span>
                </button>
              </div>

              {/* Airtable Embed */}
              <AirtableEmbed
                embedUrl={AIRTABLE_EMBED_URL}
                height="1000px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
