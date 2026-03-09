"use client";

import { useState } from 'react';
import Link from 'next/link';
import AirtableEmbed from '../../components/AirtableEmbed';
import { usePrivy, useWallets } from "@privy-io/react-auth";
import UserDetails from "../../components/userDetails";
import ModalConnect from "../../components/modalConnect";
import Image from "next/image";
import { Form } from "../../components/Form";

export default function GrantsPage() {
  const [isHidden, setIsHidden] = useState(false);
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
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <Link href="/projects" className="text-sm font-bold text-gray-500 hover:text-[#00AFAA] transition-colors">Projects</Link>
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
        {isHidden && <Form setIsHidden={setIsHidden} />}

        <div className={isHidden ? "opacity-60" : ""}>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-black tracking-tight mb-3">
              Available Funding
            </h2>
            <button
              onClick={() => setIsHidden(!isHidden)}
              className="bg-[#003E52] hover:bg-[#00AFAA] text-white transition-all rounded-2xl h-[44px] px-8 flex items-center justify-center whitespace-nowrap font-bold text-sm uppercase tracking-widest shadow-lg active:scale-95"
            >
              Add new funding
            </button>
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
      <footer className="border-t border-gray-100 py-20 px-[10%] mt-20 bg-white text-[#003E52]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">© 2026 Portal</p>
          <div className="flex gap-8">
            <Link href="#" className="text-xs font-black text-gray-400 hover:text-[#00AFAA] transition-colors">GitHub</Link>
            <Link href="#" className="text-xs font-black text-gray-400 hover:text-[#00AFAA] transition-colors">Twitter</Link>
            <Link href="#" className="text-xs font-black text-gray-400 hover:text-[#00AFAA] transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
