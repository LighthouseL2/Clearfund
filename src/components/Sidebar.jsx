"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Notification from "@/components/Notification";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { LogOut, Settings, ChevronRight, Menu, X, Bell } from "lucide-react";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter()


  function handleLogout() {
    localStorage.removeItem("token")
    router.push("/?route=login")
  }

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "New Grant Round",
      message: "Grant Round #42 has been created.",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Application Received",
      message: "New application submitted for Grant Round #41.",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "Funding Update",
      message: "Funding allocation completed for Q3 2025.",
      time: "1 day ago",
    },
  ];

  return (
    <>
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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white px-6 pt-6 pb-8 shadow-md transform transition-transform duration-300 ease-in-out flex flex-col justify-between
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          {/* Logo */}
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
          <nav className="space-y-3 my-6">
            <Link href="/dashboard">
              <button
                className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4 ${pathname === "/dashboard" && !isNotificationModalOpen
                  ? "bg-[#174123] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <Image
                    src={
                      pathname === "/dashboard" && !isNotificationModalOpen
                        ? "/sidebar-icons/dashboard-icon-white.svg"
                        : "/sidebar-icons/dashboard-icon-gray.svg"
                    }
                    alt="Dashboard"
                    width={18}
                    height={18}
                  />
                  Dashboard
                </span>
                <ChevronRight
                  size={16}
                  className={
                    pathname === "/dashboard" && !isNotificationModalOpen
                      ? "text-white"
                      : "text-gray-400"
                  }
                />
              </button>

            </Link>


            <Link href="/grant-rounds">
              <button
                className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/grant-rounds" && !isNotificationModalOpen
                  ? "bg-[#174123] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <Image
                    src="/sidebar-icons/grant-round-icon.svg"
                    alt="Grant Rounds"
                    width={18}
                    height={18}
                  />
                  Grant Rounds
                </span>
                <ChevronRight
                  size={16}
                  className={pathname === "/grant-rounds" ? "text-white" : "text-gray-400"}
                />
              </button>
            </Link>

            <Link href="/grant-history">
              <button
                className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/past-grant-data" && !isNotificationModalOpen
                  ? "bg-[#174123] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <Image
                    src="/sidebar-icons/past-grant-data-icon.svg"
                    alt="Past Grant Data"
                    width={18}
                    height={18}
                  />
                  Grant History
                </span>
                <ChevronRight
                  size={16}
                  className={pathname === "/past-grant-data" ? "text-white" : "text-gray-400"}
                />
              </button>
            </Link>

            {/* Notification button with modal trigger */}
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4 ${isNotificationModalOpen
                ? "bg-[#174123] text-white"
                : "text-[#9197B3] hover:bg-gray-50"
                }`}
            >
              <span className="flex items-center gap-3">
                <Bell
                  size={18}
                  className={isNotificationModalOpen ? "text-white" : "text-gray-400"}
                />
                Notification
              </span>
              <ChevronRight
                size={16}
                className={isNotificationModalOpen ? "text-[#174123]" : "text-gray-400"}
              />
            </button>
          </nav>
          <hr className="w-[calc(100%+3rem)] -ml-6 border-t border-gray-300 my-4" />

          {/* <div className="mt-5">
            <Link href={"/account"} className={`flex items-center gap-3 text-[#9197B3] text-sm px-4 py-2
              ${pathname === "/account"
                    ? "bg-[#174123] text-white"
                    : "text-[#9197B3] hover:bg-gray-50"
                } font-medium  rounded-lg w-full text-left`}>
                <Settings size={18} />
                Setting
              </button>
            </Link>
          </div> */}
        </div>

        {/* <div className="mt-6 space-y-2">
            <Link href="/404">
              <button className={`flex items-center gap-3  text-sm px-4 py-2 font-medium  rounded-lg w-full text-left ${
                  pathname === "/404"
                    ? "bg-[#174123] text-white"
                    : "text-[#9197B3] hover:bg-gray-50"
                }`}>
                <LogOut size={18} className={pathname === "/404" ? "text-white" : "text-gray-400"} />
            <Link href={"/account"} className="flex items-center gap-3 text-[#9197B3] text-sm px-4 py-2 font-medium hover:bg-gray-50 rounded-lg w-full text-left">
              <Settings size={18} />
              Setting
            </Link>
          </div>
        </div> */}

        <div className="mt-6 space-y-2">
          <button className="flex items-center gap-3 text-[#9197B3] text-sm px-4 py-2 font-medium
           hover:bg-gray-50 rounded-lg w-full text-left" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Notification
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
      />

    </>
  );
}
