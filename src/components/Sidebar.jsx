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
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md font-sans">
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
                  Analytics
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


            <Link href="/funding-stream">
              <button

                className={`w-full cursor-pointer flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/funding-stream" && !isNotificationModalOpen
                  ? "bg-[#39B54A] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <Image
                    src={
                      pathname === "/funding-stream" && !isNotificationModalOpen
                        ? "/sidebar-icons/grant-round-white-icon.svg"
                        : "/sidebar-icons/grant-round-icon.svg" 
                    }
                    alt="Grant Rounds"
                    width={18}
                    height={18}
                  />
                  Active Grants
                </span>
                <ChevronRight
                  size={16}
                  className={pathname === "/funding-stream" ? "text-white" : "text-gray-400"}
                />
              </button>
            </Link>

            <Link href="/past-funding">
              <button

                className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/past-funding" && !isNotificationModalOpen
                  ? "bg-[#39B54A] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <Image
                    src={
                      pathname === "/past-funding" && !isNotificationModalOpen
                        ? "/sidebar-icons/grant-history-white-icon.svg"
                        : "/sidebar-icons/past-grant-data-icon.svg"
                    }
                    alt="Past Grant Data"
                    width={18}
                    height={18}
                  />
                  Past Grants
                </span>
                <ChevronRight
                  size={16}
                  className={pathname === "/past-funding" ? "text-white" : "text-gray-400"}
                />
              </button>
            </Link>

            
            


            <Link href="/donate">
              <button
                className={`w-full cursor-pointer flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/donate" && !isNotificationModalOpen
                  ? "bg-[#39B54A] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <Image
                    src={
                      pathname === "/donate"  && !isNotificationModalOpen
                        ? "/sidebar-icons/good-white-icon.svg"
                        : "/sidebar-icons/good-grey-icon.svg"
                    }
                    alt="Past Grant Data"
                    width={18}
                    height={18}
                  />
                  {/* <svg className="text-white" width="18" height="19" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 1H11.5C11.8978 1 12.2794 1.15804 12.5607 1.43934C12.842 1.72064 13 2.10218 13 2.5C13 3.42826 12.6313 4.3185 11.9749 4.97487C11.3185 5.63125 10.4283 6 9.5 6H8.5C7.57174 6 6.6815 5.63125 6.02513 4.97487C5.36875 4.3185 5 3.42826 5 2.5C5 2.10218 5.15804 1.72064 5.43934 1.43934C5.72064 1.15804 6.10218 1 6.5 1Z" stroke="#9197B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 19.0002H5C3.93913 19.0002 2.92172 18.5788 2.17157 17.8286C1.42143 17.0785 1 16.0611 1 15.0002V14.0002C0.999756 12.3244 1.52574 10.6909 2.50373 9.33014C3.48172 7.96937 4.86233 6.95007 6.45072 6.41607C8.03912 5.88207 9.7551 5.86035 11.3565 6.35397C12.9579 6.84758 14.3639 7.83161 15.376 9.16719" stroke="#9197B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.0001 20.0004L18.3501 16.7164C18.5556 16.5171 18.719 16.2786 18.8307 16.015C18.9425 15.7515 19.0003 15.4682 19.0007 15.182C19.0012 14.8957 18.9443 14.6123 18.8334 14.3484C18.7225 14.0844 18.5599 13.8454 18.3551 13.6454C17.9375 13.2363 17.3765 13.0066 16.7918 13.0055C16.2072 13.0044 15.6453 13.2319 15.2261 13.6394L15.0021 13.8594L14.7791 13.6394C14.3615 13.2306 13.8007 13.0011 13.2163 13C12.6319 12.9989 12.0703 13.2262 11.6511 13.6334C11.4456 13.8327 11.2821 14.0711 11.1703 14.3346C11.0585 14.5981 11.0006 14.8814 11 15.1676C10.9994 15.4539 11.0562 15.7374 11.167 16.0013C11.2778 16.2653 11.4404 16.5043 11.6451 16.7044L15.0001 20.0004Z" stroke="#9197B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> */}
                  Donate
                </span>

                <ChevronRight
                  size={16}
                  className={pathname === "/donate" ? "text-white" : "text-gray-400"}
                />
              </button>
            </Link>


            <Link href="#">
              <button
                className={`w-full cursor-pointer flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/account" && !isNotificationModalOpen
                  ? "bg-[#39B54A] text-white"
                  : "text-[#9197B3] hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.06494 6.00294L9.24894 5.99794H16.7489C17.5789 5.99788 18.3775 6.31535 18.9808 6.88525C19.5842 7.45516 19.9467 8.23432 19.9939 9.06294L19.9989 9.24794V16.7479C19.999 17.5781 19.6814 18.3768 19.1113 18.9802C18.5412 19.5836 17.7618 19.9459 16.9329 19.9929L16.7489 19.9979H9.24894C8.41881 19.998 7.62012 19.6804 7.01671 19.1103C6.41331 18.5402 6.05094 17.7608 6.00394 16.9319L5.99894 16.7489V9.24894C5.99889 8.41881 6.3165 7.62012 6.88662 7.01671C7.45673 6.41331 8.23614 6.05094 9.06494 6.00394M16.7489 7.49894H9.24894C8.80975 7.49896 8.38663 7.66412 8.06355 7.96162C7.74048 8.25913 7.54108 8.66724 7.50494 9.10494L7.49894 9.24894V16.7489C7.49898 17.1883 7.66428 17.6116 7.96199 17.9347C8.25971 18.2578 8.66807 18.457 9.10594 18.4929L9.24894 18.4989H16.7489C17.1883 18.4989 17.6116 18.3336 17.9347 18.0359C18.2578 17.7382 18.457 17.3298 18.4929 16.8919L18.4989 16.7489V9.24894C18.4989 8.78482 18.3146 8.3397 17.9864 8.01151C17.6582 7.68332 17.2131 7.49894 16.7489 7.49894ZM12.9989 8.99894C13.1979 8.99894 13.3886 9.07796 13.5293 9.21861C13.6699 9.35927 13.7489 9.55003 13.7489 9.74894V12.2469H16.2489C16.4479 12.2469 16.6386 12.326 16.7793 12.4666C16.9199 12.6073 16.9989 12.798 16.9989 12.9969C16.9989 13.1959 16.9199 13.3866 16.7793 13.5273C16.6386 13.6679 16.4479 13.7469 16.2489 13.7469H13.7489V16.2489C13.7489 16.4479 13.6699 16.6386 13.5293 16.7793C13.3886 16.9199 13.1979 16.9989 12.9989 16.9989C12.8 16.9989 12.6093 16.9199 12.4686 16.7793C12.328 16.6386 12.2489 16.4479 12.2489 16.2489V13.7469H9.74894C9.55003 13.7469 9.35927 13.6679 9.21861 13.5273C9.07796 13.3866 8.99894 13.1959 8.99894 12.9969C8.99894 12.798 9.07796 12.6073 9.21861 12.4666C9.35927 12.326 9.55003 12.2469 9.74894 12.2469H12.2489V9.74894C12.2489 9.55003 12.328 9.35927 12.4686 9.21861C12.6093 9.07796 12.8 8.99894 12.9989 8.99894ZM13.5809 2.23194L13.6329 2.40894L14.3259 4.99694H12.7729L12.1849 2.79694C12.1255 2.57484 12.0229 2.36661 11.883 2.18417C11.7431 2.00173 11.5686 1.84865 11.3695 1.73368C11.1704 1.61871 10.9506 1.5441 10.7226 1.51412C10.4946 1.48414 10.263 1.49937 10.0409 1.55894L2.79694 3.50094C2.37407 3.61434 2.00907 3.88213 1.77396 4.25145C1.53885 4.62078 1.45071 5.06482 1.52694 5.49594L1.55894 5.64394L3.50094 12.8879C3.59203 13.2283 3.78377 13.5333 4.05105 13.763C4.31833 13.9926 4.64871 14.1362 4.99894 14.1749V15.6809C4.34869 15.6425 3.725 15.4095 3.20879 15.0122C2.69257 14.6149 2.30765 14.0717 2.10394 13.4529L2.05194 13.2769L0.110945 6.03194C-0.104052 5.23032 -0.00421932 4.37681 0.389972 3.64644C0.784164 2.91607 1.44284 2.36418 2.23094 2.10394L2.40894 2.05194L9.65294 0.110945C10.4546 -0.104052 11.3081 -0.00421932 12.0384 0.389972C12.7688 0.784164 13.3207 1.44384 13.5809 2.23194Z" fill="#9197B3"/>
                    </svg>

                  </span>
                  Reward
                </span>
              </button>

            </Link>

          </nav>
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