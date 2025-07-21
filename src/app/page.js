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
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MenuDropdown from "@/components/menuDropdown";



export default function Home() {

    const [open, setOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className={`bg-white min-h-screen relative min-w-xs ${open && "blur"}`}>
        <NavHeader setToggle={setOpen} toggle={open} openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        <MenuDropdown
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            toggle={open}
            setToggle={setOpen}
        />
        <Suspense fallback={<div>Loading...</div>}>
            <HeroSection open={open} setOpen={setOpen}/>
        </Suspense>

        <StatSection />

        <SliderLogos />

        <DiscoverBox />

        <GrantBox />

        <FaqSection />

        <RecentPost />

        <div className="px-[5%] w-[90%] mx-auto rounded-2xl h-[621px]  bg-linear-to-b from-[#198038] to-[#7CB53E] flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col space-y-10">
                <h1 className="text-black font-sans font-medium text-[36px] md:text-[76px] w-full
                    lg:w-[800px] text-center md:leading-20 leading-10">
                    Where ReFi Meets <span className="text-white">Transparency</span>
                </h1>

                <p className="text-[26px] text-center md:w-1/2 font-sans md:px-10 font-medium text-black/70">
                    Find your ReFi fam, fuel the regen movement.  Discover projects,
                     track past rounds, and back public goods.
                </p>

                <Link href="/"
                    className="w-[202.19px] flex items-center justify-center font-semibold hover:bg-black
                         bg-white hover:text-white text-black text-[16px] h-[52px] px-8 rounded-md" onClick={() => setToggle(!toggle)}>
                        Try it free
                </Link>
            </div>
        </div>

        <Footer />
    </div>
  );
}
