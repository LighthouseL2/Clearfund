"use client";

import { useState } from 'react';
import Link from 'next/link';
import AirtableEmbed from '../../components/AirtableEmbed';
import { usePrivy, useWallets } from "@privy-io/react-auth";
import UserDetails from "../../components/userDetails";
import ModalConnect from "../../components/modalConnect";
import Image from "next/image";


export default function GrantsPage() {

  const { authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const address = wallets[0]?.address;
  const [toggle, setToggle] = useState(false);

  // Get Airtable embed URL from environment variable
  const AIRTABLE_EMBED_URL = process.env.NEXT_PUBLIC_AIRTABLE_GRANTS_EMBED_URL;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#003E52] font-sans selection:bg-[#00AFAA] selection:text-white">
      {/* Light Theme Header (consistent with projects page) */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center text-[#003E52]">
          <div className="flex items-center relative">
            <Link href="/" className="md:absolute md:right-full md:mr-10 p-2 hover:bg-gray-50 rounded-full transition-colors group flex items-center gap-2" title="Home">
              <svg className="h-5 w-5 text-gray-400 group-hover:text-[#00AFAA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-xs font-bold text-gray-400 group-hover:text-[#00AFAA] md:hidden">Home</span>
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/projects" className="text-sm font-bold text-gray-500 hover:text-[#00AFAA] transition-colors">Impact projects</Link>
              <Link href="/grants" className="text-sm font-bold text-[#00AFAA] transition-colors border-b-2 border-[#00AFAA] pb-1 translate-y-0.5">Funding</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {!authenticated ? (
              <button
                onClick={login}
                className="px-6 py-2.5 bg-[#00AFAA] text-white rounded-xl font-bold text-sm hover:bg-[#003E52] transition-all shadow-sm"
              >
                Connect Wallet
              </button>
            ) : (
              <UserDetails walletAddress={address} logout={logout} />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 flex-1">
        {/* HERO SECTION */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
            Funding <span className="text-gray-300">Portal</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium max-w-xl leading-relaxed">
            Explore active funding opportunities across the Web3 ecosystem in one place.
          </p>
        </div>


        {/* Form Modal */}


        <div>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-black tracking-tight mb-3">
              Available Funding
            </h2>

          </div>

          {/* Airtable Embed */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden p-0">
            <AirtableEmbed
              embedUrl={AIRTABLE_EMBED_URL}
              height="1000px"
            />
          </div>
        </div>
      </main>

      {/* Footer consistent with projects page */}
      <footer className="border-t border-gray-100 py-20 px-6 md:px-12 lg:px-16 mt-20 bg-white text-[#003E52]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 ClearFund</p>
          <div className="flex gap-8">
            <Link href="https://github.com/LighthouseL2/Clearfund" target="_blank" className="text-[10px] font-black text-gray-400 hover:text-[#00AFAA] transition-colors uppercase tracking-widest">GitHub</Link>
            <Link href="https://x.com/Clear_Fund" target="_blank" className="text-[10px] font-black text-gray-400 hover:text-[#00AFAA] transition-colors uppercase tracking-widest">Twitter</Link>
            <Link href="https://t.me/+fU2kPPjZ50MxMTE0" target="_blank" className="text-[10px] font-black text-gray-400 hover:text-[#00AFAA] transition-colors uppercase tracking-widest">Telegram</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
