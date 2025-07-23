"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, ChevronRight, Menu, X } from "lucide-react";
import GrantRoundCard from "@/components/GrantRoundCard";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [programOpen, setProgramOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const programs = ["Gitcoin", "Celo", "Octant", "GoodDollar" ,"Arbitrum", "Others"];
  const statuses = ["Ongoing", "Upcoming", "Applications Open"];

  const toggleProgram = (program) => {
    setSelectedPrograms((prev) =>
      prev.includes(program)
        ? prev.filter((p) => p !== program)
        : [...prev, program]
    );
  };

  const toggleStatus = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-800 relative">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md">
              <div className="relative w-[120px] h-[30px]">
                <Image
                  src="/clearfund-dashboard-logo.svg"
                  alt="ClearFund Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

      {/* Sidebar */}
           <aside
             className={` fixed inset-y-0 left-0 z-40 w-64 bg-white px-6 pt-6 pb-8 shadow-md transform transition-transform duration-300 ease-in-out flex flex-col justify-between
         ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
           >
             <div>
               {/* Logo  */}
               <div className="hidden md:flex items-end mb-12">
                 <div className="relative w-[150px] h-[40px]">
                   <Image
                     src="/clearfund-dashboard-logo.svg"
                     alt="ClearFund Logo"
                     fill
                     className="object-contain"
                     priority
                   />
                 </div>
                 <span className="text-[10px] text-gray-400 ml-1 mb-1">v.01</span>
               </div>
     
               {/* Nav */}
               <nav className="space-y-3">
                 <button className="w-full flex items-center justify-between bg-[#174123] text-white rounded-lg px-4 py-3 text-sm font-medium">
                   <span className="flex items-center gap-3">
                     <Image
                       src="/sidebar-icons/dashboard-icon.svg"
                       alt="Dashboard"
                       width={18}
                       height={18}
                     />
                     Dashboard
                   </span>
                   <ChevronRight size={16} className="text-white" />
                 </button>
     
                 <button className="w-full flex items-center justify-between text-[#9197B3] text-sm px-4 py-3 font-medium">
                   <span className="flex items-center gap-3">
                     <Image
                       src="/sidebar-icons/discover-refi-icon.svg"
                       alt="Discover ReFi"
                       width={18}
                       height={18}
                     />
                     Discover ReFi
                   </span>
                   <ChevronRight size={16} className="text-gray-400" />
                 </button>
     
                 <button className="w-full flex items-center justify-between text-[#9197B3] text-sm px-4 py-3 font-medium">
                   <span className="flex items-center gap-3">
                     <Image
                       src="/sidebar-icons/grant-round-icon.svg"
                       alt="Grant Rounds"
                       width={18}
                       height={18}
                     />
                     Grant Rounds
                   </span>
                   <ChevronRight size={16} className="text-gray-400" />
                 </button>
     
                 <button className="w-full flex items-center justify-between text-[#9197B3] text-sm px-4 py-3 font-medium">
                   <span className="flex items-center gap-3">
                     <Image
                       src="/sidebar-icons/past-grant-data-icon.svg"
                       alt="Past Grant Data"
                       width={18}
                       height={18}
                     />
                     Past Grant Data
                   </span>
                   <ChevronRight size={16} className="text-gray-400" />
                 </button>
     
                 <button className="w-full flex items-center justify-between text-[#9197B3] text-sm px-4 py-3 font-medium">
                   <span className="flex items-center gap-3">
                     <Image
                       src="/sidebar-icons/notification-icon.svg"
                       alt="Notification"
                       width={18}
                       height={18}
                     />
                     Notification
                   </span>
                   <ChevronRight size={16} className="text-gray-400" />
                 </button>
               </nav>
               <hr className="mt-4"></hr>
               <div className="mt-5">
                  <button className="flex items-center gap-3 text-[#9197B3] text-sm px-4 py-2 font-medium">
                 <Settings size={18} />
                 Setting
               </button>
               </div>
             </div>
     
             <div className="mt-6 space-y-2">
               <button className="flex items-center gap-3 text-[#9197B3] text-sm px-4 py-2 font-medium">
                 <LogOut size={18} />
                 Logout
               </button>
             </div>
           </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 md:ml-64">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Grant Rounds</h1>
          <p className="text-center text-gray-600 mb-6">
            Explore current and upcoming grant opportunities across different ecosystems.
          </p>

          {/* Filters Card */}
          <div className="bg-white rounded-xl shadow-md  border p-4 md:p-6 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 min-h-[100px]">
            {/* Search */}
            <div className="relative w-full md:w-[290px]">
              <input
                type="text"
                placeholder="Search"
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
                All
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
                    <label className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={selectedPrograms.length === 0}
                        onChange={() => setSelectedPrograms([])}
                      />
                      All
                    </label>
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

            {/* Status Dropdown */}
            <div className="relative w-full md:w-[230px]" ref={statusRef}>
              <button
                onClick={() => setStatusOpen(!statusOpen)}
                className="w-full h-12 border rounded-sm px-4 flex items-center justify-between text-sm text-gray-700"
              >
                All
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
              {statusOpen && (
                <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <div className="p-2">
                    <label className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={selectedStatus.length === 0}
                        onChange={() => setSelectedStatus([])}
                      />
                      All
                    </label>
                    {statuses.map((s) => (
                      <label key={s} className="flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          checked={selectedStatus.includes(s)}
                          onChange={() => toggleStatus(s)}
                        />
                        {s}
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
              {selectedPrograms.length + selectedStatus.length} programs
            </button>
          </div>
              </div>
              <GrantRoundCard />
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
