"use client"

import NavHeader from "@/components/navHeader";
import MenuDropdown from "@/components/menuDropdown";
import Footer from "@/components/Footer";
import { useState } from "react";
import FeaturedProjects from "@/components/FeaturedProjects";
import NewHero from "@/components/NewHero";
import PlatformStats from "@/components/PlatformStats";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className={`bg-white min-h-screen relative w-full selection:bg-[#00AFAA] selection:text-white`}>
      <NavHeader />

      <main>
        {/* HERO SECTION */}
        <NewHero />

        {/* FEATURED PROJECTS SECTION */}
        <FeaturedProjects />

        {/* PLATFORM STATISTICS SECTION */}
        <PlatformStats />

        {/* CALL-TO-ACTION SECTION */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
