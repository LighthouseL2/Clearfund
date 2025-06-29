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
import { useState } from "react";
import { useSearchParams } from "next/navigation";



export default function Home() {

    const [open, setOpen] = useState(false)
    // const searchParams = useSearchParams()
    // const modal = searchParams.get("modal")

  return (
    <div className="bg-white min-h-screen relative min-w-xs">
        <NavHeader setToggle={setOpen} toggle={open}/>

        <HeroSection open={open} setOpen={setOpen}/>

        <StatSection />

        <SliderLogos />

        <DiscoverBox />

        <GrantBox />

        <FaqSection />

        <RecentPost />

        <div className="px-[5%] bg-cover bg-center w-full py-16" style={{backgroundImage: "url(/bgImg.jpg)"}}>
            <div className="flex items-center justify-center flex-col py-10 bg-black space-y-10 rounded-md">
                <h1 className="text-white font-bold text-2xl lg:text-4xl w-2/3 text-center">
                    Explore past funding, discover new grants, and get real time alerts all in one place
                </h1>

                <a href="#" className="block w-fit bg-[#00CD5D] font-semibold text-black px-8 py-2 rounded-md">Try it free</a>
            </div>
        </div>

        <Footer />
    </div>
  );
}
