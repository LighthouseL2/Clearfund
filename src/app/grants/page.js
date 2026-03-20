"use client";
import AirtableEmbed from '../../components/AirtableEmbed';
import Link from 'next/link';

export default function GrantsPage() {
  // Get Airtable embed URL from environment variable
  const AIRTABLE_EMBED_URL = process.env.NEXT_PUBLIC_AIRTABLE_GRANTS_EMBED_URL;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header - Logo only, no Tip button */}
      <nav className="px-[5%] md:px-8 lg:px-12 flex items-center h-24 sticky top-0 z-[100] bg-white border-b border-gray-100/50">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/assets/clearfund_logo.png"
            alt="ClearFund"
            className="h-8 md:h-10 w-auto"
          />
        </Link>
      </nav>

      <div className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20" style={{ maxWidth: '1152px' }}>

        {/* Banner Section */}
        <div
          className="w-full rounded-2xl px-8 py-10 md:px-12 md:py-14 mb-8 flex items-center justify-between overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #00BFAF 0%, #00AFAA 50%, #00C9B8 100%)',
          }}
        >
          {/* Text Content */}
          <div className="relative z-10 flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
              All Grants. One Dashboard.
            </h1>
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
              Explore funding opportunities across the Web3 ecosystem in one place.
            </p>
          </div>

          {/* Banner Image */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0">
            <img
              src="/assets/funding_image.png"
              alt="Funding"
              className="h-full w-auto object-cover"
            />
          </div>
        </div>

        {/* Airtable Embed Section */}
        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden min-h-[800px]">
          <AirtableEmbed
            embedUrl={AIRTABLE_EMBED_URL}
            height="1000px"
          />
        </div>
      </div>
    </div>
  );
}

