"use client"


import HeroSection from "@/components/hero";
import NavHeader from "@/components/navHeader";
import StatSection from "@/components/stats";
import SliderLogos from "@/components/slider";
import DiscoverBox from "@/components/discover";
import GrantBox from "@/components/grantBox";
import Footer from "@/components/Footer";
import RecentPost from "@/components/recentPost";
import FaqSection from "@/components/faq";
import { useEffect, useState } from "react";
import Link from "next/link";
import MenuDropdown from "@/components/menuDropdown";
import Image from "next/image";
import { LoadingSlide } from "@/components/LoaderSlider";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useAccount, useChainId } from 'wagmi';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import GrantRoundCard from "@/components/GrantRoundCard";



const grants = [
    // {
    //   image: "/grant-round-images/good-dollar-image.svg",
    //   title: "Good Dollar",
    //   desc: `An initiative fueling innovation with G$, offering support, funding, and mentorship to builders.`,
    //   amount: "$ 250k",
    //   date: "End- Oct 8, 2025",
    //   link: "https://gooddollar.notion.site/GoodBuilders-Program-Round-2-goes-streaming-200f258232f0802b960ad1dab7ad5fd2"
    // },

    {
      title: "Polygon AI ",
      amount: "50k Pol",
      date: "End- Nov 23, 2025",
      link: "https://www.encodeclub.com/programmes/polygon-grants",
      image: "/grant-round-images/polygon.jpg",
      desc: `Funding from 10k-50k POL across three tiers for teams building innovative apps that combine AI with blockchain tech on Polygon.`
    },
    
    
    {
      image: "/grant-round-images/optimism.image.png",
      title: "Optimism Season 8",
      desc: `Funding projects that build innovative applications and contribute to public goods on Optimism.`,
      amount: "6.29M OP",
      date: "End- Nov 12, 2025",
      link: "https://www.opgrants.io/"
    },

    {
      title: "Scroll Grants",
      amount: "312.5k SCR",
      date: "End- Dec 19, 2025",
      link: "https://tally.so/r/mVrrPj",
      image: "/grant-round-images/feature.jpg",
      desc: `Scroll DAO Community Council introduces the Community Grants Program. This is an effort to support communities worldwide with their community activations.`

    },

    // {
    //   image: "/grant-round-images/thrive-protocol-image.svg",
    //   title: "Thrive Protocol",
    //   desc: `Thrive Portals is funding the next wave of studios and indies building with the Portals Engine.`,
    //   amount: "$ 100k",
    //   date: "End- Jul 31, 2026",
    //   link: "https://portals.thrive.xyz/"
    // },
  ];




