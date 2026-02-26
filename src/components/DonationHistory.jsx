"use client";

const donations = [
    { address: "0xf8a...eea7", amount: "10.00", symbol: "G$", time: "2 minutes ago" },
    { address: "0x123...abc4", amount: "5.50", symbol: "CELO", time: "15 minutes ago" },
    { address: "0x456...def8", amount: "15.50", symbol: "G$", time: "1 hour ago" },
    { address: "0x789...ghi2", amount: "20.00", symbol: "CELO", time: "4 hours ago" },
    { address: "0xf8a...eea7", amount: "20.00", symbol: "G$", time: "3 days ago" },
    { address: "0xabc...1234", amount: "8.50", symbol: "CELO", time: "1 day ago" },
    { address: "0xdef...5678", amount: "12.00", symbol: "G$", time: "2 days ago" },
    { address: "0x789...0123", amount: "50.00", symbol: "CELO", time: "7 days ago" },
    { address: "0xf8a...eea7 ", amount: "450.00", symbol: "G$", time: "2 months ago" },
    { address: "0x321...cba9", amount: "2.00", symbol: "CELO", time: "3 months ago" },
    { address: "0xabc...d3f2", amount: "75.00", symbol: "G$", time: "4 months ago" },
    { address: "0xdef...9876", amount: "12.00", symbol: "CELO", time: "5 months ago" },
    { address: "0x123...4567", amount: "5.50", symbol: "G$", time: "6 months ago" },
    { address: "0x789...abcd", amount: "6.00", symbol: "CELO", time: "7 months ago" },
    { address: "0xf8a...eea7", amount: "1.00", symbol: "G$", time: "8 months ago" },
];

function ExternalLinkIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    );
}

export default function DonationHistory() {
    const displayedDonations = donations.slice(0, 15);

    return (
        <div className="w-full max-w-3xl py-6 pt-28">
            <h2 className="text-[36px] font-black inter text-[#082553] mb-4 text-left">Donation History</h2>

            <div className="flex flex-col gap-6">
                {displayedDonations.map((donation, i) => (
                    <div key={i} className={`flex items-center justify-between px-6 ${i % 2 === 0 ? "bg-[#F3F4F6] rounded-lg py-5" : "bg-white"}`}>
                        <span className="text-[24px] font-black text-[#082553] space-y-4">
                            {donation.address} donated {donation.amount}{donation.symbol} {donation.time}
                        </span>
                        <button className="ml-4 text-[#1e3a5f] hover:opacity-60 transition-opacity">
                            <ExternalLinkIcon />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}