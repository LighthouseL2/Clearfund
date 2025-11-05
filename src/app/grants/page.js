"use client";

import { useEffect, useState, useRef } from "react";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { LogOut, Settings, ChevronRight, Menu, X, Bell } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils"; // if using classNames utility
import GrantDashboard from "@/components/GrantDashboard";
import ProtectedRoute from "@/lib/withAuth";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { shortAddress } from "@/components/userDetails";




import { Plus } from "lucide-react";
import GrantRoundCard from "@/components/GrantRoundCard";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import UserDetails from "@/components/userDetails";
import ModalConnect from "@/components/modalConnect";
import { GrantSubmissionForm } from "@/components/grants/GrantSubmissionForm";




function DashboardLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [grantStatus, setGrantStatus] = useState("all")
  const [toggle, setToggle] = useState(false)


  const pathname = usePathname();
  const router = useRouter()
  const { ready, authenticated, login, logout, user } = usePrivy()
  const { wallets } = useWallets()

  const address = wallets[0]?.address

  const today = new Date()

  // IPFS initialization is handled server-side via API route
  // No client-side initialization needed

  // function getStatus(endDate) {
  //   const end = new Date(endDate)

  //   if(today <= end) return "past"
  //   return "past"
  // }

  const grants = [
    {
      image: "/grant-round-images/qura.jpg",
      title: "The DeQUIP GrantProgram",
      desc: `Quranium’s initiative that supports developers worldwide in creating future-proof projects that enable adoption and remain uncrackable.`,
      amount: "$5m",
      date: "Ongoing",
      deadline: "Ongoing",
      label: "Apply",
      link : "https://www.quranium.org/apply-grant-program",
    },


    {
      image: "/grant-round-images/celoStream.png",
      title: "Celo Support Streams",
      desc: `Support Streams are Celo Protocol Incentives that are distributed Monthly to Protocols on Celo through a stCELO vote in the CeloPG Snapshot space. that enable adoption and remain uncrackable.`,
      amount: "150K CELO",
      date: "End- Jan 31, 2026",
      deadline: "Jan 31, 2026",
      label: "Apply",
      link : "https://app.charmverse.io/celopg/celo-support-streams-08274005568032872",
    },

    {
      image: "/grant-round-images/builder.jpg",
      title: "Celo Builder Fund",
      desc: `Apply for the celo builder fund to receive an investment of $25k per project with the potential for additional funding from verda ventures.`,
      amount: "25k cUSD",
      date: "End- Dec 31, 2025",
      deadline: "Dec 31, 2025",
      label: "Apply",
      link : "https://www.celopg.eco/programs/celo-builder-fund",
    },


    {
      image: "/grant-round-images/miniApp.png",
      title: "Mini App Mondays",
      desc: `Mini App Mondays is a weekly showcase designed to highlight the most exciting mini apps on Celo. Each week, one app will be featured on Farcaster.`,
      amount: "1k CELO",
      date: "End- Dec 29, 2025",
      deadline: "Dec 29, 2025",
      label: "Apply",
      link : "https://www.celopg.eco/programs/mini-app-mondays",
    },


    {
      image: "/grant-round-images/impact.png",
      title: "Proof of Impact (S1)",
      desc: `A fully onchain reward program offering a streamlined and transparent system to rewards apps based on the gas fees their users generate, reinforcing long-term network growth.`,
      amount: "250K CELO",
      date: "End- Dec 16, 2025",
      deadline: "Dec 16, 2025",
      label: "Apply",
      link : "https://www.celopg.eco/programs/proof-of-impact-s1",
    },


    {
      image: "/grant-round-images/local.png",
      title: "Local Grant Programs",
      desc: `Empowering local hubs to channel funding through local grant programs into community activities, showcasing Ethereum as practical infrastructure.`,
      amount: "$ 125k",
      date: "End- March 1, 2026",
      deadline: "March 1, 2026",
      label: "Apply",
      link : "https://app.karmahq.xyz/localism-fund/programs/975",
    },

    {
      image: "/grant-round-images/africa.png",
      title: "Lisk Startup Support ",
      desc: `This initiative provide hands-on support to founders at the early stage of their startup journey whether you need technical guidance or growth strategies to take your product to the next level.`,
      amount: null,
      date: "Ongoing",
      deadline: "Ongoing",
      label: "Apply",
      link : "https://docs.google.com/forms/d/e/1FAIpQLSezQFvA4AtKz4i6mT_m4knOPFkxxD8PNqFrX9TvK2pBv-Vdow/viewform",
    },

    {
      image: "/grant-round-images/baseBuild.png",
      title: "Base Ecosystem Fund",
      desc: `The Base Ecosystem Fund will invest in and support early stage projects (pre-seed to seed) building on Base.`,
      amount: null,
      date: "Ongoing",
      deadline: "Ongoing",
      label: "Apply",
      link : "https://docs.google.com/forms/d/e/1FAIpQLSeiSAod4PAbXlvvDGtHWu-GqzGpvHYfaTQR2f77AawD7GYc4Q/viewform",
    },
    {
      image: "/grant-round-images/starknet1.png",
      title: "Starknet Grants",
      desc: `Starknet Grants enable builders, empower vibrant communities, increase adoption and make the Starknet ecosystem more open and accessible for everyone.`,
      amount: null,
      date: "Ongoing",
      deadline: "Ongoing",
      label: "Apply",
      link : "https://www.starknet.io/grants/",
    },
    {
      image: "/grant-round-images/space.jpg",
      title: "SPACE ID Grant Program",
      desc: `A long-term funding initiative designed to support and enrich the blockchain community.`,
      amount: "$39 k",
      date: "End- Dec 31, 2025",
      deadline: "Dec 31, 2025",
      label: "Apply",
      link : "https://docs.space.id/domain-and-payment-id/domain-programs/space-id-grant-program",
    },
    {
      image: "/grant-round-images/xeco.jpg",
      title: "X1 EcoChain Grants",
      desc: `This Program aims to grow the $X1 network by funding projects that enhance both dev tools and UX on its low-energy, EVM-compatible blockchain.`,
      amount: "$5m",
      date: "Ongoing",
      deadline: "Ongoing",
      label: "Apply",
      link : "https://grant.x1ecochain.com/",
    },
    {
      image: "/grant-round-images/web3grants.png",
      title: "Web3 Foundation Grants",
      desc: `Funding Software Development and Research Efforts related to Polkadot and Kusama.`,
      amount: null,
      date: "Ongoing",
      deadline: "Ongoing",
      label: "Apply",
      link : "https://grants.web3.foundation/",
    },
    {
      image: "/grant-round-images/ship.jpg",
      title: "Celo-Proof of Ship 9",
      desc: `Proof-of-Ship is a monthly contest that rewards builders for actively building on Celo.`,
      amount: "15k Celo",
      date: "End- Oct 31, 2025",
      deadline: "Oct 31, 2025",
      label: "Apply",
      link : "https://x.com/CeloDevs/status/1975456087299268656",
    },
    {
      image: "/grant-round-images/sup.jpg",
      title: "SPR Season 4",
      desc: `SUP is the governance token of Superfluid DAO Distributed to users of ecosystem applications via Streaming Programmatic Rewards.`,
      amount: null,
      date: "End- Oct 17, 2025",
      deadline: "Oct 17, 2025",
      label: "Apply",
      link : "https://superfluidorg.notion.site/sup-for-growth",
    },
    {
      image: "/grant-round-images/yapper.png",
      title: <span>Arbitrum x Kaito <br />Season 2</span>,
      desc: `The Kaito ARB Grant will distribute 700,000 ARB across 150 creators, with grants split into three tiers: the Top 10, the Next 40, and the Remaining 100.`,
      amount: "700k ARB",
      date: "End- Dec 31, 2025",
      deadline: "Dec 31, 2025",
      label: "Apply",
      link : "https://blog.arbitrum.io/arbitrum-x-kaito-season-2/",
    },
    {
      image: "/grant-round-images/destino.png",
      title: "Destino Devconnect grants",
      desc: `Destino Devconnect is a local grants round focused on supporting events and initiatives that help bring Argentina and the broader Latam region onchain.`,
      amount: null,
      date: "End- Nov 22, 2025",
      deadline: "Nov 22, 2025",
      label: "Apply",
      link : "https://esp.ethereum.foundation/devcon-grants",
    },
    {
      image: "/grant-round-images/web3grants1.png",
      title: "Gear Foundation Grants",
      desc: `This Grant Program is designed to offer teams, individuals, and creators non-dilutive funding to further accelerate the growth of the Gear ecosystem.`,
      amount: null,
      date: "Ongoing",
      deadline: "Ongoing",
      label: "Apply",
      link : "https://vara.network/grants",
    },
    {
      image: "/grant-round-images/ecochain.jpg",
      title: "X1 EcoChain Rewards",
      desc: `Galxe Starboard, an interactive leaderboard that distributes $100,000 in X1 Coins to standout contributors.`,
      amount: "$ 100k",
      date: "End- Nov 25, 2025",
      deadline: "Nov 25, 2025",
      label: "Details",
      link : "https://medium.com/@X1_EcoChain/x1-ecochain -launches-galxe-starboard-100-000-community-rewards-09c1d8325015",
    },
    {
      image: "/grant-round-images/lisk.png",
      title: "Lisk EMpower Fund",
      desc: `Equip founders in Africa, Southeast Asia, and Latin America with the capital and networks to compete on a global stage.`,
      amount: "$15M",
      date: "Ongoing",
      deadline: "Ongoing",
      label: "Apply",
      link : "https://lisk.com/fund/",
    },
    {
      image: "/grant-round-images/internet.jpg",
      title: "ENS PG Builder Grants",
      desc: `PG Builder Grants program is designed to support foundational public goods in the Ethereum and Web3 ecosystems. `,
      amount: "50k USDC",
      date: "Ongoing",
      deadline: "Ongoing",
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
      deadline: "Oct 17, 2025",
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
      deadline: "Oct 17, 2025",
      label: "Apply",
      link : "https://giveth.typeform.com/gg24-isia?apcid=006677578599e2590fc7e200&utm_campaign=gitcoin-gg24-applications&utm_content=gitcoin-gg24-applications&utm_medium=email&utm_source=ortto"
    },

    {
      image: "/grant-round-images/base.png",
      title: "Base Builder Grants",
      desc: `These are small grants for builders with early ideas or initial prototypes, hacking away on nights and weekends. `,
      amount: "5 ETH",
      date: "Ongoing",
      deadline: "Ongoing",
      label: "Apply",
      link : "https://docs.google.com/forms/d/e/1FAIpQLSfXuEzmiAzRhie_z9raFCF1BXweXgVt18o-DvBuRRgyTygL2A/viewform"
    },

    {
      title: "Polygon AI ",
      amount: "50k Pol",
      date: "End- Nov 23, 2025",
      deadline: "Nov 23, 2025",
      label: "Apply",
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
      label: "Apply",
      desc: `Scroll DAO Community Council introduces the Community Grants Program. This is an effort to support communities worldwide with their community activations.`
    },


    {
      title: "Avalanche Grants & Programs",
      amount: "$250m",
      date: "Ongoing",
      deadline: "Ongoing",
      link: "https://build.avax.network/grants#programs",
      image: "/grant-round-images/ava.png",
      label: "Apply",
      desc: `Empowering innovators to build the future of blockchain technology with scalable and sustainable solutions.`,
    },

    {
      title: "Incubator program",
      amount: "$ 9k",
      date: "End- Oct 7, 2025",
      deadline: "Oct 7, 2025",
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
      deadline: "Oct 8, 2025",
      label: "Apply",
      link: "https://gooddollar.notion.site/GoodBuilders-Program-Round-2-goes-streaming-200f258232f0802b960ad1dab7ad5fd2"
    },

    {
      image: "/grant-round-images/octant-image.svg",
      title: "Octant",
      desc: `Funding the journalists, storytellers, content creators, and others who’ve helped make Ethereum legible.`,
      amount: "$1m",
      date: "End- Aug 27, 2025",
      deadline: "Aug 27, 2025",
      label: "Apply",
      link: "https://octant.fillout.com/epoch9-ethereum-stories?ref=blog.octant.build"
    },
    {
      image: "/grant-round-images/thrive-protocol-image.svg",
      title: "Thrive Protocol",
      desc: `Thrive Portals is funding the next wave of studios and indies building with the Portals Engine.`,
      amount: "$ 100k",
      date: "End- Jul 31, 2026",
      deadline: "Jul 31, 2026",
      label: "Apply",
      link: "https://portals.thrive.xyz/"
    },
    {
      image: "/grant-round-images/lisk-l2-program.svg",
      title: "Lisk L2",
      desc: `A Program to nurture a community of developers and creators within the Lisk ecosystem.`,
      amount: "$ 80k",
      date: "End- Oct, 2025",
      deadline: "Oct, 2025",
      label: "Apply",
      link: "https://lisk.com/blog/posts/say-hello-to-the-new-lisk-l2-grant-program/"
    },
    {
      image: "/grant-round-images/celo-proof-of-ship.svg",
      title: " Celo-Proof of Ship 7",
      desc: `Proof-of-Ship is a monthly contest that rewards builders for actively building on Celo.`,
      amount: "15k Celo",
      date: "End- Aug 29, 2025",
      deadline: "Aug 29, 2025",
      label: "Apply",
      link: "https://docs.gap.karmahq.xyz/how-to-guides/integrations/celo-proof-of-ship"
    },
    {
      image: "/grant-round-images/thrive-horizon.svg",
      title: "Thrive Protocol",
      desc: `Thrive Horizen funds the new era of privacy first apps on Base.`,
      amount: "$ 100k",
      date: "End-  Aug 13, 2026",
      deadline: "Aug 13, 2026",
      label: "Apply",
      link: "https://horizen.thrive.xyz/"
    },
    {
      image: "/grant-round-images/stream-garden-image.svg",
      title: "Stream On Garden ",
      desc: `Active Gardens Funding Pools on Celo network are eligible for streaming matching funds.`,
      amount: "3k Celo",
      date: "End-  Nov 5, 2025",
      deadline: "Nov 5, 2025",
      label: "Apply",
      link: "https://1hive-gardens.notion.site/Celo-Support-Streams-on-Gardens-246d6929d01480209ca4dbc2f8d26bfd"
    },
    {
      image: "/grant-round-images/optimism.image.png",
      title: "Optimism Season 8",
      desc: `Funding projects that build innovative applications and contribute to public goods on Optimism.`,
      amount: "6.29M OP",
      date: "End- Nov 12, 2025",
      deadline: "Nov 12, 2025",
      label: "Apply",
      link: "https://www.opgrants.io/"
    },
    {
      image: "/grant-round-images/boba-round-image.svg",
      title: "Thrive Boba",
      desc: `Grant for innovators building new projects natively on Boba. Supports early-stage teams developing real-world applications.`,
      amount: "1m Boba",
      date: "End- Sep 12, 2025",
      deadline: "Sep 12, 2025",
      label: "Apply",
      link: "https://app.thrive.xyz/programs/23"
    },
    {
      image: "/grant-round-images/hedera-round-image.svg",
      title: "Thrive Hedera",
      desc: `Hedera is allocating 4M HBAR to support projects from other ecosystems looking to deploy on Hedera`,
      amount: "4m hbar",
      date: "End- Dec 31, 2025",
      deadline: "Dec 31, 2025",
      label: "Apply",
      link: "https://app.thrive.xyz/programs/16"
    },
    {
      image: "/grant-round-images/boba-round-image.svg",
      title: "Thrive Boba",
      desc: `For existing projects from other ecosystems looking to deploy or expand on Boba. This track supports teams ready to scale.`,
      amount: "1m Boba",
      date: "End- Sep 12, 2025",
      deadline: "Sep 12, 2025",
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
      deadline: "Sep 5, 2025",
      link: "https://giveth.typeform.com/causesqf?apcid=0067b653ad43512d7e91ab00&utm_campaign=causes-qf-announcement&utm_content=causes-qf-announcement-var&utm_medium=email&utm_source=ortto"
    },
    {
      image: "/grant-round-images/prezenti-round-image.svg",
      title: <span>Prezenti Season 1 <br/> Peach Grant Round</span>,
      desc: `Funded through the Celo Community Fund treasury, as a community driven grants programme.`,
      amount: "250k cUSD",
      date: "End-  Dec 10, 2025",
      deadline: "Dec 10, 2025",
      label: "Apply",
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
        <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 relative">
          <Sidebar authenticated={authenticated} address={address} login={login}/>

            <main className="flex-1 p-4 md:px-6 md:ml-64">
                


                <div className="min-h-screen flex flex-col md:flex-row  text-gray-800 relative ">
        {/* <Sidebar /> */}
        {
          toggle && <ModalConnect setCloseModal={setToggle}/>
        }

        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex md:justify-between justify-end flex-wrap-reverse">
              <div className={"flex items-center justify-between w-full mb-10"}>
                <h1 className="text-2xl font-bold  md:text-left ">
                  Grants
                </h1>

                {!authenticated ?
                  <button
                      onClick={login}
                      className="font-sans font-black hover:bg-black text-[16px] h-[52px] bg-[#39B54A] text-white rounded-full w-[159.16796875px]"
                      >
                      Connect wallet
                  </button> :
                  <UserDetails walletAddress={address} logout={logout}/>
                }
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
            grantStatus === "all" ? <GrantRoundCard grants={grants} setToggle={setToggle}/>
            : grantStatus === "active" ? <GrantRoundCard grants={activeGrants} setToggle={setToggle}/>
            : grantStatus === "ended" ? <GrantRoundCard grants={expiredGrants} />
            : undefined
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
              <GrantSubmissionForm
                onSuccess={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>


            </main>
        </div>
    </ProtectedRoute>
  );
}


// export default withAuth(Dashboard)
export default DashboardLayout