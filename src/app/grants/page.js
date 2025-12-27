"use client";

// import { useEffect, useState, useRef } from "react";

// import Sidebar from "@/components/Sidebar";
// import { useRouter } from "next/navigation";
// import { LogOut, Settings, ChevronRight, Menu, X, Bell } from "lucide-react";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import Link from "next/link";


// import ProtectedRoute from "@/lib/withAuth";
// import { usePrivy, useWallets } from "@privy-io/react-auth";
// import { shortAddress } from "@/components/userDetails";




// import { Plus } from "lucide-react";
// import GrantRoundCard from "@/components/GrantRoundCard";


// import UserDetails from "@/components/userDetails";
// import ModalConnect from "@/components/modalConnect";




// function DashboardLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [grantStatus, setGrantStatus] = useState("all")
//   const [toggle, setToggle] = useState(false)


//   const pathname = usePathname();
//   const router = useRouter()
//   const { ready, authenticated, login, logout, user } = usePrivy()
//   const { wallets } = useWallets()

//   const address = wallets[0]?.address

  const today = new Date()



//    const activeGrants = grants.filter(grant => {
//     if(!grant.endDate) return false
//     if(grant.endDate.toLowerCase() === "ongoing") return true
//     return new Date(grant.endDate) >= today
//    })
//    const expiredGrants = grants.filter(grant => new Date(grant.endDate) < today)
  



//   return (
//     <ProtectedRoute>
//         <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative">
//       {/* Sidebar imported */}
//           <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md font-sans">
//             <div className="relative w-[120px] h-[30px]">
//               <Image
//                 src="/clearfund-dashboard-logo.svg"
//                 alt="ClearFund Logo"
//                 fill
//                 className="object-contain"
//                 priority
//               />
//             </div>
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 rounded-lg hover:bg-gray-100"
//             >
//               {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {
//             sidebarOpen && <div className="fixed h-screen top-0 z-50 bg-white w-[80%]">


//             <div className="px-5">
//               {
//               authenticated &&
//               <div className="h-[114px] border border-[#7CB53E] rounded-md p-7 mt-20">
//                 <div className="flex items-center gap-3">
//                   <h2 className="font-black text-[20px] text-[#39B54A]">Account</h2>
//                   <section className="flex items-center gap-2 text-[#E2A426]">
//                     <span>
//                       <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M5.5 1L1 2.75V6C1 7.75 2.75 10.5 5 11C7.25 10.5 9 7.75 9 6V2.75L5 1H5.5Z" stroke="#E2A426" stroke-linecap="round" stroke-linejoin="round"/>
//                       </svg>
//                     </span>
//                     <span className="text-[14px]">verify</span>
//                   </section>
//                 </div>
//                 <p className="text-[14px] text-black/50 mt-2">{shortAddress(address)}</p>
//               </div>
             
//             }
//             </div>



//             <nav className="space-y-3 my-6 font-sans">
            


//             <Link href="/grants">
//               <button onClick={() => setSidebarOpen(false)}

//                 className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
//                 rounded-r-full px-9
//                 py-3  font-bold mb-4  ${pathname === "/grants"
//                   ? "bg-[#EAF9EE]"
//                   : " hover:bg-gray-50"
//                   }`}
//               >
//                 <span className="flex items-center gap-3">
                  
//                   <span>
//                     <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M16.4286 1.25714C15.5971 1.08743 14.74 1.00171 13.8571 1C6.75614 1 1 6.74971 1 13.843C1 20.9363 6.75614 26.686 13.8571 26.686C20.9581 26.686 26.7143 20.9363 26.7143 13.843C26.7126 12.9627 26.6269 12.1064 26.4571 11.2741" stroke="#39B54A" stroke-width="1.5" stroke-linecap="round"/>
//                     <path d="M13.8571 9.98951C12.4364 9.98951 11.2856 10.8522 11.2856 11.9168C11.2856 12.9801 12.4364 13.8428 13.8571 13.8428C15.2778 13.8428 16.4285 14.7042 16.4285 15.7688C16.4285 16.8334 15.2778 17.6961 13.8571 17.6961M13.8571 9.98951C14.9756 9.98951 15.9296 10.5256 16.2819 11.2752M13.8571 9.98951V8.70508M13.8571 17.6961C12.7385 17.6961 11.7845 17.1599 11.4322 16.4104M13.8571 17.6961V18.9805" stroke="#39B54A" stroke-width="1.5" stroke-linecap="round"/>
//                     </svg>

//                   </span>
//                   Grants
//                 </span>
                
//               </button>
//             </Link>

//             <Link href={"/archive"}>
//               <button onClick={() => setSidebarOpen(false)}

