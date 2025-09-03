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






export default function Home() {

    const [open, setOpen] = useState(true)
    const [openMenu, setOpenMenu] = useState(false)
    const [blur, setBlur] = useState(false)
    const [loading, setLoading] = useState(false)
    const pathname = usePathname()
    const [modalOpen, setModalOpen] = useState(false)
    const route = useSearchParams().get("route")
    const router = useRouter()
    const [redirected, setRedirected] = useState(true)


    const { isConnected, account } = useAccount()
    const chainId = useChainId()
    



    const [progress, setProgress] = useState(10)


    let interval = 60


    useEffect(() => {
        if(pathname === "/" && !route){
            setLoading(true)
            const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if(oldProgress >= 100) {
                    clearInterval(timer)
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000)
                    return 100
                }
                return oldProgress + 1
            })
            }, interval)
            localStorage.setItem("hasVisited", "true")
            return () => clearInterval(timer)
        }

    },[setLoading,setProgress,interval, pathname, route])


    useEffect(() => {
    if(modalOpen && isConnected ) {
        setRedirected(false)
        router.push("/dashboard")
        setModalOpen(false)
    }
  }, [router, modalOpen, isConnected])

  
  
  

    if (loading){
        return (
            
            <div className="flex h-screen items-center justify-center transition-all flex-col">
                <div className="text-xl font-semibold mb-10 animate-bounce">
                    <Image
                        alt="clearfund"
                        src={"/loadingIcon.png"}
                        width={72}
                        height={72}
                    />
                </div>
                <div className="md:w-[333px] w-[95%] h-[17px] bg-black  overflow-hidden">
                    <div className="h-full bg-green-500 text-white font-bold text-[12px] flex items-center justify-end transition-all ease-linear px-4"
                        style={{width: `${progress}%`}}>
                            {progress}%
                    </div>

                </div>
                <LoadingSlide />
            </div>
           
        )
    }


  return (
    
    <div className={`bg-white min-h-screen relative min-w-xs ${blur && "blur"}`}>
        <NavHeader setToggle={setOpen} toggle={open} openMenu={openMenu}
            setOpenMenu={setOpenMenu} setBlur={setBlur} setModalOpen={setModalOpen}
        />
        <MenuDropdown
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            toggle={open}
            setToggle={setOpen}
        />
        
        <HeroSection modalOpen={modalOpen} setModalOpen={setModalOpen}/>

        <StatSection />

        <SliderLogos />

        <DiscoverBox />

        <GrantBox />

        <FaqSection />

        <RecentPost />

        <div className={`px-[5%] w-[90%] mx-auto rounded-2xl h-[621px]
         flex items-center justify-center flex-col bg-[url(/details.jpg)] bg-cover bg-center`}>
            <div className="flex items-center justify-center flex-col space-y-10">
                <h1 className="text-black font-extrabold text-[36px] md:text-[76px] w-full
                    lg:w-[800px] text-center md:leading-24 leading-10" style={{fontWeight: 900}}>
                    All Funding Details <br /> <span className="text-white">in One Hub</span>
                </h1>

                <p className="text-[22px] text-center md:w-[36.1rem] font-semibold text-black/70
                    leading-[1.8rem] font-sans">
                    From past funding data to open funding applications,
                    all in one searchable place.
                </p>

                {/* <Link href="/dashboard"
                    className=" flex items-center justify-center font-semibold
                    hover:bg-black transition-all hover:scale-110 font-sans
                         bg-white hover:text-white text-black text-[16px] h-[52px] px-8 rounded"
                         >
                        Explore ClearFund
                </Link> */}

                <ConnectButton.Custom>
                    {({ account, openConnectModal, mounted }) => {
                        const connected = mounted && account

                        const handleClick = async () => {
                        setModalOpen(true)
                        openConnectModal()
                        }

                        return (
                        <button onClick={handleClick}
                            className='btn flex items-center justify-center font-semibold
                                hover:bg-black transition-all hover:scale-110 font-sans
                                bg-white hover:text-white text-black text-[16px] h-[52px] px-8 rounded'>
                            {connected ? "Go to Dashboard" : "Explore ClearFund"}
                        </button>
                        )
                    }}
                </ConnectButton.Custom>
            </div>
        </div>
        <div className="p-10 mt-10">
            <hr />
        </div>
        <Footer />
    </div>

  );
}
