"use client";
import { useState } from 'react';
import AirtableEmbed from '../../components/AirtableEmbed';
export default function GrantsPage() {

  // Get Airtable embed URL from environment variable
  const AIRTABLE_EMBED_URL = process.env.NEXT_PUBLIC_AIRTABLE_GRANTS_EMBED_URL;

  return (
    <div className="min-h-screen bg-white text-[#003E52] font-sans flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto pt-8">

        <main className="px-6 md:px-16 pb-20">
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

