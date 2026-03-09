"use client"

import NavHeader from "@/components/navHeader";
import MenuDropdown from "@/components/menuDropdown";
import Footer from "@/components/Footer";
import { useState } from "react";
import FeaturedProjects from "@/components/FeaturedProjects";
import NewHero from "@/components/NewHero";
import PlatformStats from "@/components/PlatformStats";
import CTASection from "@/components/CTASection";
import DonationFeed from "@/components/DonationFeed";

export default function Home() {
  return (
    <div className={`bg-white min-h-screen relative w-full selection:bg-[#00AFAA] selection:text-white`}>
      <NavHeader />

      <main className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <NewHero />

        {/* FEATURED PROJECTS SECTION */}
        <FeaturedProjects />

        {/* LIVE IMPACT FEED - Visibility for all users */}
        <div className="px-6 md:px-12 lg:px-16 mb-32">
          <DonationFeed />
        </div>

        {/* PLATFORM STATISTICS SECTION */}
        <PlatformStats />

        {/* CALL-TO-ACTION SECTION */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