//                 className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
//                 rounded-r-full px-9 py-3  font-bold mb-4  ${pathname === "/archive"
//                   ? "bg-[#EAF9EE]"
//                   : " hover:bg-gray-50"
//                   }`}
//               >
//                 <span className="flex items-center gap-3">

                  
//                   <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M9.35714 24.7857H5.5C4.30653 24.7857 3.16193 24.3116 2.31802 23.4677C1.47411 22.6238 1 21.4792 1 20.2857V5.5C1 4.30653 1.47411 3.16193 2.31802 2.31802C3.16193 1.47411 4.30653 1 5.5 1H17.7143C18.9078 1 20.0524 1.47411 20.8963 2.31802C21.7402 3.16193 22.2143 4.30653 22.2143 5.5V8.07143" stroke="#39B54A" stroke-width="1.5" stroke-linecap="round"/>
//                   <path d="M6.78564 1H16.4285V4.21429C16.4285 4.89627 16.1576 5.55032 15.6753 6.03256C15.1931 6.5148 14.5391 6.78571 13.8571 6.78571H9.35707C8.67509 6.78571 8.02104 6.5148 7.5388 6.03256C7.05656 5.55032 6.78564 4.89627 6.78564 4.21429V1Z" stroke="#39B54A" stroke-width="1.5"/>
//                   <path d="M12.5713 14.5004C12.5713 13.6479 12.9099 12.8304 13.5127 12.2276C14.1155 11.6248 14.9331 11.2861 15.7856 11.2861H20.2856C21.1381 11.2861 21.9556 11.6248 22.5584 12.2276C23.1612 12.8304 23.4999 13.6479 23.4999 14.5004V21.5718C23.4999 22.4243 23.1612 23.2419 22.5584 23.8447C21.9556 24.4475 21.1381 24.7861 20.2856 24.7861H15.7856C14.9331 24.7861 14.1155 24.4475 13.5127 23.8447C12.9099 23.2419 12.5713 22.4243 12.5713 21.5718V14.5004Z" stroke="#39B54A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                   </svg>

                  

//                   Archive
//                 </span>
//               </button>
//             </Link>



//             <Link href="/donate">
//               <button onClick={() => setSidebarOpen(false)}
//                 className={`flex text-[#39B54A] items-center cursor-pointer h-[71px] w-[203px]
//                 rounded-r-full px-9 py-3  font-bold mb-4  ${pathname === "/donate"
//                   ? "bg-[#EAF9EE] "
//                   : " hover:bg-gray-50"
//                   }`}
//               >
//                 <span className="flex items-center gap-3">
//                   <span>
//                     <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M8.07164 1H14.5002C15.0117 1 15.5022 1.20319 15.8639 1.56487C16.2256 1.92654 16.4288 2.41708 16.4288 2.92857C16.4288 4.12205 15.9547 5.26664 15.1108 6.11055C14.2668 6.95447 13.1223 7.42857 11.9288 7.42857H10.6431C9.44959 7.42857 8.305 6.95447 7.46109 6.11055C6.61717 5.26664 6.14307 4.12205 6.14307 2.92857C6.14307 2.41708 6.34625 1.92654 6.70793 1.56487C7.06961 1.20319 7.56015 1 8.07164 1Z" stroke="#39B54A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M10.6429 24.1435H6.14286C4.77889 24.1435 3.47078 23.6017 2.50631 22.6372C1.54184 21.6727 1 20.3646 1 19.0007V17.7149C0.999686 15.5604 1.67595 13.4602 2.93337 11.7106C4.19078 9.96104 5.96585 8.6505 8.00807 7.96394C10.0503 7.27737 12.2566 7.24944 14.3155 7.88409C16.3745 8.51874 18.1821 9.78392 19.4834 11.5011" stroke="#39B54A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M18.9999 25.4292L23.3071 21.207C23.5712 20.9507 23.7813 20.644 23.925 20.3052C24.0687 19.9663 24.143 19.6021 24.1436 19.2341C24.1442 18.8661 24.071 18.5016 23.9285 18.1623C23.7859 17.823 23.5768 17.5157 23.3135 17.2585C22.7766 16.7325 22.0553 16.4372 21.3036 16.4358C20.5519 16.4344 19.8295 16.7269 19.2905 17.2508L19.0025 17.5337L18.7158 17.2508C18.1789 16.7252 17.4579 16.4302 16.7065 16.4287C15.9552 16.4273 15.233 16.7195 14.6941 17.2431C14.4299 17.4993 14.2197 17.8059 14.0759 18.1447C13.9321 18.4835 13.8577 18.8476 13.8569 19.2157C13.8562 19.5837 13.9292 19.9482 14.0717 20.2875C14.2142 20.6269 14.4232 20.9343 14.6864 21.1915L18.9999 25.4292Z" stroke="#39B54A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>

//                   </span>
                  
//                   Donate
//                 </span>

                
//               </button>
//             </Link>


            
                  
//           </nav>

//           <div className="flex gap-3 items-center px-9 absolute bottom-10">
//           <Link href={"https://x.com/Clear_Fund"} target="_blank">
//             <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M17.1666 0.0224609H20.5096L13.207 8.39009L21.7988 19.7784H15.0723L9.80012 12.8729L3.77431 19.7784H0.428191L8.23839 10.8253L0 0.024018H6.89776L11.6561 6.33477L17.1666 0.0224609ZM15.991 17.7729H17.8439L5.88568 1.92363H3.89887L15.991 17.7729Z" fill="#39B54A"/>
//             </svg>

//           </Link>

