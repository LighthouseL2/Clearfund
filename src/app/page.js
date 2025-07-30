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
import { Suspense, useState } from "react";
import Link from "next/link";
import MenuDropdown from "@/components/menuDropdown";



export default function Home() {

    const [open, setOpen] = useState(true)
    const [openMenu, setOpenMenu] = useState(false)
    const [blur, setBlur] = useState(false)


  return (
    <div className={`bg-white min-h-screen relative min-w-xs ${blur && "blur"}`}>
        <NavHeader setToggle={setOpen} toggle={open} openMenu={openMenu}
            setOpenMenu={setOpenMenu} setBlur={setBlur}
        />
        <MenuDropdown
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            toggle={open}
            setToggle={setOpen}
        />
        <Suspense fallback={<div>Loading...</div>}>
            <HeroSection open={open} setOpen={setOpen} setBlur={setBlur} blur={blur}/>
        </Suspense>

        <StatSection />

        <SliderLogos />

        <DiscoverBox />

        <GrantBox />

        <FaqSection />

        <RecentPost />

        <div className="px-[5%] w-[90%] mx-auto rounded-2xl h-[621px]  bg-linear-to-b from-[#198038] to-[#7CB53E] flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col space-y-10">
                <h1 className="text-black font-sans font-extrabold text-[36px] md:text-[76px] w-full
                    lg:w-[800px] text-center md:leading-20 leading-10">
                    Where web3 Grant <span className="text-white">History Lives</span>
                </h1>

                <p className="text-[22px] text-center md:w-[27.2rem] font-sans  font-semibold text-black/70
                    leading-[1.8rem]">
                    Dive into a curated archive of past funding rounds, from who
                    funded what to where the grants went.
                </p>

                <Link href="/?route=login"
                    className="w-[202.19px] flex items-center justify-center font-semibold
                    hover:bg-black transition-all hover:scale-110
                         bg-white hover:text-white text-black text-[16px] h-[52px] px-8 rounded-md"
                         onClick={() => {
                            setOpen(true)
                            setBlur(true)
                         }}>
                        Try it free
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
