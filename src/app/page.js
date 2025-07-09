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



export default function Home() {

    const [open, setOpen] = useState(false)

  return (
    <div className={`bg-white min-h-screen relative min-w-xs ${open && "blur"}`}>
        <NavHeader setToggle={setOpen} toggle={open}/>

        <Suspense fallback={<div>Loading...</div>}>
            <HeroSection open={open} setOpen={setOpen}/>
        </Suspense>

        <StatSection />

        <SliderLogos />

        <DiscoverBox />

        <GrantBox />

        <FaqSection />

        <RecentPost />

        <div className="px-[5%] lg:h-[455px] h-[500px] bg-[#095012] flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col space-y-10">
                <h1 className="text-white font-semibold text-[36px] w-full lg:w-[681px] text-center">
                    Find ReFi projects, past grants, and new funding opportunities all in one place.
                </h1>

                <Link href="/"
                    className="w-[202.19px] flex items-center justify-center font-semibold hover:bg-black bg-white hover:text-white text-black text-[16px] h-[52px] px-8 rounded-md" onClick={() => setToggle(!toggle)}>
                        Try it free
                </Link>
            </div>
        </div>

        <Footer />
    </div>
  );
}
