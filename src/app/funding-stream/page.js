"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, ChevronRight, InfoIcon } from "lucide-react";
import GrantRoundCard from "@/components/GrantRoundCard";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/lib/withAuth";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");

  const programs = [
    "Gitcoin",
    "Celo",
    "Octant",
    "Good Dollar",
    "Arbitrum",
    "Lisk",
    "Thrive",
    "Optimism",
    "Others",
  ];
  const statuses = [
    "Grant",
    "Bounties & paid gigs",
    "Past opportunities",
    "Upcoming",
  ];

  const grants = [
    {
      image: "/grant-round-images/good-dollar-image.svg",
      title: "Good Dollar",
      desc: `An initiative fueling innovation with G$, offering support, funding, and mentorship to builders.`,
      amount: "$ 250k",
      date: "End- Oct 8, 2025",
      link: "https://gooddollar.notion.site/GoodBuilders-Program-Round-2-goes-streaming-200f258232f0802b960ad1dab7ad5fd2"
    },
    {
      image: "/grant-round-images/octant-image.svg",
      title: "Octant",
      desc: `Funding the journalists, storytellers, content creators, and others who’ve helped make Ethereum legible.`,
      amount: "$1m",
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
      title: " Celo-Proof of Ship 7",
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
      title: "Thrive Boba",
      desc: `Grant for innovators building new projects natively on Boba. Supports early-stage teams developing real-world applications.`,
      amount: "1m Boba",
      date: "End- Dec 31, 2025",
      link: "https://app.thrive.xyz/programs/23"
    },
    {
      image: "/grant-round-images/hedera-round-image.svg",
      title: "Thrive Hedera",
      desc: `Hedera is allocating 4M HBAR to support projects from other ecosystems looking to deploy on Hedera`,
      amount: "4m hbar",
      date: "End- Dec 31, 2025",
      link: "https://app.thrive.xyz/programs/16"
    },
    {
      image: "/grant-round-images/boba-round-image.svg",
      title: "Thrive Boba",
      desc: `For existing projects from other ecosystems looking to deploy or expand on Boba. This track supports teams ready to scale.`,
      amount: "1m Boba",
      date: "End-Dec 31, 2025",
      link: "https://app.thrive.xyz/programs/2"
    },
    {
      image: "/grant-round-images/swell-round-image.svg",
      title: "Thrive Swell",
      desc: `For existing products and dApps from other ecosystems looking to integrate Swellchain.  Supports teams ready to expand.`,
      amount: "75m Swell",
      date: "End- Aug 31, 2025",
      link: "https://app.thrive.xyz/programs/12"
    },
    {
      image: "/grant-round-images/trading-info-round-image.svg",
      title: "Trading Infr Program",
      desc: `Allocating up to 3,000,000 OP in funding for approved projects driving transaction volume on Base.`,
      amount: "3m OP",
      date: "End- Aug 29, 2025",
      link: "https://app.thrive.xyz/programs/31"
    },
    {
      image: "/grant-round-images/giveth-round-image.svg",
      title: "Giveth Causes Round",
      desc: `Climate, ReFi, Women in Web3, and open Source Infra, Causes let you strengthen entire ecosystems with a single contribution.`,
      amount: "$40K",
      date: "End- Sep 5, 2025",
      link: "https://giveth.typeform.com/causesqf?apcid=0067b653ad43512d7e91ab00&utm_campaign=causes-qf-announcement&utm_content=causes-qf-announcement-var&utm_medium=email&utm_source=ortto"
    },
    {
      image: "/grant-round-images/prezenti-round-image.svg",
      title: "Celo Prezenti Grant",
      desc: `Funded through the Celo Community Fund treasury, as a community driven grants programme.`,
      amount: "$50k",
      date: "End-  Dec 10, 2025",
      link: "https://charmverse.prezenti.xyz/invite/f90c14"
    },
  ];
  const getGrantStatus = (grant) => {
    if (grant.status === "bounties") return "bounties";
    const now = new Date();
    const dateMatch = grant.date?.match(/End-\s*(.*)/i);
    if (!dateMatch) return "live";
    const grantEnd = new Date(dateMatch[1]);
    return grantEnd < now ? "past" : "live";
  };

  const enrichedGrants = grants.map((grant) => ({
    ...grant,
    status: getGrantStatus(grant),
  }));

  const filteredGrants = enrichedGrants.filter((grant) => {
    const matchSearch = grant.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchProgram =
      selectedPrograms.length === 0 ||
      selectedPrograms.some((program) =>
        grant.title.toLowerCase().includes(program.toLowerCase())
      );
    const matchStatus =
      selectedStatus === "" ||
      (selectedStatus === "Grant" && grant.status === "live") ||
      (selectedStatus === "Past opportunities" && grant.status === "past") ||
      (selectedStatus === "Bounties & paid gigs" &&
        grant.status === "bounties");
    return matchSearch && matchProgram && matchStatus;
  });

  const toggleProgram = (program) => {
    setSelectedPrograms((prev) =>
      prev.includes(program)
        ? prev.filter((p) => p !== program)
        : [...prev, program]
    );
  };

  const totalPages = Math.ceil(filteredGrants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGrants = filteredGrants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedPrograms, selectedStatus]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative ">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between mt-5">
              <div>
                <h1 className="text-2xl font-bold text-center md:text-left mb-2">
                  Active Grants
                </h1>
                <p className="text-base text-gray-600 mb-6 text-center md:text-left">
                  Explore active grant, bounties and other funding opportunities
                  across several ecosystems.
                </p>
              </div>

              <div className="md:flex justify-end w-[212px] bg-amber-400 h-[38px] hidden">

              </div>
            </div>
            <div className="bg-white rounded-xl mt-5 shadow-md border p-4 md:p-6 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 min-h-[100px]">
              {/* Search bar component */}
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

              {/* ecosystem dropdown section*/}
              <div className="relative w-full md:w-[230px]" ref={programRef}>
                <button
                  onClick={() => setProgramOpen(!programOpen)}
                  className="w-full h-12 border rounded-sm px-4 flex items-center justify-between text-sm text-gray-700"
                >
                  Ecosystem
                  <ChevronRight className="h-4 w-4 text-gray-400 rotate-90" />
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

              {/* grant status dropdown section */}
              <div className="relative w-full md:w-[230px]" ref={statusRef}>
                <button
                  onClick={() => setStatusOpen(!statusOpen)}
                  className="w-full h-12 border rounded-sm px-4 flex items-center justify-between text-sm text-gray-700"
                >
                  {selectedStatus || "Select Status"}
                  <ChevronRight className="h-4 w-4 text-gray-400 rotate-90" />
                </button>
                {statusOpen && (
                  <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                    <div className="p-2 space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStatus === ""}
                          onChange={() => {
                            setSelectedStatus("");
                            setStatusOpen(false);
                          }}
                        />
                        <span className="text-sm text-gray-700">All</span>
                      </label>
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
                          />
                          <span className="text-sm text-gray-700 capitalize">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add new button section modal */}
              <button
                onClick={() => setIsModalOpen(true)}
                style={{ fontSize: "13px" }}
                className="px-6 h-12 font-medium rounded border text-[#000000]/50 whitespace-nowrap flex items-center justify-center"
              >
                <span style={{ fontSize: "20px" }} className="items-center px-2">
                  +
                </span>{" "}
                Add New
              </button>
              <button className="relative group flex items-center justify-center">
                <InfoIcon className="w-5 h-5 ml-1 text-[#198038]" />
                <span className="absolute bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-gray-800 text-white text-[10px] rounded-md px-2 py-1">
                  Add a new grant, bounty, gigs to <br />
                  help builders, creators, and <br /> communities discover and
                  apply.
                </span>
              </button>
            </div>
          </div>

          {/* grant list section */}
          {filteredGrants.length > 0 ? (
            <>
              <GrantRoundCard grants={currentGrants} />
              {/* pagination for grant list */}
              <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1 sm:gap-2 mt-34 text-sm text-gray-500 ">
                {/* Previous Button */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-8 h-8 sm:w-8 sm:h-8 text-xs sm:text-sm flex items-center justify-center border-[2px]  rounded-[4px] text-[#404B52] font-medium bg-[#F5F5F5]  disabled:opacity-50"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 sm:w-8 sm:h-8 text-xs sm:text-sm flex items-center justify-center rounded-[4px] border-[2px] font-medium  ${currentPage === page
                        ? "bg-[#198038] text-white border-[#198038]"
                        : "bg-[#F5F5F5] border-[#EEEEEE] text-[#404B52] hover:bg-gray-100"
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-8 h-8 sm:w-8 sm:h-8 text-xs sm:text-sm flex items-center justify-center border-[2px] rounded-[4px] text-[#404B52] font-medium bg-[#F5F5F5]  disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </>
          ) : (
            <div className="text-center mt-10 text-gray-500 text-md">
              {selectedStatus === "Bounties & paid gigs" && "No bounties yet. Please check back later."}
              {selectedStatus === "Upcoming" && "No upcoming grants. Please check back later."}
              {selectedStatus === "" && "No grant rounds found for your search."}
            </div>
          )}
        </main>

        {/* add new grant modal section */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />


            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 z-10">

              <div className="flex justify-between items-center mb-12">
                <h2 className="text-[16px] font-bold">
                  Add new opportunity
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              {/* form section for adding new grant */}
              <form className="space-y-4">
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-1">
                    Short Description
                  </label>
                  <textarea className="w-full border rounded-[5px] p-2 text-sm" rows="3"></textarea>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-1">
                    Link to grant/bounties/gigs
                  </label>
                  <input type="text" className="w-full border rounded-[5px] p-2 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input type="date" className="w-full border rounded-[5px] p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input type="date" className="w-full border rounded-[5px] p-2 text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 mb-4">
                  <div >
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <input type="text" placeholder="Optional" className="w-full border rounded-[5px] p-2 text-sm" />
                  </div>
                </div>

                <p className="text-[10px] text-[#000000]/50 mb-8">
                  Please note that grant/bounties/gigs will only be added after verification
                </p>
                <div className="flex justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 rounded-full border border-gray-400 text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-[#39B54A] text-white font-medium"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}