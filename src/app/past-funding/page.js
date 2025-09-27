"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, ChevronRight } from "lucide-react";
import GrantRoundCard from "@/components/GrantRoundCard";
import PastGrant from "@/components/PastGrant";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/lib/withAuth";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [programOpen, setProgramOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const programs = ["Gitcoin", "Celo", "Octant", "GoodDollar", "Arbitrum", "Others"];
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
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative">

      {/* Sidebar */}

      <Sidebar />


      {/* Main */}
      <main className="flex-1 p-4 md:p-6 md:ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between  mx-auto max-w-5xl mt-5">
            <div className="">
              <h1 className="text-2xl font-bold mb-4">Past Grants</h1>
              <p className="text-base text-gray-600 mb-8">
                Directory of past funding data and their recipients
              </p>
            </div>

            <div className="md:flex justify-end w-[212px] bg-amber-400 h-[38px] hidden ">

            </div>
          </div>

          <PastGrant />
        </div>
      </main>


    </div>
    </ProtectedRoute>
  );
}
