"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, ChevronRight, Menu, X, Bell } from "lucide-react";
import PastGrant from "@/components/PastGrant";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import UserDetails from "@/components/userDetails";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";


import { usePathname } from "next/navigation";
import Link from "next/link";



import { shortAddress } from "@/components/userDetails";




export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter()
  const { ready, authenticated, login, logout, user } = usePrivy()
  const { wallets } = useWallets()

  const address = wallets[0]?.address


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

          {
            sidebarOpen && <div className="fixed h-screen top-0 z-50 bg-white w-[80%]">


            <div className="px-5">
              {
              authenticated &&
              <div className="h-[114px] border border-[#7CB53E] rounded-md p-7 mt-20">
                <div className="flex items-center gap-3">
                  <h2 className="font-black text-[20px] text-[#39B54A]">Account</h2>
                  <section className="flex items-center gap-2 text-[#E2A426]">
                    <span>
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 1L1 2.75V6C1 7.75 2.75 10.5 5 11C7.25 10.5 9 7.75 9 6V2.75L5 1H5.5Z" stroke="#E2A426" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-[14px]">verify</span>
                  </section>
                </div>
                <p className="text-[14px] text-black/50 mt-2">{shortAddress(address)}</p>
              </div>
             
            }
            </div>



            <nav className="space-y-3 my-6 font-sans">

            <Link href="/grants">
              <button onClick={() => setSidebarOpen(false)}

                className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
                rounded-r-full px-9
                py-3  font-bold mb-4  ${pathname === "/grants"
                  ? "bg-[#EAF9EE]"
                  : " hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  
                  <span>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4286 1.25714C15.5971 1.08743 14.74 1.00171 13.8571 1C6.75614 1 1 6.74971 1 13.843C1 20.9363 6.75614 26.686 13.8571 26.686C20.9581 26.686 26.7143 20.9363 26.7143 13.843C26.7126 12.9627 26.6269 12.1064 26.4571 11.2741" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M13.8571 9.98951C12.4364 9.98951 11.2856 10.8522 11.2856 11.9168C11.2856 12.9801 12.4364 13.8428 13.8571 13.8428C15.2778 13.8428 16.4285 14.7042 16.4285 15.7688C16.4285 16.8334 15.2778 17.6961 13.8571 17.6961M13.8571 9.98951C14.9756 9.98951 15.9296 10.5256 16.2819 11.2752M13.8571 9.98951V8.70508M13.8571 17.6961C12.7385 17.6961 11.7845 17.1599 11.4322 16.4104M13.8571 17.6961V18.9805" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>

                  </span>
                  Grants
                </span>
                
              </button>
            </Link>

            <Link href={"/archive"}>
              <button onClick={() => setSidebarOpen(false)}

                className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
                rounded-r-full px-9 py-3  font-bold mb-4  ${pathname === "/archive"
                  ? "bg-[#EAF9EE]"
                  : " hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">

                  
                  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.35714 24.7857H5.5C4.30653 24.7857 3.16193 24.3116 2.31802 23.4677C1.47411 22.6238 1 21.4792 1 20.2857V5.5C1 4.30653 1.47411 3.16193 2.31802 2.31802C3.16193 1.47411 4.30653 1 5.5 1H17.7143C18.9078 1 20.0524 1.47411 20.8963 2.31802C21.7402 3.16193 22.2143 4.30653 22.2143 5.5V8.07143" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M6.78564 1H16.4285V4.21429C16.4285 4.89627 16.1576 5.55032 15.6753 6.03256C15.1931 6.5148 14.5391 6.78571 13.8571 6.78571H9.35707C8.67509 6.78571 8.02104 6.5148 7.5388 6.03256C7.05656 5.55032 6.78564 4.89627 6.78564 4.21429V1Z" stroke="#39B54A" strokeWidth="1.5"/>
                  <path d="M12.5713 14.5004C12.5713 13.6479 12.9099 12.8304 13.5127 12.2276C14.1155 11.6248 14.9331 11.2861 15.7856 11.2861H20.2856C21.1381 11.2861 21.9556 11.6248 22.5584 12.2276C23.1612 12.8304 23.4999 13.6479 23.4999 14.5004V21.5718C23.4999 22.4243 23.1612 23.2419 22.5584 23.8447C21.9556 24.4475 21.1381 24.7861 20.2856 24.7861H15.7856C14.9331 24.7861 14.1155 24.4475 13.5127 23.8447C12.9099 23.2419 12.5713 22.4243 12.5713 21.5718V14.5004Z" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  

                  Archive
                </span>
              </button>
            </Link>



            <Link href="/donate">
              <button onClick={() => setSidebarOpen(false)}
                className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
                rounded-r-full px-9 py-3  font-bold mb-4  ${pathname === "/donate"
                  ? "bg-[#EAF9EE] "
                  : " hover:bg-gray-50"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <span>
                    <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.07164 1H14.5002C15.0117 1 15.5022 1.20319 15.8639 1.56487C16.2256 1.92654 16.4288 2.41708 16.4288 2.92857C16.4288 4.12205 15.9547 5.26664 15.1108 6.11055C14.2668 6.95447 13.1223 7.42857 11.9288 7.42857H10.6431C9.44959 7.42857 8.305 6.95447 7.46109 6.11055C6.61717 5.26664 6.14307 4.12205 6.14307 2.92857C6.14307 2.41708 6.34625 1.92654 6.70793 1.56487C7.06961 1.20319 7.56015 1 8.07164 1Z" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.6429 24.1435H6.14286C4.77889 24.1435 3.47078 23.6017 2.50631 22.6372C1.54184 21.6727 1 20.3646 1 19.0007V17.7149C0.999686 15.5604 1.67595 13.4602 2.93337 11.7106C4.19078 9.96104 5.96585 8.6505 8.00807 7.96394C10.0503 7.27737 12.2566 7.24944 14.3155 7.88409C16.3745 8.51874 18.1821 9.78392 19.4834 11.5011" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.9999 25.4292L23.3071 21.207C23.5712 20.9507 23.7813 20.644 23.925 20.3052C24.0687 19.9663 24.143 19.6021 24.1436 19.2341C24.1442 18.8661 24.071 18.5016 23.9285 18.1623C23.7859 17.823 23.5768 17.5157 23.3135 17.2585C22.7766 16.7325 22.0553 16.4372 21.3036 16.4358C20.5519 16.4344 19.8295 16.7269 19.2905 17.2508L19.0025 17.5337L18.7158 17.2508C18.1789 16.7252 17.4579 16.4302 16.7065 16.4287C15.9552 16.4273 15.233 16.7195 14.6941 17.2431C14.4299 17.4993 14.2197 17.8059 14.0759 18.1447C13.9321 18.4835 13.8577 18.8476 13.8569 19.2157C13.8562 19.5837 13.9292 19.9482 14.0717 20.2875C14.2142 20.6269 14.4232 20.9343 14.6864 21.1915L18.9999 25.4292Z" stroke="#39B54A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                  </span>
                  
                  Donate
                </span>

                
              </button>
            </Link>


            
                  
          </nav>

          <div className="flex gap-3 items-center px-9 absolute bottom-10">
          <Link href={"https://x.com/Clear_Fund"} target="_blank">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.1666 0.0224609H20.5096L13.207 8.39009L21.7988 19.7784H15.0723L9.80012 12.8729L3.77431 19.7784H0.428191L8.23839 10.8253L0 0.024018H6.89776L11.6561 6.33477L17.1666 0.0224609ZM15.991 17.7729H17.8439L5.88568 1.92363H3.89887L15.991 17.7729Z" fill="#39B54A"/>
            </svg>

          </Link>

          <Link href={"https://t.me/+fU2kPPjZ50MxMTE0"} target="_blank">
            <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.2545 7.77308L10.7576 12.1094L17.503 18.614L22 1.26855L1.76367 8.85717L6.26063 11.0253L8.50911 17.5299L11.8818 13.1935" stroke="#39B54A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          </Link>
        </div>
          </div>
          }

          <div className="hidden md:flex">
            <Sidebar authenticated={authenticated} address={address} login={login}/>
          </div>

            <main className="flex-1 p-4 md:px-6 md:ml-64">
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
            </main>
        </div>






   
  );
}
