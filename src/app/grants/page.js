"use client";

import { useState } from 'react';
import AirtableEmbed from '../../components/AirtableEmbed';
import { usePrivy, useWallets } from "@privy-io/react-auth";
import UserDetails from "../../components/userDetails";
import CompactSidebar from '../../components/CompactSidebar';

export default function GrantsPage() {

  const { authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const address = wallets[0]?.address;

  // Get Airtable embed URL from environment variable
  const AIRTABLE_EMBED_URL = process.env.NEXT_PUBLIC_AIRTABLE_GRANTS_EMBED_URL;

  return (
    <div className="min-h-screen bg-white text-[#003E52] font-sans flex">
      {/* Sidebar */}
      <CompactSidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-20 pt-16 md:pt-0">
        {/* Top Header Bar for Wallet */}
        <div className="w-full h-20 hidden md:flex items-center justify-end px-8 md:px-16">
          {!authenticated ? (
            <button
              onClick={login}
              className="px-10 py-3.5 bg-[#00AFAA] text-white rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-[#003E52] transition-all flex items-center gap-2 shadow-sm"
            >
              Connect Wallet <span>→</span>
            </button>
          ) : (
            <UserDetails walletAddress={address} logout={logout} />
          )}
        </div>

        <main className="max-w-7xl pl-8 md:pl-10 pr-16 pb-20">
          {/* HERO SECTION */}
          <div className="pt-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-[64px] md:text-[84px] font-black tracking-tighter leading-[0.9] mb-8">
              Funding <span className="text-gray-300">Portal</span>
            </h1>
            <p className="text-gray-400 text-xl font-medium max-w-2xl leading-relaxed">
              Explore active funding opportunities across the Web3 ecosystem in one place.
            </p>
          </div>

          <div>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
              <h2 className="text-3xl font-black tracking-tight">
                Available Funding
              </h2>
            </div>

            {/* Airtable Embed */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden p-0 min-h-[800px]">
              <AirtableEmbed
                embedUrl={AIRTABLE_EMBED_URL}
                height="1000px"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

