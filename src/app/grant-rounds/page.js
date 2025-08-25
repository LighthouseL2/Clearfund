"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, ChevronRight } from "lucide-react";
import GrantRoundCard from "@/components/GrantRoundCard";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/lib/withAuth";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [programOpen, setProgramOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const programs = ["Gitcoin", "Celo", "Octant", "Good Dollar", "Arbitrum", "Lisk", "Thrive protocol","Optimism", "Others"];
  const statuses = ["active"];

  const [search, setSearch] = useState("");

  const grants = [
    {
      image: "/grant-round-images/good-dollar-image.svg",
      title: "GoodDollar",
      desc: `An initiative fueling innovation with G$, offering support, funding, and mentorship to builders.`,
      amount: "$ 250k",
      date: "End- Oct 8, 2025",
      link: "https://gooddollar.notion.site/GoodBuilders-Program-Round-2-goes-streaming-200f258232f0802b960ad1dab7ad5fd2"
    },
     {
      image: "/grant-round-images/octant-image.svg",
      title: "Octant",
      desc: `Funding the journalists, storytellers, content creators, and others who’ve helped make Ethereum legible.`,
      amount: "TBA",
      date: "End- Aug 27, 2025",
      link: "https://octant.fillout.com/epoch9-ethereum-stories?ref=blog.octant.build"
    },
      {
      image: "/grant-round-images/thrive-protocol-image.svg",
      title: "Thrive Protocol",
      desc: `Thrive Portals is funding the next wave of studios and indies building with the Portals Engine.`,
      amount: "$ 100k",
      date: "End- Jul 31, 2026",
      link: "https://portals.thrive.xyz/"
    },
       {
      image: "/grant-round-images/lisk-l2-program.svg",
      title: "Lisk L2",
      desc: `A Program to nurture a community of developers and creators within the Lisk ecosystem.`,
      amount: "$ 80k",
      date: "End- Oct, 2025",
      link: "https://lisk.com/blog/posts/say-hello-to-the-new-lisk-l2-grant-program/"
    },
          {
      image: "/grant-round-images/celo-proof-of-ship.svg",
      title: " Celo-Proof of Ship",
      desc: `Proof-of-Ship is a monthly contest that rewards builders for actively building on Celo.`,
      amount: "15k Celo",
      date: "End- Aug 29, 2025",
      link: "https://docs.gap.karmahq.xyz/how-to-guides/integrations/celo-proof-of-ship"
    },
      {
      image: "/grant-round-images/thrive-horizon.svg",
      title: "Thrive Protocol",
      desc: `Thrive Horizen funds the new era of privacy first apps on Base.`,
      amount: "$ 100k",
      date: "End-  Aug 13, 2026",
      link: "https://horizen.thrive.xyz/"
    },
      {
      image: "/grant-round-images/stream-garden-image.svg",
      title: "Stream On Garden ",
      desc: `Active Gardens Funding Pools on Celo network are eligible for streaming matching funds.`,
      amount: "3k Celo",
      date: "End-  Nov 5, 2025",
      link: "https://1hive-gardens.notion.site/Celo-Support-Streams-on-Gardens-246d6929d01480209ca4dbc2f8d26bfd"
    },
       {
      image: "/grant-round-images/optimism.image.png",
      title: "Optimism Season 8",
      desc: `Funding projects that build innovative applications and contribute to public goods on Optimism.`,
      amount: "6.29M OP",
      date: "End- Nov 12, 2025",
      link: "https://www.opgrants.io/"
    },
    {
      image: "/grant-round-images/boba-round-image.svg",
      title: "Boba Genesis Pool",
      desc: `Grant for innovators building new projects natively on Boba. Supports early-stage teams developing real-world applications.`,
      amount: "1m Boba",
      date: "End- Dec 31, 2025",
      link: "https://app.thrive.xyz/programs/23"
    },
  ];

  // Filter logic
  const filteredGrants = grants.filter((grant) => {
    const matchSearch = grant.title.toLowerCase().includes(search.toLowerCase());

   const matchProgram =
  selectedPrograms.length === 0 ||
  selectedPrograms.some(program =>
    grant.title.toLowerCase().includes(program.toLowerCase())
  );


    const matchStatus =
      selectedStatus === "" ||
      grant.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchSearch && matchProgram && matchStatus;
  });

  const toggleProgram = (program) => {
    setSelectedPrograms((prev) =>
      prev.includes(program)
        ? prev.filter((p) => p !== program)
        : [...prev, program]
    );
  };

  const programRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (programRef.current && !programRef.current.contains(e.target)) {
        setProgramOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative font-sans">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 md:ml-64">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-2">Funding Stream</h1>
          <p className="text-center text-base text-gray-600 mb-6">
            Explore current, upcoming grant and other funding opportunities across several ecosystem.
          </p>

          {/* Filters Card */}
          <div className="bg-white rounded-xl shadow-md border p-4 md:p-6 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 min-h-[100px]">
            {/* Search */}
            <div className="relative w-full md:w-[290px]">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 text-sm border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </div>

            {/* Program Dropdown */}
            <div className="relative w-full md:w-[230px]" ref={programRef}>
              <button
                onClick={() => setProgramOpen(!programOpen)}
                className="w-full h-12 border rounded-sm px-4 flex items-center justify-between text-sm text-gray-700"
              >
                Ecosystem
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {programOpen && (
                <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <div className="p-2">
                    {programs.map((p) => (
                      <label key={p} className="flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          checked={selectedPrograms.includes(p)}
                          onChange={() => toggleProgram(p)}
                        />
                        {p}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Status Dropdown (Single Select) */}
            <div className="relative w-full md:w-[230px]" ref={statusRef}>
              <button
                onClick={() => setStatusOpen(!statusOpen)}
                className="w-full h-12 border rounded-sm px-4 flex items-center justify-between text-sm text-gray-700"
              >
                {selectedStatus || "Select Status"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {statusOpen && (
                <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <div className="p-2 space-y-2">
                    {/* All Option */}
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStatus === ""}
                        onChange={() => {
                          setSelectedStatus("");
                          setStatusOpen(false);
                        }}
                        className="form-checkbox h-4 w-4 text-green-500"
                      />
                      <span className="text-sm text-gray-700">All</span>
                    </label>

                    {/* Status Options */}
                    {statuses.map((status) => (
                      <label
                        key={status}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStatus === status}
                          onChange={() => {
                            setSelectedStatus(status);
                            setStatusOpen(false);
                          }}
                          className="form-checkbox h-4 w-4 text-green-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filter icon */}
            <button className="flex items-center justify-center w-10 h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
            </button>

            {/* Filter count button */}
            <button className="px-4 h-10 rounded-full border text-sm text-gray-700 whitespace-nowrap">
              {selectedPrograms.length + (selectedStatus ? 1 : 0)} programs
            </button>
          </div>
        </div>

        {filteredGrants.length > 0 ? (
          <GrantRoundCard grants={filteredGrants} />
        ) : (
          <div className="text-center mt-10 text-gray-500 text-md">
            No grant rounds found for your search.
          </div>
        )}
      </main>
    </div>
    </ProtectedRoute>
  );
}
