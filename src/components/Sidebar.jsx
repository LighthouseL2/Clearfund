"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Notification from "@/components/Notification";
import { usePathname } from "next/navigation";
import { LogOut, Settings, ChevronRight, Menu, X, Bell } from "lucide-react";
// import { usePrivy } from "@privy-io/react-auth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect } from "wagmi"





export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const pathname = usePathname();
  const { disconnect } = useDisconnect()
  // const { logout } = usePrivy()




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


  // Sample notifications data




  // Sample notifications data
  // const notifications = [
  //   {
  //     id: 1,
  //     title: "New Grant Round",
  //     message: "Grant Round #42 has been created.",
  //     time: "2 hours ago",
  //   },
  //   {
  //     id: 2,
  //     title: "Application Received",
  //     message: "New application submitted for Grant Round #41.",
  //     time: "5 hours ago",
  //   },
  //   {
  //     id: 3,
  //     title: "Funding Update",
  //     message: "Funding allocation completed for Q3 2025.",
  //     time: "1 day ago",
  //   },
  // ];


 
  // Sample notifications data
  // const notifications = [
  //   {
  //     id: 1,
  //     title: "New Grant Round",
  //     message: "Grant Round #42 has been created.",
  //     time: "2 hours ago",
  //   },
  //   {
  //     id: 2,
  //     title: "Application Received",
  //     message: "New application submitted for Grant Round #41.",
  //     time: "5 hours ago",
  //   },
  //   {
  //     id: 3,
  //     title: "Funding Update",
  //     message: "Funding allocation completed for Q3 2025.",
  //     time: "1 day ago",
  //   },
  // ];


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
                className={`w-full flex items-center cursor-pointer justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4 ${pathname === "/dashboard" && !isNotificationModalOpen
                  ? "bg-[#39B54A] text-white"
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
                className={`w-full cursor-pointer flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/grant-rounds" && !isNotificationModalOpen
                  ? "bg-[#39B54A] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <Image
                    src={
                      pathname === "/grant-rounds" && !isNotificationModalOpen
                        ? "/sidebar-icons/grant-round-white-icon.svg"
                        : "/sidebar-icons/grant-round-icon.svg" 
                    }
                    alt="Grant Rounds"
                    width={18}
                    height={18}
                  />
                  Funding Stream
                </span>
                <ChevronRight
                  size={16}
                  className={pathname === "/grant-rounds" ? "text-white" : "text-gray-400"}
                />
              </button>
            </Link>

            <Link href="/grant-history">
              <button
                className={`w-full cursor-pointer flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/grant-history" && !isNotificationModalOpen
                  ? "bg-[#39B54A] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <Image
                    src={
                      pathname === "/grant-history" && !isNotificationModalOpen
                        ? "/sidebar-icons/grant-history-white-icon.svg"
                        : "/sidebar-icons/past-grant-data-icon.svg"
                    }
                    alt="Past Grant Data"
                    width={18}
                    height={18}
                  />
                  Grant History
                </span>
                <ChevronRight
                  size={16}
                  className={pathname === "/grant-history" ? "text-white" : "text-gray-400"}
                />
              </button>
            </Link>

            {/* Notification button with modal trigger */}
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className={`w-full cursor-pointer flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4 ${isNotificationModalOpen
                ? "bg-[#39B54A] text-white"
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


            <Link href="/donate">
              <button
                className={`w-full cursor-pointer flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/donate" && !isNotificationModalOpen
                  ? "bg-[#39B54A] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  {/* <Image
                    src={
                      pathname === "/grant-history" && !isNotificationModalOpen
                        ? "/sidebar-icons/grant-history-white-icon.svg"
                        : "/sidebar-icons/past-grant-data-icon.svg"
                    }
                    alt="Past Grant Data"
                    width={18}
                    height={18}
                  /> */}
                  <svg width="18" height="19" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 1H11.5C11.8978 1 12.2794 1.15804 12.5607 1.43934C12.842 1.72064 13 2.10218 13 2.5C13 3.42826 12.6313 4.3185 11.9749 4.97487C11.3185 5.63125 10.4283 6 9.5 6H8.5C7.57174 6 6.6815 5.63125 6.02513 4.97487C5.36875 4.3185 5 3.42826 5 2.5C5 2.10218 5.15804 1.72064 5.43934 1.43934C5.72064 1.15804 6.10218 1 6.5 1Z" stroke="#9197B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 19.0002H5C3.93913 19.0002 2.92172 18.5788 2.17157 17.8286C1.42143 17.0785 1 16.0611 1 15.0002V14.0002C0.999756 12.3244 1.52574 10.6909 2.50373 9.33014C3.48172 7.96937 4.86233 6.95007 6.45072 6.41607C8.03912 5.88207 9.7551 5.86035 11.3565 6.35397C12.9579 6.84758 14.3639 7.83161 15.376 9.16719" stroke="#9197B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.0001 20.0004L18.3501 16.7164C18.5556 16.5171 18.719 16.2786 18.8307 16.015C18.9425 15.7515 19.0003 15.4682 19.0007 15.182C19.0012 14.8957 18.9443 14.6123 18.8334 14.3484C18.7225 14.0844 18.5599 13.8454 18.3551 13.6454C17.9375 13.2363 17.3765 13.0066 16.7918 13.0055C16.2072 13.0044 15.6453 13.2319 15.2261 13.6394L15.0021 13.8594L14.7791 13.6394C14.3615 13.2306 13.8007 13.0011 13.2163 13C12.6319 12.9989 12.0703 13.2262 11.6511 13.6334C11.4456 13.8327 11.2821 14.0711 11.1703 14.3346C11.0585 14.5981 11.0006 14.8814 11 15.1676C10.9994 15.4539 11.0562 15.7374 11.167 16.0013C11.2778 16.2653 11.4404 16.5043 11.6451 16.7044L15.0001 20.0004Z" stroke="#9197B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  GoodCollective
                </span>

                <ChevronRight
                  size={16}
                  className={pathname === "/donate" ? "text-white" : "text-gray-400"}
                />
              </button>
            </Link>
          </nav>
          <hr className="w-[calc(100%+3rem)] -ml-6 border-t border-gray-300 my-4" />

          <div className="mt-5">

            {/* <Link href={"/account"} className={`flex items-center gap-3 text-[#9197B3] text-sm px-4 py-2
              ${pathname === "/account"
                    ? "bg-[#174123] text-white"
                    : "text-[#9197B3] hover:bg-gray-50"
                } font-medium  rounded-lg w-full text-left`}>
                <Settings size={18} />
                Setting
              </button>
            </Link> */}


            <Link href="/account">
              <button
                className={`w-full cursor-pointer flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/account" && !isNotificationModalOpen
                  ? "bg-[#39B54A] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`} onClick={() => setIsNotificationModalOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <Settings size={18}/>
                  Setting
                </span>
              </button>

            </Link>

          </div>
        </div>

        <div className="mt-6 space-y-2">
          {/* <button className="flex cursor-pointer items-center gap-3 text-[#9197B3] text-sm px-4 py-2 font-medium
           hover:bg-gray-50 rounded-lg w-full text-left">
            <LogOut size={18} />
            Logout
          </button> */}


          <ConnectButton.Custom>
            {({ account, openAccountModal, mounted }) => {
              const connected = mounted && account

              const logout = () => {
                localStorage.removeItem("login")
                disconnect()
              }

              return (
                <button onClick={logout}
                  className='btn flex cursor-pointer items-center gap-3 text-[#9197B3] text-sm px-4 py-2 font-medium
                  hover:bg-gray-50 rounded-lg w-full text-left'>
                  <LogOut size={18} />
                    Disconnect
                </button>
              )
            }}
          </ConnectButton.Custom>
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