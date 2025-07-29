"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PastGrantRounds() {
  const tabs = ["GoodDollar", "Gitcoin", "Octant", "Celo", "Giveth"];
  const [activeTab, setActiveTab] = useState("Octant");
  const [searchTerm, setSearchTerm] = useState("");

  const tabImages = {
    GoodDollar: "/gooddollar-icon.svg",
    Gitcoin: "/gitcoin-regen-icon.svg",
    Octant: "/octant-epoch-icon.svg",
    Celo: "/celo-icon.svg",
    Giveth: "/giveth-icon.svg",
  };

  const data = {
    GoodDollar: [
      { title: "GoodDollar Epoch 1", date: "January, 2024", route: "/404"  },
      { title: "GoodDollar Epoch 2", date: "March, 2024", route: "/404"  },
    ],
    Gitcoin: [
      { title: "GG21- Regen Coordi-Nation Genesis Round", date: "August, 2024", route: "/past-grant-table" },
      { title: "Gitcoin Grant Round 23 (GG23)", date: "May, 2025" , route: "/404"  },
    ],
    Octant: [
      { title: "Octant Epoch 7", date: "April, 2025", route: "/404"  },
      { title: "Octant Epoch 6", date: "January, 2025", route: "/404"  },
      { title: "Octant Epoch 5", date: "October, 2024", route: "/404"  },
      { title: "Octant Epoch 4", date: "July, 2024", route: "/404"  },
      { title: "Octant Epoch 3", date: "April, 2024", route: "/404"  },
      { title: "Octant Epoch 2", date: "January, 2024", route: "/404"  },
      { title: "Octant Epoch 1", date: "November, 2023", route: "/404"  },
    ],
    Celo: [
      { title: "Celo Round 1", date: "February, 2025", route: "/404"  },
      { title: "Celo Round 2", date: "April, 2025", route: "/404"  },
    ],
    Giveth: [
      { title: "Giveth Campaign A", date: "June, 2024", route: "/404"  },
      { title: "Giveth Campaign B", date: "August, 2024", route: "/404"  },
    ],
  };

  const filteredData = data[activeTab].filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 md:px-10 py-10 text-black ">
      {/* Search */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded py-4 pl-17 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
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
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between bg-[#D9D9D933] border py-1 ">
        <button className="p-2 hover:bg-gray-100 rounded">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1 flex justify-between space-x-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-12 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white text-black border border-gray-300 cursor-pointer"
                  : " text-black hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="p-2 hover:bg-gray-100 rounded">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Archive List */}
      <div className="max-w-4xl mx-auto space-y-2">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white rounded-sm border p-4 shadow-sm hover:shadow transition"
          >
            <div className="flex items-center space-x-3">
              {/* Dynamic image based on active tab */}
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={tabImages[activeTab] || "/default-icon.svg"}
                  alt={`${activeTab} logo`}
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
           {item.route && (
  <Link
    href={item.route}
    className="text-sm font-medium bg-white rounded-sm border-1 text-gray-600 py-2 px-4 shadow-2xl flex items-center gap-1 hover:underline"
  >
    View Data
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  </Link>
)}

          </div>
        ))}
      </div>
    </div>
  );
}
