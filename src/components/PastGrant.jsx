"use client";



import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PastGrantRounds() {
  const tabs = ["GoodDollar", "Gitcoin", "Octant", "Celo", "Optimism", "Giveth"];
  const [activeTab, setActiveTab] = useState("Gitcoin");
  const [searchTerm, setSearchTerm] = useState("");
  const scrollContainerRef = useRef(null); 

  const tabImages = {
    GoodDollar: "/round-icons/gooddollar-round-icon.svg",
    Gitcoin: "/round-icons/gitcoin-regen-icon.svg",
    Octant: "round-icons/octant-epoch-icon.svg",
    Celo: "/round-icons/celo-round-icon.svg",
    Optimism: "/round-icons/optimism-round-icon.svg",
    Giveth: "/round-icons/giveth-round-icon.svg",
  };

  const scrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const data = {
    GoodDollar: [
      { title: "GoodDollar Builder’s First QF Round", date: "-2nd - 16, April 2025", pool: "Matching Pool: 510M G$", link: "https://drive.google.com/file/d/1xUxqkhdUTq9J8PopJVaeEZG2m03Bh0m7/view" },
    ],
    Gitcoin: [
      { title: "GR13 Round Final Results", date: "-March 9-24, 2022", pool: "Matching Pool: $1.5M", link: "https://docs.google.com/spreadsheets/d/1WftYfsCW0EJBzBMYJ8Ejq76aYGqtjRrprDVMuucMr-g/edit?usp=sharing" },
      { title: "Beta Round Results", date: "-Apr 25 - May 9, 2023", pool: "Matching Pool: $1.2M", link: "https://docs.google.com/spreadsheets/d/1NL6uyDQfrssU7Tvn4GJLApA37DHa2OeHgld7RaqouWU/edit?usp=sharing" },
      { title: "GG20 OSS Round Results", date: "-Apr 23 - May 7, 2024", pool: "Matching Pool: $1.6M", link: "https://docs.google.com/spreadsheets/d/1rZ9JPldY1AjzMdGgfqpfRfxlUyQdGLoVAZJ90Eamxq4/edit?gid=372717762#gid=372717762" },
      { title: "GG21- Regen Coordi-Nation Genesis Round Results", date: "-Aug 7 - 22, 2024", pool: "Matching Pool: $50k", link: "https://docs.google.com/spreadsheets/d/1mMYuufhWJMvDRT5JsEvVIeswS5K-HyVRQqvxCcYIs4c/edit?gid=540078380#gid=540078380" },
      { title: "GG22 Matching Results", date: "- Oct 23 - Nov 6, 2024", pool: "Matching Pool: $1.5M", link: "https://docs.google.com/spreadsheets/d/1WMFW6YrLIodpKoGcE79Vgf9vgBXXnC-JXw2w1Veds8s/edit?gid=1613004131#gid=1613004131" },
      { title: "GG23 Round Results", date: "-April 2 - April 17, 2025", pool: "Matching Pool: $1.5M", link: "https://docs.google.com/spreadsheets/d/1v7eYS2MZtUZ4VeubQ4rN4ZNeWbFc2Os2xjNAmOOHcmg/edit?gid=0#gid=0" },
    ],
    Octant: [
      { title: "Octant Epoch 1-8 Archive", date: "-8 Aug, 2023 - 24 Jul, 2025", pool: " Matching Pool: 275.58 ETH", link: "https://octant.app/projects" },
    ],
    Celo: [
      { title: "Celo Citizen Round Results", date: "-Dec 20 2024 - Jan 31, 2025", pool: "Pool: 200K Celo", link: "https://docs.google.com/spreadsheets/d/1Dcb6cQ3laWtAHOGVtSH8H6q3SlzF6pskxS1-wKg85VQ/edit?gid=1691188219#gid=1691188219" },
    ],
    Optimism: [
      { title: "Round 4: Onchain Builders ", date: " - 2024", link: "https://atlas.optimism.io/round/results?rounds=4" },
      { title: "Round 5: OP Stack", date: " - 2024", link: "https://atlas.optimism.io/round/results?rounds=5" },
      { title: "Round 6: Governance", date: " - 2024", link: "https://atlas.optimism.io/round/results?rounds=6" },
      { title: "Retro Funding: Dev Tooling", date: " - 2025", link: "https://atlas.optimism.io/round/results?rounds=7" },
      { title: "Retro Funding: Onchain Builders", date: " - 2025", link: "https://atlas.optimism.io/round/results?rounds=8" },
    ],
    Giveth: [
      { title: "Loving on Public Goods QF Round ", date: "-Jan 28 - Feb 14, 2025", pool: "Matching Pool: $100K ", link: "https://docs.google.com/spreadsheets/d/1rNFouxlS5gmodhvkLNAsbYHyp-xJtx6PpbkZCkUBQFc/edit?gid=612313385#gid=612313385" },
      { title: "ENS x Octant Public Goods Round 5", date: "-March 18 - April 1, 2025", pool: "Matching Pool: $80k", link: "https://docs.google.com/spreadsheets/d/1xedHZh8OZvptIbijORGhe8nMbyUw8wrtgO5iPNdyxU4/edit?usp=sharing" },
    ],

  };

  const filteredData = data[activeTab].filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const router = useRouter();
  return (
    <div className="px-4 md:px-10 py-4 text-black font-sans">
      {/* Search */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-full py-4 pl-17 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
          />
          <svg
            className="absolute left-9 top-1/2 -translate-y-1/2 text-gray-400"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </div>
      </div>

      {/* Active Tabs */}
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between rounded-full bg-[#D9D9D933] border py-1">
        <button
          className="p-2 hover:bg-gray-200 rounded-full "
          onClick={() => scrollTabs("left")}
        >
          <ChevronLeft size={20} />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex-1 flex justify-between space-x-4 overflow-x-auto scrollbar-hide"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-12 py-2 text-sm font-bold whitespace-nowrap ${activeTab === tab
                ? "bg-white text-black border rounded border-gray-100 cursor-pointer"
                : " text-black hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          className="p-2 hover:bg-gray-200 rounded-full "
          onClick={() => scrollTabs("right")}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Archive List */}
      <div className="max-w-5xl mx-auto space-y-1">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full">
                  <div className="w-12 h-12 rounded-full flex text-black/70 items-center justify-center overflow-hidden">
                    <Image
                      src={tabImages[activeTab] || "/default-icon.svg"}
                      alt={`${activeTab} logo`}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="items-center space-y-1">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <h3 style={{ fontSize: '12px' }} className=" font-semibold text-black/70">{item.title}</h3>
                      <p style={{ fontSize: '10px' }} className="text-[#008767] pl-1">{item.date}</p>
                    </div>
                    {item.pool && (
                      <span
                        style={{ fontSize: "10px" }}
                        className="inline-block font-extrabold bg-[#A6E7D8]/50 rounded-3xl border border-[#26A17B] text-[#008767] py-1 px-4 shadow-2xl min-w-[80px] text-center"
                      >
                        {item.pool}
                      </span>
                    )}
                  </div>

                </div>

                {item.link && (
                  <Link
                    href={`/spreadsheet-analytics?link=${encodeURIComponent(item.link)}`}
                    className="text-[10px] w-[120px] sm:w-auto sm:text-xs font-extrabold bg-[#A6E7D8]/50 rounded-3xl border border-[#26A17B] text-[#008767] py-1 px-1 sm:py-2 sm:px-8 shadow-2xl flex items-center justify-center whitespace-nowrap cursor-pointer"
                  >
                    Open
                  </Link>
                )}
              </div>
              <div className="mt-4">
                <hr className="w-full border-t border-gray-200" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-black/70 text-sm sm:text-base py-8">
            No matches found for your search.
          </div>
        )}
      </div>

    </div>
  );
}