export default function Home() {

    const [open, setOpen] = useState(true)
    const [openMenu, setOpenMenu] = useState(false)
    const [blur, setBlur] = useState(false)
    // const [loading, setLoading] = useState(false)
    // const pathname = usePathname()
    const [modalOpen, setModalOpen] = useState(false)
    // const route = useSearchParams().get("route")
    const router = useRouter()
    const [redirected, setRedirected] = useState(true)


    // const { isConnected, account } = useAccount()
    // const chainId = useChainId()
    



    // const [progress, setProgress] = useState(10)


    // let interval = 60


    // useEffect(() => {
    //     if(pathname === "/" && !route){
    //         setLoading(true)
    //         const timer = setInterval(() => {
    //         setProgress((oldProgress) => {
    //             if(oldProgress >= 100) {
    //                 clearInterval(timer)
    //                 setTimeout(() => {
    //                     setLoading(false)
    //                 }, 1000)
    //                 return 100
    //             }
    //             return oldProgress + 1
    //         })
    //         }, interval)
    //         localStorage.setItem("hasVisited", "true")
    //         return () => clearInterval(timer)
    //     }

    // },[setLoading,setProgress,interval, pathname, route])


  //   useEffect(() => {
  //   if(modalOpen && isConnected ) {
  //       setRedirected(false)
  //       router.push("/dashboard")
  //       setModalOpen(false)
  //   }
  // }, [router, modalOpen, isConnected])

  
  
  

    // if (loading){
    //     return (
            
    //         <div className="flex h-screen items-center justify-center transition-all flex-col">
    //             <div className="text-xl font-semibold mb-10 animate-bounce">
    //                 <Image
    //                     alt="clearfund"
    //                     src={"/loadingIcon.png"}
    //                     width={72}
    //                     height={72}
    //                 />
    //             </div>
    //             <div className="md:w-[333px] w-[95%] h-[17px] bg-black  overflow-hidden">
    //                 <div className="h-full bg-green-500 text-white font-bold text-[12px] flex items-center justify-end transition-all ease-linear px-4"
    //                     style={{width: `${progress}%`}}>
    //                         {progress}%
    //                 </div>

    //             </div>
    //             <LoadingSlide />
    //         </div>
           
    //     )
    // }


  return (

    <div className={`bg-white min-h-screen absolute top-5 w-full min-w-xs ${blur && "blur"}`}>
        <NavHeader setToggle={setOpen} toggle={open} openMenu={openMenu}
            setOpenMenu={setOpenMenu} setBlur={setBlur}
        />
        <MenuDropdown
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            toggle={open}
            setToggle={setOpen}
            setModalOpen={setModalOpen}
        />

        <HeroSection setModalOpen={setModalOpen}/>

        <StatSection />

        <SliderLogos />

        <DiscoverBox />

        {/* <GrantBox /> */}

        {/* Featured Grants Section - Hidden */}
        {/* <div className="w-full px-[5%] bg-[#FAFAFA] py-20">
            <header className="text-center pb-10">
                <h1 className="text-[65px] font-black text-center">Featured Grant</h1>
            </header>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10  mt-16 w-full text-black justify-items-center">
                    {grants.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between h-full w-full max-w-[360px] border-1 rounded-xl border-[#000000]/40 bg-white hover:shadow-md transition"
                      >
                        <div className="rounded-t-xl overflow-hidden w-full h-[166px]  relative">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="w-full h-auto object-cover  rounded-t-xl"
                          />

                        </div>
                        <div className="flex-grow mt-4 px-4 pb-4 flex flex-col">
                          <div>
                            <div className="flex justify-between items-center pt-4 mb-2">
                              <h3 className="text-[16px] text-[#000000] font-black leading-snug">
                                {item.title}
                              </h3>
                              <p className="inline-flex items-center border bg-[#D1FAE5] border-black/15 text-[#198038] rounded-[5px] px-2 gap-1 text-[14px]  font-medium  w-fit">
                                <span className="font-bold">{item.amount}</span>
                              </p>
                            </div>

                            <p className="text-[16px] leading-snug text-gray-700 mb-8 pt-4">
                              {item.desc}
                            </p>
                          </div>
                          <div className="px-5 py-2 mb-2 mt-auto">
                            {item.link && (
                              item.status === "past" ? (
                                <span
                                  style={{ fontSize: '16px' }}
                                  className="block  bg-[#A6E7D8]/50 border-1 border-[#008767] text-[#008767] opacity-60 cursor-not-allowed transition w-full py-2.5 text-center font-medium rounded-full"
                                >
                                  Ended
                                </span>
                              ) : (
                                <Link
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ fontSize: '16px' }}
                                  className="block  bg-[#A6E7D8]/50 border-1 border-[#008767] text-[#008767] transition w-full py-2.5 text-center font-bold rounded-full"
                                >
                                  Apply
                                </Link>
                              )
                            )}
                          </div>
                          <hr className=" mt-4" />
                          <div className="flex items-start mt-3 py-2">
                            <p className="text-[10px] text-[#000000]  font-medium border bg-[#FFFFFF] border-black/15 rounded-[50px] px-2 py-1">{item.date}</p>
                          </div>
                        </div>

                      </div>

                    ))}
                  </div>

            <Link href={"/grants"} className="w-[202.1923828125px] bg-[#39B54A] text-white flex justify-center items-center
                mx-auto h-[52px] mt-20 rounded-full hover:bg-black transition-all">
                View All
            </Link>
        </div> */}

        <RecentPost />

        {/* <FaqSection /> */}



        <div className={`px-[5%] w-[90%] mx-auto rounded-2xl h-[621px] mt-30
         flex items-center justify-center flex-col bg-[url(/details.jpg)] bg-cover bg-center`}>
            <div className="flex items-center justify-center flex-col space-y-10">
                <h1 className="text-black font-extrabold text-[36px] md:text-[76px] w-full
                    lg:w-[800px] text-center md:leading-24 leading-10" style={{fontWeight: 900}}>
                    All Funding Details <br /> <span className="text-white">In One Hub</span>
                </h1>

                <p className="text-[22px] text-center md:w-[36.1rem] font-semibold text-black/70
                    leading-[1.8rem] font-sans">
                    Helping builders discover and access funding <br />opportunities with ease
                </p>

                <Link href={"/grants"} className="w-[202.1923828125px] bg-white
                 text-black flex justify-center items-center hover:text-white
                mx-auto h-[52px]  rounded-full font-black hover:bg-black transition-all">
                Explore Clearfund
            </Link>
            </div>
        </div>
        <div className="p-10 mt-10">
            <hr />
        </div>
        <Footer />
    </div>

  );
}
