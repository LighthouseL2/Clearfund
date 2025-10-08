"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import GrantRoundCard from "@/components/GrantRoundCard";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/lib/withAuth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePrivy } from "@privy-io/react-auth";
import UserDetails from "@/components/userDetails";

export default function Dashboard() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [showTooltip, setShowTooltip] = useState(false);
  // const [programOpen, setProgramOpen] = useState(false);
  // const [statusOpen, setStatusOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [grantStatus, setGrantStatus] = useState("all")

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 9;
  const [filter, setFilter] = useState("all")
  const { ready, authenticated, login, logout, user } = usePrivy()
  
  // const address = user?.wallet?.address

  const today = new Date()

  function getStatus(endDate) {
    const end = new Date(endDate)

    if(today <= end) return "past"
    return "past"
  }

  const grants = [
    {
      image: "/grant-round-images/qura.jpg",
      title: "The DeQUIP Grant Program",
      desc: `Quranium’s initiative that supports developers worldwide in creating future-proof projects that enable adoption and remain uncrackable.`,
      amount: "$5m",
      date: "Ongoing",
      deadline: "Ongoing",
      
      link : "https://www.quranium.org/apply-grant-program",
    },

    {
      image: "/grant-round-images/internet.jpg",
      title: "ENS PG Builder Grants",
      desc: `PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems. `,
      amount: "50k USDC",
      date: "Ongoing",
      deadline: "Ongoing",
      link : "https://builder.ensgrants.xyz/"
    },

    {
      image: "/grant-round-images/gitcoin.png",
      title: "Gitcoin Grants 24",
      subTitle: "Developer Tooling & Infra",
      desc: `This round is designed to support projects that strengthen Ethereum’s core infrastructure.`,
      amount: "$200k",
      date: "End- Oct 17, 2025",
      deadline: "Oct 17, 2025",
      link : "https://giveth.typeform.com/gg24-dti?apcid=006677578599e2590fc7e200&utm_campaign=gitcoin-gg24-applications&utm_content=gitcoin-gg24-applications&utm_medium=email&utm_source=ortto"
    },

    {
      image: "/grant-round-images/gitcoin.png",
      title: "Gitcoin Grants 24",
      subTitle: "Interop Standards, Infra & Analytics",
      desc: `This round is designed to support projects that strengthen Ethereum’s multi-chain ecosystem by building open standards.`,
      amount: "$100k",
      date: "End- Oct 17, 2025",
      deadline: "Oct 17, 2025",
      link : "https://giveth.typeform.com/gg24-isia?apcid=006677578599e2590fc7e200&utm_campaign=gitcoin-gg24-applications&utm_content=gitcoin-gg24-applications&utm_medium=email&utm_source=ortto"
    },

    {
      image: "/grant-round-images/base.png",
      title: "Base Builder Grants",
      desc: `These are small grants for builders with early ideas or initial prototypes, hacking away on nights and weekends. `,
      amount: "5 ETH",
      date: "Ongoing",
      deadline: "Ongoing",
      link : "https://docs.google.com/forms/d/e/1FAIpQLSfXuEzmiAzRhie_z9raFCF1BXweXgVt18o-DvBuRRgyTygL2A/viewform"
    },

    {
      title: "Polygon AI ",
      amount: "50k Pol",
      date: "End- Nov 23, 2025",
      deadline: "Nov 23, 2025",
      link: "https://www.encodeclub.com/programmes/polygon-grants",
      image: "/grant-round-images/polygon.jpg",
      desc: `Funding from 10k-50k POL across three tiers for teams building innovative apps that combine AI with blockchain tech on Polygon.`
    },

    {
      title: "Scroll Grants",
      amount: "312k SCR",
      date: "End- Dec 19, 2025",
      deadline: "Dec 19, 2025",
      link: "https://tally.so/r/mVrrPj",
      image: "/grant-round-images/feature.jpg",
      desc: `Scroll DAO Community Council introduces the Community Grants Program. This is an effort to support communities worldwide with their community activations.`
    },


    {
      title: "Avalanche Grants & Programs",
      amount: null,
      date: "Ongoing",
      deadline: "Ongoing",
      link: "https://build.avax.network/grants#programs",
      image: "/grant-round-images/ava.png",
      desc: `Empowering innovators to build the future of blockchain technology with scalable and sustainable solutions.`,
    },

    {
      title: "Incubator program",
      amount: "$ 9k",
      date: "End- Oct 7, 2025",
      deadline: "Oct 7, 2025",
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
      deadline: "Oct 8, 2025",
      link: "https://gooddollar.notion.site/GoodBuilders-Program-Round-2-goes-streaming-200f258232f0802b960ad1dab7ad5fd2"
    },

    {
      image: "/grant-round-images/octant-image.svg",
      title: "Octant",
      desc: `Funding the journalists, storytellers, content creators, and others who’ve helped make Ethereum legible.`,
      amount: "$1m",
      date: "End- Aug 27, 2025",
      deadline: "Aug 27, 2025",
      link: "https://octant.fillout.com/epoch9-ethereum-stories?ref=blog.octant.build"
    },
    {
      image: "/grant-round-images/thrive-protocol-image.svg",
      title: "Thrive Protocol",
      desc: `Thrive Portals is funding the next wave of studios and indies building with the Portals Engine.`,
      amount: "$ 100k",
      date: "End- Jul 31, 2026",
      deadline: "Jul 31, 2026",
      link: "https://portals.thrive.xyz/"
    },
    {
      image: "/grant-round-images/lisk-l2-program.svg",
      title: "Lisk L2",
      desc: `A Program to nurture a community of developers and creators within the Lisk ecosystem.`,
      amount: "$ 80k",
      date: "End- Oct, 2025",
      deadline: "Oct, 2025",
      link: "https://lisk.com/blog/posts/say-hello-to-the-new-lisk-l2-grant-program/"
    },
    {
      image: "/grant-round-images/celo-proof-of-ship.svg",
      title: " Celo-Proof of Ship 7",
      desc: `Proof-of-Ship is a monthly contest that rewards builders for actively building on Celo.`,
      amount: "15k Celo",
      date: "End- Aug 29, 2025",
      deadline: "Aug 29, 2025",
      link: "https://docs.gap.karmahq.xyz/how-to-guides/integrations/celo-proof-of-ship"
    },
    {
      image: "/grant-round-images/thrive-horizon.svg",
      title: "Thrive Protocol",
      desc: `Thrive Horizen funds the new era of privacy first apps on Base.`,
      amount: "$ 100k",
      date: "End-  Aug 13, 2026",
      deadline: "Aug 13, 2026",
      link: "https://horizen.thrive.xyz/"
    },
    {
      image: "/grant-round-images/stream-garden-image.svg",
      title: "Stream On Garden ",
      desc: `Active Gardens Funding Pools on Celo network are eligible for streaming matching funds.`,
      amount: "3k Celo",
      date: "End-  Nov 5, 2025",
      deadline: "Nov 5, 2025",
      link: "https://1hive-gardens.notion.site/Celo-Support-Streams-on-Gardens-246d6929d01480209ca4dbc2f8d26bfd"
    },
    {
      image: "/grant-round-images/optimism.image.png",
      title: "Optimism Season 8",
      desc: `Funding projects that build innovative applications and contribute to public goods on Optimism.`,
      amount: "6.29M OP",
      date: "End- Nov 12, 2025",
      deadline: "Nov 12, 2025",
      link: "https://www.opgrants.io/"
    },
    {
      image: "/grant-round-images/boba-round-image.svg",
      title: "Thrive Boba",
      desc: `Grant for innovators building new projects natively on Boba. Supports early-stage teams developing real-world applications.`,
      amount: "1m Boba",
      date: "End- Dec 31, 2025",
      deadline: "Dec 31, 2025",
      link: "https://app.thrive.xyz/programs/23"
    },
    {
      image: "/grant-round-images/hedera-round-image.svg",
      title: "Thrive Hedera",
      desc: `Hedera is allocating 4M HBAR to support projects from other ecosystems looking to deploy on Hedera`,
      amount: "4m hbar",
      date: "End- Dec 31, 2025",
      deadline: "Dec 31, 2025",
      link: "https://app.thrive.xyz/programs/16"
    },
    {
      image: "/grant-round-images/boba-round-image.svg",
      title: "Thrive Boba",
      desc: `For existing projects from other ecosystems looking to deploy or expand on Boba. This track supports teams ready to scale.`,
      amount: "1m Boba",
      date: "End-Dec 31, 2025",
      deadline: "Dec 31, 2025",
      link: "https://app.thrive.xyz/programs/2"
    },
    {
      image: "/grant-round-images/swell-round-image.svg",
      title: "Thrive Swell",
      desc: `For existing products and dApps from other ecosystems looking to integrate Swellchain.  Supports teams ready to expand.`,
      amount: "75m Swell",
      date: "End-Aug 31, 2025",
      deadline: "Aug 31, 2025",
      link: "https://app.thrive.xyz/programs/12"
    },
    {
      image: "/grant-round-images/trading-info-round-image.svg",
      title: "Trading Infr Program",
      desc: `Allocating up to 3,000,000 OP in funding for approved projects driving transaction volume on Base.`,
      amount: "3m OP",
      date: "End- Aug 29, 2025",
      deadline: "Aug 29, 2025",
      link: "https://app.thrive.xyz/programs/31"
    },
    {
      image: "/grant-round-images/giveth-round-image.svg",
      title: "Giveth Causes Round",
      desc: `Climate, ReFi, Women in Web3, and open Source Infra, Causes let you strengthen entire ecosystems with a single contribution.`,
      amount: "$40K",
      date: "End- Sep 5, 2025",
      deadline: "Sep 5, 2025",
      link: "https://giveth.typeform.com/causesqf?apcid=0067b653ad43512d7e91ab00&utm_campaign=causes-qf-announcement&utm_content=causes-qf-announcement-var&utm_medium=email&utm_source=ortto"
    },
    {
      image: "/grant-round-images/prezenti-round-image.svg",
      title: "Prezenti Season 1 Peach Grant Round",
      desc: `Funded through the Celo Community Fund treasury, as a community driven grants programme.`,
      amount: "$50k",
      date: "End-  Dec 10, 2025",
      deadline: "Dec 10, 2025",
      link: "https://charmverse.prezenti.xyz/invite/f90c14"
    },
  ];

   const activeGrants = grants.filter(grant => {
    if(!grant.deadline) return false
    if(grant.deadline.toLowerCase() === "ongoing") return true
    return new Date(grant.deadline) >= today
   })
   const expiredGrants = grants.filter(grant => new Date(grant.deadline) < today)


  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative ">
        {/* <Sidebar /> */}

        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex md:justify-between justify-end flex-wrap-reverse">
              <div>
                <h1 className="text-2xl font-bold text-center md:text-left mb-2">
                  Grants
                </h1>
              </div>
            </div>

            <div className="flex  mt-10 font-sans justify-between w-full flex-wrap-reverse gap-10 items-center">
              <div className="flex gap-5 font-black">
                <button onClick={()=> setGrantStatus("all")} className={`text-[15px] w-[100px] md:w-[112px] h-[38px] rounded-4xl ${grantStatus === 'all' && "bg-[#39B54A] text-white"} text-black`}>All</button>
                <button onClick={()=> setGrantStatus("active")} className={`text-[15px] w-[100px] md:w-[112px] h-[38px] rounded-4xl ${grantStatus === 'active' && "bg-[#39B54A] text-white"} text-black`}>Active</button>
                <button onClick={()=> setGrantStatus("ended")} className={`text-[15px] w-[100px] md:w-[112px] h-[38px] rounded-4xl ${grantStatus === 'ended' && "bg-[#39B54A] text-white"} text-black`}>Ended</button>
              </div>
                <button onClick={() => setIsModalOpen(true)}
                  className="bg-[#39B54A] flex items-center justify-center text-white rounded-4xl w-[112px] h-[38]"><Plus size={20}/>Add New</button>
            </div>
          </div>

          {/* grant list section */}
          
          {
            grantStatus === "all" ? <GrantRoundCard grants={grants} />
            : grantStatus === "active" ? <GrantRoundCard grants={activeGrants} />
            : grantStatus === "ended" && <GrantRoundCard grants={expiredGrants} />

          }
        </main>

        {/* add new grant modal section */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />


            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 z-10">

              <div className="flex justify-between items-center mb-12">
                <h2 className="text-[16px] font-bold">
                  Add new opportunity
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              {/* form section for adding new grant */}
              <form className="space-y-4">
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-1">
                    Short Description
                  </label>
                  <textarea className="w-full border rounded-[5px] p-2 text-sm" rows="3"></textarea>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-1">
                    Link to Grant
                  </label>
                  <input type="text" className="w-full border rounded-[5px] p-2 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input type="date" className="w-full border rounded-[5px] p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input type="date" className="w-full border rounded-[5px] p-2 text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 mb-4">
                  <div >
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <input type="text" placeholder="Optional" className="w-full border rounded-[5px] p-2 text-sm" />
                  </div>
                </div>

                <p className="text-[10px] text-[#000000]/50 mb-8">
                  Please note that grant will only be added after verification.
                </p>
                <div className="flex justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 rounded-full border border-gray-400 text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-[#39B54A] text-white font-medium"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}