//           <Link href={"https://t.me/+fU2kPPjZ50MxMTE0"} target="_blank">
//             <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M15.2545 7.77308L10.7576 12.1094L17.503 18.614L22 1.26855L1.76367 8.85717L6.26063 11.0253L8.50911 17.5299L11.8818 13.1935" stroke="#39B54A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//             </svg>

//           </Link>
//         </div>
//           </div>
//           }

//           <div className="hidden md:flex">
//             <Sidebar authenticated={authenticated} address={address} login={login}/>
//           </div>

//             <main className="flex-1 p-4 md:px-6 md:ml-64">
                


//                 <div className="min-h-screen flex flex-col md:flex-row  text-gray-800 relative ">
//         {/* <Sidebar /> */}
//         {
//           toggle && <ModalConnect setCloseModal={setToggle}/>
//         }

//         <main className="flex-1 p-4 md:p-6">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex md:justify-between justify-end flex-wrap-reverse">
//               <div className={"flex items-center justify-between w-full mb-10"}>
//                 <h1 className="text-2xl font-bold  md:text-left ">
//                   Grants
//                 </h1>

//                 {!authenticated ?
//                   <button
//                       onClick={login}
//                       className="font-sans font-black hover:bg-black text-[16px] h-[52px] bg-[#39B54A] text-white rounded-full w-[159.16796875px]"
//                       >
//                       Connect wallet
//                   </button> :
//                   <UserDetails walletAddress={address} logout={logout}/>
//                 }
//               </div>
//             </div>

//             <div className="flex  mt-10 font-sans justify-between w-full flex-wrap-reverse gap-10 items-center">
//               <div className="flex gap-5 font-black">
//                 <button onClick={()=> setGrantStatus("all")} className={`text-[15px] w-[100px] md:w-[112px] h-[38px] rounded-4xl ${grantStatus === 'all' && "bg-[#39B54A] text-white"} text-black`}>All</button>
//                 <button onClick={()=> setGrantStatus("active")} className={`text-[15px] w-[100px] md:w-[112px] h-[38px] rounded-4xl ${grantStatus === 'active' && "bg-[#39B54A] text-white"} text-black`}>Active</button>
//                 <button onClick={()=> setGrantStatus("ended")} className={`text-[15px] w-[100px] md:w-[112px] h-[38px] rounded-4xl ${grantStatus === 'ended' && "bg-[#39B54A] text-white"} text-black`}>Ended</button>
//               </div>
//                 <button onClick={() => setIsModalOpen(true)}
//                   className="bg-[#39B54A] flex items-center justify-center text-white rounded-4xl w-[112px] h-[38]"><Plus size={20}/>Add New</button>
//             </div>
//           </div>


          
//           {
//             grantStatus === "all" ? <GrantRoundCard grants={grants} setToggle={setToggle}/>
//             : grantStatus === "active" ? <GrantRoundCard grants={activeGrants} setToggle={setToggle}/>
//             : grantStatus === "ended" ? <GrantRoundCard grants={expiredGrants} />
//             : undefined
//           }
//         </main>


//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div
//               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//               onClick={() => setIsModalOpen(false)}
//             />


//             <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 z-10">

//               <div className="flex justify-between items-center mb-12">
//                 <h2 className="text-[16px] font-bold">
//                   Add new opportunity
//                 </h2>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-500 hover:text-gray-800"
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* form section for adding new grant */}
//               <form className="space-y-4">
//                 <div className="mb-8">
//                   <label className="block text-sm font-medium mb-1">
//                     Short Description
//                   </label>
//                   <textarea className="w-full border rounded-[5px] p-2 text-sm" rows="3"></textarea>
//                 </div>
//                 <div className="mb-8">
//                   <label className="block text-sm font-medium mb-1">
//                     Link to Grant
//                   </label>
//                   <input type="text" className="w-full border rounded-[5px] p-2 text-sm" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 mb-8">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Start Date</label>
//                     <input type="date" className="w-full border rounded-[5px] p-2 text-sm" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">End Date</label>
//                     <input type="date" className="w-full border rounded-[5px] p-2 text-sm" />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 mb-4">
//                   <div >
//                     <label className="block text-sm font-medium mb-1">Amount</label>
//                     <input type="text" placeholder="Optional" className="w-full border rounded-[5px] p-2 text-sm" />
//                   </div>
//                 </div>

//                 <p className="text-[10px] text-[#000000]/50 mb-8">
//                   Please note that grant will only be added after verification.
//                 </p>
//                 <div className="flex justify-between mb-4">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-6 py-2 rounded-full border border-gray-400 text-gray-600"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-2 rounded-full bg-[#39B54A] text-white font-medium"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>


//             </main>
//         </div>
//     </ProtectedRoute>
//   );
// }


// export default DashboardLayout

import { useState } from 'react';
import Sidebar from '../../components/SideBar2';
import HeroBanner from '../../components/HeroBanner';
import SearchFilters from '../../components/SearchFilter';
import GrantCard from '../../components/GrantCard';
import Pagination from '../../components/Pagination';
import { Form } from '../../components/Form';
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useGrantStore } from "@/store/grantStore";
import { useRouter } from "next/navigation";
import Application from './[id]/page';
import { CloseIcon, Badge, ApplyButton } from '@/components/overview';
import { X } from "lucide-react";


