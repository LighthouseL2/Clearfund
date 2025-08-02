"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, ChevronRight} from "lucide-react";
import GrantRoundCard from "@/components/GrantRoundCard";
import Sidebar from "@/components/Sidebar";

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
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative">

      {/* Sidebar */}
      
 <Sidebar />
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

    
    </div>
  );
}
