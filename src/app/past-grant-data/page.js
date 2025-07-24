"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, ChevronRight, Menu, X } from "lucide-react";
import GrantRoundCard from "@/components/GrantRoundCard";
import PastGrant from "@/components/PastGrant";

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
          <h1 className="text-3xl font-bold text-center mb-2">Past Grant Rounds</h1>
          <p className="text-center text-gray-600 mb-6">
     An archive of historical funding rounds and their recipients
                  </p>
                  
                  <PastGrant />
</div>

            

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