// Mock data for grants
// const grantsData = [
//   {
//     id: 1,
//     title: 'ENS PG Builder Grants',
//     description: 'PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems.',
//     category: 'ENS',
//     status: 'open',
//     amount: '50k USDC',
//   },
//   {
//     id: 2,
//     title: 'ENS PG Builder Grants',
//     description: 'PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems.',
//     category: 'ENS',
//     status: 'open',
//     amount: '50k USDC',
//   },
//   {
//     id: 3,
//     title: 'ENS PG Builder Grants',
//     description: 'PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems.',
//     category: 'ENS',
//     status: 'open',
//     amount: '50k USDC',
//   },
//   {
//     id: 4,
//     title: 'ENS PG Builder Grants',
//     description: 'PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems.',
//     category: 'ENS',
//     status: 'open',
//     amount: '50k USDC',
//   },
//   {
//     id: 5,
//     title: 'ENS PG Builder Grants',
//     description: 'PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems.',
//     category: 'ENS',
//     status: 'open',
//     amount: '50k USDC',
//   },
//   {
//     id: 6,
//     title: 'ENS PG Builder Grants',
//     description: 'PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems.',
//     category: 'ENS',
//     status: 'open',
//     amount: '50k USDC',
//   },
//   {
//     id: 7,
//     title: 'ENS PG Builder Grants',
//     description: 'PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems.',
//     category: 'ENS',
//     status: 'open',
//     amount: '50k USDC',
//   },
//   {
//     id: 8,
//     title: 'ENS PG Builder Grants',
//     description: 'PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems.',
//     category: 'ENS',
//     status: 'open',
//     amount: '50k USDC',
//   },
//   {
//     id: 9,
//     title: 'ENS PG Builder Grants',
//     description: 'PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems.',
//     category: 'ENS',
//     status: 'open',
//     amount: '50k USDC',
//   },
//   {
//     id: 10,
//     title: 'ENS PG Builder Grants',
//     description: 'PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems.',
//     category: 'ENS',
//     status: 'open',
//     amount: '50k USDC',
//   },
// ];

  const grantsData = [
    


    {
      image: "/grant-round-images/arb.png",
      title: "Arb D.A.O Grant Program",
      desc: `The Arbitrum D.A.O. (Domain Allocator Offering) grant program is a 1 year program divided in five Domains, aimed to be the entry point of grants in the Arbitrum ecosystem.`,
      amount: "$1.5M",
      date: "March, 2026",
      endDate: "March, 2026",
      label: "Apply",
      link : "https://arbitrumdaogrants.notion.site/landing",
    },


    {
      image: "/grant-round-images/celoStream.png",
      title: "Celo Support Streams",
      desc: `Support Streams are Celo Protocol Incentives that are distributed Monthly to Protocols on Celo through a stCELO vote in the CeloPG Snapshot space. that enable adoption and remain uncrackable.`,
      amount: "150K CELO",
      date: "End- Jan 31, 2026",
      endDate: "Jan 31, 2026",
      label: "Apply",
      link : "https://app.charmverse.io/celopg/celo-support-streams-08274005568032872",
    },

    {
      image: "/grant-round-images/builder.jpg",
      title: "Celo Builder Fund",
      desc: `Apply for the celo builder fund to receive an investment of $25k per project with the potential for additional funding from verda ventures.`,
      amount: "25k cUSD",
      date: "End- Dec 31, 2025",
      endDate: "Dec 31, 2025",
      label: "Apply",
      link : "https://www.celopg.eco/programs/celo-builder-fund",
    },


    {
      image: "/grant-round-images/miniApp.png",
      title: "Mini App Mondays",
      desc: `Mini App Mondays is a weekly showcase designed to highlight the most exciting mini apps on Celo. Each week, one app will be featured on Farcaster.`,
      amount: "1k CELO",
      date: "End- Dec 29, 2025",
      endDate: "Dec 29, 2025",
      label: "Apply",
      link : "https://www.celopg.eco/programs/mini-app-mondays",
    },


    {
      image: "/grant-round-images/impact.png",
      title: "Proof of Impact (S1)",
      desc: `A fully onchain reward program offering a streamlined and transparent system to rewards apps based on the gas fees their users generate, reinforcing long-term network growth.`,
      amount: "250K CELO",
      date: "End- Dec 16, 2025",
      endDate: "Dec 16, 2025",
      label: "Apply",
      link : "https://www.celopg.eco/programs/proof-of-impact-s1",
    },


    {
      image: "/grant-round-images/local.png",
      title: "Local Grant Programs",
      desc: `Empowering local hubs to channel funding through local grant programs into community activities, showcasing Ethereum as practical infrastructure.`,
      amount: "$ 125k",
      date: "End- March 1, 2026",
      endDate: "March 1, 2026",
      label: "Apply",
      link : "https://app.karmahq.xyz/localism-fund/programs/975",
    },

    {
      image: "/grant-round-images/africa.png",
      title: "Lisk Startup Support ",
      desc: `This initiative provide hands-on support to founders at the early stage of their startup journey whether you need technical guidance or growth strategies to take your product to the next level.`,
      amount: null,
      date: "Ongoing",
      endDate: "Ongoing",
      label: "Apply",
      link : "https://docs.google.com/forms/d/e/1FAIpQLSezQFvA4AtKz4i6mT_m4knOPFkxxD8PNqFrX9TvK2pBv-Vdow/viewform",
    },

    {
      image: "/grant-round-images/baseBuild.png",
      title: "Base Ecosystem Fund",
      desc: `The Base Ecosystem Fund will invest in and support early stage projects (pre-seed to seed) building on Base.`,
      amount: null,
      date: "Ongoing",
      endDate: "Ongoing",
      label: "Apply",
      link : "https://docs.google.com/forms/d/e/1FAIpQLSeiSAod4PAbXlvvDGtHWu-GqzGpvHYfaTQR2f77AawD7GYc4Q/viewform",
    },
    {
      image: "/grant-round-images/starknet1.png",
      title: "Starknet Grants",
      desc: `Starknet Grants enable builders, empower vibrant communities, increase adoption and make the Starknet ecosystem more open and accessible for everyone.`,
      amount: null,
      date: "Ongoing",
      endDate: "Ongoing",
      label: "Apply",
      link : "https://www.starknet.io/grants/",
    },
    {
      image: "/grant-round-images/space.jpg",
      title: "SPACE ID Grant Program",
      desc: `A long-term funding initiative designed to support and enrich the blockchain community.`,
      amount: "$39 k",
      date: "End- Dec 31, 2025",
      endDate: "Dec 31, 2025",
      label: "Apply",
      link : "https://docs.space.id/domain-and-payment-id/domain-programs/space-id-grant-program",
    },
    {
      image: "/grant-round-images/xeco.jpg",
      title: "X1 EcoChain Grants",
      desc: `This Program aims to grow the $X1 network by funding projects that enhance both dev tools and UX on its low-energy, EVM-compatible blockchain.`,
      amount: "$5m",
      date: "Ongoing",
      endDate: "Ongoing",
      label: "Apply",
      link : "https://grant.x1ecochain.com/",
    },
    {
      image: "/grant-round-images/web3grants.png",
      title: "Web3 Foundation Grants",
      desc: `Funding Software Development and Research Efforts related to Polkadot and Kusama.`,
      amount: null,
      date: "Ongoing",
      endDate: "Ongoing",
      label: "Apply",
      link : "https://grants.web3.foundation/",
    },
    {
      image: "/grant-round-images/ship.jpg",
      title: "Celo-Proof of Ship 9",
      desc: `Proof-of-Ship is a monthly contest that rewards builders for actively building on Celo.`,
      amount: "15k Celo",
      date: "End- Oct 31, 2025",
      endDate: "Oct 31, 2025",
      label: "Apply",
      link : "https://x.com/CeloDevs/status/1975456087299268656",
    },
    {
      image: "/grant-round-images/sup.jpg",
      title: "SPR Season 4",
      desc: `SUP is the governance token of Superfluid DAO Distributed to users of ecosystem applications via Streaming Programmatic Rewards.`,
      amount: null,
      date: "End- Oct 17, 2025",
      endDate: "Oct 17, 2025",
      label: "Apply",
      link : "https://superfluidorg.notion.site/sup-for-growth",
    },
    {
      image: "/grant-round-images/yapper.png",
      title: <span>Arbitrum x Kaito <br />Season 2</span>,
      desc: `The Kaito ARB Grant will distribute 700,000 ARB across 150 creators, with grants split into three tiers: the Top 10, the Next 40, and the Remaining 100.`,
      amount: "700k ARB",
      date: "End- Dec 31, 2025",
      endDate: "Dec 31, 2025",
      label: "Apply",
      link : "https://blog.arbitrum.io/arbitrum-x-kaito-season-2/",
    },
    {
      image: "/grant-round-images/destino.png",
      title: "Destino Devconnect grants",
      desc: `Destino Devconnect is a local grants round focused on supporting events and initiatives that help bring Argentina and the broader Latam region onchain.`,
      amount: null,
      date: "End- Nov 22, 2025",
      endDate: "Nov 22, 2025",
      label: "Apply",
      link : "https://esp.ethereum.foundation/devcon-grants",
    },
    {
      image: "/grant-round-images/web3grants1.png",
      title: "Gear Foundation Grants",
      desc: `This Grant Program is designed to offer teams, individuals, and creators non-dilutive funding to further accelerate the growth of the Gear ecosystem.`,
      amount: null,
      date: "Ongoing",
      endDate: "Ongoing",
      label: "Apply",
      link : "https://vara.network/grants",
    },
    {
      image: "/grant-round-images/ecochain.jpg",
      title: "X1 EcoChain Rewards",
      desc: `Galxe Starboard, an interactive leaderboard that distributes $100,000 in X1 Coins to standout contributors.`,
      amount: "$ 100k",
      date: "End- Nov 25, 2025",
      endDate: "Nov 25, 2025",
      label: "Details",
      link : "https://medium.com/@X1_EcoChain/x1-ecochain -launches-galxe-starboard-100-000-community-rewards-09c1d8325015",
    },
    {
      image: "/grant-round-images/lisk.png",
      title: "Lisk EMpower Fund",
      desc: `Equip founders in Africa, Southeast Asia, and Latin America with the capital and networks to compete on a global stage.`,
      amount: "$15M",
      date: "Ongoing",
      endDate: "Ongoing",
      label: "Apply",
      link : "https://lisk.com/fund/",
    },
    {
      image: "/grant-round-images/internet.jpg",
      title: "ENS PG Builder Grants",
      desc: `PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems. `,
      amount: "50k USDC",
      date: "Ongoing",
      endDate: "Ongoing",
      label: "Apply",
      link : "https://builder.ensgrants.xyz/"
    },

    {
      image: "/grant-round-images/gitcoin.png",
      title: "Gitcoin Grants 24",
      subTitle: "Developer Tooling & Infra",
      desc: `This round is designed to support projects that strengthen Ethereum’s core infrastructure.`,
      amount: "$200k",
      date: "End- Oct 17, 2025",
      endDate: "Oct 17, 2025",
      label: "Apply",
      link : "https://giveth.typeform.com/gg24-dti?apcid=006677578599e2590fc7e200&utm_campaign=gitcoin-gg24-applications&utm_content=gitcoin-gg24-applications&utm_medium=email&utm_source=ortto"
    },

    {
      image: "/grant-round-images/gitcoin.png",
      title: "Gitcoin Grants 24",
      subTitle: "Interop Standards, Infra & Analytics",
      desc: `This round is designed to support projects that strengthen Ethereum’s multi-chain ecosystem by building open standards.`,
      amount: "$100k",
      date: "End- Oct 17, 2025",
      endDate: "Oct 17, 2025",
      label: "Apply",
      link : "https://giveth.typeform.com/gg24-isia?apcid=006677578599e2590fc7e200&utm_campaign=gitcoin-gg24-applications&utm_content=gitcoin-gg24-applications&utm_medium=email&utm_source=ortto"
    },

    {
      image: "/grant-round-images/base.png",
      title: "Base Builder Grants",
      desc: `These are small grants for builders with early ideas or initial prototypes, hacking away on nights and weekends. `,
      amount: "5 ETH",
      date: "Ongoing",
      endDate: "Ongoing",
      label: "Apply",
      link : "https://docs.google.com/forms/d/e/1FAIpQLSfXuEzmiAzRhie_z9raFCF1BXweXgVt18o-DvBuRRgyTygL2A/viewform"
    },

    {
      title: "Polygon AI ",
      amount: "50k Pol",
      date: "End- Nov 23, 2025",
      endDate: "Nov 23, 2025",
      label: "Apply",
      link: "https://www.encodeclub.com/programmes/polygon-grants",
      image: "/grant-round-images/polygon.jpg",
      desc: `Funding from 10k-50k POL across three tiers for teams building innovative apps that combine AI with blockchain tech on Polygon.`
    },

    {
      title: "Scroll Grants",
      amount: "312k SCR",
      date: "End- Dec 19, 2025",
      endDate: "Dec 19, 2025",
      link: "https://tally.so/r/mVrrPj",
      image: "/grant-round-images/feature.jpg",
      label: "Apply",
      desc: `Scroll DAO Community Council introduces the Community Grants Program. This is an effort to support communities worldwide with their community activations.`
    },


    {
      title: "Avalanche Grants & Programs",
      amount: "$250m",
      date: "Ongoing",
      endDate: "Ongoing",
      link: "https://build.avax.network/grants#programs",
      image: "/grant-round-images/ava.png",
      label: "Apply",
      desc: `Empowering innovators to build the future of blockchain technology with scalable and sustainable solutions.`,
    },

    {
      title: "Incubator program",
      amount: "$ 9k",
      date: "End- Oct 7, 2025",
      endDate: "Oct 7, 2025",
      label: "Apply",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSffpxsP1KZnvd3mx41wQYNCoTQ9_Jphql3TwnZ3RluwXXnI2A/viewform",
      image: "/grant-round-images/celo.png",
      desc: `The Celo Africa DAO Incubator Program aims to enhance the capabilities of early-stage founders through hands-on mentorship.`
    },

    {
      image: "/grant-round-images/good-dollar-image.svg",
      title: "Good Dollar",
      desc: `An initiative fueling innovation with G$, offering support, funding, and mentorship to builders.`,
      amount: "$ 250k",
      date: "End- Oct 8, 2025",
      endDate: "Oct 8, 2025",
      label: "Apply",
      link: "https://gooddollar.notion.site/GoodBuilders-Program-Round-2-goes-streaming-200f258232f0802b960ad1dab7ad5fd2"
    },

    {
      image: "/grant-round-images/octant-image.svg",
      title: "Octant",
      desc: `Funding the journalists, storytellers, content creators, and others who’ve helped make Ethereum legible.`,
      amount: "$1m",
      date: "End- Aug 27, 2025",
      endDate: "Aug 27, 2025",
      label: "Apply",
      link: "https://octant.fillout.com/epoch9-ethereum-stories?ref=blog.octant.build"
    },
    {
      image: "/grant-round-images/thrive-protocol-image.svg",
      title: "Thrive Protocol",
      desc: `Thrive Portals is funding the next wave of studios and indies building with the Portals Engine.`,
      amount: "$ 100k",
      date: "End- Jul 31, 2026",
      endDate: "Jul 31, 2026",
      label: "Apply",
      link: "https://portals.thrive.xyz/"
    },
    {
      image: "/grant-round-images/lisk-l2-program.svg",
      title: "Lisk L2",
      desc: `A Program to nurture a community of developers and creators within the Lisk ecosystem.`,
      amount: "$ 80k",
      date: "End- Oct, 2025",
      endDate: "Oct, 2025",
      label: "Apply",
      link: "https://lisk.com/blog/posts/say-hello-to-the-new-lisk-l2-grant-program/"
    },
    {
      image: "/grant-round-images/celo-proof-of-ship.svg",
      title: " Celo-Proof of Ship 7",
      desc: `Proof-of-Ship is a monthly contest that rewards builders for actively building on Celo.`,
      amount: "15k Celo",
      date: "End- Aug 29, 2025",
      endDate: "Aug 29, 2025",
      label: "Apply",
      link: "https://docs.gap.karmahq.xyz/how-to-guides/integrations/celo-proof-of-ship"
    },
    {
      image: "/grant-round-images/thrive-horizon.svg",
      title: "Thrive Protocol",
      desc: `Thrive Horizen funds the new era of privacy first apps on Base.`,
      amount: "$ 100k",
      date: "End-  Aug 13, 2026",
      endDate: "Aug 13, 2026",
      label: "Apply",
      link: "https://horizen.thrive.xyz/"
    },
    {
      image: "/grant-round-images/stream-garden-image.svg",
      title: "Stream On Garden ",
      desc: `Active Gardens Funding Pools on Celo network are eligible for streaming matching funds.`,
      amount: "3k Celo",
      date: "End-  Nov 5, 2025",
      endDate: "Nov 5, 2025",
      label: "Apply",
      link: "https://1hive-gardens.notion.site/Celo-Support-Streams-on-Gardens-246d6929d01480209ca4dbc2f8d26bfd"
    },
    {
      image: "/grant-round-images/optimism.image.png",
      title: "Optimism Season 8",
      desc: `Funding projects that build innovative applications and contribute to public goods on Optimism.`,
      amount: "6.29M OP",
      date: "End- Nov 12, 2025",
      endDate: "Nov 12, 2025",
      label: "Apply",
      link: "https://www.opgrants.io/"
    },
    {
      image: "/grant-round-images/boba-round-image.svg",
      title: "Thrive Boba",
      desc: `Grant for innovators building new projects natively on Boba. Supports early-stage teams developing real-world applications.`,
      amount: "1m Boba",
      date: "End- Sep 12, 2025",
      endDate: "Sep 12, 2025",
      label: "Apply",
      link: "https://app.thrive.xyz/programs/23"
    },
    {
      image: "/grant-round-images/hedera-round-image.svg",
      title: "Thrive Hedera",
      desc: `Hedera is allocating 4M HBAR to support projects from other ecosystems looking to deploy on Hedera`,
      amount: "4m hbar",
      date: "End- Dec 31, 2025",
      endDate: "Dec 31, 2025",
      label: "Apply",
      link: "https://app.thrive.xyz/programs/16"
    },
    {
      image: "/grant-round-images/boba-round-image.svg",
      title: "Thrive Boba",
      desc: `For existing projects from other ecosystems looking to deploy or expand on Boba. This track supports teams ready to scale.`,
      amount: "1m Boba",
      date: "End- Sep 12, 2025",
      endDate: "Sep 12, 2025",
      label: "Apply",
      link: "https://app.thrive.xyz/programs/2"
    },
    {
      image: "/grant-round-images/swell-round-image.svg",
      title: "Thrive Swell",
      desc: `For existing products and dApps from other ecosystems looking to integrate Swellchain.  Supports teams ready to expand.`,
      amount: "75m Swell",
      date: "End-Aug 31, 2025",
      label: "Apply",
      endDate: "Aug 31, 2025",
      link: "https://app.thrive.xyz/programs/12"
    },
    {
      image: "/grant-round-images/trading-info-round-image.svg",
      title: "Trading Infr Program",
      desc: `Allocating up to 3,000,000 OP in funding for approved projects driving transaction volume on Base.`,
      amount: "3m OP",
      date: "End- Aug 29, 2025",
      endDate: "Aug 29, 2025",
      label: "Apply",
      link: "https://app.thrive.xyz/programs/31"
    },
    {
      image: "/grant-round-images/giveth-round-image.svg",
      title: "Giveth Causes Round",
      desc: `Climate, ReFi, Women in Web3, and open Source Infra, Causes let you strengthen entire ecosystems with a single contribution.`,
      amount: "$40K",
      date: "End- Sep 5, 2025",
      label: "Apply",
      endDate: "Sep 5, 2025",
      link: "https://giveth.typeform.com/causesqf?apcid=0067b653ad43512d7e91ab00&utm_campaign=causes-qf-announcement&utm_content=causes-qf-announcement-var&utm_medium=email&utm_source=ortto"
    },
    {
      image: "/grant-round-images/prezenti-round-image.svg",
      title: <span>Prezenti Season 1 <br/> Peach Grant Round</span>,
      desc: `Funded through the Celo Community Fund treasury, as a community driven grants programme.`,
      amount: "250k cUSD",
      date: "End-  Dec 10, 2025",
      endDate: "Dec 10, 2025",
      label: "Apply",
      link: "https://charmverse.prezenti.xyz/invite/f90c14"
    },
  ];

