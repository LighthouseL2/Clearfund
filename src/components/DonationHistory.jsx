"use client";

const donations = [
    { address: "0xf8a...eea7", amount: "10.00", symbol: "G$", time: "2 mins ago" },
    { address: "0xf8a...eea7", amount: "20.00", symbol: "G$", time: "3 days ago" },
    { address: "0xf8a...eea7 ", amount: "450.00", symbol: "G$", time: "2 months ago" },
];

function ExternalLinkIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    );
}

export default function DonationHistory() {
    return (
        <div className="w-full max-w-3xl px-8 py-6">
            <h2 className="text-[30px] font-bold inter text-[#082553] mb-5">Donation History</h2>

            <div className="flex flex-col gap-6">
                {donations.map((donation, i) => (
                    <div key={i} className={`flex items-center justify-between px-4 ${i % 2 === 0 ? "bg-[#F3F4F6] border-[1px] border-gray-200 rounded-lg py-4.5" : "bg-white"}`}>
                        <span className="text-[16px] font-bold  text-[#082553] space-y-4">
                            {donation.address} donated {donation.amount}{donation.symbol} {donation.time}
                        </span>
                        <button className="ml-4 text-[#1e3a5f] hover:opacity-60 transition-opacity">
                            <ExternalLinkIcon />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}