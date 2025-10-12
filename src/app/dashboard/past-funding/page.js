"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, ChevronRight } from "lucide-react";
import GrantRoundCard from "@/components/GrantRoundCard";
import PastGrant from "@/components/PastGrant";
import { usePrivy } from "@privy-io/react-auth";
import UserDetails from "@/components/userDetails";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { ready, authenticated, login, logout, user } = usePrivy()

  const [programOpen, setProgramOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const programs = ["Gitcoin", "Celo", "Octant", "GoodDollar", "Arbitrum", "Others"];
  const statuses = ["Ongoing", "Upcoming", "Applications Open"];
  const address = user?.wallet?.address
  

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
   <main className="flex-1 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex md:justify-between mx-auto max-w-5xl flex-wrap-reverse justify-end">
            <div className="">
              <h1 className="text-2xl font-bold mb-4">Archive</h1>
              <p className="text-base text-gray-600 mb-8">
                Directory of past funding data and their recipients
              </p>
            </div>

            <div className="flex">

                  {!authenticated ?
                  <button
                      onClick={login}
                      className="font-sans font-black text-[16px] h-[52px] bg-[#39B54A] text-white
                        rounded-full w-[159.16796875px] hover:bg-black"
                      >
                      Connect wallet
                  </button> : <UserDetails walletAddress={address} logout={logout}/>
                }
              </div>
            </div>

          <PastGrant />
        </div>
    </main>
  );
}