// Extend to 1200 grants for pagination demo
// const allGrants = Array.from({ length: 1200 }, (_, i) => ({
//   ...grantsData[i % grantsData.length],
//   id: i + 1,
// }));

export default function LayOut() {

  const { wallets } = useWallets()
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false)
  const router = useRouter()
  const setGrant = useGrantStore((s) => s.setGrant)
  const grantsPerPage = 6;


  const sorted = sortGrantsWithStatusPriority(grantsData);

  const displayedGrants = sorted.slice(0, currentPage * grantsPerPage);


  

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };


  function sortGrantsWithStatusPriority(grants) {
  const now = new Date();

  // compute status and keep everything together
  const withStatus = grants.map(grant => {
    const status = new Date(grant.endDate) >= now ? "open" : "ended";
    return { ...grant, status };
  });

  return withStatus.sort((a, b) => {
    // 1️⃣ Sort by status: open first
    if (a.status !== b.status) {
      return a.status === "open" ? -1 : 1;
    }

    // 2️⃣ Then sort by endDate within the same status
    return new Date(a.endDate) - new Date(b.endDate);
  });
}

function displayGrant () {
  setShowDetails(true)
}






  const [isHidden, setIsHidden] = useState(false)


  

  return (
    <div className="bg-white min-h-screen relative">
      

      {
        showDetails && (
          <div className={`min-h-screen fixed z-50 lg:left-32 w-full flex items-center justify-center p-4 md:p-8 `}>
      {/* Modal Card */}
      <div className="relative w-[900px] h-[563px] bg-white rounded-2xl shadow-2xl p-8 md:p-10">
        {/* Close button - top right */}
        <div className="absolute top-6 right-6">
          {/* <CloseIcon /> */}
          <X className='opacity-80'/>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <Badge>Direct Grants</Badge>
          <Badge>Early Stage Startups</Badge>
          <Badge>Open source project</Badge>
        </div>

        {/* Overview Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-4">
            <h1 className="text-[24px] font-bold text-black">Overview</h1>
          </div>

          {/* Description */}
          <div className="space-y-4 mb-8">
            <p className="text-[15px] leading-[1.6] text-[#4B5563]">
              PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems. The program aims to empower projects that have demonstrated exceptional usefulness and impact for developers and users alike.
            </p>
            <p className="text-[15px] leading-[1.6] text-[#4B5563]">
              By providing significant financial support, we help projects continue to drive innovation and growth within the ecosystem. Whether you&apos;re building infrastructure, developing tools, or creating educational resources, PG Builder Grants offer a pathway to secure the funding you need to make a lasting difference.
            </p>
          </div>
        </div>

        {/* Application Period Section */}
        <div className="space-y-2">
          <h2 className="text-[18px] font-bold text-black">Application Period</h2>
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold text-[#059669]">Sep 26 - Mar 1, 2026</p>
            <ApplyButton />
          </div>
        </div>
      </div>
    </div>
        )
      }


      {/* Sidebar */}
      <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="lg:ml-64 w-full lg:w-auto">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded-lg shadow-md"
        >
          <svg className="w-6 h-6 text-[#39b54a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        
          {/* Hero Banner */}
        {isHidden && <Form setIsHidden={setIsHidden}/>}
        <div className={isHidden ? "opacity-60" : undefined}>
        <HeroBanner />

        {/* Main Section */}
        <div className="bg-[#f5f7fa] min-h-[calc(100vh-323px)]">
          <div className="max-w-[1191px] mx-auto px-4 sm:px-6 lg:px-9 py-8 lg:py-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <h2 className="font-['Inter:Bold',sans-serif] font-bold text-[24px] sm:text-[32px] text-black">
                Explore
              </h2>
              <button onClick={() => setIsHidden(!isHidden)}
                className="bg-[#00cd5d] hover:bg-[#00b851] transition-colors rounded-[50px] h-[44px] px-6 flex items-center justify-center whitespace-nowrap">
                <span className="font-['Modern_Era:Bold',sans-serif] text-[14px] text-white">
                  Add new grant
                </span>
              </button>
            </div>

            {/* Search and Filters */}
            <SearchFilters />

            

            {/* Grant Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {displayedGrants.map((grant, index) => (
                <GrantCard
                  key={grant.desc}
                  title={grant.title}
                  description={grant.desc}
                  category={"ENC"}
                  status={grant.status}
                  amount={grant.amount}
                  logo={grant.image}
                  displayGrant={() => displayGrant()}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(grantsData.length / grantsPerPage)}
              totalGrants={grantsData.length}
              grantsPerPage={grantsPerPage}
              onPageChange={loadMore}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
