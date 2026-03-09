"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Notification from "@/components/Notification";
import { usePathname } from "next/navigation";
import { LogOut, Settings, ChevronRight, Menu, X, Bell } from "lucide-react";
import { shortAddress } from "./userDetails";
import { set } from "mongoose";
// import { usePrivy } from "@privy-io/react-auth";






export default function Sidebar({ authenticated, address, login }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);





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


  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md font-sans">
        <div className="relative w-[160px] h-[55px]">
          <Image
            src="/assets/clearfund-brand.svg"
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white  pt-6 pb-8 shadow-md transform transition-transform duration-300 ease-in-out flex flex-col justify-between
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          {/* Logo */}
          <div className="hidden md:flex items-end mb-12 px-6">
            <div className="relative w-[190px] h-[65px]">
              <Image
                src="/assets/clearfund-brand.svg"
                alt="ClearFund Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* <span className="text-[10px] text-gray-400 ml-1 mb-1">v.01</span> */}
          </div>

          <div className="px-6">
            {
              authenticated && (
                <div className="w-[210px] h-[114px] border border-[#7CB53E] rounded-md p-7">
                  <div className="flex items-center gap-3">
                    <h2 className="font-black text-[20px] text-[#39B54A]">Account</h2>
                    <section className="flex items-center gap-2 text-[#E2A426] bg-[#FEFCE8] px-2 rounded-full">
                      <span>
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 1L1 2.75V6C1 7.75 2.75 10.5 5 11C7.25 10.5 9 7.75 9 6V2.75L5 1H5.5Z" stroke="#E2A426" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-[14px]">verify</span>
                    </section>
                  </div>
                  <p className="text-[14px] text-black/50 mt-2 bg-[#FAFBFD] rounded-full px-2">{shortAddress(address)}</p>
                </div>
              )

            }

            {/* <button onClick={login} className="w-[210px] mb-13 h-[50px] justify-between px-5 rounded-md border border-[#39B54A] bg-[#34C7591A] flex items-center">
                <span>
                  <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.1108 11H19.5553V15.8889H17.1108V11Z" fill="#39B54A"/>
                  <path d="M22 4.88889V2.44444C22 1.09633 20.9037 0 19.5556 0H3.66667C1.64511 0 0 1.64511 0 3.66667V18.3333C0 21.0234 2.19267 22 3.66667 22H22C23.3481 22 24.4444 20.9037 24.4444 19.5556V7.33333C24.4444 5.98522 23.3481 4.88889 22 4.88889ZM3.66667 2.44444H19.5556V4.88889H3.66667C3.35197 4.87481 3.05483 4.73989 2.83712 4.51222C2.6194 4.28455 2.4979 3.98168 2.4979 3.66667C2.4979 3.35165 2.6194 3.04878 2.83712 2.82111C3.05483 2.59344 3.35197 2.45852 3.66667 2.44444ZM22 19.5556H3.68133C3.11667 19.5409 2.44444 19.3172 2.44444 18.3333V7.10722C2.82822 7.24533 3.23522 7.33333 3.66667 7.33333H22V19.5556Z" fill="#39B54A"/>
                  </svg>
                </span>
                <span className="text-[16px] text-[#39B54A]">Connect wallet</span>
                <span>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9L5 5L1 1" stroke="#39B54A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                </span>
              </button> */}
          </div>

          {/* Nav */}
          <nav className="space-y-3 my-6 font-sans">
            {/* <Link href="/dashboard">
              <button
                className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
                rounded-r-full px-9 py-3
                  text-[16px] font-bold mb-4 ${pathname === "/dashboard"
                  ? "bg-[#EAF9EE] "
                  : "hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  
                  <span>
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.8048 12.7575L14.1013 0.242616C13.9426 0.0872218 13.728 0 13.5042 0C13.2805 0 13.0658 0.0872218 12.9072 0.242616L0.203643 12.7575C0.0648987 12.9171 -0.00760126 13.1224 0.000631604 13.3324C0.00886447 13.5424 0.0972238 13.7416 0.248052 13.8901C0.398881 14.0387 0.60107 14.1258 0.814215 14.1339C1.02736 14.142 1.23576 14.0706 1.39777 13.9339L13.5 2.01139L25.6022 13.9422C25.7642 14.0789 25.9726 14.1503 26.1858 14.1422C26.3989 14.1341 26.6011 14.0471 26.7519 13.8985C26.9028 13.7499 26.9911 13.5507 26.9994 13.3407C27.0076 13.1308 26.9351 12.9254 26.7964 12.7658L26.8048 12.7575Z" fill="#39B54A"/>
                    <path d="M21.5355 25.2585H17.5176V16.5499H9.48193V25.2585H5.46408V13.0664L3.85693 14.8082V25.2585C3.85693 25.7205 4.02626 26.1635 4.32765 26.4901C4.62905 26.8168 5.03784 27.0003 5.46408 27.0003H11.0891V18.2916H15.9105V27.0003H21.5355C21.9617 27.0003 22.3705 26.8168 22.6719 26.4901C22.9733 26.1635 23.1426 25.7205 23.1426 25.2585V14.5992L21.5355 12.8574V25.2585Z" fill="#39B54A"/>
                    </svg>
                  </span>


                  
                  <span className="flex items-center">Home</span>
                </span>
              </button>

            </Link> */}


            <Link href="/grants">
              <button

                className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
                rounded-r-full px-9
                py-3  font-bold mb-4  ${pathname === "/grants"
                    ? "bg-[#EAF9EE]"
                    : " hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  {/* <Image
                    src={
                      pathname === "/dashboard/funding-stream"
                        ? "/sidebar-icons/grant-round-white-icon.svg"
                        : "/sidebar-icons/grants.svg"
                    }
                    alt="Grant Rounds"
                    width={18}
                    height={18}
                  /> */}
                  <span>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.4286 1.25714C15.5971 1.08743 14.74 1.00171 13.8571 1C6.75614 1 1 6.74971 1 13.843C1 20.9363 6.75614 26.686 13.8571 26.686C20.9581 26.686 26.7143 20.9363 26.7143 13.843C26.7126 12.9627 26.6269 12.1064 26.4571 11.2741" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M13.8571 9.98951C12.4364 9.98951 11.2856 10.8522 11.2856 11.9168C11.2856 12.9801 12.4364 13.8428 13.8571 13.8428C15.2778 13.8428 16.4285 14.7042 16.4285 15.7688C16.4285 16.8334 15.2778 17.6961 13.8571 17.6961M13.8571 9.98951C14.9756 9.98951 15.9296 10.5256 16.2819 11.2752M13.8571 9.98951V8.70508M13.8571 17.6961C12.7385 17.6961 11.7845 17.1599 11.4322 16.4104M13.8571 17.6961V18.9805" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>

                  </span>
                  Grants
                </span>
                {/* <ChevronRight
                  size={16}
                  className={pathname === "/dashboard/funding-stream" ? "text-white" : "text-gray-400"}
                /> */}
              </button>
            </Link>


            <Link href="/donate">
              <button
                className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
                rounded-r-full px-9 py-3  font-bold mb-4  ${pathname === "/donate"
                    ? "bg-[#EAF9EE] "
                    : " hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  {/* <Image
                    src={
                      pathname === "/dashboard/donate"
                        ? "/sidebar-icons/good-white-icon.svg"
                        : "/sidebar-icons/good-grey-icon.svg"
                    }
                    alt="Past Grant Data"
                    width={18}
                    height={18}
                  /> */}

                  <span>
                    <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.07164 1H14.5002C15.0117 1 15.5022 1.20319 15.8639 1.56487C16.2256 1.92654 16.4288 2.41708 16.4288 2.92857C16.4288 4.12205 15.9547 5.26664 15.1108 6.11055C14.2668 6.95447 13.1223 7.42857 11.9288 7.42857H10.6431C9.44959 7.42857 8.305 6.95447 7.46109 6.11055C6.61717 5.26664 6.14307 4.12205 6.14307 2.92857C6.14307 2.41708 6.34625 1.92654 6.70793 1.56487C7.06961 1.20319 7.56015 1 8.07164 1Z" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.6429 24.1435H6.14286C4.77889 24.1435 3.47078 23.6017 2.50631 22.6372C1.54184 21.6727 1 20.3646 1 19.0007V17.7149C0.999686 15.5604 1.67595 13.4602 2.93337 11.7106C4.19078 9.96104 5.96585 8.6505 8.00807 7.96394C10.0503 7.27737 12.2566 7.24944 14.3155 7.88409C16.3745 8.51874 18.1821 9.78392 19.4834 11.5011" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18.9999 25.4292L23.3071 21.207C23.5712 20.9507 23.7813 20.644 23.925 20.3052C24.0687 19.9663 24.143 19.6021 24.1436 19.2341C24.1442 18.8661 24.071 18.5016 23.9285 18.1623C23.7859 17.823 23.5768 17.5157 23.3135 17.2585C22.7766 16.7325 22.0553 16.4372 21.3036 16.4358C20.5519 16.4344 19.8295 16.7269 19.2905 17.2508L19.0025 17.5337L18.7158 17.2508C18.1789 16.7252 17.4579 16.4302 16.7065 16.4287C15.9552 16.4273 15.233 16.7195 14.6941 17.2431C14.4299 17.4993 14.2197 17.8059 14.0759 18.1447C13.9321 18.4835 13.8577 18.8476 13.8569 19.2157C13.8562 19.5837 13.9292 19.9482 14.0717 20.2875C14.2142 20.6269 14.4232 20.9343 14.6864 21.1915L18.9999 25.4292Z" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  </span>

                  Donate
                </span>

                {/* <ChevronRight
                  size={16}
                  className={pathname === "/dashboard/donate" ? "text-white" : "text-gray-400"}
                /> */}
              </button>
            </Link>


            {/* <Link href="#">
              <button
                className={`w-full cursor-pointer flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium mb-4  ${pathname === "/account"
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

            </Link> */}

          </nav>
        </div>

        <div className="flex gap-3 items-center px-9">
          <Link href={"https://x.com/Clear_Fund"} target="_blank">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.1666 0.0224609H20.5096L13.207 8.39009L21.7988 19.7784H15.0723L9.80012 12.8729L3.77431 19.7784H0.428191L8.23839 10.8253L0 0.024018H6.89776L11.6561 6.33477L17.1666 0.0224609ZM15.991 17.7729H17.8439L5.88568 1.92363H3.89887L15.991 17.7729Z" fill="#39B54A" />
            </svg>

          </Link>

          <Link href={"https://t.me/+fU2kPPjZ50MxMTE0"} target="_blank">
            <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.2545 7.77308L10.7576 12.1094L17.503 18.614L22 1.26855L1.76367 8.85717L6.26063 11.0253L8.50911 17.5299L11.8818 13.1935" stroke="#39B54A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </Link>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
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